import { useEffect, useRef, useState } from 'react';

// Cuenta atrás en segundos. Llama a onFin cuando llega a cero.
// Si segundosIniciales es null, no hay límite y solo mide el tiempo transcurrido.
export function useCountdown(segundosIniciales, onFin) {
  const [transcurrido, setTranscurrido] = useState(0);
  const onFinRef = useRef(onFin);
  const terminado = useRef(false);

  useEffect(() => {
    onFinRef.current = onFin;
  }, [onFin]);

  useEffect(() => {
    const id = setInterval(() => setTranscurrido((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const restante = segundosIniciales == null ? null : Math.max(0, segundosIniciales - transcurrido);

  useEffect(() => {
    if (restante === 0 && !terminado.current) {
      terminado.current = true;
      onFinRef.current?.();
    }
  }, [restante]);

  return { transcurrido, restante };
}
