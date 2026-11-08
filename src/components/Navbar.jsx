import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import { GRUPOS } from '../data/index.js';

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const [desplegable, setDesplegable] = useState(false);
  const [scroll, setScroll] = useState(false);
  const refDesplegable = useRef(null);
  const { pathname, search } = useLocation();

  // Cierra los menús al cambiar de ruta.
  useEffect(() => {
    setAbierto(false);
    setDesplegable(false);
  }, [pathname, search]);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!desplegable) return undefined;
    const fuera = (e) => {
      if (!refDesplegable.current?.contains(e.target)) setDesplegable(false);
    };
    const esc = (e) => e.key === 'Escape' && setDesplegable(false);
    document.addEventListener('mousedown', fuera);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', fuera);
      document.removeEventListener('keydown', esc);
    };
  }, [desplegable]);

  const cerrar = () => setAbierto(false);

  return (
    <header className={`navbar ${scroll ? 'navbar--solida' : ''}`}>
      <div className="navbar__inner contenedor">
        <Logo onClick={cerrar} />

        <nav className={`navbar__nav ${abierto ? 'navbar__nav--abierto' : ''}`} aria-label="Principal">
          <NavLink to="/" end className="navbar__link">
            Inicio
          </NavLink>

          <div className="navbar__desplegable" ref={refDesplegable}>
            <button
              type="button"
              className={`navbar__link navbar__toggle ${pathname.startsWith('/temario') ? 'active' : ''}`}
              aria-expanded={desplegable}
              aria-haspopup="true"
              onClick={() => setDesplegable((v) => !v)}
            >
              Temario
              <svg viewBox="0 0 16 16" aria-hidden="true" className={desplegable ? 'girado' : ''}>
                <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {desplegable && (
              <div className="navbar__menu" role="menu">
                <Link to="/temario" role="menuitem">
                  Todos los módulos
                </Link>
                {GRUPOS.map((g) => (
                  <Link key={g.id} to={`/temario?grupo=${g.id}`} role="menuitem">
                    {g.nombre}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/progreso" className="navbar__link">
            Mi progreso
          </NavLink>
          <NavLink to="/contacto" className="navbar__link">
            Contacto
          </NavLink>

          <Link to="/temario" className="btn btn--primario navbar__cta-movil">
            Empezar a practicar
          </Link>
        </nav>

        <div className="navbar__acciones">
          <Link to="/progreso" className="btn btn--claro btn--sm">
            Mi progreso
          </Link>
          <Link to="/temario" className="btn btn--primario btn--sm">
            Empezar
          </Link>
        </div>

        <button
          type="button"
          className="navbar__hamburguesa"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={abierto}
          onClick={() => setAbierto((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
