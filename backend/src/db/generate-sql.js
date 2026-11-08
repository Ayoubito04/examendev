import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CICLOS, MODULOS, PREGUNTAS } from '../../../frontend/src/data/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const esc = (str) => {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
};

async function generateSql() {
  const lines = [];
  lines.push('-- =====================================================================');
  lines.push('-- VOLCADO COMPLETO DE DATOS INICIALES PARA POSTGRESQL (EXAMENDEV)');
  lines.push('-- Incluye: 4 Ciclos, 31 Módulos, 155 Temas, Certificaciones,');
  lines.push('--          620 Preguntas y 2.480 Opciones desde frontend/src/data');
  lines.push('-- =====================================================================');
  lines.push('BEGIN;');
  lines.push('');
  lines.push('TRUNCATE TABLE respuestas, partidas, ranking, opciones, preguntas, temas, ciclo_modulo, certificaciones, modulos, ciclos RESTART IDENTITY CASCADE;');
  lines.push('');

  // 1. Ciclos
  lines.push('-- 1. CICLOS');
  lines.push('INSERT INTO ciclos (id, sigla, nombre, grado, activo) VALUES');
  lines.push(
    CICLOS.map((c) => {
      const activo = c.id === 'dam' || c.id === 'daw' ? 'TRUE' : 'FALSE';
      return `(${esc(c.id)}, ${esc(c.sigla)}, ${esc(c.nombre)}, ${esc(c.grado)}, ${activo})`;
    }).join(',\n') + ';'
  );
  lines.push('');

  // 2. Módulos
  lines.push('-- 2. MÓDULOS');
  lines.push('INSERT INTO modulos (id, nombre, descripcion, activo) VALUES');
  lines.push(
    MODULOS.map((m) => {
      const activo = m.ciclos.includes('DAM') || m.ciclos.includes('DAW') ? 'TRUE' : 'FALSE';
      return `(${esc(m.id)}, ${esc(m.nombre)}, ${esc(m.descripcion)}, ${activo})`;
    }).join(',\n') + ';'
  );
  lines.push('');

  // 3. Ciclo_Modulo
  lines.push('-- 3. RELACIÓN CICLO_MODULO (1º y 2º CURSO)');
  lines.push('INSERT INTO ciclo_modulo (ciclo_id, modulo_id, curso) VALUES');
  const cmRows = [];
  for (const m of MODULOS) {
    for (const sigla of m.ciclos) {
      cmRows.push(`(${esc(sigla.toLowerCase())}, ${esc(m.id)}, ${m.curso})`);
    }
  }
  lines.push(cmRows.join(',\n') + ';');
  lines.push('');

  // 4. Certificaciones
  lines.push('-- 4. CERTIFICACIONES');
  lines.push('INSERT INTO certificaciones (id, codigo_examen, nombre, proveedor, nivel, tiempo_minutos, nota_aprobado, descripcion, activo) VALUES');
  lines.push(
    [
      `('az-900', 'AZ-900', 'Microsoft Certified: Azure Fundamentals', 'Microsoft', 'Fundamentals', 45, 700, 'Conceptos de la nube, arquitectura y servicios de Azure, administración y gobernanza.', FALSE)`,
      `('sc-900', 'SC-900', 'Microsoft Certified: Security, Compliance, and Identity Fundamentals', 'Microsoft', 'Fundamentals', 45, 700, 'Conceptos de seguridad, Microsoft Entra ID, soluciones de seguridad y cumplimiento.', FALSE)`,
      `('dp-900', 'DP-900', 'Microsoft Certified: Azure Data Fundamentals', 'Microsoft', 'Fundamentals', 45, 700, 'Datos relacionales y no relacionales, cargas de trabajo transaccionales y analíticas en Azure.', FALSE)`,
      `('ms-900', 'MS-900', 'Microsoft 365 Certified: Fundamentals', 'Microsoft', 'Fundamentals', 45, 700, 'Aplicaciones en la nube de Microsoft 365, seguridad, cumplimiento, precios y soporte.', FALSE)`,
      `('ai-900', 'AI-900', 'Microsoft Certified: Azure AI Fundamentals', 'Microsoft', 'Fundamentals', 45, 700, 'Cargas de trabajo de IA, Machine Learning, visión artificial y lenguaje natural en Azure.', FALSE)`,
    ].join(',\n') + ';'
  );
  lines.push('');

  // 5. Temas
  lines.push('-- 5. TEMAS (155 TEMAS)');
  lines.push('INSERT INTO temas (id, modulo_id, orden, nombre) VALUES');
  const temaRows = [];
  const mapaTemasPorModulo = {};
  let temaIdCounter = 1;

  for (const m of MODULOS) {
    mapaTemasPorModulo[m.id] = [];
    for (let i = 0; i < m.temas.length; i++) {
      const id = temaIdCounter++;
      const nombre = m.temas[i];
      mapaTemasPorModulo[m.id].push({ id, orden: i + 1, nombre });
      temaRows.push(`(${id}, ${esc(m.id)}, ${i + 1}, ${esc(nombre)})`);
    }
  }
  lines.push(temaRows.join(',\n') + ';');
  lines.push(`SELECT setval('temas_id_seq', ${temaIdCounter - 1}, true);`);
  lines.push('');

  // 6. Preguntas y Opciones
  lines.push('-- 6. PREGUNTAS (620 PREGUNTAS)');
  lines.push('INSERT INTO preguntas (id, modulo_id, tema_id, enunciado, explicacion, dificultad, activa) VALUES');
  const pregRows = [];
  const opcRows = [];

  for (const [moduloId, listaPreguntas] of Object.entries(PREGUNTAS)) {
    const temasDelModulo = mapaTemasPorModulo[moduloId];
    for (let i = 0; i < listaPreguntas.length; i++) {
      const p = listaPreguntas[i];
      let temaElegido = temasDelModulo[i % temasDelModulo.length];
      if (typeof p.tema === 'number' && temasDelModulo[p.tema]) {
        temaElegido = temasDelModulo[p.tema];
      } else if (typeof p.tema === 'string') {
        const encontrado = temasDelModulo.find(
          (t) => t.nombre.toLowerCase() === p.tema.toLowerCase()
        );
        if (encontrado) temaElegido = encontrado;
      }

      pregRows.push(
        `(${esc(p.id)}, ${esc(moduloId)}, ${temaElegido.id}, ${esc(p.enunciado)}, ${esc(p.explicacion)}, 'media', TRUE)`
      );

      for (let idxOp = 0; idxOp < p.opciones.length; idxOp++) {
        const esCorrecta = idxOp === p.correcta ? 'TRUE' : 'FALSE';
        opcRows.push(`(${esc(p.id)}, ${esc(p.opciones[idxOp])}, ${esCorrecta})`);
      }
    }
  }

  lines.push(pregRows.join(',\n') + ';');
  lines.push('');

  lines.push('-- 7. OPCIONES (2.480 OPCIONES)');
  lines.push('INSERT INTO opciones (pregunta_id, texto, es_correcta) VALUES');
  lines.push(opcRows.join(',\n') + ';');
  lines.push('');
  lines.push('COMMIT;');

  const outPath = path.join(__dirname, 'seed_data.sql');
  await fs.writeFile(outPath, lines.join('\n'), 'utf-8');
  console.log(`Archivo generado: ${outPath}`);
}

generateSql();
