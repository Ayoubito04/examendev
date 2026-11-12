import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import TextoCodigo from './TextoCodigo.jsx';
import { Spinner } from './estados/Estados.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { puntuacionesApi } from '../api/puntuaciones.js';
import { formatearPuntos } from '../utils/puntos.js';
import { guardarPartidaPendiente } from '../utils/partidaPendiente.js';

const LETRAS = ['A', 'B', 'C', 'D'];

function mensaje(aciertos, total) {
  const pct = total ? aciertos / total : 0;
  if (pct >= 0.9) return '¡Partida de leyenda!';
  if (pct >= 0.7) return '¡Gran partida!';
  if (pct >= 0.5) return 'Buena partida';
  return 'Sigue entrenando';
}

export default function ResultadosTrivia({ modulo, resumen, onRepetir }) {
  const { usuario } = useAuth();
  const { detalle, puntos, aciertos, total, rachaMax, segundos } = resumen;
  const [envio, setEnvio] = useState({ estado: 'inicial' });
  const enviadoRef = useRef(false);

  const datosPartida = {
    moduloId: modulo.id,
    puntos,
    aciertos,
    total,
    rachaMax,
    segundos,
    preguntas: detalle.map((d) => d.pregunta),
    respuestas: detalle.map((d) => d.elegida),
  };

  const enviar = () => {
    setEnvio({ estado: 'enviando' });
    puntuacionesApi
      .enviarPartida(datosPartida)
      .then((r) => setEnvio({ estado: 'ok', posicion: r.posicionGlobal }))
      .catch((error) => setEnvio({ estado: 'error', error }));
  };

  // Con sesión iniciada, la partida se guarda en el ranking automáticamente (una vez).
  // Sin sesión, se guarda como pendiente para enviarla tras iniciar sesión.
  useEffect(() => {
    if (enviadoRef.current) return;
    enviadoRef.current = true;
    if (usuario) enviar();
    else guardarPartidaPendiente(datosPartida);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sumaBase = detalle.reduce((s, d) => s + d.base, 0);
  const sumaRapidez = detalle.reduce((s, d) => s + d.rapidez, 0);
  const extraRacha = puntos - sumaBase - sumaRapidez;
  const respondidas = detalle.filter((d) => d.elegida !== null);
  const tiempoMedio = respondidas.length ? respondidas.reduce((s, d) => s + d.segundos, 0) / respondidas.length : 0;

  return (
    <section className="resultados-trivia contenedor contenedor--medio">
      <div className="resultados-trivia__cabecera seccion-oscura">
        <span className="pildora">Trivia · {modulo.nombre}</span>
        <h1 className="titulo-display titulo-display--md">{mensaje(aciertos, total)}</h1>
        <p className="resultados-trivia__total">
          <span>{formatearPuntos(puntos)}</span> puntos
        </p>
        <dl className="resultados-trivia__datos">
          <div>
            <dt>Aciertos</dt>
            <dd>
              {aciertos}/{total}
            </dd>
          </div>
          <div>
            <dt>Mejor racha</dt>
            <dd>🔥 {rachaMax}</dd>
          </div>
          <div>
            <dt>Tiempo medio</dt>
            <dd>{tiempoMedio.toLocaleString('es-ES', { maximumFractionDigits: 1 })} s</dd>
          </div>
        </dl>
      </div>

      {/* Estado del envío al ranking */}
      <div className="resultados-trivia__ranking">
        {usuario ? (
          envio.estado === 'enviando' || envio.estado === 'inicial' ? (
            <p className="alerta alerta--info" role="status">
              <Spinner pequeno etiqueta="Guardando" /> Guardando tu puntuación en el ranking…
            </p>
          ) : envio.estado === 'ok' ? (
            <p className="alerta alerta--ok" role="status">
              Puntuación guardada.{envio.posicion ? ` Vas en la posición ${envio.posicion} del ranking global.` : ''}{' '}
              <Link to="/ranking" className="enlace">
                Ver ranking
              </Link>
            </p>
          ) : (
            <div className="alerta alerta--error" role="alert">
              No se ha podido guardar la puntuación: {envio.error?.message}{' '}
              <button type="button" className="btn btn--oscuro btn--sm" onClick={enviar}>
                Reintentar
              </button>
            </div>
          )
        ) : (
          <div className="alerta alerta--info">
            <strong>¿Quieres entrar en el ranking?</strong> Inicia sesión o crea una cuenta y guardaremos esta partida.
            <span className="alerta__acciones">
              <Link to={`/login?volver=${encodeURIComponent('/ranking')}`} className="btn btn--primario btn--sm">
                Iniciar sesión
              </Link>
              <Link to={`/registro?volver=${encodeURIComponent('/ranking')}`} className="btn btn--oscuro btn--sm">
                Crear cuenta
              </Link>
            </span>
          </div>
        )}
      </div>

      <h2 className="subtitulo-seccion">Desglose de puntos</h2>
      <dl className="desglose">
        <div>
          <dt>Puntos base</dt>
          <dd>{formatearPuntos(sumaBase)}</dd>
          <span>100 por acierto</span>
        </div>
        <div>
          <dt>Bonus de rapidez</dt>
          <dd>+{formatearPuntos(sumaRapidez)}</dd>
          <span>hasta 50 por respuesta rápida</span>
        </div>
        <div>
          <dt>Extra por racha</dt>
          <dd>+{formatearPuntos(extraRacha)}</dd>
          <span>×1,5 desde 3 seguidas · ×2 desde 5</span>
        </div>
        <div className="desglose__total">
          <dt>Total</dt>
          <dd>{formatearPuntos(puntos)}</dd>
        </div>
      </dl>

      <div className="tabla-scroll">
        <table className="tabla tabla--desglose">
          <caption className="sr-only">Puntos de cada pregunta</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Pregunta</th>
              <th scope="col">Tiempo</th>
              <th scope="col">Base</th>
              <th scope="col">Rapidez</th>
              <th scope="col">Racha</th>
              <th scope="col">Puntos</th>
            </tr>
          </thead>
          <tbody>
            {detalle.map((d, i) => (
              <tr key={d.pregunta.id} className={d.acierto ? '' : 'fila--fallo'}>
                <td>
                  <span className={`marca ${d.acierto ? 'marca--ok' : 'marca--ko'}`} aria-label={d.acierto ? 'Acierto' : 'Fallo'}>
                    {d.acierto ? '✓' : '✕'}
                  </span>
                  {i + 1}
                </td>
                <th scope="row" className="tabla__pregunta">
                  <TextoCodigo texto={d.pregunta.enunciado} />
                  {!d.acierto && (
                    <span className="tabla__correcta">
                      {d.elegida === null ? 'Sin responder. ' : ''}Correcta: {LETRAS[d.pregunta.correcta]}){' '}
                      <TextoCodigo texto={d.pregunta.opciones[d.pregunta.correcta]} />
                    </span>
                  )}
                </th>
                <td>{d.elegida === null ? '—' : `${d.segundos.toLocaleString('es-ES')} s`}</td>
                <td>{d.base}</td>
                <td>{d.rapidez ? `+${d.rapidez}` : '0'}</td>
                <td>{d.multiplicador > 1 ? `×${String(d.multiplicador).replace('.', ',')}` : '—'}</td>
                <td>
                  <strong>{d.total}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="resultados__acciones">
        <button type="button" className="btn btn--acento" onClick={onRepetir}>
          Jugar otra vez
        </button>
        <Link to="/ranking" className="btn btn--oscuro">
          Ver ranking
        </Link>
        <Link to="/temario" className="btn btn--oscuro">
          Otro módulo
        </Link>
      </div>
    </section>
  );
}
