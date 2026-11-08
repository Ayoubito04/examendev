import { Link } from 'react-router-dom';
import { CICLOS, MODULOS, TODAS_LAS_PREGUNTAS, modulosDeCiclo } from '../data/index.js';
import { MINUTOS_SIMULACRO, PREGUNTAS_POR_EXAMEN } from '../config.js';

const PASOS = [
  { n: '01', titulo: 'Elige tu ciclo y módulo', texto: 'DAM, DAW, ASIR o SMR, de primero o de segundo. Cada módulo tiene su propio banco de preguntas.' },
  { n: '02', titulo: 'Practica o haz un simulacro', texto: 'Elige, pulsa Validar y comprueba al momento. Sin prisa en la práctica, o contra reloj en el simulacro.' },
  { n: '03', titulo: 'Repasa tus fallos', texto: 'Cada pregunta que fallas se acumula en tu repaso, con su explicación, hasta que la domines.' },
];

const VENTAJAS = [
  { titulo: 'Corrección al instante', texto: 'Sabes en el momento si has acertado y por qué. Cada pregunta trae su explicación.' },
  { titulo: 'Simulacros cronometrados', texto: `${PREGUNTAS_POR_EXAMEN} preguntas en ${MINUTOS_SIMULACRO} minutos, mapa de preguntas y nota sobre 10, para llegar al examen con el ritmo cogido.` },
  { titulo: 'Repaso de errores', texto: 'Tus fallos se acumulan por módulo con la respuesta correcta y la explicación, listos para estudiar o imprimir.' },
  { titulo: 'Progreso por módulo', texto: 'Mejor nota, última nota e historial de intentos de un vistazo.' },
  { titulo: 'Opciones barajadas', texto: 'Preguntas y respuestas cambian de orden en cada test: nada de memorizar la letra.' },
  { titulo: 'Sin registro', texto: 'Empieza ya. Tu progreso se guarda en este navegador, sin cuentas ni contraseñas.' },
];

const FAQ = [
  {
    p: '¿Qué ciclos y módulos incluye?',
    r: 'Los módulos técnicos de primero y segundo de cuatro ciclos de la familia de Informática y Comunicaciones: DAM y DAW (grado superior, con primero común), ASIR (grado superior) y SMR (grado medio).',
  },
  {
    p: '¿Por qué un módulo aparece en varios ciclos?',
    r: 'Algunos módulos son comunes. Por ejemplo, Lenguajes de marcas y sistemas de gestión de información se cursa igual en DAM, DAW y ASIR, así que comparten banco de preguntas y progreso.',
  },
  {
    p: '¿El reparto por cursos es el mismo en todas las comunidades?',
    r: 'Seguimos la organización más habitual, pero algunas comunidades autónomas reparten los módulos de otra forma entre primero y segundo. Si tu centro lo hace distinto, busca el módulo por su nombre en el temario.',
  },
  {
    p: '¿En qué se diferencia la práctica del simulacro?',
    r: `En los dos validas cada respuesta y, si fallas, ves un recordatorio con la correcta. La práctica no tiene límite de tiempo. El simulacro dura ${MINUTOS_SIMULACRO} minutos, tiene un mapa de preguntas y te deja saltar las que no sepas para volver a ellas antes de entregar.`,
  },
  {
    p: '¿Dónde se guarda mi progreso?',
    r: 'En el almacenamiento local de tu navegador. Si cambias de dispositivo o borras los datos del navegador, empezarás de cero. Puedes reiniciarlo cuando quieras desde Mi progreso.',
  },
  {
    p: '¿Sustituye al temario de clase?',
    r: 'No. Es una herramienta para repasar y detectar puntos débiles. Usa siempre los apuntes y criterios de evaluación de tu centro como referencia.',
  },
  {
    p: 'He encontrado una pregunta con un error, ¿qué hago?',
    r: 'Escríbenos desde Contacto indicando el módulo y el enunciado y la revisaremos.',
  },
];

