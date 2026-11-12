// Middleware para validar req.body con un Schema de Zod
export const validarBody = (schema) => (req, res, next) => {
  const resultado = schema.safeParse(req.body);
  if (!resultado.success) {
    const primerError = resultado.error.issues[0];
    return res.status(400).json({
      mensaje: primerError?.message || 'Datos de entrada no válidos',
      campo: primerError?.path?.join('.') || null,
      error: 'Datos de entrada no válidos',
      detalles: resultado.error.issues.map((i) => ({
        campo: i.path.join('.'),
        mensaje: i.message,
      })),
    });
  }
  req.body = resultado.data;
  next();
};

// Middleware para validar req.query con un Schema de Zod
export const validarQuery = (schema) => (req, res, next) => {
  const resultado = schema.safeParse(req.query);
  if (!resultado.success) {
    const primerError = resultado.error.issues[0];
    return res.status(400).json({
      mensaje: primerError?.message || 'Parámetros de consulta no válidos',
      error: 'Parámetros de consulta no válidos',
      detalles: resultado.error.issues.map((i) => ({
        campo: i.path.join('.'),
        mensaje: i.message,
      })),
    });
  }
  req.queryValidado = resultado.data;
  next();
};
