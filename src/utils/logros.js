// Logros del perfil. Se calculan en el frontend a partir de las estadísticas del usuario,
// así el backend solo tiene que devolver los números (ver docs/API.md).
export const LOGROS = [
  { id: 'primera', icono: '🎯', titulo: 'Primera partida', texto: 'Juega tu primera partida de trivia.', progreso: (e) => [e.partidas, 1] },
  { id: 'constancia', icono: '📅', titulo: 'Constancia', texto: 'Juega 3 días seguidos.', progreso: (e) => [e.rachaDias, 3] },
  { id: 'racha5', icono: '🔥', titulo: 'En racha', texto: 'Encadena 5 aciertos seguidos en una partida.', progreso: (e) => [e.mejorRacha, 5] },
  { id: 'racha10', icono: '⚡', titulo: 'Imparable', texto: 'Encadena 10 aciertos seguidos en una partida.', progreso: (e) => [e.mejorRacha, 10] },
  { id: 'perfecta', icono: '💯', titulo: 'Partida perfecta', texto: 'Acierta todas las preguntas de una partida.', progreso: (e) => [e.perfectas, 1] },
  { id: 'mil', icono: '🥉', titulo: '1.000 puntos', texto: 'Suma 1.000 puntos en total.', progreso: (e) => [e.puntos, 1000] },
  { id: 'diezmil', icono: '🥇', titulo: '10.000 puntos', texto: 'Suma 10.000 puntos en total.', progreso: (e) => [e.puntos, 10000] },
  { id: 'explorador', icono: '🧭', titulo: 'Explorador', texto: 'Juega en 5 módulos distintos.', progreso: (e) => [e.modulosJugados, 5] },
  { id: 'todoterreno', icono: '🌍', titulo: 'Todoterreno', texto: 'Juega en módulos de los 4 ciclos.', progreso: (e) => [e.ciclosJugados?.length ?? 0, 4] },
];

export function evaluarLogros(estadisticas) {
  return LOGROS.map((l) => {
    const [actual, objetivo] = l.progreso(estadisticas);
    return { ...l, actual: Math.min(actual, objetivo), objetivo, conseguido: actual >= objetivo };
  });
}
