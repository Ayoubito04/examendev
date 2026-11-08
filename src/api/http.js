import { API_URL } from './config.js';
import { leerSesion } from './sesion.js';

// Error homogéneo para toda la app, venga del mock o de la API real.
export class ApiError extends Error {
  constructor(mensaje, { status = 0, campo = null } = {}) {
    super(mensaje);
    this.name = 'ApiError';
    this.status = status;
    this.campo = campo; // campo del formulario al que se refiere el error, si aplica
  }
}

// Cliente HTTP de la API real. Añade el token JWT y convierte los errores en ApiError.
export async function http(ruta, { metodo = 'GET', cuerpo, conToken = true } = {}) {
  const cabeceras = { Accept: 'application/json' };
  if (cuerpo !== undefined) cabeceras['Content-Type'] = 'application/json';
  const token = conToken ? leerSesion()?.token : null;
  if (token) cabeceras.Authorization = `Bearer ${token}`;

  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, {
      method: metodo,
      headers: cabeceras,
      body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined,
    });
  } catch {
    throw new ApiError('No se ha podido conectar con el servidor. Revisa tu conexión.', { status: 0 });
  }

  const datos = respuesta.status === 204 ? null : await respuesta.json().catch(() => null);
  if (!respuesta.ok) {
    throw new ApiError(datos?.mensaje ?? datos?.message ?? `Error ${respuesta.status}`, {
      status: respuesta.status,
      campo: datos?.campo ?? null,
    });
  }
  return datos;
}
