import { useSearchParams } from 'react-router-dom';
import ModuloCard from '../components/ModuloCard.jsx';
import { GRUPOS, MODULOS } from '../data/index.js';
import { useProgress } from '../context/ProgressContext.jsx';

const FILTROS = [{ id: 'todos', nombre: 'Todos' }, ...GRUPOS];

export default function Temario() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { statsModulo } = useProgress();
  const grupo = GRUPOS.some((g) => g.id === searchParams.get('grupo')) ? searchParams.get('grupo') : 'todos';

  const gruposVisibles = grupo === 'todos' ? GRUPOS : GRUPOS.filter((g) => g.id === grupo);

  const cambiarFiltro = (id) => {
    setSearchParams(id === 'todos' ? {} : { grupo: id }, { replace: true });
  };

  return (
    <section className="temario contenedor">
      <span className="pildora">Paso 1 · Elige módulo</span>
      <h1 className="titulo-display titulo-display--md">¿Qué módulo quieres practicar hoy?</h1>
      <p className="lead">Cada módulo tiene su propio banco de preguntas tipo test, con corrección al instante.</p>

      <div className="filtros" role="tablist" aria-label="Filtrar módulos">
        {FILTROS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={grupo === f.id}
            className={`filtro ${grupo === f.id ? 'filtro--activo' : ''}`}
            onClick={() => cambiarFiltro(f.id)}
          >
            {f.nombre}
          </button>
        ))}
      </div>

      {gruposVisibles.map((g) => (
        <div key={g.id} className="temario__grupo">
          <h2 className="temario__grupo-titulo">{g.nombre}</h2>
          <div className="rejilla-modulos">
            {MODULOS.filter((m) => m.grupo === g.id).map((m) => (
              <ModuloCard key={m.id} modulo={m} stats={statsModulo(m.id)} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
