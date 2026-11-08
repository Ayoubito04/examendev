import { GRUPOS, MODULOS } from './modulos.js';
import programacion from './preguntas/programacion.js';
import basesDeDatos from './preguntas/bases-de-datos.js';
import entornos from './preguntas/entornos-de-desarrollo.js';
import lenguajesMarcas from './preguntas/lenguajes-de-marcas.js';
import sistemas from './preguntas/sistemas-informaticos.js';
import cliente from './preguntas/cliente.js';
import servidor from './preguntas/servidor.js';
import despliegue from './preguntas/despliegue.js';
import interfacesWeb from './preguntas/interfaces-web.js';
import accesoDatos from './preguntas/acceso-a-datos.js';
import moviles from './preguntas/moviles.js';
import procesos from './preguntas/procesos.js';
import interfaces from './preguntas/interfaces.js';
import gestionEmpresarial from './preguntas/gestion-empresarial.js';

const BANCOS = {
  programacion,
  'bases-de-datos': basesDeDatos,
  'entornos-de-desarrollo': entornos,
  'lenguajes-de-marcas': lenguajesMarcas,
  'sistemas-informaticos': sistemas,
  cliente,
  servidor,
  despliegue,
  'interfaces-web': interfacesWeb,
  'acceso-a-datos': accesoDatos,
  moviles,
  procesos,
  interfaces,
  'gestion-empresarial': gestionEmpresarial,
};

// Cada pregunta recibe un id estable "<modulo>-<nn>" según su posición en el banco.
export const PREGUNTAS = Object.fromEntries(
  Object.entries(BANCOS).map(([moduloId, lista]) => [
    moduloId,
    lista.map((p, i) => ({ ...p, id: `${moduloId}-${String(i + 1).padStart(2, '0')}`, moduloId })),
  ]),
);

export const TODAS_LAS_PREGUNTAS = Object.values(PREGUNTAS).flat();

export const PREGUNTA_POR_ID = Object.fromEntries(TODAS_LAS_PREGUNTAS.map((p) => [p.id, p]));

export const getModulo = (id) => MODULOS.find((m) => m.id === id);

export const contarPreguntas = (moduloId) => PREGUNTAS[moduloId]?.length ?? 0;

export { GRUPOS, MODULOS };
