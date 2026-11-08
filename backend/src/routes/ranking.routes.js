import { Router } from 'express';
import { getRanking } from '../controllers/ranking.controller.js';
import { tokenOpcional } from '../middlewares/auth.middleware.js';
import { validarQuery } from '../middlewares/validate.middleware.js';
import { rankingQuerySchema } from '../schemas/ranking.schema.js';

const router = Router();

// GET /ranking -> Clasificación global, por módulo o semanal (docs/API.md y PDF pág. 3)
router.get('/', tokenOpcional, validarQuery(rankingQuerySchema), getRanking);

export default router;
