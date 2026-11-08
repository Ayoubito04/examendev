import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'examendev_clave_secreta_super_segura_2026';

// Middleware obligatorio para rutas privadas (ej. GET /perfil, POST /respuestas, GET /stats/temas)
export function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      mensaje: 'Tienes que iniciar sesión.',
      error: 'No autorizado. Debes iniciar sesión (falta token Bearer).',
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.usuario = payload; // { id, nick, email }
    next();
  } catch {
    return res.status(401).json({
      mensaje: 'La sesión ha caducado.',
      error: 'Token inválido o sesión expirada.',
    });
  }
}

// Middleware opcional (ej. en GET /preguntas o GET /ranking por si el usuario está logueado o no)
export function tokenOpcional(req, _res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      req.usuario = jwt.verify(token, JWT_SECRET);
    } catch {
      req.usuario = null;
    }
  }
  next();
}
