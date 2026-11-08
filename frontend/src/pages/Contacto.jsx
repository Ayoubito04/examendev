import { useState } from 'react';
import { MODULOS } from '../data/index.js';
import { SITE } from '../config.js';

const MOTIVOS = ['Duda sobre una pregunta', 'Error en una pregunta', 'Sugerencia de módulo o mejora', 'Otro'];
const INICIAL = { nombre: '', email: '', motivo: MOTIVOS[0], modulo: '', mensaje: '' };

function validar(datos) {
  const errores = {};
  if (datos.nombre.trim().length < 2) errores.nombre = 'Escribe tu nombre.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email.trim())) errores.email = 'Introduce un correo válido.';
  if (datos.mensaje.trim().length < 10) errores.mensaje = 'Cuéntanos un poco más (mínimo 10 caracteres).';
  return errores;
}

export default function Contacto() {
  const [datos, setDatos] = useState(INICIAL);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const cambiar = (e) => {
    const { name, value } = e.target;
    setDatos((d) => ({ ...d, [name]: value }));
    if (errores[name]) setErrores((er) => ({ ...er, [name]: undefined }));
  };

  // Sin backend: prepara el correo en el cliente de email del usuario.
  const enviar = (e) => {
    e.preventDefault();
    const nuevos = validar(datos);
    setErrores(nuevos);
    if (Object.keys(nuevos).length) return;

    const asunto = `[${SITE.nombre}] ${datos.motivo}${datos.modulo ? ` · ${datos.modulo}` : ''}`;
    const cuerpo = `${datos.mensaje}\n\n—\n${datos.nombre} <${datos.email}>`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    setEnviado(true);
  };

  return (
    <section className="contacto contenedor">
      <div className="contacto__intro">
        <span className="pildora">Contacto</span>
        <h1 className="titulo-display titulo-display--md">¿Hablamos?</h1>
        <p className="lead">
          Si una pregunta tiene un error, echas en falta un módulo o tienes una idea para mejorar la plataforma, escríbenos.
        </p>
        <ul className="contacto__datos">
          <li>
            <span className="texto-suave">Correo</span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </li>
          <li>
            <span className="texto-suave">Errores en preguntas</span>
            Indica el módulo y copia el enunciado para encontrarla antes.
          </li>
        </ul>
      </div>

      <div className="tarjeta contacto__form">
        {enviado ? (
          <div className="contacto__ok" role="status">
            <h2>Mensaje preparado</h2>
            <p>
              Hemos abierto tu aplicación de correo con el mensaje listo para enviar. Si no se ha abierto, escríbenos directamente a{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
            <button
              type="button"
              className="btn btn--oscuro"
              onClick={() => {
                setDatos(INICIAL);
                setEnviado(false);
              }}
            >
              Escribir otro mensaje
            </button>
          </div>
        ) : (
          <form onSubmit={enviar} noValidate>
            <div className="campo">
              <label htmlFor="nombre">Nombre</label>
              <input id="nombre" name="nombre" value={datos.nombre} onChange={cambiar} autoComplete="name" aria-invalid={!!errores.nombre} aria-describedby="error-nombre" />
              {errores.nombre && <span id="error-nombre" className="campo__error">{errores.nombre}</span>}
            </div>

            <div className="campo">
              <label htmlFor="email">Correo electrónico</label>
              <input id="email" name="email" type="email" value={datos.email} onChange={cambiar} autoComplete="email" aria-invalid={!!errores.email} aria-describedby="error-email" />
              {errores.email && <span id="error-email" className="campo__error">{errores.email}</span>}
            </div>

            <div className="campo-doble">
              <div className="campo">
                <label htmlFor="motivo">Motivo</label>
                <select id="motivo" name="motivo" value={datos.motivo} onChange={cambiar}>
                  {MOTIVOS.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div className="campo">
                <label htmlFor="modulo">Módulo (opcional)</label>
                <select id="modulo" name="modulo" value={datos.modulo} onChange={cambiar}>
                  <option value="">Ninguno en concreto</option>
                  {MODULOS.map((m) => (
                    <option key={m.id} value={m.nombre}>
                      {m.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="campo">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" name="mensaje" rows={6} value={datos.mensaje} onChange={cambiar} aria-invalid={!!errores.mensaje} aria-describedby="error-mensaje" />
              {errores.mensaje && <span id="error-mensaje" className="campo__error">{errores.mensaje}</span>}
            </div>

            <button type="submit" className="btn btn--primario btn--lg btn--bloque">
              Enviar mensaje
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
