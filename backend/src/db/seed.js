import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import { pool } from './pool.js';
import { CICLOS, MODULOS, PREGUNTAS } from '../../../frontend/src/data/index.js';
import { cargarTemariosMarkdown } from './generate-sql.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function ensureDatabaseExists() {
  const dbUrl = new URL(process.env.DATABASE_URL);
  const dbName = dbUrl.pathname.replace(/^\//, '');
  dbUrl.pathname = '/postgres';

  const adminClient = new pg.Client({ connectionString: dbUrl.toString() });
  await adminClient.connect();
  try {
    const res = await adminClient.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [dbName]
    );
    if (res.rowCount === 0) {
      console.log(`Creando la base de datos "${dbName}" en PostgreSQL...`);
      await adminClient.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✔ Base de datos "${dbName}" creada.`);
    }
  } finally {
    await adminClient.end();
  }
}

const CERTIFICACIONES_INICIALES = [
  {
    id: 'az-900',
    codigo_examen: 'AZ-900',
    nombre: 'Microsoft Certified: Azure Fundamentals',
    proveedor: 'Microsoft',
    nivel: 'Fundamentals',
    tiempo_minutos: 45,
    nota_aprobado: 700,
    descripcion: 'Conceptos de la nube, arquitectura y servicios de Azure, administración y gobernanza.',
    activo: false,
  },
  {
    id: 'sc-900',
    codigo_examen: 'SC-900',
    nombre: 'Microsoft Certified: Security, Compliance, and Identity Fundamentals',
    proveedor: 'Microsoft',
    nivel: 'Fundamentals',
    tiempo_minutos: 45,
    nota_aprobado: 700,
    descripcion: 'Conceptos de seguridad, Microsoft Entra ID, soluciones de seguridad y cumplimiento.',
    activo: false,
  },
  {
    id: 'dp-900',
    codigo_examen: 'DP-900',
    nombre: 'Microsoft Certified: Azure Data Fundamentals',
    proveedor: 'Microsoft',
    nivel: 'Fundamentals',
    tiempo_minutos: 45,
    nota_aprobado: 700,
    descripcion: 'Datos relacionales y no relacionales, cargas de trabajo transaccionales y analíticas en Azure.',
    activo: false,
  },
  {
    id: 'ms-900',
    codigo_examen: 'MS-900',
    nombre: 'Microsoft 365 Certified: Fundamentals',
    proveedor: 'Microsoft',
    nivel: 'Fundamentals',
    tiempo_minutos: 45,
    nota_aprobado: 700,
    descripcion: 'Aplicaciones en la nube de Microsoft 365, seguridad, cumplimiento, precios y soporte.',
    activo: false,
  },
  {
    id: 'ai-900',
    codigo_examen: 'AI-900',
    nombre: 'Microsoft Certified: Azure AI Fundamentals',
    proveedor: 'Microsoft',
    nivel: 'Fundamentals',
    tiempo_minutos: 45,
    nota_aprobado: 700,
    descripcion: 'Cargas de trabajo de IA, Machine Learning, visión artificial y lenguaje natural en Azure.',
    activo: false,
  },
];

export async function seed({ cerrarPool = true } = {}) {
  await ensureDatabaseExists();
  const temariosMd = await cargarTemariosMarkdown();
  const client = await pool.connect();

  try {
    console.log('Iniciando seed global de temarios y preguntas en PostgreSQL...');
    await client.query('BEGIN');

    // 1. Ejecutar schema.sql para asegurar que las tablas existen y tienen el ancho correcto
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = await fs.readFile(schemaPath, 'utf-8');
    await client.query(schemaSql);

    // Limpiar datos previos del catálogo para evitar duplicados al re-ejecutar el seed
    await client.query('TRUNCATE TABLE respuestas, partidas, ranking, opciones, preguntas, temas, ciclo_modulo, certificaciones, modulos, ciclos RESTART IDENTITY CASCADE');

    // 2. Insertar los 4 Ciclos (DAM, DAW, ASIR y SMR)
    for (const c of CICLOS) {
      await client.query(
        `INSERT INTO ciclos (id, sigla, nombre, grado, activo)
         VALUES ($1, $2, $3, $4, TRUE)`,
        [c.id, c.sigla, c.nombre, c.grado]
      );
    }
    console.log(`✔ ${CICLOS.length} ciclos insertados.`);

    // 3. Insertar todos los Módulos (con hoja_ruta_md), Relación Ciclo-Módulo (1º y 2º) y sus Temas
    const mapaTemasPorModulo = {};
    let totalTemas = 0;

    for (const m of MODULOS) {
      await client.query(
        `INSERT INTO modulos (id, nombre, descripcion, hoja_ruta_md, activo)
         VALUES ($1, $2, $3, $4, TRUE)`,
        [m.id, m.nombre, m.descripcion, temariosMd[m.id] ?? null]
      );

      for (const siglaCiclo of m.ciclos) {
        const cicloId = siglaCiclo.toLowerCase();
        await client.query(
          `INSERT INTO ciclo_modulo (ciclo_id, modulo_id, curso)
           VALUES ($1, $2, $3)`,
          [cicloId, m.id, m.curso]
        );
      }

      mapaTemasPorModulo[m.id] = [];
      for (let idx = 0; idx < m.temas.length; idx++) {
        const nombreTema = m.temas[idx];
        const resTema = await client.query(
          `INSERT INTO temas (modulo_id, orden, nombre)
           VALUES ($1, $2, $3)
           RETURNING id`,
          [m.id, idx + 1, nombreTema]
        );
        mapaTemasPorModulo[m.id].push({
          id: resTema.rows[0].id,
          orden: idx + 1,
          nombre: nombreTema,
        });
        totalTemas++;
      }
    }
    console.log(`✔ ${MODULOS.length} módulos y ${totalTemas} temas insertados.`);

    // 4. Insertar Certificaciones iniciales
    for (const cert of CERTIFICACIONES_INICIALES) {
      await client.query(
        `INSERT INTO certificaciones (id, codigo_examen, nombre, proveedor, nivel, tiempo_minutos, nota_aprobado, descripcion, activo)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          cert.id,
          cert.codigo_examen,
          cert.nombre,
          cert.proveedor,
          cert.nivel,
          cert.tiempo_minutos,
          cert.nota_aprobado,
          cert.descripcion,
          cert.activo,
        ]
      );
    }
    console.log(`✔ ${CERTIFICACIONES_INICIALES.length} certificaciones insertadas.`);

    // 5. Insertar todas las Preguntas y Opciones desde frontend/src/data
    let totalPreguntas = 0;
    let totalOpciones = 0;

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

        await client.query(
          `INSERT INTO preguntas (id, modulo_id, tema_id, enunciado, explicacion, dificultad, activa)
           VALUES ($1, $2, $3, $4, $5, $6, TRUE)`,
          [
            p.id,
            moduloId,
            temaElegido.id,
            p.enunciado,
            p.explicacion ?? null,
            p.dificultad ?? 'media',
          ]
        );
        totalPreguntas++;

        for (let idxOp = 0; idxOp < p.opciones.length; idxOp++) {
          const textoOpcion = p.opciones[idxOp];
          const esCorrecta = idxOp === p.correcta;
          await client.query(
            `INSERT INTO opciones (pregunta_id, texto, es_correcta)
             VALUES ($1, $2, $3)`,
            [p.id, textoOpcion, esCorrecta]
          );
          totalOpciones++;
        }
      }
    }

    await client.query('COMMIT');
    console.log(`✔ ${totalPreguntas} preguntas y ${totalOpciones} opciones insertadas correctamente.`);
    console.log('🎉 ¡Seed global de ExamenDev completado con éxito!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Error poblando la base de datos:', err);
    process.exitCode = 1;
    throw err;
  } finally {
    client.release();
    if (cerrarPool) await pool.end();
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  seed();
}
