import { memo } from 'react';
import { Link } from 'react-router-dom';
import { contarPreguntas } from '../data/index.js';
import { formatearNota } from '../utils/quiz.js';

function ModuloCard({ modulo, stats }) {
  const total = contarPreguntas(modulo.id);
  const pendientes = stats?.pendientes.length ?? 0;

  return (
    <article className="tarjeta modulo-card">
      <div className="modulo-card__etiquetas">
        {modulo.ciclos.map((c) => (
          <span key={c} className={`etiqueta etiqueta--${c.toLowerCase()}`}>
            {c}
          </span>
        ))}
        <span className="etiqueta">{modulo.curso}º curso</span>
      </div>

      <h3 className="modulo-card__titulo">{modulo.nombre}</h3>
      <p className="modulo-card__meta">{total} preguntas en el banco</p>

      {stats?.intentos ? (
        <p className="modulo-card__stats">
          Mejor nota <strong>{formatearNota(stats.mejorNota)}</strong>
          {pendientes > 0 && <> · {pendientes} por repasar</>}
        </p>
      ) : (
        <p className="modulo-card__stats modulo-card__stats--vacio">Aún sin intentos</p>
      )}

      <div className="modulo-card__acciones">
        <Link to={`/test/${modulo.id}`} className="btn btn--primario btn--sm">
          Practicar
        </Link>
        {pendientes > 0 && (
          <Link to={`/test/${modulo.id}?modo=repaso`} className="btn btn--fantasma btn--sm">
            Repasar fallos
          </Link>
        )}
      </div>
    </article>
  );
}

export default memo(ModuloCard);
