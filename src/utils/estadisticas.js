// Cálculos sobre las partidas de trivia de un usuario. Los usa el mock;
// la API real debe devolver el mismo formato (ver docs/API.md).
import { getModulo } from '../data/index.js';

const DIA = 86400000;
const claveDia = (fecha) => {
  const d = new Date(fecha);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

// Días seguidos (hasta hoy o ayer) en los que se ha jugado al menos una partida.
export function rachaDeDias(fechas, ahora = new Date()) {
  const dias = new Set(fechas.map(claveDia));
  let cursor = new Date(ahora);
  if (!dias.has(claveDia(cursor))) cursor = new Date(cursor.getTime() - DIA);
  let racha = 0;
  while (dias.has(claveDia(cursor))) {
    racha++;
    cursor = new Date(cursor.getTime() - DIA);
  }
  return racha;
}

export function estadisticasDePartidas(partidas) {
  const ciclos = new Set();
  partidas.forEach((p) => getModulo(p.moduloId)?.ciclos.forEach((c) => ciclos.add(c)));
  return {
    puntos: partidas.reduce((s, p) => s + p.puntos, 0),
    partidas: partidas.length,
    mejorPartida: partidas.reduce((m, p) => Math.max(m, p.puntos), 0),
    mejorRacha: partidas.reduce((m, p) => Math.max(m, p.rachaMax), 0),
    rachaDias: rachaDeDias(partidas.map((p) => p.fecha)),
    aciertos: partidas.reduce((s, p) => s + p.aciertos, 0),
    preguntas: partidas.reduce((s, p) => s + p.total, 0),
    perfectas: partidas.filter((p) => p.total > 0 && p.aciertos === p.total).length,
    modulosJugados: new Set(partidas.map((p) => p.moduloId)).size,
    ciclosJugados: [...ciclos],
  };
}

// Lunes a las 00:00 de la semana actual (hora local).
export function inicioDeSemana(ahora = new Date()) {
  const d = new Date(ahora);
  d.setHours(0, 0, 0, 0);
  const dia = (d.getDay() + 6) % 7; // lunes = 0
  d.setDate(d.getDate() - dia);
  return d;
}
