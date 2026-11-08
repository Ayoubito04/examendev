# ExamenDev

Simulador de exámenes tipo test para los módulos técnicos de los ciclos de **DAM**, **DAW**, **ASIR** y **SMR**.
Práctica con corrección al instante, simulacros cronometrados, repaso de fallos y seguimiento del progreso.

## Funcionalidades

- **31 módulos y 496 preguntas** con explicación, de primero y segundo curso:

  | Ciclo | Grado | 1º | 2º |
  |---|---|---|---|
  | DAM | Superior | 5 comunes con DAW | Acceso a datos, Móviles, Servicios y procesos, Desarrollo de interfaces, SGE |
  | DAW | Superior | 5 comunes con DAM | Cliente, Servidor, Despliegue, Diseño de interfaces web |
  | ASIR | Superior | Implantación de SO, Planificación de redes, Fundamentos de hardware, Gestión de BD, Lenguajes de marcas (compartido) | Administración de SO, Servicios de red e Internet, Implantación de aplicaciones web, Administración de SGBD, Seguridad y alta disponibilidad |
  | SMR | Medio | Montaje y mantenimiento, SO monopuesto, Aplicaciones ofimáticas, Redes locales | SO en red, Seguridad informática, Servicios en red, Aplicaciones web |

  El reparto por curso sigue la organización más habitual y puede variar según la comunidad autónoma.
- **Temario filtrable por ciclo**; los módulos compartidos aparecen en cada ciclo con un único banco y un único progreso.
- **Tres modos de test**
  - *Práctica*: corrección y explicación al responder cada pregunta.
  - *Simulacro*: 1 minuto por pregunta, navegación libre entre preguntas y nota al entregar.
  - *Repaso de fallos*: solo las preguntas falladas que aún no has vuelto a acertar.
- **Preguntas y opciones barajadas** en cada test.
- **Resultados** con nota sobre 10, tiempo y corrección detallada.
- **Mi progreso**: tests realizados, nota media, mejor y última nota por módulo e historial.
- **Atajos de teclado** en los tests: `1`–`4` o `A`–`D` para responder, `Enter`/`→` siguiente, `←` anterior.
- Diseño responsive, accesible y con soporte de `prefers-reduced-motion`.

## Stack

- React 19 + Vite
- React Router (`react-router-dom`)
- CSS propio (sin frameworks), fuentes Instrument Serif, Inter y Manrope
- Persistencia en `localStorage` (sin backend ni registro)

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
├── main.jsx                 # punto de entrada, router y proveedor de progreso
├── config.js                # nombre, correo de contacto y parámetros de los tests
├── components/              # Navbar, Footer, Layout, Quiz, Resultados, ModuloCard…
├── context/ProgressContext.jsx  # intentos y fallos (useContext + localStorage)
├── hooks/                   # useLocalStorage, useCountdown
├── pages/                   # Inicio, Temario, Test, Progreso, Contacto, NoEncontrado
├── data/
│   ├── modulos.js           # ciclos, secciones del temario, módulos, curso y temas
│   ├── index.js             # une los bancos y asigna ids
│   └── preguntas/*.js       # un banco por módulo
├── utils/quiz.js            # barajar, corregir, formatear
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
