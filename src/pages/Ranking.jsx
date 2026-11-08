import { useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Avatar from '../components/Avatar.jsx';
import { EstadoError, EstadoVacio, Esqueleto } from '../components/estados/Estados.jsx';
import { CICLOS, MODULOS, getModulo } from '../data/index.js';
import { useAuth } from '../context/AuthContext.jsx';
import { usePeticion } from '../hooks/usePeticion.js';
import { puntuacionesApi } from '../api/puntuaciones.js';
import { USAR_MOCK } from '../api/config.js';
import { formatearPuntos } from '../utils/puntos.js';
import { inicioDeSemana } from '../utils/estadisticas.js';

const PESTANAS = [
  { id: 'global', nombre: 'Global' },
  { id: 'modulo', nombre: 'Por módulo' },
  { id: 'semanal', nombre: 'Semanal' },
];

const MEDALLAS = ['🥇', '🥈', '🥉'];

function Fila({ fila, esYo }) {
  return (
    <tr className={esYo ? 'fila--yo' : undefined} aria-current={esYo ? 'true' : undefined}>
      <td className="ranking__pos">{fila.posicion <= 3 ? <span aria-label={`Posición ${fila.posicion}`}>{MEDALLAS[fila.posicion - 1]}</span> : fila.posicion}</td>
      <th scope="row">
        <span className="ranking__usuario">
          <Avatar id={fila.usuario.avatar} tamano={32} />
          <span>
            {fila.usuario.nick}
            {esYo && <span className="etiqueta etiqueta--ok ranking__tu">Tú</span>}
          </span>
        </span>
      </th>
      <td className="ranking__puntos">{formatearPuntos(fila.puntos)}</td>
      <td>{fila.partidas}</td>
      <td>🔥 {fila.mejorRacha}</td>
    </tr>
  );
}

export default function Ranking() {
  const { usuario } = useAuth();
  const [params, setParams] = useSearchParams();
  const tipo = PESTANAS.some((p) => p.id === params.get('tipo')) ? params.get('tipo') : 'global';
  const ciclo = CICLOS.some((c) => c.sigla === params.get('ciclo')) ? params.get('ciclo') : null;
  const moduloId = getModulo(params.get('modulo')) ? params.get('modulo') : MODULOS[0].id;
  const pestanasRef = useRef([]);

  const { cargando, datos, error, reintentar } = usePeticion(
    () => puntuacionesApi.ranking({ tipo, ciclo, moduloId: tipo === 'modulo' ? moduloId : undefined, limite: 50 }),
    [tipo, ciclo, moduloId, usuario?.id],
  );

  const cambiar = (cambios) => {
    const nuevos = new URLSearchParams(params);
    nuevos.delete('guardada');
    Object.entries(cambios).forEach(([k, v]) => (v ? nuevos.set(k, v) : nuevos.delete(k)));
    setParams(nuevos, { replace: true });
  };

  // Navegación con flechas entre pestañas (patrón ARIA de pestañas).
  const teclaPestana = (e, i) => {
    const total = PESTANAS.length;
    let destino = null;
    if (e.key === 'ArrowRight') destino = (i + 1) % total;
    if (e.key === 'ArrowLeft') destino = (i - 1 + total) % total;
    if (e.key === 'Home') destino = 0;
    if (e.key === 'End') destino = total - 1;
    if (destino !== null) {
      e.preventDefault();
      cambiar({ tipo: PESTANAS[destino].id });
      pestanasRef.current[destino]?.focus();
    }
  };

  const filas = datos?.filas ?? [];
  const yo = datos?.miPosicion;
  const yoVisible = yo && filas.some((f) => f.usuario.id === yo.usuario.id);
  const modulo = getModulo(moduloId);

  return (
    <section className="ranking contenedor">
      <span className="pildora">Ranking</span>
      <h1 className="titulo-display titulo-display--md">
        Los que más <span className="destacado">puntúan</span>
      </h1>
      <p className="lead">Puntos conseguidos en el modo trivia. Cuanto más rápido y más racha, más sumas.</p>

      {params.get('guardada') && (
        <p className="alerta alerta--ok" role="status">
          ¡Tu partida se ha guardado en el ranking!
        </p>
      )}
      {USAR_MOCK && <p className="aviso-demo">Datos de demostración: el ranking incluye jugadores de prueba hasta que se conecte el backend.</p>}

      <div className="ranking__controles">
        <div role="tablist" aria-label="Tipo de ranking" className="pestanas">
          {PESTANAS.map((p, i) => (
            <button
              key={p.id}
              ref={(el) => (pestanasRef.current[i] = el)}
              type="button"
              role="tab"
              id={`pestana-${p.id}`}
              aria-selected={tipo === p.id}
              aria-controls="panel-ranking"
              tabIndex={tipo === p.id ? 0 : -1}
              className={`pestana ${tipo === p.id ? 'pestana--activa' : ''}`}
              onClick={() => cambiar({ tipo: p.id })}
              onKeyDown={(e) => teclaPestana(e, i)}
            >
              {p.nombre}
            </button>
          ))}
        </div>

        <div className="ranking__filtros">
          {tipo === 'modulo' ? (
            <label className="selector">
              <span>Módulo</span>
              <select value={moduloId} onChange={(e) => cambiar({ modulo: e.target.value })}>
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
          ) : (
            <label className="selector">
              <span>Ciclo</span>
              <select value={ciclo ?? ''} onChange={(e) => cambiar({ ciclo: e.target.value })}>
                <option value="">Todos los ciclos</option>
                {CICLOS.map((c) => (
                  <option key={c.id} value={c.sigla}>
                    {c.sigla} · {c.nombre}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      </div>

      <div id="panel-ranking" role="tabpanel" aria-labelledby={`pestana-${tipo}`} className="ranking__panel">
        <p className="ranking__descripcion texto-suave">
          {tipo === 'global' && `Puntos totales de todas las partidas${ciclo ? ` de ${ciclo}` : ''}.`}
          {tipo === 'modulo' && `Puntos totales en ${modulo?.nombre}.`}
          {tipo === 'semanal' &&
            `Puntos desde el lunes ${inicioDeSemana().toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}${ciclo ? ` en ${ciclo}` : ''}. Se reinicia cada semana.`}
        </p>

        {cargando ? (
          <Esqueleto filas={8} alto={52} etiqueta="Cargando el ranking" />
        ) : error ? (
          <EstadoError error={error} onReintentar={reintentar} titulo="No se ha podido cargar el ranking" />
        ) : filas.length === 0 ? (
          <EstadoVacio icono="🏁" titulo="Aún no hay puntuaciones aquí" texto="Juega una partida de trivia y estrena este ranking.">
            <Link to={tipo === 'modulo' ? `/test/${moduloId}?modo=trivia` : '/temario'} className="btn btn--acento">
              Jugar trivia
            </Link>
          </EstadoVacio>
        ) : (
          <>
            <ol className="podio" aria-label="Podio">
              {filas.slice(0, 3).map((f) => (
                <li key={f.usuario.id} className={`podio__puesto podio__puesto--${f.posicion} ${yo?.usuario.id === f.usuario.id ? 'podio__puesto--yo' : ''}`}>
                  <span className="podio__medalla" aria-hidden="true">
                    {MEDALLAS[f.posicion - 1]}
                  </span>
                  <Avatar id={f.usuario.avatar} tamano={f.posicion === 1 ? 64 : 52} />
                  <strong className="podio__nick">{f.usuario.nick}</strong>
                  <span className="podio__puntos">{formatearPuntos(f.puntos)} pts</span>
                </li>
              ))}
            </ol>

            <div className="tabla-scroll">
              <table className="tabla tabla--ranking">
                <caption className="sr-only">Clasificación {PESTANAS.find((p) => p.id === tipo).nombre.toLowerCase()}</caption>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Jugador</th>
                    <th scope="col">Puntos</th>
                    <th scope="col">Partidas</th>
                    <th scope="col">Mejor racha</th>
                  </tr>
                </thead>
                <tbody>
                  {filas.map((f) => (
                    <Fila key={f.usuario.id} fila={f} esYo={yo?.usuario.id === f.usuario.id} />
                  ))}
                </tbody>
              </table>
            </div>

            {yo && !yoVisible && (
              <div className="ranking__mi-posicion">
                <span className="texto-suave">Tu posición</span>
                <table className="tabla tabla--ranking">
                  <tbody>
                    <Fila fila={yo} esYo />
                  </tbody>
                </table>
              </div>
            )}

            {!usuario && (
              <p className="alerta alerta--info">
                <Link to="/login?volver=/ranking" className="enlace">
                  Inicia sesión
                </Link>{' '}
                para aparecer en el ranking con tus partidas de trivia.
              </p>
            )}
            {usuario && !yo && <p className="texto-suave ranking__nota">Todavía no apareces aquí: juega una partida de trivia para entrar.</p>}
          </>
        )}
      </div>
    </section>
  );
}
