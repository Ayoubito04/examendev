import { useSearchParams } from 'react-router-dom';
import ModuloCard from '../components/ModuloCard.jsx';
import { CICLOS, MODULOS, SECCIONES, getCiclo, modulosDeCiclo } from '../data/index.js';
import { useProgress } from '../context/ProgressContext.jsx';

const FILTROS = [{ id: 'todos', sigla: 'Todos' }, ...CICLOS];

export default function Temario() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { statsModulo } = useProgress();
  const ciclo = getCiclo(searchParams.get('ciclo'));

  // "Todos": secciones fijas. Un ciclo concreto: sus módulos de 1º y 2º, incluidos los compartidos.
  const secciones = ciclo
    ? [1, 2].map((curso) => ({
        id: `${ciclo.id}-${curso}`,
        titulo: `${curso}º curso`,
        modulos: modulosDeCiclo(ciclo.sigla, curso),
      }))
    : SECCIONES.map((s) => ({ ...s, modulos: modulosDeCiclo(s.ciclo, s.curso) }));

  const cambiarFiltro = (id) => {
    setSearchParams(id === 'todos' ? {} : { ciclo: id }, { replace: true });
  };

  return (
    <section className="temario contenedor">
      <span className="pildora">Paso 1 · Elige módulo</span>
      <h1 className="titulo-display titulo-display--md">¿Qué módulo quieres practicar hoy?</h1>
      <p className="lead">
        {ciclo
          ? `${ciclo.nombre} · ${ciclo.grado}. Cada módulo tiene su propio banco de preguntas con corrección al instante.`
          : `${MODULOS.length} módulos de DAM, DAW, ASIR y SMR. Cada uno tiene su propio banco de preguntas tipo test, con corrección al instante.`}
      </p>

      <div className="filtros" role="tablist" aria-label="Filtrar por ciclo">
        {FILTROS.map((f) => {
          const activo = (ciclo?.id ?? 'todos') === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={activo}
              className={`filtro ${activo ? 'filtro--activo' : ''}`}
              onClick={() => cambiarFiltro(f.id)}
              title={f.nombre}
            >
              {f.sigla}
            </button>
          );
        })}
      </div>

      {secciones.map((s) => (
        <div key={s.id} className="temario__grupo">
          <h2 className="temario__grupo-titulo">{s.titulo}</h2>
          <div className="rejilla-modulos">
            {s.modulos.map((m) => (
              <ModuloCard key={m.id} modulo={m} stats={statsModulo(m.id)} />
            ))}
          </div>
        </div>
      ))}

      <p className="temario__nota texto-suave">
        El reparto de módulos por curso sigue la organización más habitual y puede variar según la comunidad autónoma.
      </p>
    </section>
  );
}
