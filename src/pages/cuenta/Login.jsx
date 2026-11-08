import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import Campo from '../../components/Campo.jsx';
import { Spinner } from '../../components/estados/Estados.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { validarEmail } from '../../utils/validacion.js';
import { enviarPartidaPendiente, hayPartidaPendiente } from '../../utils/partidaPendiente.js';
import { USAR_MOCK } from '../../api/config.js';
import AvisoDemo from './AvisoDemo.jsx';

// Destino seguro tras iniciar sesión: solo rutas internas.
export const destinoSeguro = (volver, porDefecto = '/perfil') =>
  volver && volver.startsWith('/') && !volver.startsWith('//') ? volver : porDefecto;

export default function Login() {
  const { usuario, iniciarSesion } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const destino = destinoSeguro(params.get('volver'));
  const [datos, setDatos] = useState({ email: '', password: '' });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const alertaRef = useRef(null);

  useEffect(() => {
    if (errorGeneral) alertaRef.current?.focus();
  }, [errorGeneral]);

  if (usuario && !enviando) return <Navigate to={destino} replace />;

  const cambiar = (e) => {
    setDatos((d) => ({ ...d, [e.target.name]: e.target.value }));
    setErrores((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const enviar = async (e) => {
    e.preventDefault();
    const nuevos = { email: validarEmail(datos.email), password: datos.password ? null : 'Escribe tu contraseña.' };
    setErrores(nuevos);
    setErrorGeneral(null);
    if (Object.values(nuevos).some(Boolean)) return;
    setEnviando(true);
    try {
      await iniciarSesion(datos);
      const guardada = hayPartidaPendiente() ? await enviarPartidaPendiente().catch(() => null) : null;
      navigate(guardada ? '/ranking?guardada=1' : destino, { replace: true });
    } catch (err) {
      setErrorGeneral(err.message);
      setEnviando(false);
    }
  };

  return (
    <section className="cuenta contenedor">
      <div className="cuenta__tarjeta tarjeta">
        <span className="pildora">Mi cuenta</span>
        <h1 className="titulo-display titulo-display--sm">Inicia sesión</h1>
        <p className="cuenta__intro">Guarda tus puntos de trivia, entra en el ranking y desbloquea logros.</p>

        {hayPartidaPendiente() && (
          <p className="aviso-info">Tienes una partida de trivia sin guardar. Se añadirá a tu cuenta al entrar.</p>
        )}
        {USAR_MOCK && <AvisoDemo />}

        {errorGeneral && (
          <div className="alerta alerta--error" role="alert" tabIndex={-1} ref={alertaRef}>
            {errorGeneral}
          </div>
        )}

        <form onSubmit={enviar} noValidate>
          <Campo etiqueta="Correo electrónico" name="email" type="email" autoComplete="email" value={datos.email} onChange={cambiar} error={errores.email} />
          <Campo etiqueta="Contraseña" name="password" type="password" autoComplete="current-password" value={datos.password} onChange={cambiar} error={errores.password} />
          <div className="cuenta__fila">
            <Link to="/recuperar" className="enlace">
              ¿Has olvidado tu contraseña?
            </Link>
          </div>
          <button type="submit" className="btn btn--primario btn--lg btn--bloque" disabled={enviando} aria-busy={enviando}>
            {enviando ? (
              <>
                <Spinner pequeno etiqueta="Iniciando sesión" /> Entrando…
              </>
            ) : (
              'Iniciar sesión'
            )}
          </button>
        </form>

        <p className="cuenta__pie">
          ¿No tienes cuenta?{' '}
          <Link to={`/registro${params.get('volver') ? `?volver=${encodeURIComponent(params.get('volver'))}` : ''}`} className="enlace">
            Regístrate gratis
          </Link>
        </p>
      </div>
    </section>
  );
}
