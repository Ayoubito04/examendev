import { z } from 'zod';

// Schema para actualizar el perfil del usuario (tabla: usuarios)
export const actualizarPerfilSchema = z.object({
  nick: z
    .string()
    .trim()
    .min(3, 'El nick debe tener al menos 3 caracteres')
    .max(30, 'El nick no puede superar los 30 caracteres')
    .regex(/^[a-zA-Z0-9_.-]{3,30}$/, 'El nick no es válido.')
    .optional(),
  avatar: z.string().max(255).optional().nullable(),
  avatar_url: z.string().max(255).optional().nullable(),
  ciclo_actual_id: z.enum(['dam', 'daw', 'asir', 'smr']).optional().nullable(),
});
