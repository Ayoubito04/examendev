import { Router } from 'express';
import { query } from '../db/pool.js';

const router = Router();

const TABLAS_PERMITIDAS = [
  'usuarios',
  'partidas',
  'respuestas',
  'ranking',
  'modulos',
  'temas',
  'preguntas',
  'opciones',
  'ciclos',
  'ciclo_modulo',
  'certificaciones',
];

// GET /studio/datos -> Devuelve contadores de todas las tablas y las filas de la tabla seleccionada en tiempo real
router.get('/datos', async (req, res) => {
  try {
    const tabla = TABLAS_PERMITIDAS.includes(req.query.tabla) ? req.query.tabla : 'partidas';
    const limite = Math.min(Math.max(Number(req.query.limite) || 100, 10), 500);
    const buscar = (req.query.q || '').trim();

    const resContadores = await query(`
      SELECT
        (SELECT COUNT(*)::int FROM usuarios) AS usuarios,
        (SELECT COUNT(*)::int FROM partidas) AS partidas,
        (SELECT COUNT(*)::int FROM respuestas) AS respuestas,
        (SELECT COUNT(*)::int FROM ranking) AS ranking,
        (SELECT COUNT(*)::int FROM modulos) AS modulos,
        (SELECT COUNT(*)::int FROM temas) AS temas,
        (SELECT COUNT(*)::int FROM preguntas) AS preguntas,
        (SELECT COUNT(*)::int FROM opciones) AS opciones,
        (SELECT COUNT(*)::int FROM ciclos) AS ciclos,
        (SELECT COUNT(*)::int FROM certificaciones) AS certificaciones
    `);

    let sqlFilas = '';
    const params = [];

    if (tabla === 'partidas') {
      sqlFilas = `
        SELECT p.id, u.nick AS usuario, p.modulo_id, p.modo, p.aciertos, p.fallos,
               p.puntos_obtenidos, p.racha_max, p.tiempo_segundos, p.finalizada, p.fecha
        FROM partidas p
        LEFT JOIN usuarios u ON u.id = p.usuario_id
        ORDER BY p.id DESC
        LIMIT $1
      `;
      params.push(limite);
    } else if (tabla === 'respuestas') {
      sqlFilas = `
        SELECT r.id, r.partida_id, u.nick AS usuario, r.pregunta_id,
               r.es_correcta, r.puntos_sumados, r.dominada, r.respondida_en
        FROM respuestas r
        LEFT JOIN usuarios u ON u.id = r.usuario_id
        ORDER BY r.id DESC
        LIMIT $1
      `;
      params.push(limite);
    } else if (tabla === 'ranking') {
      sqlFilas = `
        SELECT rk.id, u.nick AS usuario, COALESCE(rk.modulo_id, 'TODOS') AS modulo,
               rk.temporada, rk.puntos, rk.partidas_jugadas, rk.updated_at
        FROM ranking rk
        LEFT JOIN usuarios u ON u.id = rk.usuario_id
        ORDER BY rk.puntos DESC, rk.id DESC
        LIMIT $1
      `;
      params.push(limite);
    } else if (tabla === 'usuarios') {
      sqlFilas = `
        SELECT id, nick, email, avatar_url AS avatar, ciclo_actual_id AS ciclo,
               puntos_totales, racha_actual, mejor_racha, created_at
        FROM usuarios
        ORDER BY id DESC
        LIMIT $1
      `;
      params.push(limite);
    } else if (tabla === 'modulos') {
      sqlFilas = `
        SELECT m.id, m.nombre,
               (SELECT COUNT(*)::int FROM temas t WHERE t.modulo_id = m.id) AS temas,
               (SELECT COUNT(*)::int FROM preguntas p WHERE p.modulo_id = m.id) AS preguntas,
               (m.hoja_ruta_md IS NOT NULL) AS tiene_hoja_ruta,
               m.activo
        FROM modulos m
        ORDER BY m.id ASC
        LIMIT $1
      `;
      params.push(limite);
    } else if (tabla === 'preguntas') {
      if (buscar) {
        sqlFilas = `
          SELECT id, modulo_id, tema_id, LEFT(enunciado, 140) AS enunciado, dificultad, activa
          FROM preguntas
          WHERE id ILIKE $2 OR modulo_id ILIKE $2 OR enunciado ILIKE $2
          ORDER BY id ASC
          LIMIT $1
        `;
        params.push(limite, `%${buscar}%`);
      } else {
        sqlFilas = `
          SELECT id, modulo_id, tema_id, LEFT(enunciado, 140) AS enunciado, dificultad, activa
          FROM preguntas
          ORDER BY id ASC
          LIMIT $1
        `;
        params.push(limite);
      }
    } else {
      sqlFilas = `SELECT * FROM ${tabla} LIMIT $1`;
      params.push(limite);
    }

    const resFilas = await query(sqlFilas, params);

    return res.json({
      timestamp: new Date().toISOString(),
      tabla,
      contadores: resContadores.rows[0],
      filas: resFilas.rows,
    });
  } catch (err) {
    console.error('Error en /studio/datos:', err);
    return res.status(500).json({ error: err.message });
  }
});

