import { query } from '../db/pool.js';

function inicioDeSemana(ahora = new Date()) {
  const d = new Date(ahora);
  d.setHours(0, 0, 0, 0);
  const dia = (d.getDay() + 6) % 7; // lunes = 0
  d.setDate(d.getDate() - dia);
  return d;
}

// GET /ranking -> Soporta tanto el contrato de docs/API.md (filas, total, miPosicion)
// como el contrato del PDF (clasificacion)
export async function getRanking(req, res) {
  try {
    const {
      tipo,
      modulo_id,
      moduloId,
      ciclo,
      certificacion_id,
      limite,
    } = req.queryValidado;

    const modFiltro = moduloId || modulo_id || null;
    const params = [];
    const condiciones = ['p.finalizada = TRUE'];

    if (tipo === 'modulo' && modFiltro) {
      params.push(modFiltro);
      condiciones.push(`p.modulo_id = $${params.length}`);
    } else if (modFiltro) {
      params.push(modFiltro);
      condiciones.push(`p.modulo_id = $${params.length}`);
    }

    if (certificacion_id) {
      params.push(certificacion_id);
      condiciones.push(`p.certificacion_id = $${params.length}`);
    }

    if (tipo === 'semanal') {
      params.push(inicioDeSemana().toISOString());
      condiciones.push(`p.fecha >= $${params.length}`);
    }

    if (ciclo && tipo !== 'modulo') {
      params.push(ciclo.toLowerCase());
      condiciones.push(
        `EXISTS (SELECT 1 FROM ciclo_modulo cm WHERE cm.modulo_id = p.modulo_id AND cm.ciclo_id = $${params.length})`
      );
    }

    const sql = `
      SELECT
        u.id AS usuario_id,
        u.nick,
        u.avatar_url,
        u.ciclo_actual_id,
        COALESCE(SUM(p.puntos_obtenidos), 0)::int AS puntos,
        COUNT(p.id)::int AS partidas,
        GREATEST(u.mejor_racha, COALESCE(MAX(p.racha_max), 0))::int AS mejor_racha
      FROM partidas p
      JOIN usuarios u ON u.id = p.usuario_id
      WHERE ${condiciones.join(' AND ')}
      GROUP BY u.id
      ORDER BY puntos DESC, mejor_racha DESC
    `;

    const resultado = await query(sql, params);

    const todasLasFilas = resultado.rows.map((r, idx) => ({
      posicion: idx + 1,
      usuario_id: r.usuario_id,
      nick: r.nick,
      avatar_url: r.avatar_url || 'zorro',
      ciclo_actual_id: r.ciclo_actual_id,
      usuario: {
        id: String(r.usuario_id),
        nick: r.nick,
        avatar: r.avatar_url || 'zorro',
      },
      puntos: Number(r.puntos),
      partidas: Number(r.partidas),
      mejorRacha: Number(r.mejor_racha),
      mejor_racha: Number(r.mejor_racha),
    }));

    const usuarioLogueadoId = req.usuario?.id ? String(req.usuario.id) : null;
    const miPosicion = usuarioLogueadoId
      ? todasLasFilas.find((f) => f.usuario.id === usuarioLogueadoId) ?? null
      : null;

    const filasLimitadas = todasLasFilas.slice(0, limite);

    return res.json({
      tipo,
      modulo_id: modFiltro,
      filas: filasLimitadas,
      total: todasLasFilas.length,
      miPosicion,
      clasificacion: filasLimitadas,
    });
  } catch (err) {
    console.error('Error en getRanking:', err);
    return res.status(500).json({
      mensaje: 'Error al obtener el ranking',
      error: 'Error al obtener el ranking',
    });
  }
}
