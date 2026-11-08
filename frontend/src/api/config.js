// Configuración de la capa de datos.
//
// Sin VITE_API_URL → se usan los servicios simulados (src/api/mock), que guardan
// usuarios y puntuaciones en el navegador. Con VITE_API_URL → se llama a la API real.
//
// Para conectar con el backend, crea un fichero .env.local en la raíz con:
//   VITE_API_URL=http://localhost:3000/api
export const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

export const USAR_MOCK = !API_URL;

// Retardo simulado (ms) de los servicios mock, para ver los estados de carga.
export const LATENCIA_MOCK = { min: 250, max: 650 };
