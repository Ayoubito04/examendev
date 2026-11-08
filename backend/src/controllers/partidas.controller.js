import { pool, query } from '../db/pool.js';

// Reglas del juego según el PDF (Página 3)
const PUNTOS_POR_ACIERTO = 5;   // +5 puntos por respuesta correcta (150 máx en 30 preguntas)
const DESCUENTO_POR_FALLO = -2; // -2 puntos por fallo para que responder al azar no compense

function obtenerTemporadaSemanal() {
  const ahora = new Date();
  const inicioAno = new Date(ahora.getFullYear(), 0, 1);
  const dias = Math.floor((ahora - inicioAno) / (24 * 60 * 60 * 1000));
  const semana = Math.ceil((dias + inicioAno.getDay() + 1) / 7);
  return `${ahora.getFullYear()}-W${String(semana).padStart(2, '0')}`;
}

async function actualizarFilaRanking(client, { usuarioId, moduloId, certificacionId, temporada, puntosDelta, sumarPartida }) {
  const existe = await client.query(
    `SELECT id, puntos, partidas_jugadas
     FROM ranking
     WHERE usuario_id = $1
       AND temporada = $2
       AND COALESCE(modulo_id, '') = COALESCE($3, '')
       AND COALESCE(certificacion_id, '') = COALESCE($4, '')`,
    [usuarioId, temporada, moduloId ?? null, certificacionId ?? null]
  );

  if (existe.rowCount > 0) {
    const fila = existe.rows[0];
    const nuevosPuntos = Math.max(0, fila.puntos + puntosDelta);
    const nuevasPartidas = fila.partidas_jugadas + (sumarPartida ? 1 : 0);
    await client.query(
      `UPDATE ranking
       SET puntos = $1, partidas_jugadas = $2, updated_at = CURRENT_TIMESTAMP
       WHERE id = $3`,
      [nuevosPuntos, nuevasPartidas, fila.id]
    );
  } else {
    const puntosIniciales = Math.max(0, puntosDelta);
    await client.query(
      `INSERT INTO ranking (usuario_id, modulo_id, certificacion_id, temporada, puntos, partidas_jugadas)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [usuarioId, moduloId ?? null, certificacionId ?? null, temporada, puntosIniciales, sumarPartida ? 1 : 0]
    );
  }
}

// Obtiene el usuario autenticado por JWT o, si aún no hay pantalla de login activa en el frontend,
// usa/crea un usuario por defecto ('alumno') para que todo se guarde ya en PostgreSQL.
async function obtenerUsuarioActivoId(client, reqUsuario) {
  if (reqUsuario?.id) return reqUsuario.id;

  const res = await client.query(`SELECT id FROM usuarios ORDER BY id ASC LIMIT 1`);
  if (res.rowCount > 0) return res.rows[0].id;

  const creado = await client.query(
    `INSERT INTO usuarios (nick, email, password_hash, ciclo_actual_id)
     VALUES ('alumno_demo', 'alumno@examendev.local', 'demo_hash', 'dam')
     RETURNING id`
  );
  return creado.rows[0].id;
}

// POST /partidas -> Crea una nueva partida (práctica, simulacro, repaso o trivia)
export async function crearPartida(req, res) {
  const client = await pool.connect();
  try {
    const usuarioId = await obtenerUsuarioActivoId(client, req.usuario);
    const { modulo_id, certificacion_id, modo } = req.body;

    const resultado = await client.query(
      `INSERT INTO partidas (usuario_id, modulo_id, certificacion_id, modo)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [usuarioId, modulo_id ?? null, certificacion_id ?? null, modo]
    );

    return res.status(201).json(resultado.rows[0]);
  } catch (err) {
    console.error('Error en crearPartida:', err);
    return res.status(500).json({ error: 'Error al iniciar la partida' });
  } finally {
    client.release();
  }
}

