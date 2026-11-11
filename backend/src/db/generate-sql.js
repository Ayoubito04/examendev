import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CICLOS, MODULOS, PREGUNTAS, SECCIONES, TODAS_LAS_PREGUNTAS } from '../../../frontend/src/data/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../../../');

export const ARCHIVOS_TEMARIOS = {
  cliente: 'temarios/2nd_DAW/desarrollo-web-entorno-cliente.md',
  servidor: 'temarios/2nd_DAW/desarrollo-web-entorno-servidor.md',
  despliegue: 'temarios/2nd_DAW/despliegue_de_aplicaciones_web.md',
  'interfaces-web': 'temarios/2nd_DAW/diseno-interfaces-web.md',
  sostenibilidad: 'temarios/sostenibilidad-sistema-productivo.md',
  digitalizacion: 'temarios/digitalizacion-sectores-productivos.md',
  ingles: 'temarios/ingles-profesional.md',
  'mpo-arquitectura-nube': 'temarios/mpo-ii-arquitectura-nube.md',
};

export async function cargarTemariosMarkdown() {
  const resultado = {};
  for (const [moduloId, relPath] of Object.entries(ARCHIVOS_TEMARIOS)) {
    try {
      const fullPath = path.join(ROOT_DIR, relPath);
      resultado[moduloId] = await fs.readFile(fullPath, 'utf-8');
    } catch {
      resultado[moduloId] = null;
    }
  }
  return resultado;
}

const esc = (str) => {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
};

