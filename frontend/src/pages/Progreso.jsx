import { Link } from 'react-router-dom';
import { MODULOS, getModulo } from '../data/index.js';
import { useProgress } from '../context/ProgressContext.jsx';
import { formatearFecha, formatearNota, formatearTiempo } from '../utils/quiz.js';
import { NOTA_APROBADO } from '../config.js';

const NOMBRE_MODO = { practica: 'Práctica', simulacro: 'Simulacro', repaso: 'Repaso' };

export default function Progreso() {
  const { intentos, fallos, statsModulo, reiniciar } = useProgress();

  const media = intentos.length ? intentos.reduce((s, t) => s + t.nota, 0) / intentos.length : 0;
  const preguntasRespondidas = intentos.reduce((s, t) => s + t.total, 0);
  const porRepasar = Object.keys(fallos).length;
  const filas = MODULOS.map((m) => ({ modulo: m, stats: statsModulo(m.id) })).filter((f) => f.stats.intentos > 0);

  const confirmarReinicio = () => {
    if (window.confirm('Se borrarán todos tus intentos y fallos guardados en este navegador. ¿Continuar?')) reiniciar();
  };

  if (!intentos.length) {
    return (
      <section className="progreso contenedor contenedor--estrecho vacio">
        <span className="pildora">Mi progreso</span>
        <h1 className="titulo-display titulo-display--md">Todavía no has hecho ningún test</h1>
        <p className="lead">Cuando termines tu primer test verás aquí tus notas por módulo, tu historial y las preguntas pendientes de repaso.</p>
        <div className="acciones-centradas">
          <Link to="/temario" className="btn btn--primario btn--lg">
            Empezar a practicar
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="progreso contenedor">
      <span className="pildora">Mi progreso</span>
      <h1 className="titulo-display titulo-display--md">Así vas</h1>
      <p className="lead">Tu progreso se guarda en este navegador.</p>

      <div className="resumen">
        <div className="stat">
          <span className="stat__etiqueta">Tests realizados</span>
          <span className="stat__valor">{intentos.length}</span>
        </div>
        <div className="stat">
          <span className="stat__etiqueta">Nota media</span>
          <span className={`stat__valor ${media >= NOTA_APROBADO ? 'texto-ok' : 'texto-ko'}`}>{formatearNota(media)}</span>
        </div>
        <div className="stat">
          <span className="stat__etiqueta">Preguntas respondidas</span>
          <span className="stat__valor">{preguntasRespondidas}</span>
        </div>
        <div className="stat">
          <span className="stat__etiqueta">Por repasar</span>
          <span className="stat__valor">{porRepasar}</span>
        </div>
      </div>

      <h2 className="subtitulo-seccion">Por módulo</h2>
      <div className="tabla-scroll">
        <table className="tabla">
          <thead>
            <tr>
              <th scope="col">Módulo</th>
              <th scope="col">Intentos</th>
              <th scope="col">Mejor nota</th>
              <th scope="col">Última nota</th>
              <th scope="col">Por repasar</th>
              <th scope="col">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filas.map(({ modulo, stats }) => (
              <tr key={modulo.id}>
                <th scope="row">
                  {modulo.nombre}
                  <span className="tabla__ciclos">{modulo.ciclos.join(' · ')}</span>
                </th>
                <td>{stats.intentos}</td>
                <td>
                  <span className={`nota ${stats.mejorNota >= NOTA_APROBADO ? 'nota--ok' : 'nota--ko'}`}>{formatearNota(stats.mejorNota)}</span>
                </td>
                <td>{formatearNota(stats.ultimaNota)}</td>
                <td>{stats.pendientes.length}</td>
                <td className="tabla__acciones">
                  {stats.pendientes.length > 0 && (
                    <Link to={`/test/${modulo.id}?modo=repaso`} className="btn btn--primario btn--sm">
                      Repasar
                    </Link>
                  )}
                  <Link to={`/test/${modulo.id}`} className="btn btn--oscuro btn--sm">
                    Practicar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="subtitulo-seccion">Últimos intentos</h2>
      <ul className="historial">
        {intentos.slice(0, 12).map((t) => (
          <li key={t.id} className="historial__item">
            <div>
              <strong>{getModulo(t.moduloId)?.nombre ?? t.moduloId}</strong>
              <span className="texto-suave">
                {NOMBRE_MODO[t.modo]} · {formatearFecha(t.fecha)} · {formatearTiempo(t.segundos)}
              </span>
            </div>
            <div className="historial__resultado">
              <span className="texto-suave">
                {t.aciertos}/{t.total}
              </span>
              <span className={`nota ${t.nota >= NOTA_APROBADO ? 'nota--ok' : 'nota--ko'}`}>{formatearNota(t.nota)}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="progreso__pie">
        <button type="button" className="btn btn--fantasma btn--sm" onClick={confirmarReinicio}>
          Reiniciar progreso
        </button>
      </div>
    </section>
  );
}
