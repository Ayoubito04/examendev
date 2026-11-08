import { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Tema visual: 'claro', 'oscuro' o 'sistema' (sigue la preferencia del sistema operativo).
const TemaContext = createContext(null);
const CLAVE = 'examendev:tema';

const leer = () => {
  try {
    return localStorage.getItem(CLAVE) ?? 'sistema';
  } catch {
    return 'sistema';
  }
};

const prefiereOscuro = () => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;

export function TemaProvider({ children }) {
  const [preferencia, setPreferencia] = useState(leer);
  const [sistemaOscuro, setSistemaOscuro] = useState(prefiereOscuro);

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mq) return undefined;
    const cambio = (e) => setSistemaOscuro(e.matches);
    mq.addEventListener('change', cambio);
    return () => mq.removeEventListener('change', cambio);
  }, []);

  const tema = preferencia === 'sistema' ? (sistemaOscuro ? 'oscuro' : 'claro') : preferencia;

  useEffect(() => {
    document.documentElement.dataset.tema = tema;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', tema === 'oscuro' ? '#07130d' : '#061c11');
    try {
      localStorage.setItem(CLAVE, preferencia);
    } catch {
      // sin almacenamiento: la preferencia dura la sesión
    }
  }, [tema, preferencia]);

  const valor = useMemo(
    () => ({ tema, preferencia, setPreferencia, alternar: () => setPreferencia(tema === 'oscuro' ? 'claro' : 'oscuro') }),
    [tema, preferencia],
  );

  return <TemaContext.Provider value={valor}>{children}</TemaContext.Provider>;
}

export function useTema() {
  const ctx = useContext(TemaContext);
  if (!ctx) throw new Error('useTema debe usarse dentro de <TemaProvider>');
  return ctx;
}
