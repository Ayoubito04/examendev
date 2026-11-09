// Formato: enunciado, opciones (4), correcta (índice 0-3), explicación y tema (1-9).
// Unidades (Hoja de ruta oficial de Desarrollo web en entorno cliente - 2º DAW):
// 1: UT1 · Arquitecturas y tecnologías del cliente web
// 2: UT2 · Fundamentos del lenguaje: sintaxis y sentencias
// 3: UT3 · Objetos predefinidos del lenguaje
// 4: UT4 · Estructuras definidas por el usuario
// 5: UT5 · Manipulación del DOM
// 6: UT6 · Eventos e interactividad
// 7: UT7 · Formularios y validación en cliente
// 8: UT8 · Comunicación asíncrona: fetch, AJAX y APIs
// 9: UT9 · Aplicaciones dinámicas y frameworks de cliente

export default [
  // --- 20 preguntas originales (mantienen su posición 01..20 para conservar IDs) ---
  {
    tema: 2,
    enunciado: '¿Qué palabra clave declara una variable con ámbito de bloque que se puede reasignar?',
    opciones: ['var', 'let', 'const', 'static'],
    correcta: 1,
    explicacion: '`let` tiene ámbito de bloque y se puede reasignar. `const` también es de bloque pero no admite reasignación, y `var` tiene ámbito de función.',
  },
  {
    tema: 2,
    enunciado: '¿Qué resultado da `2 + "2"` en JavaScript?',
    opciones: ['4', '"22"', 'NaN', 'Error de tipos'],
    correcta: 1,
    explicacion: 'Si uno de los operandos de `+` es una cadena, el otro se convierte a cadena y se concatenan.',
  },
  {
    tema: 2,
    enunciado: '¿Qué compara el operador `===`?',
    opciones: ['Solo el valor', 'El valor y el tipo, sin conversión', 'Solo la referencia', 'Solo el tipo'],
    correcta: 1,
    explicacion: 'La igualdad estricta no hace conversión de tipos: `1 === "1"` es `false`, mientras que `1 == "1"` es `true`.',
  },
  {
    tema: 2,
    enunciado: '¿Qué devuelve `typeof null`?',
    opciones: ['"null"', '"undefined"', '"object"', '"number"'],
    correcta: 2,
    explicacion: 'Es un error histórico del lenguaje que se mantiene por compatibilidad: `typeof null` es `"object"`.',
  },
  {
    tema: 4,
    enunciado: '¿Qué método de array crea un array nuevo transformando cada elemento?',
    opciones: ['forEach', 'map', 'filter', 'reduce'],
    correcta: 1,
    explicacion: '`map` devuelve un array de la misma longitud con el resultado de la función. `forEach` no devuelve nada.',
  },
  {
    tema: 4,
    enunciado: '¿Qué devuelve `[1, 2, 3, 4].filter(n => n % 2 === 0)`?',
    opciones: ['[1, 3]', '[2, 4]', 'true', '6'],
    correcta: 1,
    explicacion: '`filter` conserva los elementos para los que la función devuelve `true`: los pares 2 y 4.',
  },
  {
    tema: 5,
    enunciado: '¿Qué método devuelve el primer elemento del documento que coincide con un selector CSS?',
    opciones: ['document.getElementsByClassName', 'document.querySelector', 'document.querySelectorAll', 'document.getElement'],
    correcta: 1,
    explicacion: '`querySelector` devuelve el primer elemento o `null`. `querySelectorAll` devuelve una NodeList con todos.',
  },
  {
    tema: 7,
    enunciado: '¿Cómo se evita que un formulario recargue la página al enviarse?',
    opciones: ['event.stopPropagation()', 'event.preventDefault()', 'return true', 'event.cancel()'],
    correcta: 1,
    explicacion: '`preventDefault()` cancela la acción por defecto del navegador. `stopPropagation()` solo detiene la propagación del evento.',
  },
  {
    tema: 6,
    enunciado: '¿Qué es el event bubbling?',
    opciones: [
      'Que el evento se dispara dos veces',
      'Que el evento se propaga desde el elemento hacia sus ancestros',
      'Que el evento se ejecuta en segundo plano',
      'Que el evento se cancela solo',
    ],
    correcta: 1,
    explicacion: 'En la fase de burbuja el evento sube del elemento destino hasta `document`. Es lo que permite la delegación de eventos.',
  },
  {
    tema: 8,
    enunciado: '¿Qué devuelve siempre una función declarada con `async`?',
    opciones: ['undefined', 'Una Promise', 'Un callback', 'El valor sin envolver'],
    correcta: 1,
    explicacion: 'Una función `async` siempre devuelve una promesa que se resuelve con el valor retornado o se rechaza con la excepción lanzada.',
  },
  {
    tema: 8,
    enunciado: 'Tras `const res = await fetch(url)`, ¿cómo se obtiene el cuerpo como objeto JSON?',
    opciones: ['res.body', 'JSON.parse(res)', 'await res.json()', 'res.data'],
    correcta: 2,
    explicacion: '`res.json()` lee el cuerpo y lo parsea; devuelve una promesa, por eso se usa `await`.',
  },
  {
    tema: 3,
    enunciado: '¿Qué tipo de dato guarda `localStorage`?',
    opciones: ['Cualquier objeto JavaScript', 'Solo cadenas de texto', 'Solo números', 'Ficheros binarios'],
    correcta: 1,
    explicacion: 'Todo se guarda como texto. Para objetos hay que usar `JSON.stringify` al guardar y `JSON.parse` al leer.',
  },
  {
    tema: 4,
    enunciado: '¿Qué diferencia a una función flecha respecto al valor de `this`?',
    opciones: [
      'Su this es siempre window',
      'No tiene this propio: usa el del ámbito donde se define',
      'Su this es la propia función',
      'No puede usar this en ningún caso',
    ],
    correcta: 1,
    explicacion: 'Las funciones flecha heredan `this` léxicamente, por eso son útiles en callbacks dentro de métodos.',
  },
  {
    tema: 4,
    enunciado: '¿Qué hace `const copia = [...original]`?',
    opciones: [
      'Crea una referencia al mismo array',
      'Crea una copia superficial del array',
      'Crea una copia profunda',
      'Convierte el array en objeto',
    ],
    correcta: 1,
    explicacion: 'El operador spread copia los elementos en un array nuevo, pero los objetos internos siguen siendo los mismos (copia superficial).',
  },
  {
    tema: 4,
    enunciado: '¿Qué hace `const { nombre } = usuario`?',
    opciones: [
      'Crea un objeto nuevo llamado nombre',
      'Extrae la propiedad nombre de usuario en una constante',
      'Comprueba si usuario tiene nombre',
      'Renombra el objeto usuario',
    ],
    correcta: 1,
    explicacion: 'Es desestructuración de objetos: equivale a `const nombre = usuario.nombre`.',
  },
  {
    tema: 3,
    enunciado: '¿Qué hace `JSON.stringify(obj)`?',
    opciones: [
      'Convierte una cadena JSON en objeto',
      'Convierte un objeto en una cadena JSON',
      'Valida un JSON',
      'Clona el objeto',
    ],
    correcta: 1,
    explicacion: '`stringify` serializa a texto. La operación inversa es `JSON.parse`.',
  },
  {
    tema: 4,
    enunciado: '¿Qué método añade un elemento al final de un array?',
    opciones: ['unshift', 'push', 'pop', 'shift'],
    correcta: 1,
    explicacion: '`push` añade al final y `pop` quita del final. `unshift` y `shift` hacen lo mismo por el principio.',
  },
  {
    tema: 6,
    enunciado: '¿Qué método registra un manejador de eventos en un elemento del DOM?',
    opciones: ['onEvent', 'addEventListener', 'attachHandler', 'listen'],
    correcta: 1,
    explicacion: 'Por ejemplo `boton.addEventListener(\'click\', manejador)`. Permite registrar varios manejadores para el mismo evento.',
  },
  {
    tema: 2,
    enunciado: '¿Qué valor tiene una variable declarada con `let` a la que no se le ha asignado nada?',
    opciones: ['null', 'undefined', '0', '""'],
    correcta: 1,
    explicacion: '`undefined` significa "sin valor asignado". `null` es un valor que se asigna a propósito.',
  },
  {
    tema: 3,
    enunciado: '¿Qué hace `setTimeout(fn, 1000)`?',
    opciones: ['Ejecuta fn cada segundo', 'Ejecuta fn una vez, pasado aproximadamente un segundo', 'Detiene el programa un segundo', 'Ejecuta fn 1000 veces'],
    correcta: 1,
    explicacion: 'Programa una ejecución única. Para repetirla periódicamente se usa `setInterval`.',
  },

  // --- Nuevas preguntas (21..36) para cubrir las 9 Unidades de la Hoja de Ruta ---
  {
    tema: 1,
    enunciado: 'Al enlazar un archivo JavaScript externo con `<script src="app.js" defer></script>`, ¿qué efecto tiene el atributo `defer`?',
    opciones: [
      'Descarga el script en paralelo sin bloquear el análisis del HTML y lo ejecuta en orden cuando el DOM está listo',
      'Bloquea inmediatamente el pintado de la página hasta terminar de descargar el script',
      'Ejecuta el script en el servidor antes de enviar el HTML',
      'Impide que el script acceda al árbol DOM',
    ],
    correcta: 0,
    explicacion: '`defer` descarga el archivo en segundo plano sin detener la construcción del DOM y difiere su ejecución hasta que el documento ha sido analizado, respetando el orden entre scripts.',
  },
  {
    tema: 1,
    enunciado: 'Cuando el navegador recibe una página web, ¿qué dos árboles construye en memoria antes de componer el árbol de renderizado y pintar los píxeles?',
    opciones: [
      'El árbol DOM (para el HTML) y el árbol CSSOM (para las hojas de estilo CSS)',
      'El árbol SQL y el árbol PHP-FPM',
      'El árbol BIOS y el árbol de paquetes TCP',
      'Únicamente el árbol JSON',
    ],
    correcta: 0,
    explicacion: 'El navegador analiza el HTML para construir el DOM y analiza el CSS para construir el CSSOM; ambos se combinan para calcular el diseño (layout) y pintar la página.',
  },
  {
    tema: 1,
    enunciado: 'En la separación de responsabilidades en tres capas del desarrollo cliente, ¿qué aporta cada tecnología?',
    opciones: [
      'HTML aporta la estructura semántica y el contenido; CSS el aspecto visual y diseño; JavaScript el comportamiento e interactividad',
      'HTML aporta la base de datos; CSS las peticiones de red; JavaScript las tablas SQL',
      'JavaScript define los colores, CSS la estructura semántica y HTML los eventos',
      'Las tres capas deben mezclarse siempre en atributos `style` y `onclick` en línea',
    ],
    correcta: 0,
    explicacion: 'Separar contenido semántico (HTML), presentación (CSS) y comportamiento (JavaScript) hace el código mantenible, accesible y fácil de depurar.',
  },
  {
    tema: 1,
    enunciado: '¿Qué es TypeScript en el ecosistema del desarrollo web en entorno cliente?',
    opciones: [
      'Un superconjunto tipado de JavaScript que añade comprobación estática de tipos y se compila (transpila) a JavaScript estándar',
      'Un motor de bases de datos relacionales que sustituye a PostgreSQL',
      'Un protocolo de red que reemplaza a HTTP/2',
      'Un navegador web exclusivo para sistemas Linux',
    ],
    correcta: 0,
    explicacion: 'TypeScript añade tipos estáticos e interfaces sobre JavaScript para detectar errores en el editor y en tiempo de compilación antes de ejecutar el código en el navegador.',
  },
  {
    tema: 3,
    enunciado: '¿Cuál es la diferencia clave entre `localStorage` y `sessionStorage` en la Web Storage API?',
    opciones: [
      '`localStorage` persiste indefinidamente aunque se cierre el navegador; `sessionStorage` dura solo mientras permanece abierta la pestaña actual',
      '`sessionStorage` se envía automáticamente al servidor en cada cabecera HTTP y `localStorage` no',
      '`localStorage` solo admite números y `sessionStorage` admite objetos binarios',
      'No existe ninguna diferencia: ambos son alias del mismo almacén',
    ],
    correcta: 0,
    explicacion: '`localStorage` conserva los datos del origen hasta que se borren explícitamente, mientras que `sessionStorage` está aislado por pestaña y se limpia al cerrarla.',
  },
  {
    tema: 5,
    enunciado: 'Al insertar en el DOM un texto introducido por el usuario, ¿por qué debes usar `elemento.textContent = texto` en lugar de `elemento.innerHTML = texto`?',
    opciones: [
      'Porque `textContent` escapa el contenido como texto plano y evita ataques XSS si el dato contiene etiquetas `<script>` o eventos maliciosos',
      'Porque `innerHTML` solo funciona en Internet Explorer',
      'Porque `textContent` descarga automáticamente las imágenes externas',
      'Porque `textContent` ejecuta el código JavaScript contenido en la cadena',
    ],
    correcta: 0,
    explicacion: '`innerHTML` interpreta cadenas como marcado HTML, abriendo la puerta a Cross-Site Scripting (XSS) si se usa con datos ajenos; `textContent` inserta texto seguro.',
  },
  {
    tema: 5,
    enunciado: 'En la manipulación del DOM, ¿para qué sirve usar un `DocumentFragment` (`document.createDocumentFragment()`) al insertar muchas filas en una lista?',
    opciones: [
      'Para ensamblar todos los nodos en memoria e insertarlos en el documento de una sola vez, evitando reflujos (reflows) y repintados repetidos',
      'Para cifrar los nodos con una clave privada antes de mostrarlos',
      'Para guardar las filas automáticamente en `localStorage`',
      'Para enviar los nodos al servidor mediante WebSockets',
    ],
    correcta: 0,
    explicacion: '`DocumentFragment` es un contenedor ligero fuera del árbol principal; al insertarlo en el DOM se vuelcan todos sus hijos en una única operación de diseño y pintado.',
  },
  {
    tema: 5,
    enunciado: '¿Cómo se lee y modifica desde JavaScript un atributo personalizado de datos `data-producto-id="42"` de un elemento HTML?',
    opciones: [
      'A través de la propiedad `elemento.dataset.productoId`',
      'Con `elemento.data.producto_id()`',
      'Solo mediante una expresión regular sobre `document.cookie`',
      'Con `window.location.productoId`',
    ],
    correcta: 0,
    explicacion: 'La propiedad `dataset` expone todos los atributos `data-*` convirtiendo los nombres con guiones (`kebab-case`) a `camelCase` (`productoId`).',
  },
  {
    tema: 6,
    enunciado: 'En el modelo de eventos del DOM, ¿en qué consiste el patrón de «delegación de eventos»?',
    opciones: [
      'En registrar un único manejador en un elemento contenedor estable y usar `event.target` (o `.closest()`) para identificar qué elemento hijo originó el evento',
      'En añadir un atributo `onclick` en línea a cada uno de los mil elementos de una lista',
      'En delegar la validación de eventos exclusivamente al servidor de bases de datos',
      'En desactivar el burbujeo de todos los eventos del documento',
    ],
    correcta: 0,
    explicacion: 'Aprovechando el burbujeo, un único listener en el contenedor gestiona todos los hijos actuales y los que se creen dinámicamente en el futuro, ahorrando memoria.',
  },
  {
    tema: 6,
    enunciado: '¿Qué diferencia hay entre la pareja de eventos de ratón `mouseover`/`mouseout` y `mouseenter`/`mouseleave`?',
    opciones: [
      '`mouseover`/`mouseout` burbujean y se disparan también al pasar por los elementos hijos; `mouseenter`/`mouseleave` no burbujean y solo avisan al entrar o salir del elemento completo',
      '`mouseenter` solo funciona en pantallas táctiles y `mouseover` solo con teclado',
      '`mouseover` se dispara al hacer clic derecho y `mouseenter` al pulsar la tecla Intro',
      'Son exactamente idénticos en comportamiento y propagación',
    ],
    correcta: 0,
    explicacion: 'Para resaltar una tarjeta o fila entera sin falsos disparos al mover el puntero por sus hijos internos, `mouseenter` y `mouseleave` son la elección adecuada.',
  },
  {
    tema: 7,
    enunciado: 'En un elemento `<form id="registro">`, ¿qué ventaja ofrece la colección nativa `formulario.elements`?',
    opciones: [
      'Permite acceder directamente a todos los controles del formulario (`input`, `select`, `textarea`) por su atributo `name` sin tener que buscar cada uno con `querySelector`',
      'Envía el formulario automáticamente por correo electrónico sin servidor',
      'Cifra las contraseñas con Argon2id en el navegador',
      'Sustituye a las hojas de estilo CSS del formulario',
    ],
    correcta: 0,
    explicacion: '`form.elements` contiene todos los controles interactivos del formulario indexados tanto por posición como por su atributo `name` o `id`.',
  },
  {
    tema: 7,
    enunciado: '¿Para qué sirve el constructor `new FormData(formulario)` al procesar un formulario desde JavaScript?',
    opciones: [
      'Recoge de una sola vez todos los pares nombre-valor de los controles con atributo `name` del formulario (incluidos checkboxes, radios y ficheros)',
      'Borra todos los campos del formulario y cierra la pestaña',
      'Convierte el formulario en una tabla SQL dentro del navegador',
      'Valida únicamente el formato del código postal',
    ],
    correcta: 0,
    explicacion: '`FormData` empaqueta automáticamente todos los campos con `name` del formulario y puede enviarse directamente como `body` en `fetch()` o convertirse en objeto.',
  },
  {
    tema: 7,
    enunciado: '¿Qué comprueba el método `.test(cadena)` de una expresión regular como `/^\\d{5}$/.test(codigoPostal)`?',
    opciones: [
      'Devuelve `true` si la cadena cumple el patrón (exactamente 5 dígitos del principio `^` al final `$`) o `false` en caso contrario',
      'Sustituye todos los números de la cadena por asteriscos',
      'Devuelve un array con todas las etiquetas HTML del documento',
      'Convierte la cadena en un número entero en base hexadecimal',
    ],
    correcta: 0,
    explicacion: '`RegExp.prototype.test()` evalúa si una cadena coincide con el patrón regular y devuelve un booleano, ideal para validaciones de formato.',
  },
  {
    tema: 8,
    enunciado: 'En un buscador que consulta una API mientras el usuario escribe, ¿qué dos técnicas evitan saturar el servidor y mostrar respuestas desordenadas de peticiones antiguas?',
    opciones: [
      'Aplicar un antirrebote (debounce de ~300 ms) al escribir y cancelar la petición `fetch` anterior en vuelo con `AbortController`',
      'Recargar la página completa con `location.reload()` en cada pulsación de tecla',
      'Lanzar diez peticiones simultáneas por cada letra escrita',
      'Bloquear el hilo principal con un bucle `while` infinito durante 5 segundos',
    ],
    correcta: 0,
    explicacion: 'El debounce espera a una breve pausa del usuario antes de pedir datos, y `AbortController` aborta cualquier petición previa que aún no haya terminado.',
  },
  {
    tema: 9,
    enunciado: '¿Qué diferencia fundamental hay entre manipular el DOM manualmente (imperativo) y el renderizado declarativo de un framework de componentes (como React o Vue)?',
    opciones: [
      'En el enfoque declarativo describes cómo debe verse la interfaz para cada estado, y el framework actualiza automáticamente el DOM cuando cambian los datos',
      'En el enfoque declarativo está prohibido usar funciones o variables en JavaScript',
      'Los frameworks de cliente se ejecutan exclusivamente dentro del motor de PostgreSQL',
      'El renderizado declarativo obliga a recargar toda la página HTML en cada clic',
    ],
    correcta: 0,
    explicacion: 'En lugar de recordar qué nodos del DOM tocar en cada cambio, en un framework declarativo la vista es función del estado (`UI = f(estado)`).',
  },
  {
    tema: 9,
    enunciado: '¿Cuáles son las tres tecnologías estándar del navegador que forman los Web Components nativos (sin necesidad de framework)?',
    opciones: [
      'Custom Elements (`customElements.define`), Shadow DOM (`attachShadow`) y plantillas HTML (`<template>` y `<slot>`)',
      'jQuery, Bootstrap y PHP-FPM',
      'ActiveX, Flash y Applets de Java',
      'Cookies, `alert()` y `document.write()`',
    ],
    correcta: 0,
    explicacion: 'Los Web Components del estándar web combinan Custom Elements (etiquetas propias), Shadow DOM (encapsulación de estilos y árbol interno) y `<template>`.',
  },
];
