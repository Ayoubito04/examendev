import { Link } from 'react-router-dom';

const nivel = (pct) => (pct === null ? 'vacio' : pct < 50 ? 'bajo' : pct < 75 ? 'medio' : 'alto');

// Barras horizontales con el % de acierto de cada tema de un módulo.
// temas: [{ indice, nombre, pct, respondidas, aciertos, total }]
export default function BarrasTema({ moduloId, temas }) {
  return (
    <ul className="barras-tema">
      {temas.map((t) => (
        <li key={t.indice} className={`barra-tema barra-tema--${nivel(t.pct)}`}>
          <div className="barra-tema__cabecera">
            <span className="barra-tema__nombre">{t.nombre}</span>
            <span className="barra-tema__valor">{t.pct === null ? 'Sin datos' : `${t.pct} %`}</span>
          </div>
          <div
            className="barra-tema__pista"
            role="meter"
            aria-label={`Acierto en ${t.nombre}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={t.pct ?? 0}
            aria-valuetext={t.pct === null ? 'Sin datos' : `${t.pct} %`}
          >
            <span className="barra-tema__relleno" style={{ width: `${t.pct ?? 0}%` }} />
          </div>
          <div className="barra-tema__pie">
            <span className="texto-suave">
              {t.respondidas ? `${t.aciertos} de ${t.respondidas} respuestas correctas` : `${t.total} preguntas en el banco`}
            </span>
            <Link to={`/test/${moduloId}?tema=${t.indice}`} className="enlace">
              Practicar tema
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
