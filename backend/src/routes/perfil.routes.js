import { Router } from 'express';
import { getPerfil, actualizarPerfil } from '../controllers/perfil.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';
import { validarBody } from '../middlewares/validate.middleware.js';
import { actualizarPerfilSchema } from '../schemas/perfil.schema.js';

const router = Router();

// GET /perfil y GET /usuarios/yo/perfil
router.get('/perfil', verificarToken, getPerfil);
router.get('/usuarios/yo/perfil', verificarToken, getPerfil);

// PUT /perfil y PATCH /usuarios/yo
router.put('/perfil', verificarToken, validarBody(actualizarPerfilSchema), actualizarPerfil);
router.patch('/usuarios/yo', verificarToken, validarBody(actualizarPerfilSchema), actualizarPerfil);

export default router;
