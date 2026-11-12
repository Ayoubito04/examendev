import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Quiz from '../components/Quiz.jsx';
import Trivia from '../components/Trivia.jsx';
import Resultados from '../components/Resultados.jsx';
import ResultadosTrivia from '../components/ResultadosTrivia.jsx';
import RepasoErrores from '../components/RepasoErrores.jsx';
import { Spinner } from '../components/estados/Estados.jsx';
import NoEncontrado from './NoEncontrado.jsx';
import { PREGUNTAS, PREGUNTA_POR_ID, getModulo } from '../data/index.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useProgress } from '../context/ProgressContext.jsx';
import { corregir, crearTest } from '../utils/quiz.js';
import { TRIVIA } from '../utils/puntos.js';
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
    id: 'trivia',
    titulo: 'Modo trivia',
    texto: `${TRIVIA.segundosPorPregunta} s por pregunta. Suma puntos por rapidez y rachas, y compite en el ranking.`,
  },
  {
    id: 'repaso',
    titulo: 'Repasar mis fallos',
    texto: 'Todas las preguntas que has fallado en tus tests, acumuladas, con la respuesta correcta y su explicación.',
  },
];

const MODOS_VALIDOS = MODOS.map((m) => m.id);

// Se remonta al cambiar de módulo o de parámetros para no arrastrar el estado de otro test.
export default function Test() {
  const { moduloId } = useParams();
  const [searchParams] = useSearchParams();
  return <TestModulo key={`${moduloId}?${searchParams.toString()}`} />;
}

