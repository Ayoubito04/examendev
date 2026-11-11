# Diseño de interfaces web — Hoja de ruta

> **Curso:** 2.º de Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Web (DAW)
> **Módulo profesional:** Diseño de interfaces web (`interfaces-web`)

---

## Mapa general del módulo

El módulo recorre el ciclo completo de diseño, maquetación, preparación multimedia, interactividad, accesibilidad y usabilidad de una interfaz web moderna:

1. **UT 1 · Planificación de la interfaz web:** Comunicación visual, guía de estilo, *design tokens*, arquitectura de la información (*card sorting*, mapa de navegación, *wireframes* y prototipos) y retícula de 12 columnas.
2. **UT 2 · Estilos y maquetación homogénea (CSS):** Hojas de estilo, selectores, cascada y especificidad, Flexbox, CSS Grid, diseño *responsive* (*mobile-first*, funciones fluidas, *container queries*), preferencias del usuario y validación CSS.
3. **UT 3 · Preparación de archivos multimedia:** Propiedad intelectual y licencias Creative Commons, mapas de bits (JPEG, PNG, WebP, AVIF) frente a vectoriales (SVG), imágenes *responsive* (`srcset`, `sizes`, `<picture>`), contenedor frente a códec en audio y vídeo (`MP4 H.264/AAC`, `WebM VP9/Opus`), FFmpeg y subtítulos `WebVTT`.
4. **UT 4 · Integración de contenido multimedia e interactivo:** Etiquetas nativas HTML5 (`<video>`, `<audio>`, `<track>`), `<iframe>` seguro y accesible, elementos interactivos nativos (`<details>`, `<dialog>`), animaciones y eventos, herramientas gráficas interactivas (Genially, H5P) y pruebas en matriz de navegadores.
5. **UT 5 · Interfaces web accesibles:** Marco legal (RD 1112/2018 y Ley Europea de Accesibilidad), W3C/WAI y pautas **WCAG 2.2** (niveles A, AA y AAA; principios Perceptible, Operable, Comprensible y Robusto), árbol de accesibilidad, WAI-ARIA, evaluación de conformidad y relación con el SEO.
6. **UT 6 · Interfaces web amigables (usabilidad):** Definición de usabilidad según **ISO 9241-11** (eficacia, eficiencia y satisfacción), las 10 heurísticas de Jakob Nielsen, estabilidad en la navegación, rendimiento percibido, evaluación heurística de 3 a 5 evaluadores frente a pruebas con usuarios reales y matriz de compatibilidad.

---

## UT 1 · Planificación de la interfaz web

### Qué aprenderás
- Aplicar los principios de la comunicación visual y de la Gestalt (jerarquía, contraste, proximidad, semejanza, alineación, espacio en blanco y coherencia) a una interfaz web.
- Construir una **guía de estilo** con *design tokens* para color (modelo RGB/HSL en pantalla), escala tipográfica (serif, sans-serif, monoespaciada) y espaciado.
- Definir el catálogo de componentes y sus estados interactivos (`default`, `hover`, `focus-visible`, `active`, `disabled`, `loading`, `error`).
- Estructurar la arquitectura de la información mediante *card sorting*, mapa de navegación, esquemas de baja fidelidad (*wireframes*) y prototipos navegables.
- Diseñar sobre una **retícula (*grid*) de 12 columnas** con márgenes y medianil (*gutter*), valorando cuándo partir de una plantilla y cuándo diseñar a medida.

---

## UT 2 · Estilos y maquetación homogénea (CSS)

### Qué aprenderás
- Vincular hojas de estilo externas, internas y en línea, y distinguir el papel de los *frameworks* CSS (Bootstrap, Tailwind CSS) y de los preprocesadores (Sass).
- Dominar selectores avanzados, la cascada, la especificidad, la herencia y las unidades relativas (`rem`, `em`, `%`, `vw`, `vh`, `dvh`).
- Maquetar en una dimensión con **Flexbox** (`flex-direction`, `flex-wrap`, `justify-content`, `align-items`, `gap`) y en dos dimensiones con **CSS Grid** (`grid-template-columns`, `grid-template-rows`, `repeat()`, `minmax()`, `fr`).
- Implementar diseño *responsive* con enfoque ***mobile-first*** (`@media (min-width: ...)`), metaetiqueta `viewport`, funciones fluidas (`clamp()`) y ***container queries*** (`@container`).
- Respetar las preferencias del sistema operativo del usuario mediante `@media (prefers-color-scheme)` y `@media (prefers-reduced-motion)`.
- Validar, depurar y auditar el rendimiento de las hojas de estilo desde las herramientas para desarrolladores del navegador.

