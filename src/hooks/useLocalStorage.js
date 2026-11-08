import { useEffect, useState } from 'react';

// Estado de React sincronizado con localStorage.
// Si el navegador bloquea el almacenamiento, funciona solo en memoria.
export function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = window.localStorage.getItem(clave);
      return guardado !== null ? JSON.parse(guardado) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(clave, JSON.stringify(valor));
    } catch {
      // Almacenamiento no disponible: se ignora.
    }
  }, [clave, valor]);

  return [valor, setValor];
}
