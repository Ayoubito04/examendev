import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const ProgressContext = createContext(null);

const ESTADO_INICIAL = {
  intentos: [], // { id, moduloId, modo, aciertos, total, nota, segundos, fecha }
  fallos: {}, // { [preguntaId]: vecesFallada }
};

export function ProgressProvider({ children }) {
  const [progreso, setProgreso] = useLocalStorage('examendev:progreso', ESTADO_INICIAL);

  // Guarda un intento y actualiza la lista de fallos pendientes:
  // las falladas se añaden y las acertadas salen de la lista.
  const registrarIntento = useCallback(
    ({ moduloId, modo, preguntas, respuestas, resultado, segundos }) => {
      setProgreso((prev) => {
        const fallos = { ...prev.fallos };
        preguntas.forEach((p, i) => {
          if (respuestas[i] === p.correcta) delete fallos[p.id];
          else fallos[p.id] = (fallos[p.id] ?? 0) + 1;
        });
        const intento = {
          id: `${Date.now()}`,
          moduloId,
          modo,
          aciertos: resultado.aciertos,
          total: resultado.total,
          nota: resultado.nota,
          segundos,
          fecha: new Date().toISOString(),
        };
        return { intentos: [intento, ...prev.intentos].slice(0, 200), fallos };
      });
    },
    [setProgreso],
  );

  const reiniciar = useCallback(() => setProgreso(ESTADO_INICIAL), [setProgreso]);

  const valor = useMemo(() => {
    const intentos = progreso.intentos ?? [];
    const fallos = progreso.fallos ?? {};

    const statsModulo = (moduloId) => {
      const propios = intentos.filter((t) => t.moduloId === moduloId);
      const pendientes = Object.keys(fallos).filter((id) => id.startsWith(`${moduloId}-`));
      return {
        intentos: propios.length,
        mejorNota: propios.length ? Math.max(...propios.map((t) => t.nota)) : null,
        ultimaNota: propios[0]?.nota ?? null,
        pendientes,
      };
    };

    return { intentos, fallos, statsModulo, registrarIntento, reiniciar };
  }, [progreso, registrarIntento, reiniciar]);

  return <ProgressContext.Provider value={valor}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress debe usarse dentro de <ProgressProvider>');
  return ctx;
}
