import { Router } from 'express';
import { getStatsTemas } from '../controllers/stats.controller.js';
import { tokenOpcional } from '../middlewares/auth.middleware.js';
import { validarQuery } from '../middlewares/validate.middleware.js';
import { statsTemasQuerySchema } from '../schemas/ranking.schema.js';

const router = Router();

// GET /stats/temas -> Porcentaje de aciertos y nivel por tema del usuario (Contrato PDF pág. 3)
router.get('/temas', tokenOpcional, validarQuery(statsTemasQuerySchema), getStatsTemas);

export default router;
