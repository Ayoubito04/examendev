import { Router } from 'express';
import { verificarToken, soloAdmin } from '../middlewares/auth.middleware.js';

// Rutas de administración. Todas exigen sesión válida + rol 'admin'.
// Punto de partida para el dashboard de administrador: añade aquí los endpoints.
const router = Router();

router.use(verificarToken, soloAdmin);

// GET /admin/yo -> comprueba que la sesión actual es de administrador
router.get('/yo', (req, res) => {
  const { id, nick, email, rol } = req.usuario;
  res.json({ ok: true, usuario: { id: String(id), nick, email, rol } });
});

export default router;
