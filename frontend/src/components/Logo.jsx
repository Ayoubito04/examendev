import { Link } from 'react-router-dom';
import { SITE } from '../config.js';

export default function Logo({ onClick }) {
  return (
    <Link to="/" className="logo" onClick={onClick} aria-label={`${SITE.nombre}, ir al inicio`}>
      <svg className="logo__mark" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 1.5 22.5 12 12 22.5 1.5 12Z" fill="currentColor" />
        <path d="M12 7.5 16.5 12 12 16.5 7.5 12Z" className="logo__nucleo" />
      </svg>
      <span>
        Examen<strong>Dev</strong>
      </span>
    </Link>
  );
}
