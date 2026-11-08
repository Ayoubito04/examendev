import { Link } from 'react-router-dom';
import { SITE } from '../config.js';

export default function Logo({ onClick }) {
  return (
    <Link to="/" className="logo" onClick={onClick} aria-label={`${SITE.nombre}, ir al inicio`}>
      <svg className="logo__mark" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 1.5 22.5 12 12 22.5 1.5 12Z" fill="currentColor" />
      </svg>
      <span>{SITE.nombre}</span>
    </Link>
  );
}
