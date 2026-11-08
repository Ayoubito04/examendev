# ExamenDev

Simulador de exámenes tipo test para los módulos técnicos de los ciclos de **DAM**, **DAW**, **ASIR** y **SMR**.
Práctica con corrección al instante, simulacros cronometrados, repaso de fallos y seguimiento del progreso.

## Funcionalidades

- **31 módulos y 620 preguntas** (20 por módulo) con explicación, de primero y segundo curso:

  | Ciclo | Grado | 1º | 2º |
  |---|---|---|---|
  | DAM | Superior | 5 comunes con DAW | Acceso a datos, Móviles, Servicios y procesos, Desarrollo de interfaces, SGE |
  | DAW | Superior | 5 comunes con DAM | Cliente, Servidor, Despliegue, Diseño de interfaces web |
  | ASIR | Superior | Implantación de SO, Planificación de redes, Fundamentos de hardware, Gestión de BD, Lenguajes de marcas (compartido) | Administración de SO, Servicios de red e Internet, Implantación de aplicaciones web, Administración de SGBD, Seguridad y alta disponibilidad |
  | SMR | Medio | Montaje y mantenimiento, SO monopuesto, Aplicaciones ofimáticas, Redes locales | SO en red, Seguridad informática, Servicios en red, Aplicaciones web |

  El reparto por curso sigue la organización más habitual y puede variar según la comunidad autónoma.
- **Temario filtrable por ciclo**; los módulos compartidos aparecen en cada ciclo con un único banco y un único progreso.
- **Cuatro modos de test**
  - *Práctica*: 20 preguntas sin límite de tiempo; eliges, pulsas Validar y ves la corrección; si fallas, un recordatorio con la respuesta correcta.
  - *Simulacro*: 20 preguntas en 90 minutos, botón Validar con recordatorio al fallar, opción de saltar preguntas y mapa que marca aciertos y fallos.
  - *Repaso de fallos*: solo las preguntas falladas que aún no has vuelto a acertar.
  - *Trivia*: 20 preguntas con 20 s cada una, puntos en vivo, racha, multiplicadores y animaciones. Puntúa para el ranking.
- **Puntuación de la trivia**: 100 por acierto + hasta 50 por rapidez; ×1,5 desde 3 aciertos seguidos y ×2 desde 5. Fallar o agotar el tiempo da 0 y reinicia la racha. Resultados con desglose por pregunta.
- **Práctica por tema**: cada pregunta está asignada a un tema del módulo (`/test/:modulo?tema=N`).
- **Preguntas y opciones barajadas** en cada test.
- **Resultados** con nota sobre 10, tiempo y corrección detallada.
- **Mi progreso**: radar de dominio por módulo (por ciclo), barras de acierto por tema, lista de temas a repasar, tabla por módulo e historial.
- **Ranking** con pestañas global, por módulo y semanal, filtro por ciclo, podio y tu posición.
- **Cuentas**: registro, inicio de sesión y recuperación de contraseña. **Perfil** con nick, avatar, puntos, racha de días y logros.
- **Modo oscuro** (sigue al sistema o se elige en la barra), estados de carga, vacío y error en todas las pantallas con datos remotos.
- **Atajos de teclado** en los tests: `1`–`4` o `A`–`D` para responder, `Enter`/`→` siguiente, `←` anterior.
- Diseño responsive, accesible y con soporte de `prefers-reduced-motion`.

## Stack

- React 19 + Vite
- React Router (`react-router-dom`)
- CSS propio (sin frameworks), fuentes Instrument Serif, Inter y Manrope
- Progreso de práctica en `localStorage`
- Cuentas, ranking y perfil a través de una capa de servicios (`src/api/`). Sin backend funciona con **datos simulados** guardados en el navegador (usuarios de demostración incluidos)

## Conectar el backend

El contrato de la API está en [`docs/API.md`](docs/API.md). Para usar el backend real, crea `.env.local` en la raíz:

```bash
VITE_API_URL=http://localhost:3000/api
```

Con esa variable definida, los servicios dejan de usar el mock y llaman a la API (token Bearer en `Authorization`). Sin ella, todo sigue funcionando en modo demo.

## Puesta en marcha

```bash
npm install
npm run dev       # desarrollo en http://localhost:5173
npm run build     # build de producción en dist/
npm run preview   # sirve la build
npm run lint      # oxlint
```

## Estructura

```
src/
├── App.jsx                  # rutas
├── main.jsx                 # punto de entrada, router y proveedores (tema, sesión, progreso)
├── api/                     # servicios: auth, usuarios, puntuaciones; mock/ con datos simulados
├── config.js                # nombre, correo de contacto y parámetros de los tests
├── components/              # Navbar, Footer, Layout, Quiz, Resultados, ModuloCard…
├── context/                 # ProgressContext, AuthContext, TemaContext
├── hooks/                   # useLocalStorage, useCountdown
├── pages/                   # Inicio, Temario, Test, Progreso, Ranking, Perfil, Contacto…
│   └── cuenta/              # Login, Registro, Recuperar, Restablecer
├── data/
│   ├── modulos.js           # ciclos, secciones del temario, módulos, curso y temas
│   ├── index.js             # une los bancos, asigna ids y tema
│   ├── temas.js             # tema (0-4) de cada pregunta por módulo
│   └── preguntas/*.js       # un banco por módulo
├── utils/                   # quiz, puntos, logros, avatares, validación, estadísticas
└── styles/global.css
```

## Añadir preguntas

Cada banco es un array en `src/data/preguntas/<modulo>.js`:

```js
{
  enunciado: '¿Qué palabra clave de Java impide que una clase pueda ser heredada?',
  opciones: ['abstract', 'final', 'static', 'private'],
  correcta: 1, // índice de la opción correcta (0-3)
  explicacion: 'Una clase declarada como `final` no admite subclases.',
}
```

- Añade siempre **al final** del array: el id de cada pregunta (`programacion-07`) se genera por su posición y es lo que se guarda en los fallos del usuario.
- El texto entre comillas invertidas se muestra como código.
- Para un módulo nuevo, añádelo en `data/modulos.js` (con las siglas de sus ciclos en `ciclos` y su `curso`) y registra su banco en `data/index.js`.
- Para un ciclo nuevo, añádelo a `CICLOS` y, si quieres que tenga sección propia en la vista "Todos", a `SECCIONES`.

## Despliegue

Es una SPA estática. Incluye `public/_redirects` (Netlify) y `vercel.json` (Vercel) para que las rutas funcionen al recargar.
Antes de publicar, cambia el correo de contacto en `src/config.js`.
