import { CICLOS, MODULOS, SECCIONES, modulosDeCiclo, nombreCorto } from './modulos.js';
import { TEMAS_POR_PREGUNTA } from './temas.js';
import { RETOS_CODIGO } from './retos-codigo.js';

// DAM y DAW
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

// ASIR
import implantacionSo from './preguntas/implantacion-so.js';
import planificacionRedes from './preguntas/planificacion-redes.js';
import fundamentosHardware from './preguntas/fundamentos-hardware.js';
import gestionBasesDatos from './preguntas/gestion-bases-datos.js';
import administracionSo from './preguntas/administracion-so.js';
import serviciosRedInternet from './preguntas/servicios-red-internet.js';
import implantacionAplicacionesWeb from './preguntas/implantacion-aplicaciones-web.js';
import administracionSgbd from './preguntas/administracion-sgbd.js';
import seguridadAltaDisponibilidad from './preguntas/seguridad-alta-disponibilidad.js';

// SMR
import montajeEquipos from './preguntas/montaje-equipos.js';
import soMonopuesto from './preguntas/so-monopuesto.js';
import aplicacionesOfimaticas from './preguntas/aplicaciones-ofimaticas.js';
import redesLocales from './preguntas/redes-locales.js';
import soEnRed from './preguntas/so-en-red.js';
import seguridadInformatica from './preguntas/seguridad-informatica.js';
import serviciosEnRed from './preguntas/servicios-en-red.js';
import aplicacionesWeb from './preguntas/aplicaciones-web.js';

// Módulos transversales y hojas de ruta (MPO)
import itp from './preguntas/itp.js';
import itp2 from './preguntas/itp-2.js';
import sostenibilidad from './preguntas/sostenibilidad.js';
import digitalizacion from './preguntas/digitalizacion.js';
import ingles from './preguntas/ingles.js';
import mpoArquitecturaNube from './preguntas/mpo-arquitectura-nube.js';

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
  'implantacion-so': implantacionSo,
  'planificacion-redes': planificacionRedes,
  'fundamentos-hardware': fundamentosHardware,
  'gestion-bases-datos': gestionBasesDatos,
  'administracion-so': administracionSo,
  'servicios-red-internet': serviciosRedInternet,
  'implantacion-aplicaciones-web': implantacionAplicacionesWeb,
  'administracion-sgbd': administracionSgbd,
  'seguridad-alta-disponibilidad': seguridadAltaDisponibilidad,
  'montaje-equipos': montajeEquipos,
  'so-monopuesto': soMonopuesto,
  'aplicaciones-ofimaticas': aplicacionesOfimaticas,
  'redes-locales': redesLocales,
  'so-en-red': soEnRed,
  'seguridad-informatica': seguridadInformatica,
  'servicios-en-red': serviciosEnRed,
  'aplicaciones-web': aplicacionesWeb,
  itp,
  'itp-2': itp2,
  sostenibilidad,
  digitalizacion,
  ingles,
  'mpo-arquitectura-nube': mpoArquitecturaNube,
};

// Cada pregunta recibe un id estable "<modulo>-<nn>" según su posición en el banco
// y el índice de su tema dentro de los temas del módulo.
// Las preguntas difíciles de completar código (RETOS_CODIGO) se añaden al final del banco sin borrar ninguna pregunta previa.
export const PREGUNTAS = Object.fromEntries(
  Object.entries(BANCOS).map(([moduloId, lista]) => {
    const combinadas = [...lista, ...(RETOS_CODIGO[moduloId] ?? [])];
    return [
      moduloId,
      combinadas.map((p, i) => ({
        ...p,
        id: `${moduloId}-${String(i + 1).padStart(2, '0')}`,
        moduloId,
        dificultad: p.dificultad ?? 'media',
        codigo: p.codigo ?? null,
        tema:
          TEMAS_POR_PREGUNTA[moduloId]?.[i] ??
          (i >= lista.length
            ? typeof p.tema === 'number'
              ? p.tema
              : 0
            : typeof p.tema === 'number'
              ? Math.max(0, p.tema - 1)
              : 0),
      })),
    ];
  }),
);

export const TODAS_LAS_PREGUNTAS = Object.values(PREGUNTAS).flat();

export const PREGUNTA_POR_ID = Object.fromEntries(TODAS_LAS_PREGUNTAS.map((p) => [p.id, p]));

export const getModulo = (id) => MODULOS.find((m) => m.id === id);

export const preguntasDeTema = (moduloId, tema) => (PREGUNTAS[moduloId] ?? []).filter((p) => p.tema === tema);

export const getCiclo = (id) => CICLOS.find((c) => c.id === id);

export const contarPreguntas = (moduloId) => PREGUNTAS[moduloId]?.length ?? 0;

// En el navegador, sincroniza los módulos, temas y preguntas directamente desde la base de datos PostgreSQL.
if (typeof window !== 'undefined' && typeof fetch === 'function') {
  const apiUrl = (import.meta.env?.VITE_API_URL ?? '/api').replace(/\/$/, '');
  fetch(`${apiUrl}/catalogo-completo`)
    .then((r) => (r.ok ? r.json() : null))
    .then((datos) => {
      if (!datos) return;
      if (Array.isArray(datos.modulos) && datos.modulos.length) {
        datos.modulos.forEach((mRemoto) => {
          const idx = MODULOS.findIndex((m) => m.id === mRemoto.id);
          if (idx >= 0) {
            MODULOS[idx] = { ...MODULOS[idx], ...mRemoto };
          } else {
            MODULOS.push(mRemoto);
          }
        });
      }
      if (datos.preguntasPorModulo && typeof datos.preguntasPorModulo === 'object') {
        Object.entries(datos.preguntasPorModulo).forEach(([moduloId, lista]) => {
          if (Array.isArray(lista) && lista.length) {
            PREGUNTAS[moduloId] = lista;
            lista.forEach((p) => {
              PREGUNTA_POR_ID[p.id] = p;
            });
          }
        });
      }
    })
    .catch(() => {});
}

export { CICLOS, MODULOS, SECCIONES, modulosDeCiclo, nombreCorto };