// GET /studio -> Interfaz web tipo Prisma Studio en tiempo real para PostgreSQL
router.get('/', (_req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ExamenDev DB Studio · PostgreSQL en Tiempo Real</title>
  <style>
    :root {
      --bg: #0b0f17;
      --panel: #131b2e;
      --panel-hover: #1c2742;
      --border: #26334d;
      --text: #e2e8f0;
      --muted: #94a3b8;
      --accent: #38bdf8;
      --ok: #22c55e;
      --ko: #ef4444;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      padding: 16px 24px;
      background: var(--panel);
      border-bottom: 1px solid var(--border);
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--ok);
      box-shadow: 0 0 10px var(--ok);
    }
    h1 {
      font-size: 1.15rem;
      margin: 0;
    }
    .controls {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.875rem;
    }
    input[type="search"], select, button {
      background: var(--bg);
      color: var(--text);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 7px 12px;
      font-size: 0.875rem;
    }
    button {
      cursor: pointer;
      background: var(--accent);
      color: #090d16;
      font-weight: 600;
      border: none;
    }
    .layout {
      display: grid;
      grid-template-columns: 240px 1fr;
      min-height: calc(100vh - 65px);
    }
    aside {
      background: var(--panel);
      border-right: 1px solid var(--border);
      padding: 16px 12px;
    }
    .sidebar-title {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--muted);
      margin: 0 8px 10px;
    }
    .tab-btn {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: transparent;
      color: var(--text);
      padding: 9px 12px;
      border-radius: 6px;
      margin-bottom: 4px;
      font-weight: 500;
      text-align: left;
    }
    .tab-btn:hover { background: var(--panel-hover); }
    .tab-btn.active {
      background: rgba(56, 189, 248, 0.16);
      color: var(--accent);
      border: 1px solid rgba(56, 189, 248, 0.35);
    }
    .badge {
      background: var(--bg);
      color: var(--muted);
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 0.75rem;
      font-variant-numeric: tabular-nums;
    }
    main {
      padding: 20px 24px;
      overflow-x: auto;
    }
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
      gap: 12px;
      flex-wrap: wrap;
    }
    .status {
      font-size: 0.85rem;
      color: var(--muted);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
      font-size: 0.85rem;
    }
    th, td {
      padding: 10px 12px;
      border-bottom: 1px solid var(--border);
      text-align: left;
      white-space: nowrap;
      max-width: 420px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    th {
      background: #0f1626;
      color: var(--muted);
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.73rem;
      letter-spacing: 0.05em;
    }
    tr:hover td { background: var(--panel-hover); }
    .pill-true { color: var(--ok); font-weight: 600; }
    .pill-false { color: var(--ko); font-weight: 600; }
    .empty {
      padding: 40px;
      text-align: center;
      color: var(--muted);
      background: var(--panel);
      border-radius: 8px;
      border: 1px dashed var(--border);
    }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <span class="dot"></span>
      <h1>ExamenDev DB Studio · PostgreSQL en Tiempo Real</h1>
    </div>
    <div class="controls">
      <input type="search" id="buscador" placeholder="Buscar en preguntas (id, módulo, texto)..." />
      <label>
        <input type="checkbox" id="autoRefresh" checked />
        Tiempo real (cada 2s)
      </label>
      <button type="button" id="btnRefrescar">Actualizar ahora</button>
    </div>
  </header>
  <div class="layout">
    <aside>
      <p class="sidebar-title">Tablas de PostgreSQL</p>
      <div id="listaTablas"></div>
    </aside>
    <main>
      <div class="toolbar">
        <strong id="tituloTabla">Tabla: partidas</strong>
        <span class="status" id="estadoActualizacion">Conectando con PostgreSQL...</span>
      </div>
      <div id="contenedorTabla"></div>
    </main>
  </div>

  <script>
    const TABLAS = [
      { id: 'usuarios', nombre: '👤 usuarios' },
      { id: 'partidas', nombre: '🎮 partidas (tests/trivia)' },
      { id: 'respuestas', nombre: '✅ respuestas (por pregunta)' },
      { id: 'ranking', nombre: '🏆 ranking' },
      { id: 'modulos', nombre: '📚 modulos' },
      { id: 'temas', nombre: '🗂️ temas' },
      { id: 'preguntas', nombre: '❓ preguntas' },
      { id: 'opciones', nombre: '🔘 opciones' },
      { id: 'ciclos', nombre: '🎓 ciclos' },
      { id: 'certificaciones', nombre: '🏅 certificaciones' }
    ];

    let tablaActual = 'partidas';
    const listaTablasEl = document.getElementById('listaTablas');
    const contenedorTablaEl = document.getElementById('contenedorTabla');
    const tituloTablaEl = document.getElementById('tituloTabla');
    const estadoEl = document.getElementById('estadoActualizacion');
    const buscadorEl = document.getElementById('buscador');
    const autoRefreshEl = document.getElementById('autoRefresh');

    function renderizarMenu(contadores = {}) {
      listaTablasEl.innerHTML = TABLAS.map(t => {
        const activo = t.id === tablaActual ? 'active' : '';
        const total = contadores[t.id] ?? '—';
        return '<button class="tab-btn ' + activo + '" data-tabla="' + t.id + '">' +
          '<span>' + t.nombre + '</span>' +
          '<span class="badge">' + total + '</span>' +
        '</button>';
      }).join('');

      listaTablasEl.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          tablaActual = btn.dataset.tabla;
          cargarDatos();
        });
      });
    }

    function formatearCelda(valor) {
      if (valor === null || valor === undefined) return '<span style="color:#64748b">NULL</span>';
      if (typeof valor === 'boolean') {
        return valor ? '<span class="pill-true">true</span>' : '<span class="pill-false">false</span>';
      }
      return String(valor)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    async function cargarDatos() {
      try {
        const q = encodeURIComponent(buscadorEl.value || '');
        const res = await fetch('/studio/datos?tabla=' + tablaActual + '&q=' + q);
        const datos = await res.json();
        renderizarMenu(datos.contadores);
        tituloTablaEl.textContent = 'Tabla: ' + datos.tabla + ' (' + (datos.filas?.length ?? 0) + ' filas mostradas)';
        estadoEl.textContent = 'Última sincronización: ' + new Date(datos.timestamp).toLocaleTimeString('es-ES');

        if (!datos.filas || datos.filas.length === 0) {
          contenedorTablaEl.innerHTML = '<div class="empty">Esta tabla aún no tiene registros. Haz un test o juega una partida de Trivia para ver cómo entran los datos en directo.</div>';
          return;
        }

        const columnas = Object.keys(datos.filas[0]);
        const thead = '<thead><tr>' + columnas.map(c => '<th>' + c + '</th>').join('') + '</tr></thead>';
        const tbody = '<tbody>' + datos.filas.map(fila => {
          return '<tr>' + columnas.map(c => '<td>' + formatearCelda(fila[c]) + '</td>').join('') + '</tr>';
        }).join('') + '</tbody>';

        contenedorTablaEl.innerHTML = '<table>' + thead + tbody + '</table>';
      } catch (e) {
        estadoEl.textContent = 'Error conectando con PostgreSQL: ' + e.message;
      }
    }

    document.getElementById('btnRefrescar').addEventListener('click', cargarDatos);
    buscadorEl.addEventListener('input', () => {
      if (tablaActual !== 'preguntas') tablaActual = 'preguntas';
      cargarDatos();
    });

    cargarDatos();
    setInterval(() => {
      if (autoRefreshEl.checked) cargarDatos();
    }, 2000);
  </script>
</body>
</html>`);
});

export default router;
