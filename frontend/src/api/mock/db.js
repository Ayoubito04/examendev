// "Base de datos" simulada en localStorage para desarrollar sin backend.
// Incluye usuarios de demostración para que el ranking no salga vacío.
import { LATENCIA_MOCK } from '../config.js';
import { MODULOS } from '../../data/index.js';

const CLAVE = 'examendev:mock-db';
const VERSION = 1;

export const esperar = () =>
  new Promise((r) => setTimeout(r, LATENCIA_MOCK.min + Math.random() * (LATENCIA_MOCK.max - LATENCIA_MOCK.min)));

// Hash de contraseña SOLO para el mock (en la API real lo hace el servidor con bcrypt o similar).
export async function hashear(texto) {
  try {
    const datos = new TextEncoder().encode(`examendev:${texto}`);
    const hash = await crypto.subtle.digest('SHA-256', datos);
    return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch {
    let h = 0;
    for (const c of texto) h = (Math.imul(31, h) + c.charCodeAt(0)) | 0;
    return `debil-${h}`;
  }
}

export const nuevoId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

// Generador pseudoaleatorio determinista para que los datos demo sean siempre los mismos.
function aleatorio(semilla) {
  let s = semilla;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const NICKS_DEMO = [
  ['byte_runner', 'zorro'], ['lucia.dev', 'buho'], ['nullpointer', 'pulpo'], ['kernel_panic', 'lobo'],
  ['sudo_sara', 'panda'], ['pixel_pau', 'tigre'], ['docker_dan', 'ballena'], ['regex_rita', 'rana'],
  ['async_alex', 'cohete'], ['css_carmen', 'unicornio'], ['lambda_leo', 'dragon'], ['git_gonzalo', 'pinguino'],
];

function sembrar() {
  const rnd = aleatorio(20261108);
  const ahora = Date.now();
  const usuarios = NICKS_DEMO.map(([nick, avatar], i) => ({
    id: `demo-${i + 1}`,
    nick,
    email: `${nick.replace(/[^a-z]/g, '')}@demo.examendev`,
    hash: null, // los usuarios demo no pueden iniciar sesión
    avatar,
    demo: true,
    creado: new Date(ahora - (60 + i * 5) * 86400000).toISOString(),
  }));
  const puntuaciones = [];
  usuarios.forEach((u, i) => {
    const habilidad = 0.45 + (1 - i / usuarios.length) * 0.45;
    const partidas = 4 + Math.floor(rnd() * 10);
    for (let k = 0; k < partidas; k++) {
      const modulo = MODULOS[Math.floor(rnd() * MODULOS.length)];
      const total = 20;
      const aciertos = Math.min(total, Math.round(total * (habilidad + (rnd() - 0.5) * 0.25)));
      const rachaMax = Math.max(0, Math.min(aciertos, Math.round(aciertos * (0.35 + rnd() * 0.5))));
      const puntos = Math.round(aciertos * (115 + rnd() * 35) * (1 + rachaMax / 25));
      const diasAtras = rnd() < 0.45 ? rnd() * 6 : 7 + rnd() * 40;
      puntuaciones.push({
        id: nuevoId(),
        usuarioId: u.id,
        moduloId: modulo.id,
        puntos,
        aciertos,
        total,
        rachaMax,
        segundos: 120 + Math.round(rnd() * 200),
        fecha: new Date(ahora - diasAtras * 86400000).toISOString(),
      });
    }
  });
  return { version: VERSION, usuarios, puntuaciones, recuperaciones: {} };
}

export function leerDb() {
  try {
    const db = JSON.parse(localStorage.getItem(CLAVE));
    if (db?.version === VERSION) return db;
  } catch {
    // datos corruptos o almacenamiento bloqueado: se vuelve a sembrar
  }
  const db = sembrar();
  guardarDb(db);
  return db;
}

export function guardarDb(db) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(db));
  } catch {
    // sin almacenamiento: los cambios se pierden al recargar
  }
}

// Datos públicos de un usuario (sin hash ni email).
export const publico = (u) => ({ id: u.id, nick: u.nick, avatar: u.avatar });

export const privado = (u) => ({ id: u.id, nick: u.nick, email: u.email, avatar: u.avatar, creado: u.creado });

export const usuarioDeToken = (db, token) => {
  const id = typeof token === 'string' && token.startsWith('mock.') ? token.slice(5) : null;
  return db.usuarios.find((u) => u.id === id) ?? null;
};