---

## UT 3 · Preparación de archivos multimedia

### Qué aprenderás
- Identificar derechos de autor, licencias **Creative Commons** (`CC BY`, `CC BY-SA`, `CC BY-NC`, `CC0`) y bancos de recursos de dominio público.
- Elegir entre formatos de **mapa de bits** (JPEG, PNG, WebP, AVIF) y formatos **vectoriales** (SVG en XML con `viewBox` escalable sin pérdida).
- Optimizar peso y dimensiones y servir imágenes adaptativas con `srcset`, `sizes` y el elemento `<picture>`.
- Distinguir entre **formato contenedor** y **códec** de audio/vídeo: producir el par compatible **`MP4` (`H.264 + AAC`)** y **`WebM` (`VP9/AV1 + Opus`)**.
- Recodificar y comprimir medios con **FFmpeg** y redactar archivos de subtítulos sincronizados en formato **`WebVTT` (`.vtt`)**.

---

## UT 4 · Integración de contenido multimedia e interactivo

### Qué aprenderás
- Integrar audio y vídeo con las etiquetas nativas de HTML5 (`<video>`, `<audio>`, `<source>`, `<track>`) y configurar `<iframe>` de forma segura (`sandbox`, `loading="lazy"`, `title` descriptivo).
- Priorizar los elementos interactivos nativos de HTML (`<details>`/`<summary>`, `<dialog>`) antes de programar componentes equivalentes desde cero en JavaScript.
- Crear transiciones y animaciones con CSS (`transition`, `@keyframes`, `animation`) y controlar eventos y la API `HTMLMediaElement` con `addEventListener`.
- Conocer herramientas gráficas para contenido interactivo integrable en web (como **Genially** o **H5P**).
- Verificar el comportamiento sobre una matriz de navegadores y dispositivos (Chrome, Firefox, Edge, Safari, iOS Safari y Android Chrome).

---

## UT 5 · Interfaces web accesibles

### Qué aprenderás
- Conocer el marco normativo de accesibilidad: **Real Decreto 1112/2018** (sector público) y la **Ley Europea de Accesibilidad**.
- Aplicar las pautas **WCAG 2.2** del W3C/WAI en sus niveles de conformidad **A, AA y AAA** bajo los cuatro principios **POUR** (*Perceptible, Operable, Comprensible y Robusto*):
  - **1.1.1 Contenido no textual:** atributo `alt` descriptivo en imágenes informativas y `alt=""` en imágenes decorativas.
  - **1.4.3 Contraste mínimo (AA):** relación mínima de **4.5:1** para texto normal y **3:1** para texto grande (7:1 en nivel AAA).
  - **2.1.1 Teclado y 2.1.2 Sin trampas para el foco:** toda la funcionalidad operable con teclado sin dejar atrapado el foco.
  - **4.1.2 Nombre, función y valor:** exposición correcta en el árbol de accesibilidad y uso responsable de **WAI-ARIA** (`aria-label`, `aria-expanded`, `aria-live`) sin sustituir nunca el HTML semántico nativo.
- Diferenciar una **revisión preliminar** de una **evaluación de conformidad**, redactar una declaración de accesibilidad y comprender la sinergia entre accesibilidad y **SEO**.

---

## UT 6 · Interfaces web amigables (usabilidad)

### Qué aprenderás
- Definir y medir la **usabilidad** conforme a la norma **ISO 9241-11**: grado en que un producto puede ser utilizado por usuarios específicos para alcanzar objetivos específicos con **eficacia** (completar la tarea con exactitud), **eficiencia** (esfuerzo y tiempo empleados) y **satisfacción** en un contexto de uso determinado.
- Evaluar interfaces con las **10 heurísticas de usabilidad de Jakob Nielsen** (visibilidad del estado del sistema, correspondencia con el mundo real, control y libertad del usuario, consistencia y estándares, prevención de errores, reconocer antes que recordar, flexibilidad y eficiencia, diseño estético y minimalista, ayuda ante errores y documentación).
- Garantizar la estabilidad en la navegación (menú consistente, migas de pan, logotipo enlazado al inicio) y cuidar la velocidad y el rendimiento percibido (*skeletons*, indicadores de progreso, *Core Web Vitals*).
- Combinar la **evaluación heurística en grupo** (entre 3 y 5 evaluadores independientes que luego consensúan hallazgos) con **pruebas con usuarios reales** pensadas en voz alta (*think-aloud*).
- Construir una matriz de compatibilidad basada en la analítica real del sitio.
