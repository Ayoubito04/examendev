// Configuración de la capa de datos.
//
// Por defecto conecta con la API REST del backend (`/api` mediante proxy de Vite o `VITE_API_URL`).
// Si se define `VITE_USAR_MOCK=true`, se usan los servicios simulados (src/api/mock).
export const API_URL = (import.meta.env.VITE_API_URL ?? '/api').replace(/\/$/, '');

export const USAR_MOCK = import.meta.env.VITE_USAR_MOCK === 'true';

// Retardo simulado (ms) de los servicios mock, para ver los estados de carga.
export const LATENCIA_MOCK = { min: 250, max: 650 };
