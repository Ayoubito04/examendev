import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PREGUNTAS, getModulo } from '../data/index.js';
import { http } from '../api/http.js';

const ProgressContext = createContext(null);

const ESTADO_INICIAL = {
  intentos: [], // { id, moduloId, modo, aciertos, total, nota, segundos, fecha }
  // { [preguntaId]: { veces, ultimaRespuesta, fecha, aciertosDespues, ultimoAcierto } }
  fallos: {},
  // { [preguntaId]: { a: aciertos, f: fallos } } — base de las estadísticas por tema y módulo
  porPregunta: {},
};

const moduloDePregunta = (preguntaId) => preguntaId.slice(0, preguntaId.lastIndexOf('-'));

const normalizarFallo = (valor) =>
  typeof valor === 'number'
    ? { veces: valor, ultimaRespuesta: undefined, fecha: null, aciertosDespues: 0, ultimoAcierto: null }
    : valor;

export function ProgressProvider({ children }) {
  // El progreso vive en la base de datos PostgreSQL (no en localStorage).
  const [progreso, setProgreso] = useState(ESTADO_INICIAL);

  // Limpia cualquier resto antiguo que hubiera en localStorage de versiones previas.
  useEffect(() => {
    try {
      localStorage.removeItem('examendev:progreso');
      localStorage.removeItem('examendev:db:v1');
    } catch {
      // Ignorar si el navegador bloquea el acceso
    }
  }, []);

  // Carga el progreso real desde PostgreSQL (GET /api/progreso).
  const actualizarProgreso = useCallback(async () => {
    try {
      const remoto = await http('/progreso');
      if (!remoto) return;
      setProgreso({
        intentos: remoto.intentos ?? [],
        fallos: remoto.fallos ?? {},
        porPregunta: remoto.porPregunta ?? {},
      });
    } catch {
      // Si aún está conectando, mantiene el estado en memoria.
    }
  }, []);

  useEffect(() => {
    actualizarProgreso();
  }, [actualizarProgreso]);

  // Guarda el intento en PostgreSQL y actualiza el estado.
  const registrarIntento = useCallback(
    ({ moduloId, modo, preguntas, respuestas, resultado, segundos }) => {
      if (modo !== 'trivia') {
        http('/progreso/intento', {
          metodo: 'POST',
          cuerpo: { moduloId, modo, preguntas, respuestas, segundos },
        })
          .then(() => actualizarProgreso())
          .catch(() => {});
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
              ultimaRespuesta: respuestas[i] === null ? null : p.opciones[respuestas[i]],
              fecha: ahora,
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
    [actualizarProgreso],
  );

  // Quita una pregunta de la lista de fallos ("Ya la domino") en PostgreSQL.
  const marcarDominada = useCallback((preguntaId) => {
    http(`/respuestas/dominar/${encodeURIComponent(preguntaId)}`, { metodo: 'PATCH' }).catch(() => {});
    setProgreso((prev) => {
      const fallos = { ...prev.fallos };
      delete fallos[preguntaId];
      return { ...prev, fallos };
    });
  }, []);

  // Marca todas las preguntas falladas actuales como dominadas en PostgreSQL sin borrar el historial de intentos.
  const limpiarFallos = useCallback(() => {
    Object.keys(progreso.fallos ?? {}).forEach((preguntaId) => {
      http(`/respuestas/dominar/${encodeURIComponent(preguntaId)}`, { metodo: 'PATCH' }).catch(() => {});
    });
    setProgreso((prev) => ({ ...prev, fallos: {} }));
  }, [progreso.fallos]);

  // Borra todo el historial en PostgreSQL.
  const reiniciar = useCallback(() => {
    http('/progreso', { metodo: 'DELETE' }).catch(() => {});
    setProgreso(ESTADO_INICIAL);
  }, []);

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

    const porPregunta = progreso.porPregunta ?? {};
    const statsTemas = (moduloId) => {
      const modulo = getModulo(moduloId);
      if (!modulo) return [];
      const temas = modulo.temas.map((nombre, indice) => ({ indice, nombre, aciertos: 0, fallos: 0, total: 0 }));
      (PREGUNTAS[moduloId] ?? []).forEach((p) => {
        const t = temas[p.tema];
        if (!t) return;
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

    const pctModulo = (moduloId) => {
      let a = 0;
      let f = 0;
      (PREGUNTAS[moduloId] ?? []).forEach((p) => {
        a += porPregunta[p.id]?.a ?? 0;
        f += porPregunta[p.id]?.f ?? 0;
      });
      return a + f ? Math.round((a / (a + f)) * 100) : null;
    };

    return {
      intentos,
      fallos,
      statsModulo,
      statsTemas,
      pctModulo,
      infoFallo,
      registrarIntento,
      marcarDominada,
      actualizarProgreso,
      limpiarFallos,
      reiniciar,
    };
  }, [progreso, registrarIntento, marcarDominada, actualizarProgreso, limpiarFallos, reiniciar]);

  return <ProgressContext.Provider value={valor}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress debe usarse dentro de <ProgressProvider>');
  return ctx;
}
