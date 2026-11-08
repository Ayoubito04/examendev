import { Router } from 'express';
import {
  getCiclos,
  getModulos,
  getCertificaciones,
  getTemas,
  getPreguntas,
} from '../controllers/catalogo.controller.js';
import { tokenOpcional } from '../middlewares/auth.middleware.js';
import { validarQuery } from '../middlewares/validate.middleware.js';
import { filtroModulosSchema, pedirPreguntasSchema } from '../schemas/catalogo.schema.js';

const router = Router();

// GET /ciclos -> Grados de FP (DAM, DAW, ASIR, SMR)
router.get('/ciclos', getCiclos);

// GET /modulos -> Asignaturas de FP (filtrable por ?ciclo=dam&curso=1)
router.get('/modulos', validarQuery(filtroModulosSchema), getModulos);

// GET /certificaciones -> Certificaciones (Microsoft AZ-900, SC-900, etc.)
router.get('/certificaciones', getCertificaciones);

// GET /temas -> Temas de un módulo (?modulo_id=programacion) o certificación
router.get('/temas', getTemas);

// GET /preguntas -> Preguntas barajadas sin el campo 'es_correcta'
router.get('/preguntas', tokenOpcional, validarQuery(pedirPreguntasSchema), getPreguntas);

export default router;
