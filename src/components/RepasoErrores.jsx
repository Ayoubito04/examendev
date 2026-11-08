import TextoCodigo from './TextoCodigo.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import { formatearFecha } from '../utils/quiz.js';

const LETRAS = ['A', 'B', 'C', 'D'];

// Recopilación acumulada de todas las preguntas falladas de un módulo,
// con su respuesta correcta y explicación.
export default function RepasoErrores({ modulo, preguntas, onPracticar, onVolver }) {
  const { infoFallo, marcarDominada } = useProgress();

  // Primero las que siguen sin acertarse; dentro de cada grupo, las que más veces se han fallado.
  const lista = preguntas
    .map((p) => ({ pregunta: p, info: infoFallo(p.id) }))
    .sort((a, b) => {
      const ya = (a.info?.aciertosDespues ?? 0) > 0;
      const yb = (b.info?.aciertosDespues ?? 0) > 0;
      if (ya !== yb) return ya ? 1 : -1;
      return (b.info?.veces ?? 0) - (a.info?.veces ?? 0);
    });

  const sinAcertar = lista.filter(({ info }) => !(info?.aciertosDespues > 0)).length;

  return (
    <section className="repaso contenedor contenedor--medio">
      <button type="button" className="volver" onClick={onVolver}>
        ← Volver a {modulo.nombre}
      </button>
      <span className="pildora">Repaso de errores</span>
      <h1 className="titulo-display titulo-display--md">Tus fallos en {modulo.nombre}</h1>
      <p className="lead">
        {lista.length} pregunta{lista.length === 1 ? '' : 's'} fallada{lista.length === 1 ? '' : 's'} en tus tests
        {sinAcertar < lista.length && ` (${lista.length - sinAcertar} ya acertada${lista.length - sinAcertar === 1 ? '' : 's'} después)`}.
        Se quedan aquí hasta que las aciertes practicando el repaso o pulses «Ya la domino».
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
        {lista.map(({ pregunta: p, info }, n) => {
          const acertadaDespues = (info?.aciertosDespues ?? 0) > 0;
          return (
            <li key={p.id} className={`tarjeta repaso__item ${acertadaDespues ? 'repaso__item--acertada' : ''}`}>
              <div className="repaso__cabecera">
                <span className="repaso__numero">{String(n + 1).padStart(2, '0')}</span>
                {info?.veces > 0 && (
                  <span className="etiqueta etiqueta--ko">
                    Fallada {info.veces} {info.veces === 1 ? 'vez' : 'veces'}
                  </span>
                )}
                {acertadaDespues && (
                  <span className="etiqueta etiqueta--ok" title={info.ultimoAcierto ? `Último acierto: ${formatearFecha(info.ultimoAcierto)}` : undefined}>
                    ✓ Acertada después{info.aciertosDespues > 1 ? ` (${info.aciertosDespues})` : ''}
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

              <div className="repaso__item-pie">
                <button type="button" className="btn btn--fantasma btn--sm" onClick={() => marcarDominada(p.id)}>
                  ✓ Ya la domino
                </button>
              </div>
            </li>
          );
        })}
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
