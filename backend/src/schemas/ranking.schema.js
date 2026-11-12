import { z } from 'zod';

// Schema para GET /ranking (tabla: ranking)
export const rankingQuerySchema = z.object({
  tipo: z.enum(['global', 'modulo', 'certificacion', 'semanal', 'temporada']).default('global'),
  modulo_id: z.string().optional(),
  moduloId: z.string().optional(),
  ciclo: z.string().optional(),
  certificacion_id: z.string().optional(),
  temporada: z.string().optional(),
  limite: z.coerce.number().int().min(1).max(100).default(50),
});

// Schema para GET /stats/temas (Fortalezas y debilidades)
export const statsTemasQuerySchema = z.object({
  modulo_id: z.string().min(1).optional(),
  certificacion_id: z.string().min(1).optional(),
});