// POST /respuestas -> Endpoint clave del PDF (Página 3)
// Envía una respuesta; el servidor valida si es correcta y devuelve los puntos y la explicación
export async function enviarRespuesta(req, res) {
  const client = await pool.connect();
  try {
    const usuarioId = await obtenerUsuarioActivoId(client, req.usuario);
    const { partida_id, pregunta_id, opcion_id } = req.body;

    await client.query('BEGIN');

    // 1. Verificar que la partida existe y pertenece al usuario
    const resPartida = await client.query(
      'SELECT * FROM partidas WHERE id = $1 AND usuario_id = $2',
      [partida_id, usuarioId]
    );
    if (resPartida.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Partida no encontrada para este usuario' });
    }
    const partida = resPartida.rows[0];

    // 2. Evitar responder dos veces la misma pregunta en la misma partida
    const yaRespondida = await client.query(
      'SELECT id FROM respuestas WHERE partida_id = $1 AND pregunta_id = $2',
      [partida_id, pregunta_id]
    );
    if (yaRespondida.rowCount > 0) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: 'Esta pregunta ya fue respondida en esta partida' });
    }

    // 3. Buscar la pregunta y su opción correcta en el servidor
    const resPregunta = await client.query(
      `SELECT p.id, p.explicacion, p.tema_id,
              (SELECT o.id FROM opciones o WHERE o.pregunta_id = p.id AND o.es_correcta = TRUE LIMIT 1) AS opcion_correcta_id
       FROM preguntas p
       WHERE p.id = $1`,
      [pregunta_id]
    );

    if (resPregunta.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Pregunta no encontrada' });
    }

    const { explicacion, opcion_correcta_id } = resPregunta.rows[0];
    const es_correcta = opcion_id != null && Number(opcion_id) === Number(opcion_correcta_id);

    // 4. Calcular puntos (+5 acierto, -2 fallo, 0 si la dejó en blanco)
    let puntos_sumados = 0;
    if (opcion_id != null) {
      puntos_sumados = es_correcta ? PUNTOS_POR_ACIERTO : DESCUENTO_POR_FALLO;
    }

    // Si estaba en modo 'repaso' y la acierta, marcar sus fallos previos de esta pregunta como dominados
    const dominada = partida.modo === 'repaso' && es_correcta;
    if (dominada) {
      await client.query(
        `UPDATE respuestas
         SET dominada = TRUE
         WHERE usuario_id = $1 AND pregunta_id = $2`,
        [usuarioId, pregunta_id]
      );
    }

    // 5. Registrar la respuesta en la tabla 'respuestas'
    const resRespuesta = await client.query(
      `INSERT INTO respuestas (partida_id, usuario_id, pregunta_id, opcion_id, es_correcta, puntos_sumados, dominada)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, respondida_en`,
      [partida_id, usuarioId, pregunta_id, opcion_id ?? null, es_correcta, puntos_sumados, dominada]
    );

    // 6. Actualizar contadores de la partida
    const nuevosPuntosPartida = Math.max(0, partida.puntos_obtenidos + puntos_sumados);
    const resPartidaActualizada = await client.query(
      `UPDATE partidas
       SET aciertos = aciertos + $1,
           fallos = fallos + $2,
           puntos_obtenidos = $3
       WHERE id = $4
       RETURNING aciertos, fallos, puntos_obtenidos`,
      [es_correcta ? 1 : 0, !es_correcta && opcion_id != null ? 1 : 0, nuevosPuntosPartida, partida_id]
    );

    // 7. Actualizar racha y puntos totales del usuario
    const resUsuario = await client.query(
      `UPDATE usuarios
       SET puntos_totales = GREATEST(0, puntos_totales + $1),
           racha_actual = CASE WHEN $2 THEN racha_actual + 1 ELSE 0 END,
           mejor_racha = CASE
             WHEN $2 AND (racha_actual + 1) > mejor_racha THEN racha_actual + 1
             ELSE mejor_racha
           END
       WHERE id = $3
       RETURNING puntos_totales, racha_actual, mejor_racha`,
      [puntos_sumados, es_correcta, usuarioId]
    );

    // 8. Actualizar tabla ranking (Global, por módulo/certificación y semanal)
    const semanaActual = obtenerTemporadaSemanal();
    // Ranking Global total
    await actualizarFilaRanking(client, {
      usuarioId,
      moduloId: null,
      certificacionId: null,
      temporada: 'GLOBAL',
      puntosDelta: puntos_sumados,
      sumarPartida: false,
    });
    // Ranking por Módulo o Certificación
    if (partida.modulo_id || partida.certificacion_id) {
      await actualizarFilaRanking(client, {
        usuarioId,
        moduloId: partida.modulo_id,
        certificacionId: partida.certificacion_id,
        temporada: 'GLOBAL',
        puntosDelta: puntos_sumados,
        sumarPartida: false,
      });
    }
    // Ranking Semanal
    await actualizarFilaRanking(client, {
      usuarioId,
      moduloId: partida.modulo_id,
      certificacionId: partida.certificacion_id,
      temporada: semanaActual,
      puntosDelta: puntos_sumados,
      sumarPartida: false,
    });

    await client.query('COMMIT');

    return res.status(201).json({
      respuesta_id: resRespuesta.rows[0].id,
      pregunta_id,
      opcion_elegida_id: opcion_id ?? null,
      es_correcta,
      opcion_correcta_id,
      explicacion,
      puntos_sumados,
      partida: resPartidaActualizada.rows[0],
      usuario: resUsuario.rows[0],
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error en enviarRespuesta:', err);
    return res.status(500).json({ error: 'Error al validar la respuesta en el servidor' });
  } finally {
    client.release();
  }
}

