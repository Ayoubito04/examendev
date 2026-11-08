import { Link } from 'react-router-dom';
import AnilloProgreso from './AnilloProgreso.jsx';
import TextoCodigo from './TextoCodigo.jsx';
import { formatearNota, formatearTiempo, mensajePorNota } from '../utils/quiz.js';
import { NOTA_APROBADO } from '../config.js';

export default function Resultados({ modulo, modo, preguntas, respuestas, resultado, segundos, onRepetir, onRepasarFallos }) {
  const aprobado = resultado.nota >= NOTA_APROBADO;
  const etiquetaModo = { practica: 'Práctica', simulacro: 'Simulacro', repaso: 'Repaso de fallos' }[modo];

  return (
    <section className="resultados contenedor contenedor--estrecho">
      <div className="resultados__cabecera">
        <span className="pildora">
          Test completado · {modulo.nombre}
        </span>
        <h1 className="titulo-display titulo-display--md">{mensajePorNota(resultado.nota)}</h1>

        <AnilloProgreso valor={resultado.aciertos} total={resultado.total} />

        <p className="resultados__subtitulo">
          {resultado.fallos > 0
            ? 'Repasa tus fallos para reforzar los temas más débiles antes del examen.'
            : 'Sin un solo fallo. Prueba otro módulo o haz un simulacro cronometrado.'}
        </p>
      </div>

      <div className="resultados__stats">
        <div className="stat">
          <span className="stat__etiqueta">Aciertos</span>
          <span className="stat__valor">{resultado.aciertos}</span>
        </div>
        <div className="stat">
          <span className="stat__etiqueta">Fallos</span>
          <span className="stat__valor">{resultado.fallos}</span>
        </div>
        <div className="stat">
          <span className="stat__etiqueta">Nota</span>
          <span className={`stat__valor ${aprobado ? 'texto-ok' : 'texto-ko'}`}>{formatearNota(resultado.nota)}</span>
        </div>
        <div className="stat">
          <span className="stat__etiqueta">Tiempo · {etiquetaModo}</span>
          <span className="stat__valor">{formatearTiempo(segundos)}</span>
        </div>
      </div>

      <div className="resultados__acciones">
        {resultado.fallos > 0 && (
          <button type="button" className="btn btn--primario" onClick={onRepasarFallos}>
            Repasar mis fallos
          </button>
        )}
        <button type="button" className="btn btn--oscuro" onClick={onRepetir}>
          Hacer otro test
        </button>
        <Link to="/temario" className="btn btn--oscuro">
          Otro módulo
        </Link>
      </div>

      <div className="correccion">
        <h2 className="correccion__titulo">Corrección</h2>
        <ol className="correccion__lista">
          {preguntas.map((p, i) => {
            const elegida = respuestas[i];
            const ok = elegida === p.correcta;
            return (
              <li key={p.id} className={`correccion__item ${ok ? 'correccion__item--ok' : 'correccion__item--ko'}`}>
                <details open={!ok}>
                  <summary>
                    <span className="correccion__icono" aria-label={ok ? 'Acertada' : 'Fallada'}>
                      {ok ? '✓' : '✕'}
                    </span>
                    <span className="correccion__enunciado">
                      <TextoCodigo texto={p.enunciado} />
                    </span>
                  </summary>
                  <div className="correccion__detalle">
                    {!ok && (
                      <p>
                        <span className="texto-suave">Tu respuesta: </span>
                        {elegida === null ? <em>Sin responder</em> : <TextoCodigo texto={p.opciones[elegida]} />}
                      </p>
                    )}
                    <p>
                      <span className="texto-suave">Respuesta correcta: </span>
                      <strong>
                        <TextoCodigo texto={p.opciones[p.correcta]} />
                      </strong>
                    </p>
                    <p className="correccion__explicacion">
                      <TextoCodigo texto={p.explicacion} />
                    </p>
                  </div>
                </details>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
