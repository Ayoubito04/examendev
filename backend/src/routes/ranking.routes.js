import { Router } from 'express';
import { getRanking } from '../controllers/ranking.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';
import { validarQuery } from '../middlewares/validate.middleware.js';
import { rankingQuerySchema } from '../schemas/ranking.schema.js';

const router = Router();

// GET /ranking -> Clasificación global, por módulo o semanal (requiere autenticación)
router.get('/', verificarToken, validarQuery(rankingQuerySchema), getRanking);

export default router;
