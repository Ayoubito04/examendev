import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { PREGUNTAS, getModulo } from '../data/index.js';
import { USAR_MOCK } from '../api/config.js';
import { http } from '../api/http.js';
import { leerSesion } from '../api/sesion.js';

const ProgressContext = createContext(null);

const ESTADO_INICIAL = {
  intentos: [], // { id, moduloId, modo, aciertos, total, nota, segundos, fecha }
  // { [preguntaId]: { veces, ultimaRespuesta, fecha, aciertosDespues, ultimoAcierto } }
  fallos: {},
  // { [preguntaId]: { a: aciertos, f: fallos } } — base de las estadísticas por tema y módulo
  porPregunta: {},
};

// "programacion-07" → "programacion". Se corta por el último guion para que
// "interfaces-web-03" no se confunda con el módulo "interfaces".
const moduloDePregunta = (preguntaId) => preguntaId.slice(0, preguntaId.lastIndexOf('-'));

// Las versiones anteriores guardaban solo un número (veces fallada).
const normalizarFallo = (valor) =>
  typeof valor === 'number'
    ? { veces: valor, ultimaRespuesta: undefined, fecha: null, aciertosDespues: 0, ultimoAcierto: null }
    : valor;

export function ProgressProvider({ children }) {
  const [progreso, setProgreso] = useLocalStorage('examendev:progreso', ESTADO_INICIAL);

  // Si estamos conectados al backend REST y hay sesión activa, hidrata el progreso desde PostgreSQL.
  useEffect(() => {
    if (USAR_MOCK || !leerSesion()?.token) return;
    let activo = true;
    http('/progreso')
      .then((remoto) => {
        if (!activo || !remoto) return;
        setProgreso((prev) => ({
          ...prev,
          intentos: remoto.intentos?.length ? remoto.intentos : prev.intentos,
          fallos: remoto.fallos && Object.keys(remoto.fallos).length ? { ...prev.fallos, ...remoto.fallos } : prev.fallos,
        }));
      })
      .catch(() => {});
    return () => {
      activo = false;
    };
  }, [setProgreso]);

  // Guarda un intento y actualiza la lista acumulada de fallos:
  // - Una pregunta fallada entra en la lista (o suma un fallo más) y se queda ahí.
  // - Si se acierta en práctica o simulacro, sigue en la lista marcada como "acertada después".
  // - Solo sale si se acierta en el modo repaso o con "Ya la domino" (marcarDominada).
  const registrarIntento = useCallback(
    ({ moduloId, modo, preguntas, respuestas, resultado, segundos }) => {
      if (!USAR_MOCK && leerSesion()?.token && modo !== 'trivia') {
        http('/progreso/intento', {
          metodo: 'POST',
          cuerpo: { moduloId, modo, preguntas, respuestas, segundos },
        }).catch(() => {});
      }
      setProgreso((prev) => {
        const ahora = new Date().toISOString();
        const fallos = { ...prev.fallos };
        const porPregunta = { ...prev.porPregunta };
        preguntas.forEach((p, i) => {
          const actual = porPregunta[p.id] ?? { a: 0, f: 0 };
          porPregunta[p.id] = respuestas[i] === p.correcta ? { ...actual, a: actual.a + 1 } : { ...actual, f: actual.f + 1 };
          const anterior = normalizarFallo(fallos[p.id]);
          if (respuestas[i] === p.correcta) {
            if (!anterior) return;
            if (modo === 'repaso') delete fallos[p.id];
            else fallos[p.id] = { ...anterior, aciertosDespues: (anterior.aciertosDespues ?? 0) + 1, ultimoAcierto: ahora };
          } else {
            fallos[p.id] = {
              veces: (anterior?.veces ?? 0) + 1,
              // Se guarda el texto, porque el orden de las opciones cambia en cada test.
              ultimaRespuesta: respuestas[i] === null ? null : p.opciones[respuestas[i]],
              fecha: ahora,
              // Un nuevo fallo anula los aciertos anteriores.
              aciertosDespues: 0,
              ultimoAcierto: null,
            };
          }
        });
        const intento = {
          id: `${Date.now()}`,
          moduloId,
          modo,
          aciertos: resultado.aciertos,
          total: resultado.total,
          nota: resultado.nota,
          segundos,
          fecha: ahora,
        };
        return { ...prev, intentos: [intento, ...prev.intentos].slice(0, 200), fallos, porPregunta };
      });
    },
    [setProgreso],
  );

  // Quita una pregunta de la lista de fallos ("Ya la domino").
  const marcarDominada = useCallback(
    (preguntaId) => {
      if (!USAR_MOCK && leerSesion()?.token) {
        http(`/respuestas/dominar/${encodeURIComponent(preguntaId)}`, { metodo: 'PATCH' }).catch(() => {});
      }
      setProgreso((prev) => {
        const fallos = { ...prev.fallos };
        delete fallos[preguntaId];
        return { ...prev, fallos };
      });
    },
    [setProgreso],
  );

  const reiniciar = useCallback(() => {
    if (!USAR_MOCK && leerSesion()?.token) {
      http('/progreso', { metodo: 'DELETE' }).catch(() => {});
    }
    setProgreso(ESTADO_INICIAL);
  }, [setProgreso]);

  const valor = useMemo(() => {
    const intentos = progreso.intentos ?? [];
    const fallos = Object.fromEntries(
      Object.entries(progreso.fallos ?? {}).map(([id, v]) => [id, normalizarFallo(v)]),
    );

    const statsModulo = (moduloId) => {
      const propios = intentos.filter((t) => t.moduloId === moduloId);
      const pendientes = Object.keys(fallos).filter((id) => moduloDePregunta(id) === moduloId);
      return {
        intentos: propios.length,
        mejorNota: propios.length ? Math.max(...propios.map((t) => t.nota)) : null,
        ultimaNota: propios[0]?.nota ?? null,
        pendientes,
      };
    };

    const infoFallo = (preguntaId) => fallos[preguntaId] ?? null;

    // Aciertos y fallos por tema de un módulo. pct = null si aún no se ha respondido nada.
    const porPregunta = progreso.porPregunta ?? {};
    const statsTemas = (moduloId) => {
      const modulo = getModulo(moduloId);
      if (!modulo) return [];
      const temas = modulo.temas.map((nombre, indice) => ({ indice, nombre, aciertos: 0, fallos: 0, total: 0 }));
      (PREGUNTAS[moduloId] ?? []).forEach((p) => {
        const t = temas[p.tema];
        t.total += 1;
        const r = porPregunta[p.id];
        if (r) {
          t.aciertos += r.a;
          t.fallos += r.f;
        }
      });
      return temas.map((t) => {
        const respondidas = t.aciertos + t.fallos;
        return { ...t, respondidas, pct: respondidas ? Math.round((t.aciertos / respondidas) * 100) : null };
      });
    };

    // Porcentaje de acierto acumulado en un módulo (null si no hay respuestas).
    const pctModulo = (moduloId) => {
      let a = 0;
      let f = 0;
      (PREGUNTAS[moduloId] ?? []).forEach((p) => {
        a += porPregunta[p.id]?.a ?? 0;
        f += porPregunta[p.id]?.f ?? 0;
      });
      return a + f ? Math.round((a / (a + f)) * 100) : null;
    };

    return { intentos, fallos, statsModulo, statsTemas, pctModulo, infoFallo, registrarIntento, marcarDominada, reiniciar };
  }, [progreso, registrarIntento, marcarDominada, reiniciar]);

  return <ProgressContext.Provider value={valor}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress debe usarse dentro de <ProgressProvider>');
  return ctx;
}
