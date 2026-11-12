const limpiarComillasCodigo = (texto) => {
  if (!texto) return '';
  const t = String(texto).trim();
  return t.startsWith('`') && t.endsWith('`') && t.length > 1 ? t.slice(1, -1) : t;
};

// Muestra la insignia de pregunta difícil (×2) y el bloque de código con el hueco interactivo `___`.
export default function BloqueRetoCodigo({ pregunta, opcionElegida = null, corregida = false, esCorrecta = false }) {
  const esDificil = pregunta?.dificultad === 'dificil' || Boolean(pregunta?.codigo);
  if (!esDificil && !pregunta?.codigo) return null;

  const textoRelleno = opcionElegida !== null && opcionElegida !== undefined ? limpiarComillasCodigo(opcionElegida) : '___';
  const tieneSeleccion = opcionElegida !== null && opcionElegida !== undefined;

  let claseHueco = 'reto-codigo__hueco';
  if (corregida) {
    claseHueco += esCorrecta ? ' reto-codigo__hueco--ok' : ' reto-codigo__hueco--ko';
  } else if (tieneSeleccion) {
    claseHueco += ' reto-codigo__hueco--activo';
  }

  const partes = pregunta.codigo ? String(pregunta.codigo).split('___') : [];

  return (
    <div className="reto-codigo" aria-label="Reto difícil de completar código que vale el doble">
      <div className="reto-codigo__cabecera">
        <span className="reto-codigo__insignia">🔥 Difícil · Completar código</span>
        <span className="reto-codigo__doble">Vale ×2</span>
      </div>
      {pregunta.codigo && (
        <pre className="reto-codigo__pre">
          <code>
            {partes.map((fragmento, i) => (
              <span key={i}>
                {fragmento}
                {i < partes.length - 1 && <span className={claseHueco}>{textoRelleno}</span>}
              </span>
            ))}
          </code>
        </pre>
      )}
    </div>
  );
}
