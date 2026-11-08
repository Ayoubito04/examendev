import { Router } from 'express';
import {
  crearPartida,
  enviarRespuesta,
  finalizarPartida,
  getFallosPendientes,
  marcarDominada,
  guardarIntentoCompleto,
  getProgresoUsuario,
  reiniciarProgresoUsuario,
  guardarPuntuacionTrivia,
} from '../controllers/partidas.controller.js';
import { tokenOpcional, verificarToken } from '../middlewares/auth.middleware.js';
import { validarBody } from '../middlewares/validate.middleware.js';
import {
  crearPartidaSchema,
  enviarRespuestaSchema,
  finalizarPartidaSchema,
  puntuacionTriviaSchema,
} from '../schemas/partida.schema.js';

const router = Router();

// POST /puntuaciones -> Guarda la puntuación de una partida de Trivia (docs/API.md)
router.post('/puntuaciones', verificarToken, validarBody(puntuacionTriviaSchema), guardarPuntuacionTrivia);

// GET /progreso -> Carga el historial de intentos y fallos desde PostgreSQL
router.get('/progreso', tokenOpcional, getProgresoUsuario);

// POST /progreso/intento -> Guarda un intento de test completo en PostgreSQL
router.post('/progreso/intento', tokenOpcional, guardarIntentoCompleto);

// DELETE /progreso -> Reinicia el progreso del usuario en PostgreSQL
router.delete('/progreso', tokenOpcional, reiniciarProgresoUsuario);

// POST /partidas -> Inicia una nueva partida (practica, simulacro, repaso o trivia)
router.post('/partidas', tokenOpcional, validarBody(crearPartidaSchema), crearPartida);

// PATCH /partidas/:id/finalizar -> Finaliza la partida y guarda el tiempo
router.patch('/partidas/:id/finalizar', tokenOpcional, validarBody(finalizarPartidaSchema), finalizarPartida);

// POST /respuestas -> Envía una respuesta; el servidor valida y devuelve puntos (Contrato PDF pág. 3)
router.post('/respuestas', tokenOpcional, validarBody(enviarRespuestaSchema), enviarRespuesta);

// GET /respuestas/fallos -> Lista de preguntas falladas pendientes para el modo repaso
router.get('/respuestas/fallos', tokenOpcional, getFallosPendientes);

// PATCH /respuestas/dominar/:preguntaId -> Botón "Ya la domino"
router.patch('/respuestas/dominar/:preguntaId', tokenOpcional, marcarDominada);

export default router;
