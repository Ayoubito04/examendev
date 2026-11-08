import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Spinner } from './estados/Estados.jsx';

// Envuelve páginas que requieren sesión. Mientras se valida el token muestra un indicador.
export default function RutaPrivada({ children }) {
  const { usuario, comprobando } = useAuth();
  const { pathname, search } = useLocation();

  if (comprobando)
    return (
      <div className="pagina-cargando">
        <Spinner etiqueta="Comprobando tu sesión" />
      </div>
    );
  if (!usuario) return <Navigate to={`/login?volver=${encodeURIComponent(pathname + search)}`} replace />;
  return children;
}
