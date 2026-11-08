import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Campo from '../../components/Campo.jsx';
import { EstadoError, Spinner } from '../../components/estados/Estados.jsx';
import { authApi } from '../../api/auth.js';
import { validarPassword } from '../../utils/validacion.js';

export default function Restablecer() {
  const [params] = useSearchParams();
  const token = params.get('token');
  const [datos, setDatos] = useState({ password: '', confirmar: '' });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [hecho, setHecho] = useState(false);

  const cambiar = (e) => {
    setDatos((d) => ({ ...d, [e.target.name]: e.target.value }));
    setErrores((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const enviar = async (e) => {
    e.preventDefault();
    const nuevos = {
      password: validarPassword(datos.password),
      confirmar: datos.confirmar !== datos.password ? 'Las contraseñas no coinciden.' : null,
    };
    setErrores(nuevos);
    setErrorGeneral(null);
    if (Object.values(nuevos).some(Boolean)) return;
    setEnviando(true);
    try {
      await authApi.restablecer({ token, password: datos.password });
      setHecho(true);
    } catch (err) {
      setErrorGeneral(err.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="cuenta contenedor">
      <div className="cuenta__tarjeta tarjeta">
        <span className="pildora">Nueva contraseña</span>
        {!token ? (
          <EstadoError titulo="Enlace no válido" error={{ message: 'Falta el código del enlace. Ábrelo de nuevo desde tu correo o solicita otro.' }} />
        ) : hecho ? (
          <div role="status">
            <h1 className="titulo-display titulo-display--sm">Contraseña actualizada</h1>
            <p className="cuenta__intro">Ya puedes entrar con tu nueva contraseña.</p>
            <Link to="/login" className="btn btn--primario btn--bloque">
              Iniciar sesión
            </Link>
          </div>
        ) : (
          <>
            <h1 className="titulo-display titulo-display--sm">Crea una contraseña nueva</h1>
            {errorGeneral && (
              <div className="alerta alerta--error" role="alert">
                {errorGeneral}{' '}
                <Link to="/recuperar" className="enlace">
                  Solicitar otro enlace
                </Link>
              </div>
            )}
            <form onSubmit={enviar} noValidate>
              <Campo etiqueta="Nueva contraseña" name="password" type="password" autoComplete="new-password" value={datos.password} onChange={cambiar} error={errores.password} ayuda="Mínimo 8 caracteres, con letras y números." />
              <Campo etiqueta="Repite la contraseña" name="confirmar" type="password" autoComplete="new-password" value={datos.confirmar} onChange={cambiar} error={errores.confirmar} />
              <button type="submit" className="btn btn--primario btn--lg btn--bloque" disabled={enviando} aria-busy={enviando}>
                {enviando ? (
                  <>
                    <Spinner pequeno etiqueta="Guardando" /> Guardando…
                  </>
                ) : (
                  'Guardar contraseña'
                )}
              </button>
            </form>
          </>
        )}
        {!token && (
          <Link to="/recuperar" className="btn btn--primario btn--bloque">
            Solicitar un enlace nuevo
          </Link>
        )}
      </div>
    </section>
  );
}
