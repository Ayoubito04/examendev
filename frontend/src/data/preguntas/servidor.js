// Banco de preguntas oficial de Desarrollo web en entorno servidor (2º DAW)
// 40 preguntas etiquetadas con su unidad oficial ('tema': 1 al 10).
export default [
  // --- Primeras 20 preguntas (conservan su posición original 01..20 y añaden su etiqueta de tema) ---
  {
    tema: 2,
    enunciado: '¿Con qué carácter empiezan los nombres de variable en PHP?',
    opciones: ['@', '#', '$', '&'],
    correcta: 2,
    explicacion: 'Todas las variables de PHP empiezan por `$`, por ejemplo `$nombre`.',
  },
  {
    tema: 2,
    enunciado: '¿Qué operador concatena cadenas en PHP?',
    opciones: ['+', '.', '&', '||'],
    correcta: 1,
    explicacion: 'En PHP se concatena con el punto: `"Hola " . $nombre`. El `+` es solo aritmético.',
  },
  {
    tema: 3,
    enunciado: '¿Qué superglobal contiene los datos de un formulario enviado con `method="post"`?',
    opciones: ['$_GET', '$_POST', '$_SESSION', '$_SERVER'],
    correcta: 1,
    explicacion: '`$_POST` recoge los campos enviados en el cuerpo de una petición POST.',
  },
  {
    tema: 4,
    enunciado: '¿Qué función debe llamarse antes de usar `$_SESSION`?',
    opciones: ['session_open()', 'session_start()', 'session_init()', 'start_session()'],
    correcta: 1,
    explicacion: '`session_start()` crea o reanuda la sesión. Debe llamarse antes de enviar cualquier salida al navegador.',
  },
  {
    tema: 4,
    enunciado: '¿Dónde se almacenan los datos de una sesión en PHP?',
    opciones: [
      'En el navegador del cliente',
      'En el servidor; el cliente solo guarda un identificador',
      'En la URL',
      'En la base de datos obligatoriamente',
    ],
    correcta: 1,
    explicacion: 'Los datos de sesión viven en el servidor y el navegador conserva el id de sesión, normalmente en una cookie. Las cookies, en cambio, guardan los datos en el cliente.',
  },
  {
    tema: 2,
    enunciado: '¿Qué diferencia hay entre `include` y `require`?',
    opciones: [
      'require solo carga el fichero una vez',
      'require produce un error fatal si no encuentra el fichero',
      'include no ejecuta el código',
      'No hay diferencia',
    ],
    correcta: 1,
    explicacion: 'Si el fichero falta, `include` emite un aviso y continúa, mientras que `require` detiene el script. Cargar una sola vez es lo que hacen las variantes `_once`.',
  },
  {
    tema: 6,
    enunciado: '¿Cuál es la forma recomendada de evitar la inyección SQL?',
    opciones: [
      'Ocultar los errores de la base de datos',
      'Usar consultas preparadas con parámetros',
      'Usar solo consultas SELECT',
      'Cifrar la base de datos',
    ],
    correcta: 1,
    explicacion: 'Con consultas preparadas (por ejemplo `PDO::prepare` y parámetros enlazados) los datos nunca se interpretan como código SQL.',
  },
  {
    tema: 4,
    enunciado: '¿Qué función de PHP se recomienda para guardar contraseñas?',
    opciones: ['md5()', 'sha1()', 'password_hash()', 'base64_encode()'],
    correcta: 2,
    explicacion: '`password_hash()` usa un algoritmo lento con sal (bcrypt o Argon2id). MD5 y SHA-1 son demasiado rápidos y base64 no es un hash.',
  },
  {
    tema: 6,
    enunciado: '¿Qué función escapa la salida HTML para prevenir ataques XSS?',
    opciones: ['strip_tags()', 'htmlspecialchars()', 'addslashes()', 'trim()'],
    correcta: 1,
    explicacion: '`htmlspecialchars()` convierte `<`, `>`, `&` y comillas en entidades, para que el navegador no ejecute lo que introdujo el usuario.',
  },
  {
    tema: 8,
    enunciado: '¿Qué código de estado HTTP indica que un recurso se ha creado correctamente?',
    opciones: ['200', '201', '204', '302'],
    correcta: 1,
    explicacion: '201 Created es la respuesta típica a un POST que crea un recurso. 204 es éxito sin contenido.',
  },
  {
    tema: 8,
    enunciado: '¿Qué significa el código de estado HTTP 404?',
    opciones: ['Error interno del servidor', 'No autorizado', 'Recurso no encontrado', 'Petición incorrecta'],
    correcta: 2,
    explicacion: '404 Not Found. Los otros serían 500, 401 y 400 respectivamente.',
  },
  {
    tema: 8,
    enunciado: 'En una API REST, ¿qué verbo HTTP se usa para reemplazar un recurso completo?',
    opciones: ['GET', 'POST', 'PUT', 'PATCH'],
    correcta: 2,
    explicacion: '`PUT` reemplaza el recurso entero y es idempotente. `PATCH` hace una modificación parcial.',
  },
  {
    tema: 8,
    enunciado: '¿Qué significa que una API REST sea stateless (sin estado)?',
    opciones: [
      'Que no usa base de datos',
      'Que cada petición incluye toda la información necesaria y el servidor no guarda contexto del cliente entre peticiones',
      'Que solo admite GET',
      'Que no devuelve códigos de estado',
    ],
    correcta: 1,
    explicacion: 'Cada petición se procesa de forma independiente; por ejemplo, el token de autenticación se envía en cada una.',
  },
  {
    tema: 7,
    enunciado: 'En el patrón MVC, ¿qué componente recibe la petición y coordina modelo y vista?',
    opciones: ['El modelo', 'La vista', 'El controlador', 'El router de la base de datos'],
    correcta: 2,
    explicacion: 'El controlador interpreta la petición, pide datos al modelo y elige la vista que genera la respuesta.',
  },
  {
    tema: 8,
    enunciado: '¿Dónde se envía normalmente un JWT en las peticiones a una API?',
    opciones: [
      'En la URL como parámetro',
      'En la cabecera Authorization con el esquema Bearer',
      'En el cuerpo de las peticiones GET',
      'En una cookie siempre obligatoria',
    ],
    correcta: 1,
    explicacion: 'Lo habitual es `Authorization: Bearer <token>`. Ponerlo en la URL lo expone en logs e historial.',
  },
  {
    tema: 10,
    enunciado: '¿Qué herramienta gestiona las dependencias de un proyecto PHP?',
    opciones: ['npm', 'Composer', 'Maven', 'pip'],
    correcta: 1,
    explicacion: 'Composer lee `composer.json`, instala paquetes en `vendor/` y genera el autoload.',
  },
  {
    tema: 3,
    enunciado: '¿Qué función de PHP comprueba si una variable está definida y no es null?',
    opciones: ['empty()', 'isset()', 'is_null()', 'defined()'],
    correcta: 1,
    explicacion: '`isset($_POST[\'email\'])` es la forma habitual de comprobar si llegó un campo del formulario.',
  },
  {
    tema: 5,
    enunciado: '¿Qué extensión de PHP ofrece una interfaz común para conectarse a distintas bases de datos?',
    opciones: ['mysql_connect', 'PDO', 'ODBC_PHP', 'SQLite3 solamente'],
    correcta: 1,
    explicacion: 'PDO funciona con MySQL, PostgreSQL, SQLite y otros, y admite consultas preparadas.',
  },
  {
    tema: 8,
    enunciado: 'En una API REST, ¿qué verbo HTTP se usa para eliminar un recurso?',
    opciones: ['REMOVE', 'DELETE', 'POST', 'GET'],
    correcta: 1,
    explicacion: 'Por ejemplo `DELETE /usuarios/5`. Suele responder con 204 No Content.',
  },
  {
    tema: 6,
    enunciado: '¿Qué código HTTP indica que hace falta autenticarse para acceder al recurso?',
    opciones: ['401', '403', '404', '500'],
    correcta: 0,
    explicacion: '401 Unauthorized: no hay credenciales válidas. 403 Forbidden: estás autenticado pero no tienes permiso.',
  },

  // --- Nuevas preguntas añadidas según la hoja de ruta oficial de las 10 Unidades (21..40) ---

  // UT 1: Arquitecturas y tecnologías del servidor web
  {
    tema: 1,
    enunciado: 'En un despliegue moderno en producción con Nginx y PHP, ¿cómo delega el servidor web la ejecución de los scripts PHP?',
    opciones: [
      'A través del protocolo FastCGI hacia el gestor de procesos PHP-FPM, que mantiene un pool de trabajadores listos sin crear un proceso desde cero en cada petición como hacía el CGI clásico',
      'Enviando el código fuente PHP sin procesar al navegador para que lo ejecute Chrome',
      'Compilando cada archivo PHP en un ejecutable .exe de Windows en el cliente',
      'Mediante el protocolo SMTP de correo electrónico',
    ],
    correcta: 0,
    explicacion: 'El CGI clásico creaba un proceso nuevo por petición (muy lento). PHP-FPM (FastCGI Process Manager) mantiene procesos persistentes y reutilizables comunicados con Nginx o Apache por FastCGI.',
  },
  {
    tema: 1,
    enunciado: '¿Qué diferencia fundamental hay entre la ejecución de código en el servidor y en el cliente?',
    opciones: [
      'El código de servidor se ejecuta en la máquina del servidor antes de enviar la respuesta HTTP, tiene acceso a recursos protegidos (BD, secretos) y nunca es visible para el navegador del usuario',
      'El código de servidor se descarga y se ve completo al pulsar «Ver código fuente» en el navegador',
      'El código de servidor solo puede modificar el DOM mediante eventos de ratón',
      'El servidor no puede conectarse a bases de datos',
    ],
    correcta: 0,
    explicacion: 'El navegador únicamente recibe el resultado generado (HTML, JSON, etc.); el código PHP/servidor y las credenciales permanecen ocultos y seguros en el servidor.',
  },
  {
    tema: 1,
    enunciado: '¿Por qué en un proyecto profesional se utiliza un framework de servidor como Laravel en lugar de escribir toda la aplicación desde cero sin estructura?',
    opciones: [
      'Porque PHP no permite conectarse a bases de datos sin Laravel',
      'Porque resuelve con componentes probados el enrutado, validación, protección contra ataques (CSRF, SQLi, XSS), plantillas y acceso a datos, aportando una arquitectura estándar mantenible en equipo',
      'Porque impide usar programación orientada a objetos',
      'Porque convierte automáticamente el servidor en un navegador web',
    ],
    correcta: 1,
    explicacion: 'Un framework evita reinventar piezas críticas de seguridad e infraestructura y organiza el proyecto bajo convenciones que cualquier desarrollador del equipo reconoce.',
  },

  // UT 2: Integración de código en el servidor y lenguajes de marcas
  {
    tema: 2,
    enunciado: 'Debido al tipado dinámico de PHP, ¿por qué se recomienda usar el operador de comparación estricta `===` en lugar de `==`?',
    opciones: [
      'Porque `==` realiza conversión automática de tipos (type juggling) y puede dar `true` al comparar valores distintos como `0 == "hola"` (en versiones antiguas) o `"0" == false`, mientras que `===` exige mismo valor y mismo tipo',
      'Porque `==` es un operador de asignación',
      'Porque `===` solo funciona con números decimales',
      'Porque `==` lanza un error fatal en PHP 8',
    ],
    correcta: 0,
    explicacion: 'Muchos errores sutiles de lógica y seguridad en PHP nacen de conversiones implícitas; `===` y `!==` comparan tanto el valor como el tipo sin conversiones sorpresa.',
  },

  // UT 3: Estructuras de programación embebidas
  {
    tema: 3,
    enunciado: 'En PHP 8+, ¿qué ventaja ofrece la expresión `match` frente a la estructura tradicional `switch`?',
    opciones: [
      'Usa comparación estricta (`===`), devuelve directamente un valor asignable a una variable y no necesita poner `break` en cada rama (no hay caída accidental al siguiente caso)',
      'Solo admite comparar cadenas de más de 100 caracteres',
      'Ejecuta todas las ramas a la vez en paralelo',
      'Sustituye a los bucles `foreach` para recorrer arrays',
    ],
    correcta: 0,
    explicacion: '`match` evita los errores clásicos de `switch` por conversión laxa de tipos y por olvido de `break`, además de lanzar `UnhandledMatchError` si ningún caso coincide y no hay `default`.',
  },
  {
    tema: 3,
    enunciado: 'Al procesar un formulario que modifica datos (`POST`), ¿en qué consiste el patrón PRG (Post-Redirect-Get) y qué problema evita?',
    opciones: [
      'Tras procesar y guardar con éxito la petición POST, el servidor responde con una redirección (302/303) a una URL GET para que, si el usuario recarga la página (F5), no se reenvíe el formulario ni se duplique el registro',
      'En enviar las contraseñas visibles en la URL mediante el método GET',
      'En validar los datos únicamente con JavaScript desactivando la validación en el servidor',
      'En borrar la sesión del usuario cada vez que envía un formulario',
    ],
    correcta: 0,
    explicacion: 'Si respondes con un 200 directamente a un POST, pulsar F5 vuelve a enviar el POST duplicando el pedido o el pago; redirigir con GET deja en el historial una petición inocua de lectura.',
  },

  // UT 4: Aplicaciones web con funcionalidades del servidor
  {
    tema: 4,
    enunciado: 'Al configurar la cookie de sesión en el servidor, ¿para qué sirven respectivamente los atributos `HttpOnly`, `Secure` y `SameSite`?',
    opciones: [
      '`HttpOnly` impide que JavaScript (`document.cookie`) lea la cookie en caso de XSS; `Secure` exige que solo viaje por HTTPS; `SameSite` mitiga el envío de la cookie en peticiones cruzadas (CSRF)',
      '`HttpOnly` desactiva HTTPS, `Secure` permite leer la cookie desde cualquier script externo y `SameSite` borra la base de datos',
      'Sirven únicamente para cambiar el color del navegador del usuario',
      'Hacen que la cookie dure exactamente 1 segundo',
    ],
    correcta: 0,
    explicacion: 'Configurar `HttpOnly`, `Secure` y `SameSite=Lax` (o `Strict`) en las cookies de sesión es una medida indispensable para proteger el identificador de sesión en el cliente.',
  },
  {
    tema: 4,
    enunciado: '¿Qué medida debe ejecutar el servidor inmediatamente después de que un usuario se autentique con éxito (login) para evitar un ataque de «fijación de sesión» (Session Fixation)?',
    opciones: [
      'Regenerar el identificador de sesión (por ejemplo con `session_regenerate_id(true)`) invalidando el ID anterior',
      'Guardar la contraseña en texto plano dentro de una cookie pública',
      'Mantener siempre el mismo ID de sesión que traía el usuario antes de autenticarse',
      'Desactivar la caducidad de la sesión para siempre',
    ],
    correcta: 0,
    explicacion: 'Si un atacante logró fijar un ID de sesión conocido antes del login y el servidor no lo regenera al autenticar, el atacante quedaría autenticado con ese mismo ID.',
  },

  // UT 5: Acceso a almacenes de datos desde el servidor
  {
    tema: 5,
    enunciado: 'En una operación que descuenta stock de un producto e inserta la línea del pedido, ¿cómo se garantiza en PDO que se completen ambos cambios o no se aplique ninguno si ocurre un fallo a mitad?',
    opciones: [
      'Ejecutando las consultas dentro de una transacción (`beginTransaction()`, `commit()` y en el bloque `catch` un `rollBack()`)',
      'Ejecutando primero un `SELECT *` sin condiciones',
      'Poniendo un `sleep(10)` entre una consulta y otra',
      'Usando una tabla sin clave primaria ni motor transaccional',
    ],
    correcta: 0,
    explicacion: 'Las transacciones garantizan las propiedades ACID (en particular la Atomicidad: todo o nada), impidiendo que la base de datos quede en un estado incoherente.',
  },
  {
    tema: 5,
    enunciado: '¿Por qué es una mala práctica repartir consultas SQL sueltas por los controladores y las vistas, y qué patrón lo soluciona?',
    opciones: [
      'Porque acopla toda la aplicación a las tablas y duplica consultas; el patrón Repositorio concentra el acceso a datos de cada entidad en una clase con métodos de dominio',
      'Porque el SQL ejecutado desde un controlador va el doble de rápido',
      'Porque las vistas HTML son el único lugar donde debe escribirse la conexión a la base de datos',
      'Porque los repositorios eliminan la necesidad de usar tablas en la base de datos',
    ],
    correcta: 0,
    explicacion: 'Concentrar las consultas en repositorios (o modelos bien delimitados) permite cambiar o probar la capa de persistencia sin tener que buscar SQL repartido por decenas de plantillas y controladores.',
  },
  {
    tema: 5,
    enunciado: 'Cuando trabajas con un ORM como Eloquent en Laravel, ¿en qué consiste el problema de rendimiento de las «N+1 consultas» y cómo se evita?',
    opciones: [
      'Ocurre al obtener $N$ registros en una consulta y luego ejecutar 1 consulta adicional por cada iteración del bucle para cargar su relación; se evita usando carga ansiosa (eager loading con `with()`)',
      'Consiste en tener más de una tabla en la base de datos',
      'Se produce cuando una tabla tiene exactamente 1 columna',
      'Se soluciona borrando los índices y las claves foráneas de la base de datos',
    ],
    correcta: 0,
    explicacion: 'Con `Libro::with(\'autor\')->get()` el ORM resuelve la carga en 2 consultas en lugar de disparar 101 consultas para 100 libros.',
  },

  // UT 6: Seguridad e integridad de la información
  {
    tema: 6,
    enunciado: 'En una consulta SQL dinámica donde el usuario elige la columna por la que ordenar (`ORDER BY`), ¿por qué no basta con un parámetro preparado `?` y cómo debe protegerse?',
    opciones: [
      'Porque los parámetros preparados enlazan valores literales, no nombres de columnas ni de tablas; para el `ORDER BY` debe validarse la entrada contra una lista blanca estricta de columnas permitidas',
      'Porque `ORDER BY` nunca puede sufrir inyección SQL aunque se concatene directamente `$_GET[\'orden\']`',
      'Porque las bases de datos relacionales no permiten ordenar resultados',
      'Porque basta con cifrar la conexión HTTPS para evitar la inyección en `ORDER BY`',
    ],
    correcta: 0,
    explicacion: 'Los marcadores `?` o `:campo` solo sustituyen datos/valores. Si necesitas variar un identificador de columna o dirección (`ASC`/`DESC`), debes comprobar que esté en una lista blanca cerrada en el servidor.',
  },
  {
    tema: 6,
    enunciado: 'Un usuario autenticado con ID 15 cambia en la URL `/facturas/104` por `/facturas/105` y consigue ver la factura de otro cliente porque el servidor solo comprobó que había iniciado sesión. ¿Cómo se llama esta vulnerabilidad crítica del OWASP Top 10?',
    opciones: [
      'Control de acceso roto (Broken Access Control / IDOR): se autenticó quién era, pero no se autorizó que tuviera permiso sobre ese recurso concreto',
      'Inyección SQL de segundo orden',
      'Desbordamiento de búfer en la tarjeta gráfica',
      'Ataque de denegación de servicio distribuido (DDoS)',
    ],
    correcta: 0,
    explicacion: 'Autenticación (saber quién eres) no es autorización (comprobar qué puedes tocar). El servidor debe verificar siempre que la factura 105 pertenece al usuario autenticado o que su rol se lo permite.',
  },

  // UT 7: Separación presentación/lógica: patrón MVC
  {
    tema: 7,
    enunciado: '¿Cuál es el recorrido completo y ordenado de una petición en un framework MVC moderno como Laravel?',
    opciones: [
      'Enrutador (Router) → Middleware (filtros como autenticación/CSRF) → Controlador → Modelo / Lógica de negocio → Vista (Blade) o JSON → Respuesta HTTP',
      'Vista → Base de datos → Navegador → Enrutador → Controlador',
      'Base de datos → CSS → Controlador → Middleware',
      'El navegador se conecta directamente al Modelo sin pasar por rutas ni controladores',
    ],
    correcta: 0,
    explicacion: 'La petición entra por el punto de entrada único (`public/index.php`), pasa por el enrutador y los middlewares, llega al controlador que coordina el modelo y finalmente devuelve la vista renderizada o la respuesta.',
  },
  {
    tema: 7,
    enunciado: 'En el motor de plantillas Blade de Laravel, ¿por qué se utiliza la doble llave `{{ $variable }}` por defecto en lugar de `{!! $variable !!}`?',
    opciones: [
      'Porque `{{ $variable }}` escapa automáticamente el contenido con `htmlspecialchars()` protegiendo frente a XSS, mientras que `{!! !!}` imprime el contenido sin escapar',
      'Porque `{!! !!}` es un comentario oculto que no se envía al navegador',
      'Porque `{{ }}` ejecuta consultas SQL en la base de datos',
      'No hay ninguna diferencia de seguridad entre ambas sintaxis',
    ],
    correcta: 0,
    explicacion: 'Blade protege por defecto escapando toda salida interpolada con `{{ }}`; usar `{!! !!}` con datos introducidos por usuarios abriría una vulnerabilidad XSS directa.',
  },

  // UT 8: Servicios web y APIs REST
  {
    tema: 8,
    enunciado: '¿Qué ventaja clave de seguridad y arquitectura tiene consumir una API de terceros (por ejemplo, de pagos o de IA) desde nuestro servidor backend en lugar de llamarla directamente desde el JavaScript del navegador?',
    opciones: [
      'La clave secreta (API Key) permanece oculta en el servidor sin exponerse al usuario final y, además, las llamadas servidor a servidor no sufren bloqueos de política CORS del navegador',
      'Las peticiones desde el servidor no necesitan conexión a Internet',
      'El navegador no sabe procesar respuestas en formato JSON',
      'Llamar desde el navegador oculta mejor las credenciales privadas que en el servidor',
    ],
    correcta: 0,
    explicacion: 'Cualquier clave incluida en el código cliente puede ser extraída desde las herramientas de desarrollo del navegador; el servidor actúa como intermediario seguro.',
  },
  {
    tema: 8,
    enunciado: '¿Por qué es un grave error de diseño publicar en producción un endpoint de listado (ej. `GET /api/pedidos`) sin paginación desde su primera versión?',
    opciones: [
      'Porque con pocos datos funciona, pero al crecer la tabla a cientos de miles de filas agota la memoria y el tiempo de respuesta, y añadir paginación más tarde rompe la compatibilidad con los clientes que ya integraban el formato antiguo',
      'Porque el protocolo HTTP prohíbe devolver más de 3 registros en un JSON',
      'Porque la paginación borra automáticamente las filas antiguas de la base de datos',
      'Porque sin paginación no se puede usar el método GET',
    ],
    correcta: 0,
    explicacion: 'Los endpoints de colección deben diseñarse paginados desde el día 1 y documentarse en el contrato OpenAPI para escalar sin romper clientes existentes.',
  },

  // UT 9: Frameworks del servidor: páginas dinámicas
  {
    tema: 9,
    enunciado: 'En una página generada en servidor con un listado filtrable y paginado (por ejemplo, un catálogo de productos), ¿por qué el estado de los filtros y la página actual debe ir en la URL (query string `?categoria=libros&pagina=2`) y no oculto en la sesión?',
    opciones: [
      'Porque al ir en la URL el usuario puede compartir el enlace exacto de su búsqueda, guardarlo en marcadores, abrir varias pestañas con filtros distintos y usar el botón «Atrás» del navegador con normalidad',
      'Porque las sesiones de servidor no admiten guardar números enteros',
      'Porque la cadena de consulta cifra automáticamente la base de datos',
      'Porque los motores de búsqueda prohíben usar sesiones para el carrito de compra',
    ],
    correcta: 0,
    explicacion: 'El estado del usuario (quién es, su carrito) pertenece a la sesión, pero el estado de navegación/pantalla (qué filtro o página está viendo) debe reflejarse en la URL.',
  },
  {
    tema: 9,
    enunciado: 'Cuando una aplicación generada en servidor actualiza dinámicamente solo un fragmento HTML de la página (por ejemplo con HTMX o fetch parcial), ¿qué atributos de accesibilidad (WAI-ARIA) deben cuidarse?',
    opciones: [
      'Usar regiones `aria-live` para anunciar el cambio a lectores de pantalla y `aria-busy` durante la carga, manteniendo además enlaces y formularios con mejora progresiva',
      'Eliminar todas las etiquetas semánticas HTML y sustituir los botones por `<div>` sin foco de teclado',
      'Ocultar toda la página con `aria-hidden="true"` al terminar de cargar',
      'Desactivar la navegación con la tecla Tabulador',
    ],
    correcta: 0,
    explicacion: 'Un cambio parcial del DOM pasa desapercibido para quien utiliza lector de pantalla si no se anuncia mediante regiones `aria-live` y una correcta gestión del foco.',
  },

  // UT 10: Aplicaciones web híbridas y repositorios heterogéneos
  {
    tema: 10,
    enunciado: 'Al construir una aplicación web híbrida que depende de una API externa (por ejemplo, de mapas, clima o tipos de cambio), ¿cómo debemos diseñar y probar nuestra integración para que sea robusta?',
    opciones: [
      'Aplicar «desconfianza organizada»: configurar timeouts cortos, caché y degradación elegante si el tercero cae, y usar dobles de prueba / respuestas grabadas en los tests automatizados para no depender del servicio externo en cada ejecución',
      'Asumir que la API externa nunca fallará, nunca tardará y nunca cambiará el formato de su JSON',
      'Llamar a la API externa sin límite en cada recarga sin caché aunque facture por petición',
      'Enviar todos los datos personales de nuestros usuarios al proveedor externo aunque no hagan falta',
    ],
    correcta: 0,
    explicacion: 'Todo servicio externo puede tardar, caer, limitar peticiones (rate limit) o cambiar campos; encapsularlo tras un adaptador con timeout, caché y tests con dobles evita que arrastre a nuestra aplicación.',
  },
];
