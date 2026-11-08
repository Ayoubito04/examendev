import { Link } from 'react-router-dom';

export default function NoEncontrado() {
  return (
    <section className="no-encontrado contenedor contenedor--estrecho">
      <span className="pildora">Error 404</span>
      <h1 className="titulo-display titulo-display--md">Esta página no está en el temario</h1>
      <p className="lead">Puede que el enlace esté mal escrito o que el módulo ya no exista.</p>
      <div className="acciones-centradas">
        <Link to="/" className="btn btn--oscuro">
          Volver al inicio
        </Link>
        <Link to="/temario" className="btn btn--primario">
          Ver temario
        </Link>
      </div>
    </section>
  );
}
