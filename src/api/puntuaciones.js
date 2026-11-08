// Servicio de puntuaciones: guardar partidas de trivia y consultar el ranking.
import { USAR_MOCK } from './config.js';
import { ApiError, http } from './http.js';
import { leerSesion } from './sesion.js';
import { esperar, guardarDb, leerDb, nuevoId, publico, usuarioDeToken } from './mock/db.js';
import { inicioDeSemana } from '../utils/estadisticas.js';
import { getModulo } from '../data/index.js';

// tipo: 'global' | 'modulo' | 'semanal'; ciclo: 'DAM' | 'DAW' | 'ASIR' | 'SMR' | null
function calcularRanking(db, { tipo, moduloId, ciclo, limite = 50 }) {
  let partidas = db.puntuaciones;
  if (tipo === 'modulo') partidas = partidas.filter((p) => p.moduloId === moduloId);
  if (tipo === 'semanal') {
    const desde = inicioDeSemana().toISOString();
    partidas = partidas.filter((p) => p.fecha >= desde);
  }
  if (ciclo && tipo !== 'modulo') partidas = partidas.filter((p) => getModulo(p.moduloId)?.ciclos.includes(ciclo));

  const porUsuario = new Map();
  partidas.forEach((p) => {
    const fila = porUsuario.get(p.usuarioId) ?? { usuarioId: p.usuarioId, puntos: 0, partidas: 0, mejorRacha: 0 };
    fila.puntos += p.puntos;
    fila.partidas += 1;
    fila.mejorRacha = Math.max(fila.mejorRacha, p.rachaMax);
    porUsuario.set(p.usuarioId, fila);
  });

  const filas = [...porUsuario.values()]
    .sort((a, b) => b.puntos - a.puntos || b.mejorRacha - a.mejorRacha)
    .map((f, i) => {
      const u = db.usuarios.find((x) => x.id === f.usuarioId);
      return { posicion: i + 1, usuario: u ? publico(u) : { id: f.usuarioId, nick: 'anónimo', avatar: 'zorro' }, puntos: f.puntos, partidas: f.partidas, mejorRacha: f.mejorRacha };
    });

  const yo = usuarioDeToken(db, leerSesion()?.token);
  return {
    filas: filas.slice(0, limite),
    total: filas.length,
    miPosicion: yo ? (filas.find((f) => f.usuario.id === yo.id) ?? null) : null,
  };
}

const mock = {
  async enviarPartida({ moduloId, puntos, aciertos, total, rachaMax, segundos }) {
    await esperar();
    const db = leerDb();
    const usuario = usuarioDeToken(db, leerSesion()?.token);
    if (!usuario) throw new ApiError('Tienes que iniciar sesión para guardar la puntuación.', { status: 401 });
    const partida = { id: nuevoId(), usuarioId: usuario.id, moduloId, puntos, aciertos, total, rachaMax, segundos, fecha: new Date().toISOString() };
    db.puntuaciones.push(partida);
    guardarDb(db);
    const { miPosicion } = calcularRanking(db, { tipo: 'global' });
    return { partida, posicionGlobal: miPosicion?.posicion ?? null };
  },

  async ranking(filtros) {
    await esperar();
    return calcularRanking(leerDb(), filtros);
  },
};

const real = {
  enviarPartida: (datos) => http('/puntuaciones', { metodo: 'POST', cuerpo: datos }),
  ranking: ({ tipo, moduloId, ciclo, limite = 50 }) => {
    const q = new URLSearchParams({ tipo, limite: String(limite) });
    if (moduloId) q.set('moduloId', moduloId);
    if (ciclo) q.set('ciclo', ciclo);
    return http(`/ranking?${q}`);
  },
};

export const puntuacionesApi = USAR_MOCK ? mock : real;
