import { query } from '../db/pool.js';

// GET /stats/temas -> Endpoint clave del PDF (Página 3)
// Devuelve el porcentaje de aciertos y el nivel ('fuerte', 'medio', 'debil') por tema del usuario
export async function getStatsTemas(req, res) {
  try {
    let usuarioId = req.usuario?.id;
    if (!usuarioId) {
      const u = await query('SELECT id FROM usuarios ORDER BY id ASC LIMIT 1');
      usuarioId = u.rows[0]?.id ?? 0;
    }
    const { modulo_id, certificacion_id } = req.queryValidado;
    const params = [usuarioId];
    const condiciones = [];

    if (modulo_id) {
      params.push(modulo_id);
      condiciones.push(`t.modulo_id = $${params.length}`);
    }
    if (certificacion_id) {
      params.push(certificacion_id);
      condiciones.push(`t.certificacion_id = $${params.length}`);
    }

    const whereSql = condiciones.length ? `WHERE ${condiciones.join(' AND ')}` : '';

    const sql = `
      SELECT
        t.id AS tema_id,
        t.modulo_id,
        m.nombre AS modulo_nombre,
        t.certificacion_id,
        t.orden,
        t.nombre AS tema_nombre,
        COUNT(r.id)::int AS respondidas,
        COUNT(r.id) FILTER (WHERE r.es_correcta = TRUE)::int AS aciertos,
        COUNT(r.id) FILTER (WHERE r.es_correcta = FALSE)::int AS fallos,
        CASE
          WHEN COUNT(r.id) = 0 THEN 0
          ELSE ROUND((COUNT(r.id) FILTER (WHERE r.es_correcta = TRUE)::numeric / COUNT(r.id)) * 100, 1)
        END AS porcentaje_acierto
      FROM temas t
      LEFT JOIN modulos m ON m.id = t.modulo_id
      LEFT JOIN preguntas p ON p.tema_id = t.id
      LEFT JOIN respuestas r ON r.pregunta_id = p.id AND r.usuario_id = $1
      ${whereSql}
      GROUP BY t.id, m.nombre
      ORDER BY t.modulo_id ASC NULLS LAST, t.orden ASC
    `;

    const resultado = await query(sql, params);

    const temasConNivel = resultado.rows.map((fila) => {
      const pct = Number(fila.porcentaje_acierto);
      let nivel = 'sin_datos';
      if (fila.respondidas > 0) {
        if (pct >= 75) nivel = 'fuerte';
        else if (pct >= 50) nivel = 'medio';
        else nivel = 'debil';
      }
      return {
        ...fila,
        porcentaje_acierto: pct,
        nivel,
      };
    });

    return res.json({
      temas: temasConNivel,
      resumen: {
        fuertes: temasConNivel.filter((t) => t.nivel === 'fuerte'),
        medios: temasConNivel.filter((t) => t.nivel === 'medio'),
        debiles: temasConNivel.filter((t) => t.nivel === 'debil'),
      },
    });
  } catch (err) {
    console.error('Error en getStatsTemas:', err);
    return res.status(500).json({ error: 'Error al calcular las estadísticas por tema' });
  }
}