// PATCH /partidas/:id/finalizar -> Cierra la partida y guarda el tiempo empleado
export async function finalizarPartida(req, res) {
  try {
    const usuarioId = req.usuario.id;
    const partidaId = Number(req.params.id);
    const { tiempo_segundos } = req.body;

    const resultado = await query(
      `UPDATE partidas
       SET finalizada = TRUE,
           tiempo_segundos = $1
       WHERE id = $2 AND usuario_id = $3
       RETURNING *`,
      [tiempo_segundos, partidaId, usuarioId]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ error: 'Partida no encontrada' });
    }

    return res.json(resultado.rows[0]);
  } catch (err) {
    console.error('Error en finalizarPartida:', err);
    return res.status(500).json({ error: 'Error al finalizar la partida' });
  }
}

// GET /respuestas/fallos -> Lista las preguntas falladas pendientes de dominar por el alumno
export async function getFallosPendientes(req, res) {
  try {
    const usuarioId = req.usuario.id;
    const { modulo_id } = req.query;
    const params = [usuarioId];
    let filtroModulo = '';

    if (modulo_id) {
      params.push(modulo_id);
      filtroModulo = `AND p.modulo_id = $2`;
    }

    const sql = `
      SELECT
        p.id AS pregunta_id,
        p.modulo_id,
        p.tema_id,
        t.nombre AS tema_nombre,
        p.enunciado,
        p.explicacion,
        COUNT(*) FILTER (WHERE r.es_correcta = FALSE)::int AS veces_fallada,
        COUNT(*) FILTER (WHERE r.es_correcta = TRUE)::int AS aciertos_despues,
        MAX(r.respondida_en) AS ultima_fecha
      FROM respuestas r
      JOIN preguntas p ON p.id = r.pregunta_id
      JOIN temas t ON t.id = p.tema_id
      WHERE r.usuario_id = $1
        AND r.dominada = FALSE
        ${filtroModulo}
      GROUP BY p.id, t.nombre
      HAVING COUNT(*) FILTER (WHERE r.es_correcta = FALSE) > 0
      ORDER BY ultima_fecha DESC
    `;

    const resultado = await query(sql, params);
    return res.json(resultado.rows);
  } catch (err) {
    console.error('Error en getFallosPendientes:', err);
    return res.status(500).json({ error: 'Error al obtener la lista de fallos' });
  }
}

