import { useCallback, useEffect, useState } from 'react';
import TextoCodigo from './TextoCodigo.jsx';
import BloqueRetoCodigo from './BloqueRetoCodigo.jsx';
import { useCountdown } from '../hooks/useCountdown.js';
import { formatearTiempo } from '../utils/quiz.js';
import { MINUTOS_SIMULACRO } from '../config.js';

const SEGUNDOS_SIMULACRO = MINUTOS_SIMULACRO * 60;

const LETRAS = ['A', 'B', 'C', 'D'];

// En todos los modos se elige una opción y se corrige con "Validar".
// 'practica' | 'repaso' → hay que validar para avanzar.
// 'simulacro'           → cronometrado, con mapa de preguntas; se puede saltar una pregunta y volver después.
export default function Quiz({ preguntas, modo, modulo, onTerminar }) {
  const esSimulacro = modo === 'simulacro';
  const [indice, setIndice] = useState(0);
  const [respuestas, setRespuestas] = useState(() => Array(preguntas.length).fill(null));
  const [validadas, setValidadas] = useState(() => Array(preguntas.length).fill(false));

  const terminar = useCallback(
    (segundos) => onTerminar(respuestas, segundos),
    [onTerminar, respuestas],
  );

  const { transcurrido, restante } = useCountdown(
    esSimulacro ? SEGUNDOS_SIMULACRO : null,
    () => terminar(SEGUNDOS_SIMULACRO),
  );

  const pregunta = preguntas[indice];
  const elegida = respuestas[indice];
  const respondida = elegida !== null;
  const validada = validadas[indice];
  const acertada = validada && elegida === pregunta.correcta;
  const esUltima = indice === preguntas.length - 1;
  const sinResponder = respuestas.filter((r) => r === null).length;
  const sinValidar = respuestas.filter((r, i) => r !== null && !validadas[i]).length;

  const elegir = useCallback(
    (opcion) => {
      if (validada) return;
      setRespuestas((prev) => {
        const copia = [...prev];
        copia[indice] = opcion;
        return copia;
      });
    },
    [validada, indice],
  );

  const validar = useCallback(() => {
    if (!respondida || validada) return;
    setValidadas((prev) => {
      const copia = [...prev];
      copia[indice] = true;
      return copia;
    });
  }, [respondida, validada, indice]);

  const finalizar = useCallback(() => {
    if (esSimulacro && sinResponder > 0) {
      const ok = window.confirm(
        `Te quedan ${sinResponder} pregunta${sinResponder === 1 ? '' : 's'} sin responder, que contarán como fallo. ¿Entregar el examen?`,
      );
      if (!ok) return;
    } else if (esSimulacro && sinValidar > 0) {
      const ok = window.confirm(
        `Tienes ${sinValidar} respuesta${sinValidar === 1 ? '' : 's'} sin validar. Se corregirán igualmente al entregar. ¿Entregar el examen?`,
      );
      if (!ok) return;
    }
    terminar(transcurrido);
  }, [esSimulacro, sinResponder, sinValidar, terminar, transcurrido]);

  // En práctica y repaso hay que validar antes de avanzar; en el simulacro se puede saltar.
  const siguiente = useCallback(() => {
    if (!esSimulacro && !validada) return;
    if (esUltima) finalizar();
    else setIndice((i) => i + 1);
  }, [esSimulacro, validada, esUltima, finalizar]);

  const anterior = useCallback(() => setIndice((i) => Math.max(0, i - 1)), []);

  // Atajos: 1-4 o A-D para elegir · Enter valida (o avanza si ya está validada) · → siguiente · ← anterior.
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
      } else if (e.key === 'Enter') {
        // Si el foco está en un botón de navegación, que actúe ese botón.
        if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('opcion')) return;
        e.preventDefault();
        if (respondida && !validada) validar();
        else siguiente();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        siguiente();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        anterior();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pregunta, elegir, validar, siguiente, anterior, respondida, validada]);

  const progreso = ((indice + 1) / preguntas.length) * 100;
  // Aviso visual en los últimos 5 minutos del simulacro.
  const tiempoJusto = esSimulacro && restante !== null && restante <= 5 * 60;
  const textoSiguiente = esUltima ? (esSimulacro ? 'Entregar examen' : 'Ver resultado') : 'Siguiente';

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

      <BloqueRetoCodigo
        pregunta={pregunta}
        opcionElegida={elegida !== null ? pregunta.opciones[elegida] : null}
        corregida={validada}
        esCorrecta={acertada}
      />

      <div className="opciones" role="radiogroup" aria-label="Opciones de respuesta">
        {pregunta.opciones.map((opcion, i) => {
          let estado = '';
          if (validada) {
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
              disabled={validada}
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

      <div className="quiz__navegacion">
        <button type="button" className="btn btn--oscuro" onClick={anterior} disabled={indice === 0}>
          Anterior
        </button>

        <div className="quiz__navegacion-derecha">
          {esSimulacro && !esUltima && (
            <button type="button" className="btn btn--fantasma" onClick={finalizar}>
              Entregar
            </button>
          )}

          {!validada ? (
            <>
              {esSimulacro && (
                <button type="button" className="btn btn--oscuro" onClick={siguiente}>
                  {esUltima ? 'Entregar examen' : 'Saltar'}
                </button>
              )}
              <button
                type="button"
                className="btn btn--primario btn--validar"
                onClick={validar}
                disabled={!respondida}
                title={respondida ? undefined : 'Elige una respuesta para poder validarla'}
              >
                Validar
              </button>
            </>
          ) : (
            <button type="button" className="btn btn--primario" onClick={siguiente}>
              {textoSiguiente}
            </button>
          )}
        </div>
      </div>

      {validada && acertada && (
        <div className="feedback feedback--ok" role="status">
          <strong>¡Correcto!</strong> <TextoCodigo texto={pregunta.explicacion} />
        </div>
      )}

      {validada && !acertada && (
        <div className="recordatorio" role="status">
          <div className="recordatorio__cabecera">
            <span className="recordatorio__icono" aria-hidden="true">
              !
            </span>
            <span>Recordatorio</span>
          </div>
          <p className="recordatorio__veredicto">
            Has respondido{' '}
            <strong className="texto-ko">
              <TextoCodigo texto={pregunta.opciones[elegida]} />
            </strong>
            , pero no es correcta.
          </p>
          <p className="recordatorio__correcta">
            <span className="texto-suave">La respuesta correcta es</span>
            <span className="recordatorio__respuesta">
              <span className="recordatorio__letra">{LETRAS[pregunta.correcta]}</span>
              <span>
                <TextoCodigo texto={pregunta.opciones[pregunta.correcta]} />
              </span>
            </span>
          </p>
          <p className="recordatorio__explicacion">
            <TextoCodigo texto={pregunta.explicacion} />
          </p>
        </div>
      )}

      {esSimulacro && (
        <nav className="mapa" aria-label="Ir a una pregunta">
          {preguntas.map((p, i) => {
            let estado = '';
            let etiqueta = '';
            if (validadas[i]) {
              const ok = respuestas[i] === p.correcta;
              estado = ok ? 'mapa__punto--ok' : 'mapa__punto--ko';
              etiqueta = ok ? ', acertada' : ', fallada';
            } else if (respuestas[i] !== null) {
              estado = 'mapa__punto--respondida';
              etiqueta = ', respondida sin validar';
            }
            return (
              <button
                key={p.id}
                type="button"
                className={`mapa__punto ${estado} ${i === indice ? 'mapa__punto--actual' : ''}`}
                onClick={() => setIndice(i)}
                aria-label={`Pregunta ${i + 1}${etiqueta}`}
                aria-current={i === indice ? 'step' : undefined}
              >
                {i + 1}
              </button>
            );
          })}
        </nav>
      )}

      <p className="quiz__atajos">
        Atajos: <kbd>1</kbd>–<kbd>4</kbd> para elegir · <kbd>Enter</kbd> validar y después siguiente · <kbd>←</kbd> anterior
      </p>
    </section>
  );
}
