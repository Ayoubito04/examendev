import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carga siempre backend/.env aunque ejecutes el comando desde otra carpeta
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: No se encontró DATABASE_URL en el archivo backend/.env');
  process.exit(1);
}

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = (text, params) => pool.query(text, params);
