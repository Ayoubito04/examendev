import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Quiz from '../components/Quiz.jsx';
import Resultados from '../components/Resultados.jsx';
import RepasoErrores from '../components/RepasoErrores.jsx';
import NoEncontrado from './NoEncontrado.jsx';
import { PREGUNTAS, PREGUNTA_POR_ID, getModulo } from '../data/index.js';
import { useProgress } from '../context/ProgressContext.jsx';
import { corregir, crearTest } from '../utils/quiz.js';
import { MINUTOS_SIMULACRO, PREGUNTAS_POR_EXAMEN } from '../config.js';

const MODOS = [
  {
    id: 'practica',
    titulo: 'Práctica',
    texto: `Examen de ${PREGUNTAS_POR_EXAMEN} preguntas. Valida cada respuesta y ve la explicación al momento. Sin límite de tiempo.`,
  },
  {
    id: 'simulacro',
    titulo: 'Simulacro de examen',
    texto: `Examen de ${PREGUNTAS_POR_EXAMEN} preguntas en ${MINUTOS_SIMULACRO} minutos. Valida cada respuesta o sáltala y vuelve después.`,
  },
  {
    id: 'repaso',
    titulo: 'Repasar mis fallos',
    texto: 'Todas las preguntas que has fallado, con la respuesta correcta y su explicación. Después puedes practicarlas.',
  },
];

// Se remonta al cambiar de módulo o de parámetros para no arrastrar el estado de otro test.
export default function Test() {
  const { moduloId } = useParams();
  const [searchParams] = useSearchParams();
  return <TestModulo key={`${moduloId}?${searchParams.toString()}`} />;
}

function TestModulo() {
  const { moduloId } = useParams();
  const [searchParams] = useSearchParams();
  const modulo = getModulo(moduloId);
  const { statsModulo, registrarIntento } = useProgress();

  const banco = useMemo(() => PREGUNTAS[moduloId] ?? [], [moduloId]);
  const pendientes = useMemo(
    () => (modulo ? statsModulo(moduloId).pendientes.map((id) => PREGUNTA_POR_ID[id]).filter(Boolean) : []),
    [modulo, moduloId, statsModulo],
  );

  const modoInicial = searchParams.get('modo');
  const [modo, setModo] = useState(
    modoInicial === 'simulacro' || (modoInicial === 'repaso' && pendientes.length) ? modoInicial : 'practica',
  );

  // Un enlace con ?rapido=1 arranca directamente un test de práctica.
  const [test, setTest] = useState(() =>
    searchParams.get('rapido') && banco.length
      ? { modo: 'practica', preguntas: crearTest(banco, PREGUNTAS_POR_EXAMEN), clave: Date.now() }
      : null,
  );
  const [fin, setFin] = useState(null);
  const [verErrores, setVerErrores] = useState(false);

  // Avisa antes de cerrar la pestaña con un test a medias.
  useEffect(() => {
    if (!test || fin) return undefined;
    const aviso = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', aviso);
    return () => window.removeEventListener('beforeunload', aviso);
  }, [test, fin]);

  const iniciar = useCallback((modoTest, lista, n) => {
    setFin(null);
    setVerErrores(false);
    setTest({ modo: modoTest, preguntas: crearTest(lista, n ?? lista.length), clave: Date.now() });
    window.scrollTo(0, 0);
  }, []);

  const terminar = useCallback(
    (respuestas, segundos) => {
      const resultado = corregir(test.preguntas, respuestas);
      registrarIntento({ moduloId, modo: test.modo, preguntas: test.preguntas, respuestas, resultado, segundos });
      setFin({ respuestas, resultado, segundos });
      window.scrollTo(0, 0);
    },
    [test, moduloId, registrarIntento],
  );

  if (!modulo) return <NoEncontrado />;

  if (test && fin) {
    const falladas = test.preguntas
      .filter((p, i) => fin.respuestas[i] !== p.correcta)
      .map((p) => PREGUNTA_POR_ID[p.id]);
    return (
      <Resultados
        modulo={modulo}
        modo={test.modo}
        preguntas={test.preguntas}
        respuestas={fin.respuestas}
        resultado={fin.resultado}
        segundos={fin.segundos}
        onRepasarFallos={() => iniciar('repaso', falladas)}
        onRepetir={() => {
          setTest(null);
          setFin(null);
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  if (test) {
    return <Quiz key={test.clave} preguntas={test.preguntas} modo={test.modo} modulo={modulo} onTerminar={terminar} />;
  }

  if (verErrores && pendientes.length) {
    return (
      <RepasoErrores
        modulo={modulo}
        preguntas={pendientes}
        onPracticar={() => iniciar('repaso', pendientes)}
        onVolver={() => {
          setVerErrores(false);
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  const cantidadEfectiva = Math.min(PREGUNTAS_POR_EXAMEN, banco.length);
  const empezar = () => {
    if (modo === 'repaso') {
      setVerErrores(true);
      window.scrollTo(0, 0);
    } else {
      iniciar(modo, banco, cantidadEfectiva);
    }
  };

  return (
    <section className="config contenedor contenedor--medio">
      <Link to="/temario" className="volver">
        ← Todos los módulos
      </Link>
      <span className="pildora">Paso 2 · Elige cómo practicar</span>
      <h1 className="titulo-display titulo-display--md">{modulo.nombre}</h1>
      <p className="lead">{modulo.descripcion}</p>

      <ul className="temas">
        {modulo.temas.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <fieldset className="config__grupo">
        <legend>Modo</legend>
        <div className="modos">
          {MODOS.map((m) => {
            const deshabilitado = m.id === 'repaso' && pendientes.length === 0;
            return (
              <label key={m.id} className={`modo ${modo === m.id ? 'modo--activo' : ''} ${deshabilitado ? 'modo--deshabilitado' : ''}`}>
                <input
                  type="radio"
                  name="modo"
                  value={m.id}
                  checked={modo === m.id}
                  disabled={deshabilitado}
                  onChange={() => setModo(m.id)}
                />
                <span className="modo__titulo">
                  {m.titulo}
                  {m.id === 'repaso' && <span className="modo__contador">{pendientes.length}</span>}
                </span>
                <span className="modo__texto">
                  {deshabilitado ? 'No tienes fallos pendientes en este módulo.' : m.texto}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {modo !== 'repaso' && (
        <dl className="ficha">
          <div>
            <dt>Preguntas</dt>
            <dd>{cantidadEfectiva}</dd>
          </div>
          <div>
            <dt>Tiempo</dt>
            <dd>{modo === 'simulacro' ? `${MINUTOS_SIMULACRO} min` : 'Sin límite'}</dd>
          </div>
          <div>
            <dt>Corrección</dt>
            <dd>Con el botón Validar</dd>
          </div>
        </dl>
      )}

      <div className="config__pie">
        <p className="texto-suave">
          {modo === 'repaso'
            ? `${pendientes.length} pregunta${pendientes.length === 1 ? '' : 's'} fallada${pendientes.length === 1 ? '' : 's'} con su explicación.`
            : cantidadEfectiva === banco.length
              ? `Las ${banco.length} preguntas del módulo en orden aleatorio, con las opciones barajadas.`
              : `${cantidadEfectiva} preguntas al azar de un banco de ${banco.length}, con las opciones barajadas.`}
        </p>
        <button type="button" className="btn btn--primario btn--lg" onClick={empezar}>
          {modo === 'repaso' ? 'Repaso de errores' : 'Empezar test'}
        </button>
      </div>
    </section>
  );
}
