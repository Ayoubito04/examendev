import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const ProgressContext = createContext(null);

const ESTADO_INICIAL = {
  intentos: [], // { id, moduloId, modo, aciertos, total, nota, segundos, fecha }
  fallos: {}, // { [preguntaId]: { veces, ultimaRespuesta, fecha } }
};

// "programacion-07" → "programacion". Se corta por el último guion para que
// "interfaces-web-03" no se confunda con el módulo "interfaces".
const moduloDePregunta = (preguntaId) => preguntaId.slice(0, preguntaId.lastIndexOf('-'));

// Las versiones anteriores guardaban solo un número (veces fallada).
const normalizarFallo = (valor) =>
  typeof valor === 'number' ? { veces: valor, ultimaRespuesta: undefined, fecha: null } : valor;

export function ProgressProvider({ children }) {
  const [progreso, setProgreso] = useLocalStorage('examendev:progreso', ESTADO_INICIAL);

  // Guarda un intento y actualiza la lista de fallos pendientes:
  // las falladas se añaden (con la respuesta elegida) y las acertadas salen de la lista.
  const registrarIntento = useCallback(
    ({ moduloId, modo, preguntas, respuestas, resultado, segundos }) => {
      setProgreso((prev) => {
        const ahora = new Date().toISOString();
        const fallos = { ...prev.fallos };
        preguntas.forEach((p, i) => {
          if (respuestas[i] === p.correcta) {
            delete fallos[p.id];
          } else {
            const anterior = normalizarFallo(fallos[p.id]);
            fallos[p.id] = {
              veces: (anterior?.veces ?? 0) + 1,
              // Se guarda el texto, porque el orden de las opciones cambia en cada test.
              ultimaRespuesta: respuestas[i] === null ? null : p.opciones[respuestas[i]],
              fecha: ahora,
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
        return { intentos: [intento, ...prev.intentos].slice(0, 200), fallos };
      });
    },
    [setProgreso],
  );

  const reiniciar = useCallback(() => setProgreso(ESTADO_INICIAL), [setProgreso]);

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

    return { intentos, fallos, statsModulo, infoFallo, registrarIntento, reiniciar };
  }, [progreso, registrarIntento, reiniciar]);

  return <ProgressContext.Provider value={valor}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress debe usarse dentro de <ProgressProvider>');
  return ctx;
}
