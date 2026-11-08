// Sesión guardada en el navegador: { token, usuario }.
const CLAVE = 'examendev:sesion';

export function leerSesion() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) ?? null;
  } catch {
    return null;
  }
}

export function guardarSesion(sesion) {
  try {
    if (sesion) localStorage.setItem(CLAVE, JSON.stringify(sesion));
    else localStorage.removeItem(CLAVE);
  } catch {
    // Almacenamiento no disponible: la sesión solo dura mientras la pestaña esté abierta.
  }
}
