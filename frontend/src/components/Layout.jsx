import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { SITE } from '../config.js';

export default function Layout() {
  const { pathname, hash } = useLocation();

  // Al cambiar de página vuelve arriba, salvo que la URL apunte a un ancla.
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="app">
      <a href="#contenido" className="saltar">
        Saltar al contenido
      </a>
      <div className="barra-aviso">
        <Link to="/temario">
          ¡Prepara la {SITE.convocatoria.toLowerCase()}!
          <span className="barra-aviso__extra"> Simulacros de 20 preguntas en 90 minutos para DAM, DAW, ASIR y SMR</span>
        </Link>
      </div>
      <Navbar />
      <main id="contenido" className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
