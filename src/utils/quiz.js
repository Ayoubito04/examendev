// Utilidades para preparar tests y calcular resultados.

export function barajar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
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

export function crearTest(preguntas, cantidad) {
  return barajar(preguntas)
    .slice(0, cantidad)
    .map(prepararPregunta);
}

export function corregir(preguntas, respuestas) {
  const aciertos = preguntas.reduce(
    (total, p, i) => (respuestas[i] === p.correcta ? total + 1 : total),
    0,
  );
  const total = preguntas.length;
  return {
    aciertos,
    fallos: total - aciertos,
    total,
    nota: total ? Math.round((aciertos / total) * 100) / 10 : 0,
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
