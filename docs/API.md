# Contrato de la API de ExamenDev

Este documento describe la API que espera el frontend. Mientras no exista, la app usa
servicios simulados (`src/api/mock`) que guardan usuarios y puntuaciones en el navegador
y respetan exactamente este mismo contrato.

## Conectar el frontend con la API

Crea `.env.local` en la raíz del proyecto:

```
VITE_API_URL=http://localhost:3000/api
```

Con esa variable, `src/api/*.js` deja de usar el mock y llama a la API real. No hay que
tocar ningún componente.

## Convenciones

- Todas las peticiones y respuestas son JSON.
- Autenticación con JWT en la cabecera `Authorization: Bearer <token>`.
- Errores: código HTTP adecuado y cuerpo `{ "mensaje": "Texto para el usuario", "campo": "email" }`.
  `campo` es opcional e indica qué campo del formulario marcar en rojo.
- Fechas en ISO 8601 (`2026-11-08T17:30:00.000Z`).
- CORS habilitado para el origen del frontend (`http://localhost:5173` en desarrollo).

## Tipos

```ts
Usuario        = { id, nick, email, avatar, creado }           // datos privados (solo el propio usuario)
UsuarioPublico = { id, nick, avatar }                          // lo que ven los demás en el ranking
Partida        = { id, moduloId, puntos, aciertos, total, rachaMax, segundos, fecha }
Estadisticas   = {
  puntos, partidas, mejorPartida, mejorRacha,                  // mejorRacha: aciertos seguidos en una partida
  rachaDias,                                                    // días seguidos jugando (hasta hoy o ayer)
  aciertos, preguntas, perfectas, modulosJugados,
  ciclosJugados: ["DAM", "DAW", ...]
}
FilaRanking    = { posicion, usuario: UsuarioPublico, puntos, partidas, mejorRacha }
```

`avatar` es uno de: `zorro, buho, pulpo, lobo, panda, tigre, ballena, rana, cohete, unicornio, dragon, pinguino`.
`moduloId` es el `id` de `src/data/modulos.js` (por ejemplo `programacion`, `redes-locales`).

## Autenticación

| Método | Ruta | Cuerpo | Respuesta |
|---|---|---|---|
| POST | `/auth/registro` | `{ nick, email, password }` | `201 { token, usuario: Usuario }` |
| POST | `/auth/login` | `{ email, password }` | `200 { token, usuario: Usuario }` |
| GET | `/auth/yo` | — (con token) | `200 Usuario` |
| POST | `/auth/recuperar` | `{ email }` | `200 { enviado: true }` |
| POST | `/auth/restablecer` | `{ token, password }` | `200 { ok: true }` |

- `nick`: 3–20 caracteres, letras, números, `_`, `.` o `-`. Único (sin distinguir mayúsculas).
- `password`: mínimo 8 caracteres, con al menos una letra y un número (lo valida también el frontend).
- Registro duplicado: `409` con `campo: "nick"` o `campo: "email"`.
- Login incorrecto: `401` con un mensaje genérico (no revelar si el correo existe).
- `/auth/recuperar` responde siempre `200` exista o no la cuenta, y envía un correo con un
  enlace a `<frontend>/restablecer?token=<token>`. El token caduca a los 30 minutos y es de un solo uso.
- `/auth/yo` con token caducado o inválido: `401` (el frontend cierra la sesión).

## Perfil

| Método | Ruta | Cuerpo | Respuesta |
|---|---|---|---|
| GET | `/usuarios/yo/perfil` | — | `200 { usuario: Usuario, estadisticas: Estadisticas, ultimasPartidas: Partida[] (5 más recientes) }` |
| PATCH | `/usuarios/yo` | `{ nick?, avatar? }` | `200 Usuario` |

Los **logros** no los guarda el backend: el frontend los calcula a partir de `estadisticas`
(`src/utils/logros.js`).

## Puntuaciones y ranking

| Método | Ruta | Cuerpo / query | Respuesta |
|---|---|---|---|
| POST | `/puntuaciones` | `{ moduloId, puntos, aciertos, total, rachaMax, segundos }` | `201 { partida: Partida, posicionGlobal }` |
| GET | `/ranking` | `?tipo=global\|modulo\|semanal&moduloId=&ciclo=&limite=50` | `200 { filas: FilaRanking[], total, miPosicion: FilaRanking \| null }` |

- `tipo=global`: suma de puntos de todas las partidas.
- `tipo=modulo`: solo las partidas de `moduloId` (obligatorio en este tipo).
- `tipo=semanal`: partidas desde el lunes a las 00:00 (hora de Madrid) de la semana actual.
- `ciclo` (opcional, para `global` y `semanal`): solo partidas de módulos de ese ciclo (`DAM`, `DAW`, `ASIR`, `SMR`).
- Orden: puntos descendente; en empate, mejor racha descendente.
- `miPosicion`: la fila del usuario autenticado aunque no esté en el top (`null` si no hay token o no ha jugado).

### Reglas de puntos (las aplica el frontend; el backend puede validarlas)

- 20 preguntas, 20 segundos por pregunta.
- Acierto: 100 puntos + bonus de rapidez de hasta 50 (proporcional al tiempo restante).
- Multiplicador de racha: ×1,5 desde 3 aciertos seguidos, ×2 desde 5.
- Fallo o tiempo agotado: 0 puntos y la racha vuelve a 0.
- Máximo teórico por partida: 20 × 150 × 2 ≈ 5.250 (las primeras preguntas no llevan multiplicador).
  El backend puede rechazar con `400` partidas con `puntos` imposibles o `aciertos > total`.