function TestModulo() {
  const { moduloId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const modulo = getModulo(moduloId);
  const { usuario, comprobando } = useAuth();
  const { statsModulo, registrarIntento } = useProgress();

  // ?tema=N limita el test a las preguntas de un tema del módulo.
  const temaParam = searchParams.get('tema');
  const tema = modulo && temaParam !== null && modulo.temas[Number(temaParam)] !== undefined ? Number(temaParam) : null;

  const banco = useMemo(() => {
    const todas = PREGUNTAS[moduloId] ?? [];
    return tema === null ? todas : todas.filter((p) => p.tema === tema);
  }, [moduloId, tema]);

  const pendientes = useMemo(
    () => (modulo ? statsModulo(moduloId).pendientes.map((id) => PREGUNTA_POR_ID[id]).filter(Boolean) : []),
    [modulo, moduloId, statsModulo],
  );

  const modoInicial = searchParams.get('modo');
  const [modo, setModo] = useState(
    MODOS_VALIDOS.includes(modoInicial) && (modoInicial !== 'repaso' || pendientes.length) ? modoInicial : 'practica',
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
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const terminar = useCallback(
    (respuestas, segundos) => {
      const resultado = corregir(test.preguntas, respuestas);
      registrarIntento({ moduloId, modo: test.modo, preguntas: test.preguntas, respuestas, resultado, segundos });
      setFin({ respuestas, resultado, segundos });
      window.scrollTo({ top: 0, behavior: 'instant' });
    },
    [test, moduloId, registrarIntento],
  );

  // La trivia también cuenta para el progreso y los fallos.
  const terminarTrivia = useCallback(
    (resumen) => {
      const respuestas = resumen.detalle.map((d) => d.elegida);
      const resultado = corregir(test.preguntas, respuestas);
      registrarIntento({ moduloId, modo: 'trivia', preguntas: test.preguntas, respuestas, resultado, segundos: resumen.segundos });
      setFin({ trivia: resumen });
      window.scrollTo({ top: 0, behavior: 'instant' });
    },
    [test, moduloId, registrarIntento],
  );

  if (!modulo) return <NoEncontrado />;

  // El modo trivia requiere que el usuario esté autenticado.
  if (modoInicial === 'trivia' || test?.modo === 'trivia') {
    if (comprobando) {
      return (
        <div className="pagina-cargando">
          <Spinner etiqueta="Comprobando tu sesión" />
        </div>
      );
    }
    if (!usuario) {
      const volver = `/test/${modulo.id}?modo=trivia${tema !== null ? `&tema=${tema}` : ''}`;
      return <Navigate to={`/login?volver=${encodeURIComponent(volver)}`} replace />;
    }
  }

  const repetir = () => {
    setTest(null);
    setFin(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  if (test && fin?.trivia) {
    return <ResultadosTrivia modulo={modulo} resumen={fin.trivia} onRepetir={() => iniciar('trivia', banco, TRIVIA.preguntas)} />;
  }

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
        onRepetir={repetir}
      />
    );
  }

  if (test?.modo === 'trivia') {
    return <Trivia key={test.clave} preguntas={test.preguntas} modulo={modulo} onTerminar={terminarTrivia} />;
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
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      />
    );
  }

  const cantidadEfectiva = Math.min(modo === 'trivia' ? TRIVIA.preguntas : PREGUNTAS_POR_EXAMEN, banco.length);
  const empezar = () => {
    if (modo === 'trivia' && !usuario) {
      const volver = `/test/${modulo.id}?modo=trivia${tema !== null ? `&tema=${tema}` : ''}`;
      navigate(`/login?volver=${encodeURIComponent(volver)}`);
      return;
    }
    if (modo === 'repaso') {
      setVerErrores(true);
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      iniciar(modo, banco, cantidadEfectiva);
    }
  };

  const ficha = {
    practica: { tiempo: 'Sin límite', tercero: ['Corrección', 'Con el botón Validar'] },
    simulacro: { tiempo: `${MINUTOS_SIMULACRO} min`, tercero: ['Corrección', 'Con el botón Validar'] },
    trivia: { tiempo: `${TRIVIA.segundosPorPregunta} s por pregunta`, tercero: ['Puntuación', 'Rapidez y rachas'] },
  }[modo];

  return (
    <section className="config contenedor contenedor--medio">
      <Link to="/temario" className="volver">
        ← Todos los módulos
      </Link>
      <span className="pildora">Paso 2 · Elige cómo practicar</span>
      <h1 className="titulo-display titulo-display--md">{modulo.nombre}</h1>
      <p className="lead">{modulo.descripcion}</p>

      {tema !== null && (
        <p className="filtro-tema" role="status">
          Practicando solo el tema <strong>{modulo.temas[tema]}</strong> ({banco.length} preguntas).{' '}
          <Link to={`/test/${modulo.id}${modo !== 'practica' ? `?modo=${modo}` : ''}`} className="enlace">
            Quitar filtro
          </Link>
        </p>
      )}

      <nav aria-label="Practicar por tema">
        <ul className="temas">
          {modulo.temas.map((t, i) => (
            <li key={t}>
              <Link
                to={`/test/${modulo.id}?tema=${i}${modo !== 'practica' ? `&modo=${modo}` : ''}`}
                className={`tema-chip ${tema === i ? 'tema-chip--activo' : ''}`}
                aria-current={tema === i ? 'true' : undefined}
              >
                {t}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <fieldset className="config__grupo">
        <legend>Modo</legend>
        <div className="modos">
          {MODOS.map((m) => {
            const deshabilitado = m.id === 'repaso' && pendientes.length === 0;
            return (
              <label
                key={m.id}
                className={`modo ${modo === m.id ? 'modo--activo' : ''} ${deshabilitado ? 'modo--deshabilitado' : ''} ${m.id === 'trivia' ? 'modo--trivia' : ''}`}
              >
                <input type="radio" name="modo" value={m.id} checked={modo === m.id} disabled={deshabilitado} onChange={() => setModo(m.id)} />
                <span className="modo__titulo">
                  {m.titulo}
                  {m.id === 'repaso' && <span className="modo__contador">{pendientes.length}</span>}
                  {m.id === 'trivia' && <span className="modo__nuevo">Ranking</span>}
                </span>
                <span className="modo__texto">{deshabilitado ? 'No tienes fallos pendientes en este módulo.' : m.texto}</span>
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
            <dd>{ficha.tiempo}</dd>
          </div>
          <div>
            <dt>{ficha.tercero[0]}</dt>
            <dd>{ficha.tercero[1]}</dd>
          </div>
        </dl>
      )}

      <div className="config__pie">
        <p className="texto-suave">
          {modo === 'repaso'
            ? `${pendientes.length} pregunta${pendientes.length === 1 ? '' : 's'} fallada${pendientes.length === 1 ? '' : 's'} con su explicación.`
            : cantidadEfectiva === banco.length
              ? `${tema === null ? 'Las' : 'Todas las'} ${banco.length} preguntas${tema === null ? ' del módulo' : ' del tema'} en orden aleatorio, con las opciones barajadas.`
              : `${cantidadEfectiva} preguntas al azar de un banco de ${banco.length}, con las opciones barajadas.`}
        </p>
        <button type="button" className={`btn btn--lg ${modo === 'trivia' ? 'btn--acento' : 'btn--primario'}`} onClick={empezar} disabled={!banco.length}>
          {modo === 'repaso' ? 'Repaso de errores' : modo === 'trivia' ? (usuario ? 'Jugar trivia' : 'Iniciar sesión para jugar trivia') : 'Empezar test'}
        </button>
      </div>
    </section>
  );
}
