import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import GraficoRadar from '../components/graficos/GraficoRadar.jsx';
import BarrasTema from '../components/graficos/BarrasTema.jsx';
import { EstadoVacio } from '../components/estados/Estados.jsx';
import { CICLOS, MODULOS, getModulo, modulosDeCiclo, nombreCorto } from '../data/index.js';
import { useProgress } from '../context/ProgressContext.jsx';
import { formatearFecha, formatearNota, formatearTiempo } from '../utils/quiz.js';
import { NOTA_APROBADO } from '../config.js';

const NOMBRE_MODO = { practica: 'Práctica', simulacro: 'Simulacro', repaso: 'Repaso', trivia: 'Trivia' };

// Un tema entra en "a repasar" con al menos 3 respuestas y menos de un 70 % de acierto.
const UMBRAL_REPASO = 70;
const MINIMO_RESPUESTAS = 3;

export default function Progreso() {
  const { intentos, fallos, statsModulo, statsTemas, pctModulo, actualizarProgreso, limpiarFallos, reiniciar } = useProgress();

  useEffect(() => {
    actualizarProgreso();
  }, [actualizarProgreso]);

  // Ciclo con más actividad, para abrir el radar donde interesa.
  const cicloInicial = useMemo(() => {
    const cuenta = Object.fromEntries(CICLOS.map((c) => [c.sigla, 0]));
    intentos.forEach((t) => getModulo(t.moduloId)?.ciclos.forEach((c) => (cuenta[c] += 1)));
    return CICLOS.reduce((a, b) => (cuenta[b.sigla] > cuenta[a.sigla] ? b : a)).sigla;
  }, [intentos]);
  const [cicloElegido, setCiclo] = useState(null);
  const [moduloElegido, setModuloTema] = useState(null);

  const ciclo = cicloElegido ?? cicloInicial;
  const moduloTema = moduloElegido ?? intentos[0]?.moduloId ?? MODULOS[0].id;

  const media = intentos.length ? intentos.reduce((s, t) => s + t.nota, 0) / intentos.length : 0;
  const preguntasRespondidas = intentos.reduce((s, t) => s + t.total, 0);
  const porRepasar = Object.keys(fallos).length;
  const filas = MODULOS.map((m) => ({ modulo: m, stats: statsModulo(m.id) })).filter((f) => f.stats.intentos > 0);

  const ejesRadar = modulosDeCiclo(ciclo).map((m) => ({ id: m.id, etiqueta: nombreCorto(m.id), valor: pctModulo(m.id) }));

  const temasARepasar = useMemo(
    () =>
      MODULOS.flatMap((m) => statsTemas(m.id).map((t) => ({ ...t, modulo: m })))
        .filter((t) => t.respondidas >= MINIMO_RESPUESTAS && t.pct < UMBRAL_REPASO)
        .sort((a, b) => a.pct - b.pct || b.fallos - a.fallos)
        .slice(0, 8),
    [statsTemas],
  );

  const confirmarLimpiarFallos = () => {
    if (window.confirm('Se vaciará la lista de preguntas pendientes de repaso, pero conservarás todos tus tests, notas y estadísticas. ¿Continuar?')) {
      limpiarFallos();
    }
  };

  const confirmarReinicio = () => {
    if (window.confirm('Se borrarán todos tus intentos, fallos y estadísticas guardados. ¿Continuar?')) reiniciar();
  };

  if (!intentos.length) {
    return (
      <section className="progreso contenedor contenedor--estrecho">
        <EstadoVacio
          icono="📈"
          titulo="Todavía no has hecho ningún test"
          texto="Cuando termines tu primer test verás aquí tu dominio por módulo, tus resultados por tema y qué temas te conviene repasar."
        >
          <Link to="/temario" className="btn btn--primario btn--lg">
            Empezar a practicar
          </Link>
        </EstadoVacio>
      </section>
    );
  }

  return (
    <section className="progreso contenedor">
      <span className="pildora">Mi progreso</span>
      <h1 className="titulo-display titulo-display--md">
        Así <span className="destacado">vas</span>
      </h1>
      <p className="lead">Tu progreso se monitoriza y guarda en la base de datos PostgreSQL. Incluye práctica, simulacros, repasos y trivia.</p>

      <dl className="resumen">
        <div className="stat">
          <dt className="stat__etiqueta">Tests realizados</dt>
          <dd className="stat__valor">{intentos.length}</dd>
        </div>
        <div className="stat">
          <dt className="stat__etiqueta">Nota media</dt>
          <dd className={`stat__valor ${media >= NOTA_APROBADO ? 'texto-ok' : 'texto-ko'}`}>{formatearNota(media)}</dd>
        </div>
        <div className="stat">
          <dt className="stat__etiqueta">Preguntas respondidas</dt>
          <dd className="stat__valor">{preguntasRespondidas}</dd>
        </div>
        <div className="stat">
          <dt className="stat__etiqueta">Por repasar</dt>
          <dd className="stat__valor">{porRepasar}</dd>
        </div>
      </dl>

      <div className="progreso__graficos">
        <article className="tarjeta panel">
          <div className="panel__cabecera">
            <h2 className="panel__titulo">Dominio por módulo</h2>
            <div className="segmentos" role="group" aria-label="Ciclo del radar">
              {CICLOS.map((c) => (
                <button key={c.id} type="button" className={`segmento ${ciclo === c.sigla ? 'segmento--activo' : ''}`} aria-pressed={ciclo === c.sigla} onClick={() => setCiclo(c.sigla)}>
                  {c.sigla}
                </button>
              ))}
            </div>
          </div>
          <p className="panel__ayuda texto-suave">% de respuestas correctas en cada módulo de {ciclo}. Los puntos huecos son módulos sin datos.</p>
          <GraficoRadar ejes={ejesRadar} titulo={`Dominio por módulo de ${ciclo}`} />
        </article>

        <article className="tarjeta panel">
          <div className="panel__cabecera">
            <h2 className="panel__titulo">Por tema</h2>
            <label className="selector selector--compacto">
              <span className="sr-only">Módulo</span>
              <select value={moduloTema} onChange={(e) => setModuloTema(e.target.value)}>
                {CICLOS.map((c) => (
                  <optgroup key={c.id} label={c.sigla}>
                    {MODULOS.filter((m) => m.ciclos[0] === c.sigla).map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.nombre}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
          </div>
          <BarrasTema moduloId={moduloTema} temas={statsTemas(moduloTema)} />
        </article>
      </div>

      <h2 className="subtitulo-seccion">Temas a repasar</h2>
      {temasARepasar.length === 0 ? (
        <div className="tarjeta panel">
          <EstadoVacio
            icono="✅"
            titulo="Ningún tema en zona roja"
            texto={`Aquí aparecerán los temas con menos de un ${UMBRAL_REPASO} % de acierto (a partir de ${MINIMO_RESPUESTAS} respuestas).`}
          />
        </div>
      ) : (
        <ul className="temas-repaso">
          {temasARepasar.map((t) => (
            <li key={`${t.modulo.id}-${t.indice}`} className="tema-repaso tarjeta">
              <div className="tema-repaso__info">
                <span className="tema-repaso__modulo">{t.modulo.nombre}</span>
                <strong>{t.nombre}</strong>
                <span className="texto-suave">
                  {t.aciertos} de {t.respondidas} correctas
                </span>
              </div>
              <span className={`tema-repaso__pct ${t.pct < 50 ? 'texto-ko' : 'tema-repaso__pct--medio'}`}>{t.pct} %</span>
              <Link to={`/test/${t.modulo.id}?tema=${t.indice}`} className="btn btn--primario btn--sm">
                Practicar
              </Link>
            </li>
          ))}
        </ul>
      )}

      <h2 className="subtitulo-seccion">Por módulo</h2>
      <div className="tabla-scroll">
        <table className="tabla">
          <thead>
            <tr>
              <th scope="col">Módulo</th>
              <th scope="col">Intentos</th>
              <th scope="col">Acierto</th>
              <th scope="col">Mejor nota</th>
              <th scope="col">Por repasar</th>
              <th scope="col">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filas.map(({ modulo, stats }) => {
              const pct = pctModulo(modulo.id);
              return (
                <tr key={modulo.id}>
                  <th scope="row">
                    {modulo.nombre}
                    <span className="tabla__ciclos">{modulo.ciclos.join(' · ')}</span>
                  </th>
                  <td>{stats.intentos}</td>
                  <td>{pct === null ? '—' : `${pct} %`}</td>
                  <td>
                    <span className={`nota ${stats.mejorNota >= NOTA_APROBADO ? 'nota--ok' : 'nota--ko'}`}>{formatearNota(stats.mejorNota)}</span>
                  </td>
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
              );
            })}
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
                {NOMBRE_MODO[t.modo] ?? t.modo} · {formatearFecha(t.fecha)} · {formatearTiempo(t.segundos)}
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
        <button type="button" className="btn btn--oscuro btn--sm" onClick={actualizarProgreso}>
          Actualizar progreso
        </button>
        {porRepasar > 0 && (
          <button type="button" className="btn btn--oscuro btn--sm" onClick={confirmarLimpiarFallos}>
            Vaciar fallos pendientes ({porRepasar})
          </button>
        )}
        <button type="button" className="btn btn--fantasma btn--sm" onClick={confirmarReinicio}>
          Borrar todo el historial
        </button>
      </div>
    </section>
  );
}
