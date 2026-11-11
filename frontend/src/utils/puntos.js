// Reglas de puntuación del modo trivia.
export const TRIVIA = {
  preguntas: 20,
  segundosPorPregunta: 20,
  base: 100, // por acierto
  bonusMaxRapidez: 50, // proporcional al tiempo que sobra
  multiplicadores: [
    { desde: 5, valor: 2 },
    { desde: 3, valor: 1.5 },
  ],
};

export function multiplicadorDeRacha(racha) {
  return TRIVIA.multiplicadores.find((m) => racha >= m.desde)?.valor ?? 1;
}

// racha: aciertos seguidos contando esta respuesta.
// Las preguntas difíciles (dificultad === 'dificil') otorgan el doble de puntos (×2).
export function calcularPuntos({ acierto, segundosRestantes, racha, dificultad }) {
  const factorDificultad = dificultad === 'dificil' ? 2 : 1;
  if (!acierto) return { base: 0, rapidez: 0, multiplicador: 1, factorDificultad, total: 0 };
  const proporcion = Math.max(0, Math.min(1, segundosRestantes / TRIVIA.segundosPorPregunta));
  const base = TRIVIA.base * factorDificultad;
  const rapidez = Math.round(TRIVIA.bonusMaxRapidez * proporcion * factorDificultad);
  const multiplicador = multiplicadorDeRacha(racha);
  return {
    base,
    rapidez,
    multiplicador,
    factorDificultad,
    total: Math.round((base + rapidez) * multiplicador),
  };
}

export const formatearPuntos = (n) => n.toLocaleString('es-ES');
