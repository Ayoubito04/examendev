import { Router } from 'express';
import {
  register,
  login,
  yo,
  solicitarRecuperacion,
  restablecerPassword,
} from '../controllers/auth.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';
import { validarBody } from '../middlewares/validate.middleware.js';
import {
  registerSchema,
  loginSchema,
  recuperarSchema,
  restablecerSchema,
} from '../schemas/auth.schema.js';

const router = Router();

// POST /auth/registro y POST /auth/register
router.post('/registro', validarBody(registerSchema), register);
router.post('/register', validarBody(registerSchema), register);

// POST /auth/login
router.post('/login', validarBody(loginSchema), login);

// GET /auth/yo y GET /auth/me
router.get('/yo', verificarToken, yo);
router.get('/me', verificarToken, yo);

// POST /auth/recuperar y POST /auth/restablecer
router.post('/recuperar', validarBody(recuperarSchema), solicitarRecuperacion);
router.post('/restablecer', validarBody(restablecerSchema), restablecerPassword);

export default router;
