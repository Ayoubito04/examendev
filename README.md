# ExamenDev

Simulador de exámenes tipo test para los módulos técnicos de los ciclos de **DAM** y **DAW**.
Práctica con corrección al instante, simulacros cronometrados, repaso de fallos y seguimiento del progreso.

## Funcionalidades

- **14 módulos y 224 preguntas** con explicación: los 5 comunes de 1º, 4 de 2º de DAW y 5 de 2º de DAM.
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
│   ├── modulos.js           # módulos, ciclos, curso y temas
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
- Para un módulo nuevo, añádelo en `data/modulos.js` y registra su banco en `data/index.js`.

## Despliegue

Es una SPA estática. Incluye `public/_redirects` (Netlify) y `vercel.json` (Vercel) para que las rutas funcionen al recargar.
Antes de publicar, cambia el correo de contacto en `src/config.js`.
