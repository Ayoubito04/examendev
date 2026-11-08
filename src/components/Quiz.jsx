import { useCallback, useEffect, useState } from 'react';
import TextoCodigo from './TextoCodigo.jsx';
import { useCountdown } from '../hooks/useCountdown.js';
import { formatearTiempo } from '../utils/quiz.js';
import { SEGUNDOS_POR_PREGUNTA } from '../config.js';

const LETRAS = ['A', 'B', 'C', 'D'];

// modo: 'practica' | 'repaso' (corrección al instante) o 'simulacro' (cronometrado, corrección al final)
export default function Quiz({ preguntas, modo, modulo, onTerminar }) {
  const esSimulacro = modo === 'simulacro';
  const [indice, setIndice] = useState(0);
  const [respuestas, setRespuestas] = useState(() => Array(preguntas.length).fill(null));

  const terminar = useCallback(
    (segundos) => onTerminar(respuestas, segundos),
    [onTerminar, respuestas],
  );

  const { transcurrido, restante } = useCountdown(
    esSimulacro ? preguntas.length * SEGUNDOS_POR_PREGUNTA : null,
    () => terminar(preguntas.length * SEGUNDOS_POR_PREGUNTA),
  );

  const pregunta = preguntas[indice];
  const elegida = respuestas[indice];
  const respondida = elegida !== null;
  const bloqueada = !esSimulacro && respondida;
  const esUltima = indice === preguntas.length - 1;
  const sinResponder = respuestas.filter((r) => r === null).length;

  const elegir = useCallback(
    (opcion) => {
      if (bloqueada) return;
      setRespuestas((prev) => {
        const copia = [...prev];
        copia[indice] = opcion;
        return copia;
      });
    },
    [bloqueada, indice],
  );

  const finalizar = useCallback(() => {
    if (esSimulacro && sinResponder > 0) {
      const ok = window.confirm(
        `Te quedan ${sinResponder} pregunta${sinResponder === 1 ? '' : 's'} sin responder, que contarán como fallo. ¿Entregar el examen?`,
      );
      if (!ok) return;
    }
    terminar(transcurrido);
  }, [esSimulacro, sinResponder, terminar, transcurrido]);

  const siguiente = useCallback(() => {
    if (!esSimulacro && !respondida) return;
    if (esUltima) finalizar();
    else setIndice((i) => i + 1);
  }, [esSimulacro, respondida, esUltima, finalizar]);

  const anterior = useCallback(() => setIndice((i) => Math.max(0, i - 1)), []);

  // Atajos de teclado: 1-4 o A-D para elegir, Enter/→ para avanzar, ← para retroceder.
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest('input, textarea, select')) return;
      const tecla = e.key.toUpperCase();
      const porNumero = ['1', '2', '3', '4'].indexOf(tecla);
      const porLetra = LETRAS.indexOf(tecla);
      const opcion = porNumero >= 0 ? porNumero : porLetra;
      if (opcion >= 0 && opcion < pregunta.opciones.length) {
        e.preventDefault();
        elegir(opcion);
      } else if (e.key === 'Enter' || e.key === 'ArrowRight') {
        if (e.target.tagName === 'BUTTON' && e.key === 'Enter') return;
        e.preventDefault();
        siguiente();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        anterior();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pregunta, elegir, siguiente, anterior]);

  const progreso = ((indice + 1) / preguntas.length) * 100;
  const poderAvanzar = esSimulacro || respondida;
  const tiempoJusto = esSimulacro && restante !== null && restante <= 60;

  return (
    <section className="quiz contenedor contenedor--estrecho">
      <div className="quiz__cabecera">
        <span className="pildora">
          {modulo.nombre}
          {modo === 'repaso' && ' · Repaso'}
          {esSimulacro && ' · Simulacro'}
        </span>
        <div className="quiz__contadores">
          {esSimulacro && (
            <span className={`quiz__reloj ${tiempoJusto ? 'quiz__reloj--alerta' : ''}`} aria-live="polite">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <circle cx="8" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                <path d="M8 6.5V9l1.6 1.2M6.5 1.8h3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              {formatearTiempo(restante)}
            </span>
          )}
          <span className="quiz__numero">
            Pregunta {indice + 1} de {preguntas.length}
          </span>
        </div>
      </div>

      <div
        className="barra"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={preguntas.length}
        aria-valuenow={indice + 1}
        aria-label="Avance del test"
      >
        <span className="barra__relleno" style={{ width: `${progreso}%` }} />
      </div>

      <h1 className="quiz__enunciado" key={pregunta.id}>
        <TextoCodigo texto={pregunta.enunciado} />
      </h1>

      <div className="opciones" role="radiogroup" aria-label="Opciones de respuesta">
        {pregunta.opciones.map((opcion, i) => {
          let estado = '';
          if (bloqueada) {
            if (i === pregunta.correcta) estado = 'opcion--correcta';
            else if (i === elegida) estado = 'opcion--incorrecta';
            else estado = 'opcion--atenuada';
          } else if (i === elegida) {
            estado = 'opcion--elegida';
          }
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={i === elegida}
              className={`opcion ${estado}`}
              onClick={() => elegir(i)}
              disabled={bloqueada}
            >
              <span className="opcion__radio" aria-hidden="true" />
              <span className="opcion__letra" aria-hidden="true">
                {LETRAS[i]}
              </span>
              <span className="opcion__texto">
                <TextoCodigo texto={opcion} />
              </span>
            </button>
          );
        })}
      </div>

      {bloqueada && (
        <div
          className={`feedback ${elegida === pregunta.correcta ? 'feedback--ok' : 'feedback--ko'}`}
          role="status"
        >
          <strong>{elegida === pregunta.correcta ? 'Correcto.' : 'Incorrecto.'}</strong>{' '}
          <TextoCodigo texto={pregunta.explicacion} />
        </div>
      )}

      <div className="quiz__navegacion">
        <button type="button" className="btn btn--oscuro" onClick={anterior} disabled={indice === 0}>
          Anterior
        </button>
        {esSimulacro && !esUltima && (
          <button type="button" className="btn btn--fantasma quiz__entregar" onClick={finalizar}>
            Entregar
          </button>
        )}
        <button type="button" className="btn btn--primario" onClick={siguiente} disabled={!poderAvanzar}>
          {esUltima ? (esSimulacro ? 'Entregar examen' : 'Ver resultado') : 'Siguiente'}
        </button>
      </div>

      {esSimulacro && (
        <nav className="mapa" aria-label="Ir a una pregunta">
          {preguntas.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={`mapa__punto ${respuestas[i] !== null ? 'mapa__punto--respondida' : ''} ${i === indice ? 'mapa__punto--actual' : ''}`}
              onClick={() => setIndice(i)}
              aria-label={`Pregunta ${i + 1}${respuestas[i] !== null ? ', respondida' : ''}`}
              aria-current={i === indice ? 'step' : undefined}
            >
              {i + 1}
            </button>
          ))}
        </nav>
      )}

      <p className="quiz__atajos">
        Atajos: <kbd>1</kbd>–<kbd>4</kbd> para responder · <kbd>Enter</kbd> siguiente · <kbd>←</kbd> anterior
      </p>
    </section>
  );
}
