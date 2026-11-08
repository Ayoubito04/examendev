import TextoCodigo from './TextoCodigo.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import { formatearFecha } from '../utils/quiz.js';

const LETRAS = ['A', 'B', 'C', 'D'];

// Recopilación de todas las preguntas falladas de un módulo, con su respuesta correcta y explicación.
export default function RepasoErrores({ modulo, preguntas, onPracticar, onVolver }) {
  const { infoFallo } = useProgress();

  // Primero las que más veces se han fallado.
  const lista = preguntas
    .map((p) => ({ pregunta: p, info: infoFallo(p.id) }))
    .sort((a, b) => (b.info?.veces ?? 0) - (a.info?.veces ?? 0));

  return (
    <section className="repaso contenedor contenedor--medio">
      <button type="button" className="volver" onClick={onVolver}>
        ← Volver a {modulo.nombre}
      </button>
      <span className="pildora">Repaso de errores</span>
      <h1 className="titulo-display titulo-display--md">Tus fallos en {modulo.nombre}</h1>
      <p className="lead">
        {lista.length} pregunta{lista.length === 1 ? '' : 's'} que has fallado y aún no has vuelto a acertar. Léelas con calma y,
        cuando quieras, ponte a prueba: las que aciertes saldrán de esta lista.
      </p>

      <div className="repaso__acciones">
        <button type="button" className="btn btn--primario" onClick={onPracticar}>
          Practicar estas preguntas
        </button>
        <button type="button" className="btn btn--oscuro" onClick={() => window.print()}>
          Imprimir o guardar en PDF
        </button>
      </div>

      <ol className="repaso__lista">
        {lista.map(({ pregunta: p, info }, n) => (
          <li key={p.id} className="tarjeta repaso__item">
            <div className="repaso__cabecera">
              <span className="repaso__numero">{String(n + 1).padStart(2, '0')}</span>
              {info?.veces > 0 && (
                <span className="etiqueta etiqueta--ko">
                  Fallada {info.veces} {info.veces === 1 ? 'vez' : 'veces'}
                </span>
              )}
              {info?.fecha && <span className="texto-suave repaso__fecha">Último fallo: {formatearFecha(info.fecha)}</span>}
            </div>

            <h2 className="repaso__enunciado">
              <TextoCodigo texto={p.enunciado} />
            </h2>

            <ul className="repaso__opciones">
              {p.opciones.map((opcion, i) => {
                const esCorrecta = i === p.correcta;
                const esTuya = !esCorrecta && info?.ultimaRespuesta === opcion;
                return (
                  <li
                    key={i}
                    className={`repaso__opcion ${esCorrecta ? 'repaso__opcion--ok' : ''} ${esTuya ? 'repaso__opcion--ko' : ''}`}
                  >
                    <span className="repaso__letra">{LETRAS[i]}</span>
                    <span className="repaso__texto">
                      <TextoCodigo texto={opcion} />
                    </span>
                    {esCorrecta && <span className="repaso__marca texto-ok">Correcta</span>}
                    {esTuya && <span className="repaso__marca texto-ko">Tu respuesta</span>}
                  </li>
                );
              })}
            </ul>

            {info?.ultimaRespuesta === null && <p className="repaso__nota texto-suave">La dejaste sin responder.</p>}

            <div className="repaso__explicacion">
              <span className="repaso__explicacion-titulo">Explicación</span>
              <p>
                <TextoCodigo texto={p.explicacion} />
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="repaso__pie">
        <button type="button" className="btn btn--oscuro" onClick={onVolver}>
          Volver
        </button>
        <button type="button" className="btn btn--primario" onClick={onPracticar}>
          Practicar estas preguntas
        </button>
      </div>
    </section>
  );
}
