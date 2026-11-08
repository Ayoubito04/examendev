import { useState } from 'react';
import { Link } from 'react-router-dom';
import Campo from '../../components/Campo.jsx';
import { Spinner } from '../../components/estados/Estados.jsx';
import { authApi } from '../../api/auth.js';
import { validarEmail } from '../../utils/validacion.js';

export default function Recuperar() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [errorGeneral, setErrorGeneral] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState(null);

  const enviar = async (e) => {
    e.preventDefault();
    const err = validarEmail(email);
    setError(err);
    setErrorGeneral(null);
    if (err) return;
    setEnviando(true);
    try {
      setResultado(await authApi.solicitarRecuperacion({ email: email.trim() }));
    } catch (er) {
      setErrorGeneral(er.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="cuenta contenedor">
      <div className="cuenta__tarjeta tarjeta">
        <span className="pildora">Recuperar contraseña</span>

        {resultado ? (
          <div role="status">
            <h1 className="titulo-display titulo-display--sm">Revisa tu correo</h1>
            <p className="cuenta__intro">
              Si existe una cuenta con <strong>{email.trim()}</strong>, te hemos enviado un enlace para crear una contraseña nueva. Caduca en 30
              minutos.
            </p>
            {resultado.enlaceDemo && (
              <div className="aviso-demo">
                <strong>Modo demostración:</strong> no se envían correos. Usa este enlace para continuar:
                <Link to={resultado.enlaceDemo} className="btn btn--oscuro btn--sm aviso-demo__boton">
                  Abrir enlace de prueba
                </Link>
              </div>
            )}
            <Link to="/login" className="btn btn--primario btn--bloque">
              Volver a iniciar sesión
            </Link>
          </div>
        ) : (
          <>
            <h1 className="titulo-display titulo-display--sm">¿Has olvidado tu contraseña?</h1>
            <p className="cuenta__intro">Escribe el correo de tu cuenta y te enviaremos un enlace para crear una nueva.</p>
            {errorGeneral && (
              <div className="alerta alerta--error" role="alert">
                {errorGeneral}
              </div>
            )}
            <form onSubmit={enviar} noValidate>
              <Campo etiqueta="Correo electrónico" name="email" type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(null); }} error={error} />
              <button type="submit" className="btn btn--primario btn--lg btn--bloque" disabled={enviando} aria-busy={enviando}>
                {enviando ? (
                  <>
                    <Spinner pequeno etiqueta="Enviando" /> Enviando…
                  </>
                ) : (
                  'Enviar enlace'
                )}
              </button>
            </form>
            <p className="cuenta__pie">
              <Link to="/login" className="enlace">
                ← Volver a iniciar sesión
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
