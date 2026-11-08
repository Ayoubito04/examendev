import { useCallback, useEffect, useRef, useState } from 'react';
import TextoCodigo from './TextoCodigo.jsx';
import { TRIVIA, calcularPuntos, formatearPuntos, multiplicadorDeRacha } from '../utils/puntos.js';

const LETRAS = ['A', 'B', 'C', 'D'];
const LIMITE_MS = TRIVIA.segundosPorPregunta * 1000;

// Número que sube poco a poco hasta su valor (contador de puntos).
function useContador(objetivo, duracion = 500) {
  const [valor, setValor] = useState(objetivo);
  const desde = useRef(objetivo);
  useEffect(() => {
    const inicio = performance.now();
    const origen = desde.current;
    let raf;
    const paso = (t) => {
      const p = Math.min(1, (t - inicio) / duracion);
      setValor(Math.round(origen + (objetivo - origen) * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(paso);
      else desde.current = objetivo;
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [objetivo, duracion]);
  return valor;
}

export default function Trivia({ preguntas, modulo, onTerminar }) {
  const [indice, setIndice] = useState(0);
  const [elegida, setElegida] = useState(null);
  const [respondida, setRespondida] = useState(false);
  const [restante, setRestante] = useState(LIMITE_MS);
  const [puntos, setPuntos] = useState(0);
  const [racha, setRacha] = useState(0);
  const [rachaMax, setRachaMax] = useState(0);
  const [detalle, setDetalle] = useState([]);
  const [ultimo, setUltimo] = useState(null); // puntos de la última respuesta, para la animación
  const inicioRef = useRef(performance.now());
  const inicioPartida = useRef(Date.now());
  const siguienteRef = useRef(null);

  const pregunta = preguntas[indice];
  const esUltima = indice === preguntas.length - 1;
  const puntosVisibles = useContador(puntos);

  const responder = useCallback(
    (opcion) => {
      if (respondida) return;
      const usadoMs = Math.min(LIMITE_MS, performance.now() - inicioRef.current);
      const segundosRestantes = Math.max(0, (LIMITE_MS - usadoMs) / 1000);
      const acierto = opcion !== null && opcion === pregunta.correcta;
      const nuevaRacha = acierto ? racha + 1 : 0;
      const p = calcularPuntos({ acierto, segundosRestantes, racha: nuevaRacha });
      setElegida(opcion);
      setRespondida(true);
      setRestante(LIMITE_MS - usadoMs);
      setRacha(nuevaRacha);
      setRachaMax((m) => Math.max(m, nuevaRacha));
      setPuntos((t) => t + p.total);
      setUltimo({ ...p, acierto, clave: indice, agotado: opcion === null });
      setDetalle((d) => [...d, { pregunta, elegida: opcion, acierto, segundos: Math.round(usadoMs / 100) / 10, racha: nuevaRacha, ...p }]);
    },
    [respondida, pregunta, racha, indice],
  );

  // Temporizador de la pregunta actual.
  useEffect(() => {
    if (respondida) return undefined;
    inicioRef.current = performance.now();
    setRestante(LIMITE_MS);
    const id = setInterval(() => {
      const quedan = LIMITE_MS - (performance.now() - inicioRef.current);
      if (quedan <= 0) {
        clearInterval(id);
        responder(null);
      } else {
        setRestante(quedan);
      }
    }, 100);
    return () => clearInterval(id);
    // Solo se reinicia al cambiar de pregunta o al volver a la fase de responder.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indice, respondida]);

  // Lleva el foco a "Siguiente" al responder, para avanzar con Enter.
  useEffect(() => {
    if (respondida) siguienteRef.current?.focus();
  }, [respondida]);

  const siguiente = useCallback(() => {
    if (!respondida) return;
    if (esUltima) {
      const aciertos = detalle.filter((d) => d.acierto).length;
      onTerminar({
        detalle,
        puntos,
        aciertos,
        total: preguntas.length,
        rachaMax,
        segundos: Math.round((Date.now() - inicioPartida.current) / 1000),
      });
      return;
    }
    setIndice((i) => i + 1);
    setElegida(null);
    setRespondida(false);
  }, [respondida, esUltima, detalle, puntos, preguntas.length, rachaMax, onTerminar]);

  // Atajos: 1-4 / A-D para responder.
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest('input, textarea, select')) return;
      const t = e.key.toUpperCase();
      const op = ['1', '2', '3', '4'].indexOf(t) >= 0 ? ['1', '2', '3', '4'].indexOf(t) : LETRAS.indexOf(t);
      if (!respondida && op >= 0 && op < pregunta.opciones.length) {
        e.preventDefault();
        responder(op);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [respondida, pregunta, responder]);

  const segundos = Math.ceil(restante / 1000);
  const proporcion = restante / LIMITE_MS;
  const urgente = !respondida && segundos <= 5;
  const multiplicador = multiplicadorDeRacha(racha);

  return (
    <section className="trivia contenedor contenedor--estrecho">
      <div className="trivia__marcador">
        <div className="trivia__dato">
          <span className="trivia__etiqueta">Puntos</span>
          <span className={`trivia__puntos ${ultimo?.total ? 'trivia__puntos--sube' : ''}`} key={`p${ultimo?.clave}`}>
            {formatearPuntos(puntosVisibles)}
          </span>
        </div>
        <div className={`trivia__racha ${racha >= 3 ? 'trivia__racha--activa' : ''}`} aria-label={`Racha de ${racha} aciertos`}>
          <span className="trivia__llama" aria-hidden="true">
            🔥
          </span>
          <span>
            <strong>{racha}</strong> seguidas
          </span>
          {multiplicador > 1 && <span className="trivia__multi">×{String(multiplicador).replace('.', ',')}</span>}
        </div>
        <div className="trivia__dato trivia__dato--derecha">
          <span className="trivia__etiqueta">{modulo.nombre}</span>
          <span className="trivia__contador">
            {indice + 1}/{preguntas.length}
          </span>
        </div>
      </div>

      <div
        className={`trivia__tiempo ${urgente ? 'trivia__tiempo--urgente' : ''}`}
        role="timer"
        aria-label={`Quedan ${segundos} segundos`}
      >
        <span className="trivia__tiempo-barra" style={{ transform: `scaleX(${proporcion})` }} />
        <span className="trivia__segundos" aria-hidden="true">
          {respondida ? '—' : `${segundos}s`}
        </span>
      </div>

      <h1 className="quiz__enunciado trivia__enunciado" key={pregunta.id}>
        <TextoCodigo texto={pregunta.enunciado} />
      </h1>

      <div className="opciones trivia__opciones" role="group" aria-label="Opciones de respuesta">
        {pregunta.opciones.map((opcion, i) => {
          let estado = '';
          if (respondida) {
            if (i === pregunta.correcta) estado = 'opcion--correcta';
            else if (i === elegida) estado = 'opcion--incorrecta trivia__opcion--error';
            else estado = 'opcion--atenuada';
          }
          return (
            <button key={i} type="button" className={`opcion trivia__opcion ${estado}`} onClick={() => responder(i)} disabled={respondida}>
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

      <div className="trivia__feedback" aria-live="assertive">
        {respondida && ultimo && (
          <div className={`trivia__resultado ${ultimo.acierto ? 'trivia__resultado--ok' : 'trivia__resultado--ko'}`} key={ultimo.clave}>
            {ultimo.acierto ? (
              <>
                <span className="trivia__flotante" aria-hidden="true">
                  +{ultimo.total}
                </span>
                <strong>¡Correcto! +{ultimo.total} puntos</strong>
                <span className="trivia__calculo">
                  {ultimo.base} base + {ultimo.rapidez} rapidez
                  {ultimo.multiplicador > 1 && ` × ${String(ultimo.multiplicador).replace('.', ',')} racha`}
                </span>
              </>
            ) : (
              <>
                <strong>{ultimo.agotado ? '¡Se acabó el tiempo!' : 'Incorrecto'}</strong>
                <span className="trivia__calculo">
                  La correcta era <TextoCodigo texto={pregunta.opciones[pregunta.correcta]} />. La racha vuelve a 0.
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {respondida && (
        <div className="trivia__pie">
          <p className="trivia__explicacion">
            <TextoCodigo texto={pregunta.explicacion} />
          </p>
          <button type="button" ref={siguienteRef} className="btn btn--acento btn--lg" onClick={siguiente}>
            {esUltima ? 'Ver resultados' : 'Siguiente pregunta'}
          </button>
        </div>
      )}

      <p className="quiz__atajos">
        Atajos: <kbd>1</kbd>–<kbd>4</kbd> para responder · <kbd>Enter</kbd> siguiente
      </p>
    </section>
  );
}
