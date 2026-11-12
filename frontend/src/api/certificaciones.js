// Servicio de certificaciones (Microsoft AZ-900, SC-900, DP-900, AI-900…).
//
// API real: GET /api/certificaciones?todas=true (catalogo.routes.js).
// Se piden también las inactivas: una certificación con activo = false se muestra
// con el botón «Próximamente» en lugar de ocultarse.
import { USAR_MOCK } from './config.js';
import { http } from './http.js';
import { esperar } from './mock/db.js';

// Las 4 certificaciones del boceto (mismos datos que el seed del backend), para el modo demo (VITE_USAR_MOCK=true).
const CERTIFICACIONES_DEMO = [
  { id: 'az-900', codigo_examen: 'AZ-900', nombre: 'Microsoft Certified: Azure Fundamentals', proveedor: 'Microsoft', nivel: 'Fundamentals', tiempo_minutos: 45, nota_aprobado: 700, descripcion: 'Conceptos de la nube, arquitectura y servicios de Azure, administración y gobernanza.', activo: false },
  { id: 'sc-900', codigo_examen: 'SC-900', nombre: 'Microsoft Certified: Security, Compliance, and Identity Fundamentals', proveedor: 'Microsoft', nivel: 'Fundamentals', tiempo_minutos: 45, nota_aprobado: 700, descripcion: 'Conceptos de seguridad, Microsoft Entra ID, soluciones de seguridad y cumplimiento.', activo: false },
  { id: 'dp-900', codigo_examen: 'DP-900', nombre: 'Microsoft Certified: Azure Data Fundamentals', proveedor: 'Microsoft', nivel: 'Fundamentals', tiempo_minutos: 45, nota_aprobado: 700, descripcion: 'Datos relacionales y no relacionales, cargas de trabajo transaccionales y analíticas en Azure.', activo: false },
  { id: 'ai-900', codigo_examen: 'AI-900', nombre: 'Microsoft Certified: Azure AI Fundamentals', proveedor: 'Microsoft', nivel: 'Fundamentals', tiempo_minutos: 45, nota_aprobado: 700, descripcion: 'Cargas de trabajo de IA, Machine Learning, visión artificial y lenguaje natural en Azure.', activo: false },
];

// Convierte la fila de la API (snake_case) al formato que usa la interfaz.
// Si el backend añade `total_preguntas`, se usa para decidir si se puede practicar.
export function normalizarCertificacion(c) {
  const totalPreguntas = c.total_preguntas ?? c.totalPreguntas ?? null;
  const activa = c.activo ?? c.activa ?? true;
  return {
    id: c.id,
    codigo: c.codigo_examen ?? c.codigo ?? c.id.toUpperCase(),
    nombre: c.nombre,
    proveedor: c.proveedor ?? 'Otro',
    nivel: c.nivel ?? null,
    minutos: c.tiempo_minutos ?? c.minutos ?? null,
    notaAprobado: c.nota_aprobado ?? c.notaAprobado ?? null,
    descripcion: c.descripcion ?? '',
    totalPreguntas,
    disponible: Boolean(activa) && (totalPreguntas === null || totalPreguntas > 0),
  };
}

const mock = {
  async listar() {
    await esperar();
    return CERTIFICACIONES_DEMO.map(normalizarCertificacion);
  },
};

const real = {
  async listar() {
    const datos = await http('/certificaciones?todas=true', { conToken: false });
    return (Array.isArray(datos) ? datos : []).map(normalizarCertificacion);
  },
};

export const certificacionesApi = USAR_MOCK ? mock : real;
