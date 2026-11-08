// Partida de trivia jugada sin sesión: se guarda para enviarla al ranking tras iniciar sesión.
import { puntuacionesApi } from '../api/puntuaciones.js';

const CLAVE = 'examendev:partida-pendiente';

export function guardarPartidaPendiente(partida) {
  try {
    sessionStorage.setItem(CLAVE, JSON.stringify(partida));
  } catch {
    // sin almacenamiento de sesión: la partida no se podrá recuperar
  }
}

export function hayPartidaPendiente() {
  try {
    return Boolean(sessionStorage.getItem(CLAVE));
  } catch {
    return false;
  }
}

// Envía la partida pendiente (si la hay). Devuelve la respuesta de la API o null.
export async function enviarPartidaPendiente() {
  let partida = null;
  try {
    partida = JSON.parse(sessionStorage.getItem(CLAVE));
  } catch {
    return null;
  }
  if (!partida) return null;
  const respuesta = await puntuacionesApi.enviarPartida(partida);
  try {
    sessionStorage.removeItem(CLAVE);
  } catch {
    // sin acceso: no pasa nada, ya está enviada
  }
  return respuesta;
}