const Chevron = () => (
  <svg className="btn__chevron" viewBox="0 0 16 16" aria-hidden="true">
    <path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Inicio() {
  const cifras = [
    { valor: TODAS_LAS_PREGUNTAS.length, texto: 'preguntas con explicación' },
    { valor: MODULOS.length, texto: 'módulos técnicos' },
    { valor: CICLOS.length, texto: 'ciclos: DAM, DAW, ASIR y SMR' },
    { valor: '0 €', texto: 'sin registro ni suscripción' },
  ];

  return (
    <>
      <section className="hero seccion-oscura">
        <div className="hero__fondo" aria-hidden="true" />
        <div className="contenedor hero__inner">
          <h1 className="hero__titulo">
            Aprueba tu examen de mayo con práctica real y <span className="destacado">sin estrés</span>
          </h1>

          <ul className="hero__pildoras">
            <li className="pildora-hero pildora-hero--insignia">
              <span className="pildora-hero__icono" aria-hidden="true">★</span>
              <span>
                <small>Banco de preguntas</small>
                {TODAS_LAS_PREGUNTAS.length} con explicación
              </span>
            </li>
            <li className="pildora-hero">Simulacros de {MINUTOS_SIMULACRO} min</li>
            <li className="pildora-hero">DAM · DAW · ASIR · SMR</li>
          </ul>

          <p className="hero__subtitulo">
            Preguntas tipo test organizadas por módulo. Valida cada respuesta, repasa tus errores con su explicación y sigue tu progreso
            hasta el día del examen.
          </p>

          <div className="hero__ctas">
            <Link to="/test/programacion?rapido=1" className="btn btn--acento btn--lg">
              <Chevron />
              Hacer un test de prueba
            </Link>
            <Link to="/temario" className="btn btn--claro btn--lg">
              Ver temario
            </Link>
          </div>
        </div>

        <div className="contenedor hero__preview" aria-hidden="true">
          <div className="preview">
            <div className="preview__cabecera">
              <span className="pildora pildora--sm">Programación</span>
              <span>Pregunta 7 de {PREGUNTAS_POR_EXAMEN}</span>
            </div>
            <div className="barra">
              <span className="barra__relleno" style={{ width: '35%' }} />
            </div>
            <p className="preview__enunciado">¿Qué palabra clave de Java impide que una clase pueda ser heredada?</p>
            <div className="preview__opciones">
              <span className="opcion opcion--estatica">abstract</span>
              <span className="opcion opcion--estatica opcion--correcta">final</span>
              <span className="opcion opcion--estatica">static</span>
            </div>
            <div className="feedback feedback--ok">
              <strong>¡Correcto!</strong> Una clase declarada como final no admite subclases.
            </div>
          </div>
        </div>
      </section>

      <section className="cifras">
        <div className="contenedor cifras__grid">
          {cifras.map((c) => (
            <div key={c.texto} className="cifra">
              <span className="cifra__valor">{c.valor}</span>
              <span className="cifra__texto">{c.texto}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="seccion contenedor" id="como-funciona">
        <span className="pildora">Cómo funciona</span>
        <h2 className="titulo-display titulo-display--md">
          Tres pasos para llegar <span className="destacado">preparado</span>
        </h2>
        <div className="pasos">
          {PASOS.map((p) => (
            <article key={p.n} className="tarjeta paso">
              <span className="paso__numero">{p.n}</span>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bloque-oscuro seccion-oscura" id="ciclos">
        <div className="contenedor">
          <div className="bloque-oscuro__cabecera">
            <span className="pildora">Temario</span>
            <h2 className="titulo-display titulo-display--md">Tu ciclo, módulo a módulo</h2>
            <p className="lead">Cuatro ciclos de Informática y Comunicaciones, con los módulos técnicos de primero y segundo.</p>
          </div>

          <div className="ciclos">
            {CICLOS.map((ciclo) => (
              <article key={ciclo.id} className={`ciclo ciclo--${ciclo.id}`}>
                <div className="ciclo__cabecera">
                  <span className="ciclo__sigla">{ciclo.sigla}</span>
                  <h3>{ciclo.nombre}</h3>
                </div>
                <div className="ciclo__cuerpo">
                  {[1, 2].map((curso) => (
                    <div key={curso} className="ciclo__curso-bloque">
                      <h4>
                        {curso}º curso <span>· {ciclo.grado}</span>
                      </h4>
                      <ul className="ciclo__lista">
                        {modulosDeCiclo(ciclo.sigla, curso).map((m) => (
                          <li key={m.id}>
                            <Link to={`/test/${m.id}`}>{m.nombre}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <Link to={`/temario?ciclo=${ciclo.id}`} className="btn btn--primario btn--sm ciclo__boton">
                  Practicar {ciclo.sigla}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion contenedor" id="ventajas">
        <span className="pildora">Por qué funciona</span>
        <h2 className="titulo-display titulo-display--md">
          Pensado para el <span className="destacado">examen</span>, no para el scroll
        </h2>
        <div className="ventajas">
          {VENTAJAS.map((v) => (
            <article key={v.titulo} className="ventaja">
              <span className="ventaja__icono" aria-hidden="true" />
              <h3>{v.titulo}</h3>
              <p>{v.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="seccion contenedor contenedor--medio" id="preguntas-frecuentes">
        <span className="pildora">Preguntas frecuentes</span>
        <h2 className="titulo-display titulo-display--md">Lo que suelen preguntarnos</h2>
        <div className="faq">
          {FAQ.map((f) => (
            <details key={f.p} className="faq__item">
              <summary>{f.p}</summary>
              <p>{f.r}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="seccion contenedor">
        <div className="cta-final seccion-oscura">
          <h2 className="titulo-display titulo-display--md">
            {PREGUNTAS_POR_EXAMEN} preguntas. Sin registro. <span className="destacado">Empieza ahora.</span>
          </h2>
          <p>Elige un módulo y comprueba dónde estás antes del examen.</p>
          <div className="acciones-centradas">
            <Link to="/temario" className="btn btn--acento btn--lg">
              <Chevron />
              Elegir módulo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
