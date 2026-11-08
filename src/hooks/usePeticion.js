import { useCallback, useEffect, useRef, useState } from 'react';

// Ejecuta una petición asíncrona y expone sus estados: cargando, datos, error y reintentar.
// `deps` controla cuándo se repite automáticamente (como en useEffect).
export function usePeticion(fn, deps = []) {
  const [estado, setEstado] = useState({ cargando: true, datos: null, error: null });
  const idRef = useRef(0);

  const ejecutar = useCallback(() => {
    const id = ++idRef.current;
    setEstado((e) => ({ ...e, cargando: true, error: null }));
    Promise.resolve()
      .then(fn)
      .then((datos) => id === idRef.current && setEstado({ cargando: false, datos, error: null }))
      .catch((error) => id === idRef.current && setEstado({ cargando: false, datos: null, error }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    ejecutar();
  }, [ejecutar]);

  return { ...estado, reintentar: ejecutar };
}