// PATCH /respuestas/dominar/:preguntaId -> Botón "Ya la domino"
export async function marcarDominada(req, res) {
  const client = await pool.connect();
  try {
    const usuarioId = await obtenerUsuarioActivoId(client, req.usuario);
    const { preguntaId } = req.params;

    await client.query(
      `UPDATE respuestas
       SET dominada = TRUE
       WHERE usuario_id = $1 AND pregunta_id = $2`,
      [usuarioId, preguntaId]
    );

    return res.json({ mensaje: 'Pregunta marcada como dominada', pregunta_id: preguntaId });
  } catch (err) {
    console.error('Error en marcarDominada:', err);
    return res.status(500).json({ error: 'Error al marcar la pregunta como dominada' });
  } finally {
    client.release();
  }
}

// POST /progreso/intento -> Guarda un test completo realizado desde el frontend en PostgreSQL
// (Inserta en partidas, respuestas, actualiza usuarios y ranking)
export async function guardarIntentoCompleto(req, res) {
  const client = await pool.connect();
  try {
    const usuarioId = await obtenerUsuarioActivoId(client, req.usuario);
    const { moduloId, modo, preguntas, respuestas, segundos } = req.body;

    await client.query('BEGIN');

    let aciertos = 0;
    let fallos = 0;
    let puntosPartida = 0;

    const resPartida = await client.query(
      `INSERT INTO partidas (usuario_id, modulo_id, modo, tiempo_segundos, finalizada)
       VALUES ($1, $2, $3, $4, TRUE)
       RETURNING id, fecha`,
      [usuarioId, moduloId, modo, segundos ?? 0]
    );
    const partidaId = resPartida.rows[0].id;

    for (let i = 0; i < preguntas.length; i++) {
      const p = preguntas[i];
      const indiceElegido = respuestas[i];
      const textoElegido = indiceElegido !== null && indiceElegido !== undefined ? p.opciones[indiceElegido] : null;
      const esCorrecta = indiceElegido === p.correcta;

      let puntosDelta = 0;
      if (indiceElegido !== null && indiceElegido !== undefined) {
        if (esCorrecta) {
          aciertos++;
          puntosDelta = PUNTOS_POR_ACIERTO;
        } else {
          fallos++;
          puntosDelta = DESCUENTO_POR_FALLO;
        }
      } else {
        fallos++;
      }
      puntosPartida += puntosDelta;

      // Buscar el opcion_id real en PostgreSQL según el texto de la opción elegida
      let opcionId = null;
      if (textoElegido !== null) {
        const resOp = await client.query(
          `SELECT id FROM opciones WHERE pregunta_id = $1 AND texto = $2 LIMIT 1`,
          [p.id, textoElegido]
        );
        if (resOp.rowCount > 0) opcionId = resOp.rows[0].id;
      }

      const dominada = modo === 'repaso' && esCorrecta;
      if (dominada) {
        await client.query(
          `UPDATE respuestas SET dominada = TRUE WHERE usuario_id = $1 AND pregunta_id = $2`,
          [usuarioId, p.id]
        );
      }

      await client.query(
        `INSERT INTO respuestas (partida_id, usuario_id, pregunta_id, opcion_id, es_correcta, puntos_sumados, dominada)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [partidaId, usuarioId, p.id, opcionId, esCorrecta, puntosDelta, dominada]
      );
    }

    puntosPartida = Math.max(0, puntosPartida);

    await client.query(
      `UPDATE partidas
       SET aciertos = $1, fallos = $2, puntos_obtenidos = $3
       WHERE id = $4`,
      [aciertos, fallos, puntosPartida, partidaId]
    );

    await client.query(
      `UPDATE usuarios
       SET puntos_totales = GREATEST(0, puntos_totales + $1),
           racha_actual = racha_actual + $2,
           mejor_racha = GREATEST(mejor_racha, racha_actual + $2)
       WHERE id = $3`,
      [puntosPartida, aciertos, usuarioId]
    );

    const semanaActual = obtenerTemporadaSemanal();
    await actualizarFilaRanking(client, {
      usuarioId,
      moduloId: null,
      certificacionId: null,
      temporada: 'GLOBAL',
      puntosDelta: puntosPartida,
      sumarPartida: true,
    });
    await actualizarFilaRanking(client, {
      usuarioId,
      moduloId,
      certificacionId: null,
      temporada: 'GLOBAL',
      puntosDelta: puntosPartida,
      sumarPartida: true,
    });
    await actualizarFilaRanking(client, {
      usuarioId,
      moduloId,
      certificacionId: null,
      temporada: semanaActual,
      puntosDelta: puntosPartida,
      sumarPartida: true,
    });

    await client.query('COMMIT');

    return res.status(201).json({
      id: String(partidaId),
      moduloId,
      modo,
      aciertos,
      total: preguntas.length,
      nota: preguntas.length ? (aciertos / preguntas.length) * 10 : 0,
      puntos_obtenidos: puntosPartida,
      segundos: segundos ?? 0,
      fecha: resPartida.rows[0].fecha,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error en guardarIntentoCompleto:', err);
    return res.status(500).json({ error: 'Error al guardar el intento en PostgreSQL' });
  } finally {
    client.release();
  }
}

// GET /progreso -> Devuelve el historial de intentos y fallos del usuario desde PostgreSQL
export async function getProgresoUsuario(req, res) {
  const client = await pool.connect();
  try {
    const usuarioId = await obtenerUsuarioActivoId(client, req.usuario);

    const resPartidas = await client.query(
      `SELECT
         id::text AS id,
         modulo_id AS "moduloId",
         modo,
         aciertos,
         (aciertos + fallos) AS total,
         CASE WHEN (aciertos + fallos) > 0
           THEN ROUND((aciertos::numeric / (aciertos + fallos)) * 10, 2)::float
           ELSE 0
         END AS nota,
         tiempo_segundos AS segundos,
         fecha
       FROM partidas
       WHERE usuario_id = $1 AND finalizada = TRUE AND modulo_id IS NOT NULL
       ORDER BY fecha DESC
       LIMIT 200`,
      [usuarioId]
    );

    const resFallos = await client.query(
      `SELECT
         r.pregunta_id,
         COUNT(*) FILTER (WHERE r.es_correcta = FALSE)::int AS veces,
         (
           SELECT o.texto
           FROM respuestas r2
           LEFT JOIN opciones o ON o.id = r2.opcion_id
           WHERE r2.usuario_id = $1 AND r2.pregunta_id = r.pregunta_id AND r2.es_correcta = FALSE
           ORDER BY r2.respondida_en DESC
           LIMIT 1
         ) AS "ultimaRespuesta",
         MAX(r.respondida_en) FILTER (WHERE r.es_correcta = FALSE) AS fecha,
         COUNT(*) FILTER (
           WHERE r.es_correcta = TRUE
             AND r.respondida_en > COALESCE((
               SELECT MAX(r3.respondida_en) FROM respuestas r3
               WHERE r3.usuario_id = $1 AND r3.pregunta_id = r.pregunta_id AND r3.es_correcta = FALSE
             ), '1970-01-01')
         )::int AS "aciertosDespues",
         MAX(r.respondida_en) FILTER (WHERE r.es_correcta = TRUE) AS "ultimoAcierto"
       FROM respuestas r
       WHERE r.usuario_id = $1 AND r.dominada = FALSE
       GROUP BY r.pregunta_id
       HAVING COUNT(*) FILTER (WHERE r.es_correcta = FALSE) > 0`,
      [usuarioId]
    );

    const fallosMap = {};
    for (const f of resFallos.rows) {
      fallosMap[f.pregunta_id] = {
        veces: f.veces,
        ultimaRespuesta: f.ultimaRespuesta,
        fecha: f.fecha,
        aciertosDespues: f.aciertosDespues,
        ultimoAcierto: f.ultimoAcierto,
      };
    }

    return res.json({
      intentos: resPartidas.rows,
      fallos: fallosMap,
    });
  } catch (err) {
    console.error('Error en getProgresoUsuario:', err);
    return res.status(500).json({ error: 'Error al cargar el progreso desde PostgreSQL' });
  } finally {
    client.release();
  }
}

// DELETE /progreso -> Reinicia el progreso del usuario en PostgreSQL
export async function reiniciarProgresoUsuario(req, res) {
  const client = await pool.connect();
  try {
    const usuarioId = await obtenerUsuarioActivoId(client, req.usuario);
    await client.query('BEGIN');
    await client.query('DELETE FROM respuestas WHERE usuario_id = $1', [usuarioId]);
    await client.query('DELETE FROM partidas WHERE usuario_id = $1', [usuarioId]);
    await client.query('DELETE FROM ranking WHERE usuario_id = $1', [usuarioId]);
    await client.query(
      'UPDATE usuarios SET puntos_totales = 0, racha_actual = 0, mejor_racha = 0 WHERE id = $1',
      [usuarioId]
    );
    await client.query('COMMIT');
    return res.json({ mensaje: 'Progreso reiniciado en PostgreSQL' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error en reiniciarProgresoUsuario:', err);
    return res.status(500).json({ error: 'Error al reiniciar el progreso' });
  } finally {
    client.release();
  }
}

// POST /puntuaciones -> Guarda una partida de Trivia y actualiza puntos/ranking en PostgreSQL (docs/API.md)
export async function guardarPuntuacionTrivia(req, res) {
  const client = await pool.connect();
  try {
    const usuarioId = req.usuario.id;
    const { moduloId, puntos, aciertos, total, rachaMax, segundos } = req.body;
    const fallos = Math.max(0, total - aciertos);

    await client.query('BEGIN');

    const resPartida = await client.query(
      `INSERT INTO partidas (usuario_id, modulo_id, modo, aciertos, fallos, puntos_obtenidos, racha_max, tiempo_segundos, finalizada)
       VALUES ($1, $2, 'trivia', $3, $4, $5, $6, $7, TRUE)
       RETURNING id, modulo_id, puntos_obtenidos, aciertos, fallos, racha_max, tiempo_segundos, fecha`,
      [usuarioId, moduloId, aciertos, fallos, puntos, rachaMax ?? 0, segundos ?? 0]
    );

    await client.query(
      `UPDATE usuarios
       SET puntos_totales = puntos_totales + $1,
           racha_actual = $2,
           mejor_racha = GREATEST(mejor_racha, $2)
       WHERE id = $3`,
      [puntos, rachaMax ?? 0, usuarioId]
    );

    const semanaActual = obtenerTemporadaSemanal();
    await actualizarFilaRanking(client, {
      usuarioId,
      moduloId: null,
      certificacionId: null,
      temporada: 'GLOBAL',
      puntosDelta: puntos,
      sumarPartida: true,
    });
    await actualizarFilaRanking(client, {
      usuarioId,
      moduloId,
      certificacionId: null,
      temporada: 'GLOBAL',
      puntosDelta: puntos,
      sumarPartida: true,
    });
    await actualizarFilaRanking(client, {
      usuarioId,
      moduloId,
      certificacionId: null,
      temporada: semanaActual,
      puntosDelta: puntos,
      sumarPartida: true,
    });

    const resPos = await client.query(
      `SELECT posicion FROM (
         SELECT usuario_id,
                ROW_NUMBER() OVER (ORDER BY SUM(puntos_obtenidos) DESC, MAX(racha_max) DESC)::int AS posicion
         FROM partidas
         WHERE finalizada = TRUE
         GROUP BY usuario_id
       ) t WHERE usuario_id = $1`,
      [usuarioId]
    );

    await client.query('COMMIT');

    const fila = resPartida.rows[0];
    const partida = {
      id: String(fila.id),
      moduloId: fila.modulo_id,
      puntos: Number(fila.puntos_obtenidos),
      aciertos: Number(fila.aciertos),
      total: Number(fila.aciertos + fila.fallos),
      rachaMax: Number(fila.racha_max),
      segundos: Number(fila.tiempo_segundos),
      fecha: fila.fecha ? new Date(fila.fecha).toISOString() : new Date().toISOString(),
    };

    return res.status(201).json({
      partida,
      posicionGlobal: resPos.rows[0]?.posicion ?? 1,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error en guardarPuntuacionTrivia:', err);
    return res.status(500).json({
      mensaje: 'Error al guardar la puntuación en el servidor',
      error: 'Error al guardar la puntuación en el servidor',
    });
  } finally {
    client.release();
  }
}
