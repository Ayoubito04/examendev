// Utilidades para preparar tests y calcular resultados.

export function barajar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Indica si una pregunta es un reto difícil de completar código (vale el doble: ×2).
export function esPreguntaDificil(pregunta) {
  return pregunta?.dificultad === 'dificil' || Boolean(pregunta?.codigo);
}

export function pesoPregunta(pregunta) {
  return esPreguntaDificil(pregunta) ? 2 : 1;
}

// Baraja las opciones de una pregunta y recalcula el índice de la correcta.
export function prepararPregunta(pregunta) {
  const orden = barajar(pregunta.opciones.map((_, i) => i));
  return {
    ...pregunta,
    opciones: orden.map((i) => pregunta.opciones[i]),
    correcta: orden.indexOf(pregunta.correcta),
  };
}

// Selecciona `cantidad` preguntas aleatorias del banco (p. ej. 30 de un banco de 100+),
// asegurando incluir preguntas difíciles de completar código (×2) mezcladas al azar.
export function crearTest(preguntas, cantidad) {
  if (!Array.isArray(preguntas) || preguntas.length === 0) return [];
  const limite = Math.min(cantidad, preguntas.length);
  const dificiles = barajar(preguntas.filter(esPreguntaDificil));
  const normales = barajar(preguntas.filter((p) => !esPreguntaDificil(p)));

  const cupoDificiles = Math.min(dificiles.length, Math.max(3, Math.round(limite * 0.2)));
  const elegidasDificiles = dificiles.slice(0, cupoDificiles);
  const elegidasNormales = normales.slice(0, Math.max(0, limite - elegidasDificiles.length));

  // Si faltaran preguntas normales para llegar al límite, completa con el resto de difíciles
  const restantes =
    elegidasDificiles.length + elegidasNormales.length < limite
      ? dificiles.slice(elegidasDificiles.length, limite - elegidasNormales.length)
      : [];

  return barajar([...elegidasNormales, ...elegidasDificiles, ...restantes]).map(prepararPregunta);
}

// Las preguntas difíciles (dificultad === 'dificil') cuentan el doble (peso ×2) en la nota sobre 10.
export function corregir(preguntas, respuestas) {
  let aciertos = 0;
  let aciertosDobles = 0;
  let totalDobles = 0;
  let puntosPeso = 0;
  let maxPeso = 0;

  preguntas.forEach((p, i) => {
    const peso = pesoPregunta(p);
    const ok = respuestas[i] === p.correcta;
    maxPeso += peso;
    if (peso > 1) totalDobles += 1;
    if (ok) {
      aciertos += 1;
      puntosPeso += peso;
      if (peso > 1) aciertosDobles += 1;
    }
  });

  const total = preguntas.length;
  return {
    aciertos,
    fallos: total - aciertos,
    total,
    aciertosDobles,
    totalDobles,
    puntosPeso,
    maxPeso,
    nota: maxPeso ? Math.round((puntosPeso / maxPeso) * 100) / 10 : 0,
  };
}

export function formatearTiempo(segundos) {
  const s = Math.max(0, Math.round(segundos));
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

export function formatearNota(nota) {
  return nota.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export function mensajePorNota(nota) {
  if (nota >= 9) return '¡Sobresaliente! Lo tienes dominado';
  if (nota >= 7) return '¡Buen trabajo! Sigue así';
  if (nota >= 5) return 'Aprobado. Refuerza los fallos';
  return 'Aún no. Repasa y vuelve a intentarlo';
}

export function formatearFecha(iso) {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}
