import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

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
      <div className="fondo" aria-hidden="true">
        <span className="fondo__orbe fondo__orbe--1" />
        <span className="fondo__orbe fondo__orbe--2" />
        <span className="fondo__grano" />
      </div>
      <a href="#contenido" className="saltar">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido" className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
