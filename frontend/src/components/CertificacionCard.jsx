import { memo } from 'react';
import { Link } from 'react-router-dom';

// "Microsoft Certified: Azure Fundamentals" -> "Azure Fundamentals"
const nombreCorto = (nombre) => nombre.replace(/^Microsoft Certified:\s*/i, '');

function CertificacionCard({ cert }) {
  const idTitulo = `cert-${cert.id}`;
  const detalles = [
    cert.nivel,
    cert.minutos && `${cert.minutos} min`,
    cert.notaAprobado && `Aprobado: ${cert.notaAprobado}/1000`,
  ].filter(Boolean);

  return (
    <article className={`tarjeta modulo-card cert-card ${cert.disponible ? '' : 'cert-card--pronto'}`} aria-labelledby={idTitulo}>
      <div className="cert-card__cabecera">
        <span className="etiqueta etiqueta--proveedor">{cert.proveedor}</span>
        {cert.disponible ? (
          <Link to={`/test/${cert.id}`} className="btn btn--primario btn--sm" aria-label={`Practicar ${cert.codigo}`}>
            Practicar
          </Link>
        ) : (
          <button type="button" className="btn btn--sm cert-card__pronto" disabled aria-label={`${cert.codigo}: próximamente`}>
            Próximamente
          </button>
        )}
      </div>

      <h3 className="cert-card__codigo" id={idTitulo}>
        {cert.codigo}
      </h3>
      <p className="cert-card__nombre">{nombreCorto(cert.nombre)}</p>
      {cert.descripcion && <p className="cert-card__descripcion">{cert.descripcion}</p>}

      {detalles.length > 0 && (
        <ul className="cert-card__detalles" aria-label="Datos del examen">
          {detalles.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      )}
      {cert.totalPreguntas > 0 && <p className="modulo-card__meta">{cert.totalPreguntas} preguntas en el banco</p>}
    </article>
  );
}

export default memo(CertificacionCard);
