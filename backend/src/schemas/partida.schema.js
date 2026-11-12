import { z } from 'zod';

// Schema para iniciar una partida nueva (tabla: partidas)
export const crearPartidaSchema = z
  .object({
    modulo_id: z.string().min(1).optional().nullable(),
    certificacion_id: z.string().min(1).optional().nullable(),
    modo: z.enum(['practica', 'simulacro', 'repaso', 'trivia']),
  })
  .refine((data) => Boolean(data.modulo_id || data.certificacion_id), {
    message: 'Debes especificar un modulo_id o un certificacion_id para iniciar la partida',
  });

// Schema para POST /respuestas (tabla: respuestas)
export const enviarRespuestaSchema = z.object({
  partida_id: z.coerce.number().int().positive({ message: 'partida_id es obligatorio' }),
  pregunta_id: z.string().min(1, 'pregunta_id es obligatorio'),
  opcion_id: z.coerce.number().int().positive().nullable().optional(),
});

// Schema para finalizar una partida (tabla: partidas)
export const finalizarPartidaSchema = z.object({
  tiempo_segundos: z.coerce.number().int().min(0).default(0),
});

// Schema para POST /puntuaciones (Contrato de docs/API.md para partidas de Trivia)
export const puntuacionTriviaSchema = z
  .object({
    moduloId: z.string().min(1, 'El módulo es obligatorio'),
    puntos: z.coerce.number().int().min(0).max(10000),
    aciertos: z.coerce.number().int().min(0),
    total: z.coerce.number().int().min(1).max(100),
    rachaMax: z.coerce.number().int().min(0).default(0),
    segundos: z.coerce.number().int().min(0).default(0),
    preguntas: z.array(z.any()).optional(),
    respuestas: z.array(z.any()).optional(),
  })
  .refine((d) => d.aciertos <= d.total, {
    message: 'El número de aciertos no puede superar el total de preguntas',
  });
