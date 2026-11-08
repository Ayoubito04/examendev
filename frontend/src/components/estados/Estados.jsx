// Componentes reutilizables para los estados de carga, vacío y error.

export function Spinner({ etiqueta = 'Cargando', pequeno = false }) {
  return (
    <span className={`spinner ${pequeno ? 'spinner--sm' : ''}`} role="status">
      <span className="sr-only">{etiqueta}</span>
    </span>
  );
}

// Bloques grises animados con la forma aproximada del contenido que va a llegar.
export function Esqueleto({ filas = 5, alto = 56, etiqueta = 'Cargando contenido' }) {
  return (
    <div className="esqueleto" role="status" aria-live="polite">
      <span className="sr-only">{etiqueta}…</span>
      {Array.from({ length: filas }, (_, i) => (
        <span key={i} className="esqueleto__fila" style={{ height: alto, animationDelay: `${i * 80}ms` }} aria-hidden="true" />
      ))}
    </div>
  );
}

export function EstadoVacio({ icono = '📭', titulo, texto, children }) {
  return (
    <div className="estado estado--vacio">
      <span className="estado__icono" aria-hidden="true">
        {icono}
      </span>
      <h2 className="estado__titulo">{titulo}</h2>
      {texto && <p className="estado__texto">{texto}</p>}
      {children && <div className="estado__acciones">{children}</div>}
    </div>
  );
}

export function EstadoError({ error, onReintentar, titulo = 'Algo ha fallado' }) {
  return (
    <div className="estado estado--error" role="alert">
      <span className="estado__icono" aria-hidden="true">
        ⚠️
      </span>
      <h2 className="estado__titulo">{titulo}</h2>
      <p className="estado__texto">{error?.message ?? 'No se han podido cargar los datos.'}</p>
      {onReintentar && (
        <div className="estado__acciones">
          <button type="button" className="btn btn--primario" onClick={onReintentar}>
            Reintentar
          </button>
        </div>
      )}
    </div>
  );
}
