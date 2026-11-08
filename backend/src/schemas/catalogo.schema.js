import { z } from 'zod';

// Filtros para consultar módulos (asignaturas) por ciclo y curso (1º o 2º)
export const filtroModulosSchema = z.object({
  ciclo: z.enum(['dam', 'daw', 'asir', 'smr', 'DAM', 'DAW', 'ASIR', 'SMR']).optional(),
  curso: z.coerce.number().int().min(1).max(2).optional(),
  incluir_inactivos: z.enum(['true', 'false']).optional(),
});

// Filtros para pedir preguntas de un test o trivia (tablas: preguntas y opciones)
export const pedirPreguntasSchema = z
  .object({
    modulo_id: z.string().min(1).optional(),
    certificacion_id: z.string().min(1).optional(),
    tema_id: z.coerce.number().int().positive().optional(),
    modo: z.enum(['practica', 'simulacro', 'repaso', 'trivia']).default('practica'),
    cantidad: z.coerce.number().int().min(1).max(50).default(20),
  })
  .refine((data) => Boolean(data.modulo_id || data.certificacion_id), {
    message: 'Debes indicar modulo_id o certificacion_id',
  });
