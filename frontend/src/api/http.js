import { API_URL } from './config.js';
import { leerSesion } from './sesion.js';

// Error homogéneo para toda la app.
export class ApiError extends Error {
  constructor(mensaje, { status = 0, campo = null } = {}) {
    super(mensaje);
    this.name = 'ApiError';
    this.status = status;
    this.campo = campo;
  }
}

// Cliente HTTP de la API real (PostgreSQL). Añade el token JWT y datos de sesión.
export async function http(ruta, { metodo = 'GET', cuerpo, conToken = true } = {}) {
  const cabeceras = { Accept: 'application/json' };
  if (cuerpo !== undefined) cabeceras['Content-Type'] = 'application/json';
  const sesion = conToken ? leerSesion() : null;
  if (sesion?.token) cabeceras.Authorization = `Bearer ${sesion.token}`;
  if (sesion?.usuario?.email) cabeceras['X-Usuario-Email'] = sesion.usuario.email;
  if (sesion?.usuario?.nick) cabeceras['X-Usuario-Nick'] = sesion.usuario.nick;

  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, {
      method: metodo,
      headers: cabeceras,
      body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined,
    });
  } catch {
    throw new ApiError('No se ha podido conectar con el servidor de base de datos PostgreSQL.', { status: 0 });
  }

  const datos = respuesta.status === 204 ? null : await respuesta.json().catch(() => null);
  if (!respuesta.ok) {
    throw new ApiError(datos?.mensaje ?? datos?.message ?? datos?.error ?? `Error ${respuesta.status}`, {
      status: respuesta.status,
      campo: datos?.campo ?? null,
    });
  }
  return datos;
}