async function generateSql() {
  const temariosMd = await cargarTemariosMarkdown();
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schemaSql = await fs.readFile(schemaPath, 'utf-8');

  const totalTemas = MODULOS.reduce((acc, m) => acc + m.temas.length, 0);
  const totalPreguntas = TODAS_LAS_PREGUNTAS.length;
  const totalOpciones = totalPreguntas * 4;

  const lines = [];
  lines.push('-- =====================================================================');
  lines.push('-- SEED GLOBAL AUTOCONTENIDO E INCREMENTAL (UPSERT) PARA POSTGRESQL');
  lines.push('-- Actualiza Ciclos, Módulos, Hojas de ruta, Temas, Preguntas y Opciones');
  lines.push('-- SIN BORRAR los usuarios, partidas, respuestas ni el progreso/ranking.');
  lines.push(`-- Incluye: ${CICLOS.length} Ciclos, ${MODULOS.length} Módulos, ${totalTemas} Temas,`);
  lines.push(`--          ${totalPreguntas} Preguntas y ${totalOpciones} Opciones`);
  lines.push('-- =====================================================================');
  lines.push('BEGIN;');
  lines.push('');
  lines.push('-- 0. ESQUEMA DE TABLAS (DDL)');
  lines.push(schemaSql);
  lines.push('');

  // 1. Ciclos (UPSERT)
  lines.push(`-- 1. CICLOS (${CICLOS.length})`);
  lines.push('INSERT INTO ciclos (id, sigla, nombre, grado, activo) VALUES');
  lines.push(
    CICLOS.map((c) => `(${esc(c.id)}, ${esc(c.sigla)}, ${esc(c.nombre)}, ${esc(c.grado)}, TRUE)`).join(',\n')
  );
  lines.push('ON CONFLICT (id) DO UPDATE SET');
  lines.push('  sigla = EXCLUDED.sigla,');
  lines.push('  nombre = EXCLUDED.nombre,');
  lines.push('  grado = EXCLUDED.grado,');
  lines.push('  activo = EXCLUDED.activo;');
  lines.push('');

  // 2. Módulos (UPSERT con hoja_ruta_md incluida)
  lines.push(`-- 2. MÓDULOS (${MODULOS.length}) CON HOJAS DE RUTA`);
  lines.push('INSERT INTO modulos (id, nombre, descripcion, hoja_ruta_md, activo) VALUES');
  lines.push(
    MODULOS.map((m) => {
      const md = temariosMd[m.id] ?? null;
      return `(${esc(m.id)}, ${esc(m.nombre)}, ${esc(m.descripcion)}, ${esc(md)}, TRUE)`;
    }).join(',\n')
  );
  lines.push('ON CONFLICT (id) DO UPDATE SET');
  lines.push('  nombre = EXCLUDED.nombre,');
  lines.push('  descripcion = EXCLUDED.descripcion,');
  lines.push('  hoja_ruta_md = EXCLUDED.hoja_ruta_md,');
  lines.push('  activo = EXCLUDED.activo;');
  lines.push('');

  // 3. Ciclo_Modulo (UPSERT)
  lines.push('-- 3. RELACIÓN CICLO_MODULO (1º y 2º CURSO)');
  lines.push('INSERT INTO ciclo_modulo (ciclo_id, modulo_id, curso) VALUES');
  const cmRows = [];
  for (const m of MODULOS) {
    for (const sigla of m.ciclos) {
      cmRows.push(`(${esc(sigla.toLowerCase())}, ${esc(m.id)}, ${m.curso})`);
    }
  }
  lines.push(cmRows.join(',\n'));
  lines.push('ON CONFLICT (ciclo_id, modulo_id) DO UPDATE SET curso = EXCLUDED.curso;');
  lines.push('');

  // 4. Certificaciones (UPSERT)
  lines.push('-- 4. CERTIFICACIONES');
  lines.push('INSERT INTO certificaciones (id, codigo_examen, nombre, proveedor, nivel, tiempo_minutos, nota_aprobado, descripcion, activo) VALUES');
  lines.push(
    [
      `('az-900', 'AZ-900', 'Microsoft Certified: Azure Fundamentals', 'Microsoft', 'Fundamentals', 45, 700, 'Conceptos de la nube, arquitectura y servicios de Azure, administración y gobernanza.', FALSE)`,
      `('sc-900', 'SC-900', 'Microsoft Certified: Security, Compliance, and Identity Fundamentals', 'Microsoft', 'Fundamentals', 45, 700, 'Conceptos de seguridad, Microsoft Entra ID, soluciones de seguridad y cumplimiento.', FALSE)`,
      `('dp-900', 'DP-900', 'Microsoft Certified: Azure Data Fundamentals', 'Microsoft', 'Fundamentals', 45, 700, 'Datos relacionales y no relacionales, cargas de trabajo transaccionales y analíticas en Azure.', FALSE)`,
      `('ms-900', 'MS-900', 'Microsoft 365 Certified: Fundamentals', 'Microsoft', 'Fundamentals', 45, 700, 'Aplicaciones en la nube de Microsoft 365, seguridad, cumplimiento, precios y soporte.', FALSE)`,
      `('ai-900', 'AI-900', 'Microsoft Certified: Azure AI Fundamentals', 'Microsoft', 'Fundamentals', 45, 700, 'Cargas de trabajo de IA, Machine Learning, visión artificial y lenguaje natural en Azure.', FALSE)`,
    ].join(',\n')
  );
  lines.push('ON CONFLICT (id) DO UPDATE SET');
  lines.push('  codigo_examen = EXCLUDED.codigo_examen,');
  lines.push('  nombre = EXCLUDED.nombre,');
  lines.push('  proveedor = EXCLUDED.proveedor,');
  lines.push('  nivel = EXCLUDED.nivel,');
  lines.push('  tiempo_minutos = EXCLUDED.tiempo_minutos,');
  lines.push('  nota_aprobado = EXCLUDED.nota_aprobado,');
  lines.push('  descripcion = EXCLUDED.descripcion,');
  lines.push('  activo = EXCLUDED.activo;');
  lines.push('');

  // 5. Temas (UPSERT)
  lines.push(`-- 5. TEMAS (${totalTemas} TEMAS)`);
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
  lines.push(temaRows.join(',\n'));
  lines.push('ON CONFLICT (id) DO UPDATE SET');
  lines.push('  modulo_id = EXCLUDED.modulo_id,');
  lines.push('  orden = EXCLUDED.orden,');
  lines.push('  nombre = EXCLUDED.nombre;');
  lines.push(`SELECT setval('temas_id_seq', ${temaIdCounter - 1}, true);`);
  lines.push('');

  // 6. Preguntas y Opciones (UPSERT sin borrar respuestas ni progreso de los alumnos)
  lines.push(`-- 6. PREGUNTAS (${totalPreguntas} PREGUNTAS)`);
  lines.push('INSERT INTO preguntas (id, modulo_id, tema_id, enunciado, codigo, explicacion, dificultad, activa) VALUES');
  const pregRows = [];
  const opcRows = [];
  let opcionIdCounter = 1;

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
        `(${esc(p.id)}, ${esc(moduloId)}, ${temaElegido.id}, ${esc(p.enunciado)}, ${esc(p.codigo ?? null)}, ${esc(p.explicacion)}, ${esc(p.dificultad ?? 'media')}, TRUE)`
      );

      for (let idxOp = 0; idxOp < p.opciones.length; idxOp++) {
        const opId = opcionIdCounter++;
        const esCorrecta = idxOp === p.correcta ? 'TRUE' : 'FALSE';
        opcRows.push(`(${opId}, ${esc(p.id)}, ${esc(p.opciones[idxOp])}, ${esCorrecta})`);
      }
    }
  }

  lines.push(pregRows.join(',\n'));
  lines.push('ON CONFLICT (id) DO UPDATE SET');
  lines.push('  modulo_id = EXCLUDED.modulo_id,');
  lines.push('  tema_id = EXCLUDED.tema_id,');
  lines.push('  enunciado = EXCLUDED.enunciado,');
  lines.push('  codigo = EXCLUDED.codigo,');
  lines.push('  explicacion = EXCLUDED.explicacion,');
  lines.push('  dificultad = EXCLUDED.dificultad,');
  lines.push('  activa = EXCLUDED.activa;');
  lines.push('');

  lines.push(`-- 7. OPCIONES (${totalOpciones} OPCIONES)`);
  lines.push('INSERT INTO opciones (id, pregunta_id, texto, es_correcta) VALUES');
  lines.push(opcRows.join(',\n'));
  lines.push('ON CONFLICT (id) DO UPDATE SET');
  lines.push('  pregunta_id = EXCLUDED.pregunta_id,');
  lines.push('  texto = EXCLUDED.texto,');
  lines.push('  es_correcta = EXCLUDED.es_correcta;');
  lines.push(`SELECT setval('opciones_id_seq', ${opcionIdCounter - 1}, true);`);
  lines.push('');
  lines.push('COMMIT;');

  const outPath = path.join(__dirname, 'seed_data.sql');
  await fs.writeFile(outPath, lines.join('\n'), 'utf-8');

  const globalJsonPath = path.join(__dirname, 'seed_global.json');
  const globalPayload = {
    generadoEn: new Date().toISOString(),
    resumen: {
      ciclos: CICLOS.length,
      secciones: SECCIONES.length,
      modulos: MODULOS.length,
      hojasDeRuta: Object.keys(ARCHIVOS_TEMARIOS).length,
      temas: totalTemas,
      preguntas: totalPreguntas,
      opciones: totalOpciones,
    },
    ciclos: CICLOS,
    secciones: SECCIONES,
    modulos: MODULOS.map((m) => ({
      ...m,
      hojaRutaArchivo: ARCHIVOS_TEMARIOS[m.id] ?? null,
      hojaRutaMarkdown: temariosMd[m.id] ?? null,
      totalPreguntas: PREGUNTAS[m.id]?.length ?? 0,
    })),
    preguntasPorModulo: PREGUNTAS,
  };
  await fs.writeFile(globalJsonPath, JSON.stringify(globalPayload, null, 2), 'utf-8');

  console.log(`✔ Archivo SQL global (UPSERT sin pérdida de progreso) generado: ${outPath}`);
  console.log(`✔ Archivo JSON global generado: ${globalJsonPath}`);
  console.log(`  (${CICLOS.length} ciclos, ${MODULOS.length} módulos, ${totalTemas} temas, ${totalPreguntas} preguntas y ${totalOpciones} opciones)`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  generateSql();
}
