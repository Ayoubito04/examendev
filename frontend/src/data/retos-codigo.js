// Banco de preguntas difíciles de completar código (dificultad: 'dificil', peso ×2).
// Se añaden al final del banco de cada módulo sin alterar los IDs de las preguntas existentes.

export const RETOS_CODIGO = {
  programacion: [
    {
      tema: 0,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para filtrar solo los números pares y devolver su cuadrado usando la API Stream de Java:',
      codigo: `List<Integer> numeros = List.of(1, 2, 3, 4, 5, 6);
List<Integer> cuadradosPares = numeros.stream()
    .filter(n -> n % 2 == 0)
    .___(n -> n * n)
    .toList();`,
      opciones: ['`map`', '`flatMap`', '`reduce`', '`forEach`'],
      correcta: 0,
      explicacion: '`map(Function)` transforma cada elemento del Stream aplicando la función indicada (aquí `n -> n * n`) manteniendo una relación 1 a 1.',
    },
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para que el constructor de la subclase invoque correctamente al constructor de la superclase `Empleado`:',
      codigo: `public class Programador extends Empleado {
    private String lenguaje;

    public Programador(String nombre, double salario, String lenguaje) {
        ___(nombre, salario);
        this.lenguaje = lenguaje;
    }
}`,
      opciones: ['`super`', '`this`', '`extends`', '`Empleado.super`'],
      correcta: 0,
      explicacion: 'En Java, `super(...)` debe ser la primera instrucción del constructor hijo para invocar al constructor de la clase padre.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para evitar duplicados manteniendo el orden de inserción en esta colección de Java:',
      codigo: `Set<String> usuarios = new ___<>();
usuarios.add("ana");
usuarios.add("luis");
usuarios.add("ana"); // Ignorado sin alterar el orden`,
      opciones: ['`LinkedHashSet`', '`HashSet`', '`TreeSet`', '`ArrayList`'],
      correcta: 0,
      explicacion: '`LinkedHashSet` implementa `Set` (sin duplicados) y mantiene una lista doblemente enlazada con el orden exacto de inserción.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para cerrar automáticamente el `BufferedReader` al salir del bloque mediante try-with-resources:',
      codigo: `try (___ br = Files.newBufferedReader(Path.of("datos.txt"))) {
    System.out.println(br.readLine());
} catch (IOException e) {
    e.printStackTrace();
}`,
      opciones: ['`BufferedReader`', '`FileInputStream`', '`ScannerReader`', '`AutoClose`'],
      correcta: 0,
      explicacion: '`Files.newBufferedReader(Path)` devuelve un `BufferedReader`, que implementa `AutoCloseable` y se cierra automáticamente en un bloque try-with-resources.',
    },
    {
      tema: 4,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para que este método genérico acepte listas de `Number` o de cualquier subclase (`Integer`, `Double`...):',
      codigo: `public static double sumarLista(List<___> Valores) {
    double suma = 0;
    for (Number n : Valores) suma += n.doubleValue();
    return suma;
}`,
      opciones: ['`? extends Number`', '`? super Number`', '`Number<?>`', '`T implements Number`'],
      correcta: 0,
      explicacion: 'El comodín acotado superiormente `? extends Number` permite leer elementos como `Number` desde listas de `Number`, `Integer`, `Double`, etc. (principio PECS: Producer Extends).',
    },
  ],

  'bases-de-datos': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en esta consulta SQL para obtener solo los departamentos cuyo salario medio supere los 2500 €:',
      codigo: `SELECT departamento_id, AVG(salario) AS media
FROM empleados
GROUP BY departamento_id
___ AVG(salario) > 2500;`,
      opciones: ['`HAVING`', '`WHERE`', '`FILTER`', '`QUALIFY`'],
      correcta: 0,
      explicacion: '`HAVING` filtra los grupos ya agregados por `GROUP BY` permitiendo usar funciones de agregación como `AVG(salario)`, algo que `WHERE` no permite.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para listar todos los clientes aunque todavía no hayan realizado ningún pedido:',
      codigo: `SELECT c.nombre, COUNT(p.id) AS total_pedidos
FROM clientes c
___ pedidos p ON p.cliente_id = c.id
GROUP BY c.id, c.nombre;`,
      opciones: ['`LEFT JOIN`', '`INNER JOIN`', '`RIGHT JOIN`', '`CROSS JOIN`'],
      correcta: 0,
      explicacion: '`LEFT JOIN` conserva todas las filas de la tabla izquierda (`clientes`) rellenando con `NULL` las columnas de `pedidos` cuando no hay coincidencias.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en PL/pgSQL para deshacer los cambios de la transacción si el saldo queda en negativo:',
      codigo: `BEGIN;
UPDATE cuentas SET saldo = saldo - 500 WHERE id = 10;
-- Si detectamos saldo insuficiente, revertimos:
___;`,
      opciones: ['`ROLLBACK`', '`COMMIT`', '`SAVEPOINT`', '`TRUNCATE`'],
      correcta: 0,
      explicacion: '`ROLLBACK` cancela todas las operaciones realizadas dentro de la transacción actual y devuelve la base de datos a su estado consistente previo al `BEGIN`.',
    },
    {
      tema: 4,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para crear una clave foránea que elimine automáticamente las líneas de pedido si se borra el pedido padre:',
      codigo: `ALTER TABLE lineas_pedido
ADD CONSTRAINT fk_pedido
FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
___;`,
      opciones: ['`ON DELETE CASCADE`', '`ON DELETE SET DEFAULT`', '`ON DELETE RESTRICT`', '`CASCADE DELETE ALL`'],
      correcta: 0,
      explicacion: '`ON DELETE CASCADE` propaga el borrado de la fila padre en `pedidos` eliminando automáticamente sus filas hijas asociadas en `lineas_pedido`.',
    },
  ],

  'entornos-de-desarrollo': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` del comando Git para crear una nueva rama llamada `feature/login` y cambiar a ella en un solo paso:',
      codigo: `git status
git ___ feature/login
git push -u origin feature/login`,
      opciones: ['`switch -c`', '`branch -d`', '`merge --squash`', '`rebase -i`'],
      correcta: 0,
      explicacion: '`git switch -c <rama>` (o su equivalente clásico `git checkout -b <rama>`) crea la rama nueva y sitúa `HEAD` en ella inmediatamente.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en este test unitario con JUnit 5 para verificar que el método lanza `IllegalArgumentException`:',
      codigo: `@Test
void noPermiteEdadNegativa() {
    ___(IllegalArgumentException.class, () -> {
        new Usuario("Ayoub", -5);
    });
}`,
      opciones: ['`assertThrows`', '`assertEquals`', '`assertFail`', '`expectException`'],
      correcta: 0,
      explicacion: 'En JUnit 5 (`org.junit.jupiter.api.Assertions`), `assertThrows(ClaseExcepcion.class, executable)` comprueba que el bloque lambda lance esa excepción.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en este diagrama de clases PlantUML/Mermaid para representar una relación de composición fuerte:',
      codigo: `class Pedido {
  +int id
  +Date fecha
}
class LineaPedido {
  +int cantidad
}
Pedido ___ LineaPedido`,
      opciones: ['`*--`', '`o--`', '`..>`', '`<|--`'],
      correcta: 0,
      explicacion: 'En notación UML, el rombo relleno (`*--`) representa composición (ciclo de vida dependiente), mientras que `o--` es agregación y `<|--` herencia.',
    },
  ],

  'lenguajes-de-marcas': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en CSS Grid para crear tantas columnas responsivas de mínimo 240px como quepan en el contenedor:',
      codigo: `.galeria {
  display: grid;
  grid-template-columns: repeat(___, minmax(240px, 1fr));
  gap: 1.5rem;
}`,
      opciones: ['`auto-fit`', '`space-between`', '`auto-flow`', '`flex-wrap`'],
      correcta: 0,
      explicacion: '`repeat(auto-fit, minmax(240px, 1fr))` genera automáticamente columnas flexibles que se adaptan al ancho disponible sin necesidad de media queries.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` con la expresión XPath que selecciona todos los elementos `<libro>` cuyo atributo `precio` sea menor de 20:',
      codigo: `//biblioteca/___`,
      opciones: ['`libro[@precio < 20]`', '`libro[precio = "@20"]`', '`@libro[precio < 20]`', '`libro/precio[@ < 20]`'],
      correcta: 0,
      explicacion: 'En XPath, los atributos se referencian con `@nombre` dentro de un predicado entre corchetes: `libro[@precio < 20]`.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en este esquema JSON Schema para exigir que el objeto tenga obligatoriamente las propiedades `id` y `email`:',
      codigo: `{
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "email": { "type": "string", "format": "email" }
  },
  "___": ["id", "email"]
}`,
      opciones: ['`required`', '`mandatory`', '`notNull`', '`primary`'],
      correcta: 0,
      explicacion: 'En JSON Schema, la palabra clave `"required"` recibe un array con los nombres de las propiedades obligatorias del objeto.',
    },
  ],

  'sistemas-informaticos': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` del comando Linux para dar permisos `rwxr-x---` (750) al script `backup.sh`:',
      codigo: `sudo chown root:admin backup.sh
sudo ___ backup.sh`,
      opciones: ['`chmod 750`', '`chmod 644`', '`chown 750`', '`umask 750`'],
      correcta: 0,
      explicacion: '`chmod 750` asigna lectura/escritura/ejecución al propietario (7 = `rwx`), lectura/ejecución al grupo (5 = `r-x`) y ningún permiso a otros (0 = `---`).',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en este script Bash para comprobar si el archivo `/etc/nginx/nginx.conf` existe y es un fichero regular:',
      codigo: `#!/usr/bin/env bash
if [ ___ "/etc/nginx/nginx.conf" ]; then
  echo "Configuración encontrada"
fi`,
      opciones: ['`-f`', '`-d`', '`-z`', '`-eq`'],
      correcta: 0,
      explicacion: 'En Bash, el operador `-f` devuelve verdadero si la ruta existe y es un fichero regular (`-d` comprueba directorios y `-z` cadenas vacías).',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para redirigir tanto la salida estándar (`stdout`) como la de errores (`stderr`) al archivo `registro.log`:',
      codigo: `./desplegar.sh > registro.log ___`,
      opciones: ['`2>&1`', '`1>&2`', '`2>/dev/null`', '`| tee`'],
      correcta: 0,
      explicacion: '`2>&1` redirige el descriptor de archivo 2 (`stderr`) al mismo destino al que apunta el descriptor 1 (`stdout`).',
    },
  ],

  cliente: [
    {
      tema: 0,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para esperar simultáneamente dos promesas en paralelo y desestructurar ambos resultados:',
      codigo: `async function cargarDashboard() {
  const [usuario, estadisticas] = await ___([
    fetch('/api/usuario').then((r) => r.json()),
    fetch('/api/progreso').then((r) => r.json()),
  ]);
  return { usuario, estadisticas };
}`,
      opciones: ['`Promise.all`', '`Promise.race`', '`Promise.any`', '` Object.assign`'],
      correcta: 0,
      explicacion: '`Promise.all(iterable)` ejecuta las promesas en paralelo y se resuelve con un array que contiene los resultados en el mismo orden.',
    },
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para evitar que el envío del formulario recargue la página en el manejador de eventos:',
      codigo: `formulario.addEventListener('submit', (evento) => {
  evento.___();
  enviarDatosPorFetch();
});`,
      opciones: ['`preventDefault`', '`stopPropagation`', '`stopImmediatePropagation`', '`cancelBubble`'],
      correcta: 0,
      explicacion: '`evento.preventDefault()` cancela la acción predeterminada del navegador asociada al evento (en un `submit`, evita la recarga de la página).',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para calcular el importe total del carrito sumando `precio * cantidad` con `Array.prototype.reduce`:',
      codigo: `const carrito = [
  { nombre: 'Teclado', precio: 45, cantidad: 2 },
  { nombre: 'Ratón', precio: 25, cantidad: 1 },
];
const total = carrito.___((acum, item) => acum + item.precio * item.cantidad, 0);`,
      opciones: ['`reduce`', '`map`', '`filter`', '`flatMap`'],
      correcta: 0,
      explicacion: '`reduce((acumulador, elemento) => ..., valorInicial)` acumula todos los elementos del array en un único valor final.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para clonar profundamente el objeto `configuracion` usando la API nativa moderna del navegador:',
      codigo: `const original = { tema: 'oscuro', filtros: { ciclo: 'DAW', activos: [1, 2] } };
const copiaProfunda = ___(original);
copiaProfunda.filtros.activos.push(3); // No muta 'original'`,
      opciones: ['`structuredClone`', '`Object.freeze`', '`Object.create`', '`Array.from`'],
      correcta: 0,
      explicacion: '`structuredClone(valor)` realiza una copia profunda nativa de objetos, arrays, `Map`, `Set` y `Date` anidados sin compartir referencias.',
    },
  ],

  servidor: [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en PHP PDO para ejecutar de forma segura una consulta preparada evitando inyección SQL:',
      codigo: `$stmt = $pdo->prepare('SELECT id, nick, email FROM usuarios WHERE email = :email');
$stmt->___([':email' => $emailUsuario]);
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);`,
      opciones: ['`execute`', '`query`', '`exec`', '`bindColumn`'],
      correcta: 0,
      explicacion: 'En PDO, `$stmt->execute($parametros)` enlaza los valores de forma segura y ejecuta la sentencia previamente preparada con `prepare()`.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en PHP para comprobar si la contraseña introducida coincide con el hash Argon2id/Bcrypt almacenado:',
      codigo: `$hashGuardado = $usuario['password_hash'];
if (___($passwordFormulario, $hashGuardado)) {
    session_regenerate_id(true);
}`,
      opciones: ['`password_verify`', '`password_hash`', '`md5_verify`', '`hash_equals`'],
      correcta: 0,
      explicacion: '`password_verify($password, $hash)` extrae automáticamente el algoritmo, coste y salt del hash almacenado y lo compara en tiempo constante.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Express (Node.js) para que un middleware de autenticación pase el control al siguiente controlador:',
      codigo: `export function verificarToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  ___();
}`,
      opciones: ['`next`', '`continue`', '`res.send`', '`return true`'],
      correcta: 0,
      explicacion: 'En Express, invocar `next()` cede el control al siguiente middleware o controlador de la cadena de la ruta.',
    },
    {
      tema: 4,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en PHP para devolver una respuesta con código de estado HTTP `201 Created` en una API REST:',
      codigo: `header('Content-Type: application/json; charset=utf-8');
___(201);
echo json_encode(['id' => $nuevoId, 'estado' => 'creado']);`,
      opciones: ['`http_response_code`', '`header_status`', '`set_status_code`', '`response_status`'],
      correcta: 0,
      explicacion: '`http_response_code(201)` establece el código de estado HTTP de la respuesta en PHP.',
    },
  ],

  despliegue: [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en este `Dockerfile` multi-etapa para copiar únicamente la carpeta compilada `dist` desde la etapa `build`:',
      codigo: `FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:stable-alpine
COPY ___ /app/dist /usr/share/nginx/html`,
      opciones: ['`--from=build`', '`--stage=build`', '`--source=build`', '`--layer=0`'],
      correcta: 0,
      explicacion: '`COPY --from=build` permite copiar artefactos generados en una etapa previa del `Dockerfile` sin incluir las herramientas de compilación en la imagen final.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en la configuración de Nginx para actuar como proxy inverso hacia el backend Node.js en el puerto 3000:',
      codigo: `location /api/ {
    ___ http://127.0.0.1:3000/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}`,
      opciones: ['`proxy_pass`', '`fastcgi_pass`', '`rewrite_pass`', '`upstream_pass`'],
      correcta: 0,
      explicacion: 'La directiva `proxy_pass` de Nginx reenvía las peticiones HTTP entrantes al servidor de aplicaciones backend indicado.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en `docker-compose.yml` para levantar todos los servicios en segundo plano (modo detached):',
      codigo: `# Compilar imágenes si cambiaron y arrancar en segundo plano:
docker compose up ___ --build`,
      opciones: ['`-d`', '`-it`', '`--rm`', '`-f`'],
      correcta: 0,
      explicacion: 'La opción `-d` (`--detach`) inicia los contenedores en segundo plano liberando la terminal.',
    },
  ],

  'interfaces-web': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en CSS para declarar una Custom Property (variable CSS) global y reutilizarla en el botón:',
      codigo: `:root {
  --color-primario: #10b981;
}
.btn-primario {
  background-color: ___;
}`,
      opciones: ['`var(--color-primario)`', '`env(--color-primario)`', '`$color-primario`', '`calc(--color-primario)`'],
      correcta: 0,
      explicacion: 'En CSS nativo, las Custom Properties definidas con `--nombre` se consumen mediante la función `var(--nombre)`.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para respetar la preferencia de accesibilidad del usuario que solicita reducir las animaciones del sistema:',
      codigo: `@media (___: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`,
      opciones: ['`prefers-reduced-motion`', '`prefers-color-scheme`', '`reduced-animation`', '` prefers-contrast`'],
      correcta: 0,
      explicacion: 'La media query `@media (prefers-reduced-motion: reduce)` detecta si el usuario ha activado la reducción de movimiento en su sistema operativo (WCAG 2.3.3).',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para que la imagen se recorte proporcionalmente cubriendo todo su contenedor de 300×200 px sin deformarse:',
      codigo: `.tarjeta__imagen {
  width: 300px;
  height: 200px;
  ___: cover;
}`,
      opciones: ['`object-fit`', '`background-size`', '`aspect-ratio`', '`image-rendering`'],
      correcta: 0,
      explicacion: '`object-fit: cover` escala y recorta un elemento reemplazado (`<img>` o `<video>`) manteniendo su relación de aspecto para llenar la caja.',
    },
  ],

  'acceso-a-datos': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en JDBC para desactivar el autocommit y gestionar manualmente una transacción atómica en Java:',
      codigo: `Connection conn = dataSource.getConnection();
try {
    conn.___(false);
    ejecutarTransferencia(conn);
    conn.commit();
} catch (SQLException e) {
    conn.rollback();
}`,
      opciones: ['`setAutoCommit`', '`beginTransaction`', '`setTransaction`', '`autoCommit`'],
      correcta: 0,
      explicacion: 'En JDBC, `conn.setAutoCommit(false)` agrupa las sentencias SQL posteriores en una única transacción hasta que se invoque `commit()` o `rollback()`.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en una entidad JPA/Hibernate para cargar la colección de pedidos de forma perezosa (bajo demanda):',
      codigo: `@Entity
public class Cliente {
    @Id @GeneratedValue
    private Long id;

    @OneToMany(mappedBy = "cliente", fetch = ___)
    private List<Pedido> pedidos;
}`,
      opciones: ['`FetchType.LAZY`', '`FetchType.EAGER`', '`CascadeType.ALL`', '`GenerationType.IDENTITY`'],
      correcta: 0,
      explicacion: '`FetchType.LAZY` retrasa la consulta SQL de la colección relacionada hasta que se accede explícitamente a `getPedidos()`, evitando cargar datos innecesarios.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en una consulta de agregación de MongoDB para agrupar los productos por `categoria` y calcular su precio medio:',
      codigo: `db.productos.aggregate([
  { $match: { activo: true } },
  { ___: { _id: "$categoria", precioMedio: { $avg: "$precio" } } }
]);`,
      opciones: ['`$group`', '`$project`', '`$lookup`', '`$unwind`'],
      correcta: 0,
      explicacion: 'En el pipeline de agregación de MongoDB, la etapa `$group` agrupa documentos por la clave `_id` indicada y aplica acumuladores como `$avg` o `$sum`.',
    },
  ],

  moviles: [
    {
      tema: 0,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Jetpack Compose (Kotlin) para que el contador sobreviva a las recomposiciones del Composable:',
      codigo: `@Composable
fun ContadorClicks() {
    var clics by ___ { mutableIntStateOf(0) }
    Button(onClick = { clics++ }) {
        Text("Pulsado $clics veces")
    }
}`,
      opciones: ['`remember`', '`LaunchedEffect`', '`derivedStateOf`', '`lateinit`'],
      correcta: 0,
      explicacion: 'En Jetpack Compose, `remember { ... }` conserva el estado en memoria a través de las recomposiciones del árbol de UI.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en un `ViewModel` de Android para lanzar una corrutina vinculada automáticamente a su ciclo de vida:',
      codigo: `class RankingViewModel(private val repo: RankingRepository) : ViewModel() {
    fun cargarRanking() {
        ___.launch {
            val datos = repo.obtenerTopUsuarios()
        }
    }
}`,
      opciones: ['`viewModelScope`', '`GlobalScope`', '`lifecycleScope`', '`MainScope`'],
      correcta: 0,
      explicacion: '`viewModelScope` es el `CoroutineScope` integrado en `ViewModel` que cancela automáticamente las corrutinas en ejecución cuando se invoca `onCleared()`.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en esta interfaz de Retrofit para mapear el parámetro `id` de la ruta `/usuarios/{id}`:',
      codigo: `interface ApiService {
    @GET("usuarios/{id}")
    suspend fun obtenerUsuario(@___("id") usuarioId: Int): UsuarioDto
}`,
      opciones: ['`Path`', '`Query`', '`Body`', '`Header`'],
      correcta: 0,
      explicacion: 'En Retrofit, la anotación `@Path("id")` sustituye dinámicamente el marcador `{id}` de la URL por el argumento pasado al método.',
    },
  ],

  procesos: [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Java para esperar a que el hilo `trabajador` termine su ejecución antes de continuar en `main`:',
      codigo: `Thread trabajador = new Thread(() -> procesarLote());
trabajador.start();
trabajador.___(); // Espera a que termine 'trabajador'
System.out.println("Lote finalizado");`,
      opciones: ['`join`', '`wait`', '`sleep`', '`yield`'],
      correcta: 0,
      explicacion: '`trabajador.join()` bloquea el hilo actual hasta que el hilo sobre el que se invoca finaliza su método `run()`.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para que un `ServerSocket` TCP en Java quede bloqueado aceptando la conexión de un nuevo cliente:',
      codigo: `try (ServerSocket servidor = new ServerSocket(8080)) {
    while (true) {
        Socket cliente = servidor.___();
        atenderClienteEnHilo(cliente);
    }
}`,
      opciones: ['`accept`', '`connect`', '`listen`', '`bind`'],
      correcta: 0,
      explicacion: '`ServerSocket.accept()` escucha en el puerto asociado y bloquea la ejecución hasta que entra una conexión TCP, devolviendo el `Socket` del cliente.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Java para calcular el resumen criptográfico SHA-256 de un array de bytes:',
      codigo: `MessageDigest md = MessageDigest.___("SHA-256");
byte[] hash = md.digest(mensaje.getBytes(StandardCharsets.UTF_8));`,
      opciones: ['`getInstance`', '`createHash`', '`newDigest`', '`forName`'],
      correcta: 0,
      explicacion: '`MessageDigest.getInstance("SHA-256")` es el método factoría estándar de la arquitectura JCA para obtener una instancia del algoritmo de hash.',
    },
  ],

  interfaces: [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en JavaFX para actualizar un `Label` de la interfaz gráfica desde un hilo secundario sin provocar excepción:',
      codigo: `new Thread(() -> {
    String resultado = consultarServidor();
    Platform.___(() -> etiquetaEstado.setText(resultado));
}).start();`,
      opciones: ['`runLater`', '`invokeLater`', '`updateUI`', '` syncGui`'],
      correcta: 0,
      explicacion: 'En JavaFX, solo el *JavaFX Application Thread* puede modificar nodos de la escena; `Platform.runLater(Runnable)` encola la tarea en dicho hilo.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en el controlador JavaFX para inyectar el botón definido con `fx:id="btnGuardar"` en el archivo `.fxml`:',
      codigo: `public class FormularioController {
    @___
    private Button btnGuardar;
}`,
      opciones: ['`FXML`', '`Inject`', '`Autowired`', '`BindView`'],
      correcta: 0,
      explicacion: 'La anotación `@FXML` de `javafx.fxml.FXML` vincula los atributos y métodos del controlador con los elementos declarados en el archivo FXML.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para enlazar bidireccionalmente la propiedad de texto de un `TextField` con un `StringProperty` del modelo:',
      codigo: `StringProperty nombreModelo = new SimpleStringProperty("");
campoNombre.textProperty().___(nombreModelo);`,
      opciones: ['`bindBidirectional`', '`bindTo`', '`addListener`', '`setValue`'],
      correcta: 0,
      explicacion: '`bindBidirectional(Property)` sincroniza en ambos sentidos la propiedad de la vista y la propiedad del modelo en JavaFX.',
    },
  ],

  'gestion-empresarial': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en un modelo de Odoo (Python) para heredar y extender el modelo existente `res.partner` sin crear una tabla nueva:',
      codigo: `from odoo import models, fields

class ResPartnerCliente(models.Model):
    ___ = 'res.partner'
    puntos_fidelidad = fields.Integer(string='Puntos', default=0)`,
      opciones: ['`_inherit`', '`_name`', '`_table`', '`_extends`'],
      correcta: 0,
      explicacion: 'En el ORM de Odoo, definir únicamente `_inherit = "res.partner"` amplía el modelo original en la misma tabla añadiendo nuevos campos o métodos.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Odoo para declarar que el campo calculado `total_con_iva` se recalcula cuando cambia `base_imponible`:',
      codigo: `total_con_iva = fields.Float(compute='_compute_total', store=True)

@api.___('base_imponible', 'porcentaje_iva')
def _compute_total(self):
    for rec in self:
        rec.total_con_iva = rec.base_imponible * (1 + rec.porcentaje_iva / 100)`,
      opciones: ['`depends`', '`onchange`', '`constrains`', '`model`'],
      correcta: 0,
      explicacion: 'El decorador `@api.depends(...)` indica al ORM de Odoo de qué campos depende un campo calculado (`compute`) para invalidar y recalcular su valor.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en el archivo `__manifest__.py` de un módulo de Odoo para declarar los módulos de los que depende:',
      codigo: `{
    'name': 'Gestión de Exámenes FP',
    'version': '17.0.1.0.0',
    '___': ['base', 'sale_management'],
    'data': ['views/examen_views.xml'],
}`,
      opciones: ['`depends`', '`imports`', '`requires`', '`packages`'],
      correcta: 0,
      explicacion: 'En `__manifest__.py`, la clave `depends` especifica la lista de módulos que Odoo debe instalar y cargar antes del módulo actual.',
    },
  ],

  'implantacion-so': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en `/etc/fstab` para montar automáticamente una partición ext4 por su identificador único universal:',
      codigo: `___=a1b2c3d4-e5f6-7890-abcd-1234567890ab  /datos  ext4  defaults,noatime  0  2`,
      opciones: ['`UUID`', '`PARTID`', '`LABEL_ID`', '`BLKID`'],
      correcta: 0,
      explicacion: 'Usar `UUID=...` en `/etc/fstab` garantiza que la partición se monte correctamente aunque cambie el orden de los discos (`/dev/sda`, `/dev/sdb`).',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Linux LVM para crear un volumen lógico de 20 GB llamado `lv_web` dentro del grupo `vg_datos`:',
      codigo: `sudo pvcreate /dev/sdb1
sudo vgcreate vg_datos /dev/sdb1
sudo ___ -L 20G -n lv_web vg_datos`,
      opciones: ['`lvcreate`', '`vgextend`', '`mkfs.lvm`', '`lvresize`'],
      correcta: 0,
      explicacion: '`lvcreate -L <tamaño> -n <nombre> <grupo_volumen>` crea un nuevo volumen lógico (`Logical Volume`) a partir del espacio del Volume Group.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` con el comando de `systemd` que habilita y arranca inmediatamente el servicio `ssh`:',
      codigo: `sudo systemctl ___ ssh`,
      opciones: ['`enable --now`', '`start --boot`', '`daemon-reload`', '`mask --now`'],
      correcta: 0,
      explicacion: '`systemctl enable --now <servicio>` activa el servicio para el arranque del sistema y lo inicia en la sesión actual en un solo comando.',
    },
  ],

  'planificacion-redes': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Cisco IOS para asignar el puerto `FastEthernet0/1` como puerto de acceso en la VLAN 20:',
      codigo: `Switch(config)# interface FastEthernet0/1
Switch(config-if)# switchport mode access
Switch(config-if)# ___ 20`,
      opciones: ['`switchport access vlan`', '`switchport trunk allowed vlan`', '`vlan id`', '`ip vlan access`'],
      correcta: 0,
      explicacion: 'En Cisco IOS, tras configurar `switchport mode access`, el comando `switchport access vlan <id>` vincula la interfaz a dicha VLAN.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Cisco IOS para configurar una ruta por defecto (default gateway) hacia el salto `192.168.1.1`:',
      codigo: `Router(config)# ip route ___ 192.168.1.1`,
      opciones: ['`0.0.0.0 0.0.0.0`', '`255.255.255.255 0.0.0.0`', '`default gateway`', '`127.0.0.1 255.0.0.0`'],
      correcta: 0,
      explicacion: 'En IPv4, la ruta estática por defecto se define con destino `0.0.0.0` y máscara `0.0.0.0` (`ip route 0.0.0.0 0.0.0.0 <next-hop>`).',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Cisco IOS para habilitar NAT dinámico con sobrecarga (PAT) en la lista de acceso 1 saliendo por `GigabitEthernet0/0`:',
      codigo: `Router(config)# access-list 1 permit 192.168.10.0 0.0.0.255
Router(config)# ip nat inside source list 1 interface GigabitEthernet0/0 ___`,
      opciones: ['`overload`', '`masquerade`', '`dynamic`', '`pat-enable`'],
      correcta: 0,
      explicacion: 'La palabra clave `overload` al final de `ip nat inside source list ...` activa PAT (Port Address Translation), permitiendo que múltiples IPs privadas compartan una IP pública.',
    },
  ],

  'fundamentos-hardware': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Linux para consultar el estado de salud S.M.A.R.T. completo del disco NVMe `/dev/nvme0n1`:',
      codigo: `sudo ___ -a /dev/nvme0n1`,
      opciones: ['`smartctl`', '`hdparm`', '`fsck`', '`lsblk`'],
      correcta: 0,
      explicacion: '`smartctl -a <dispositivo>` (del paquete `smartmontools`) muestra todos los atributos diagnósticos S.M.A.R.T., horas de uso y errores del disco.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` con el comando de `mdadm` para crear un conjunto RAID 1 en espejo con dos discos (`/dev/sdb1` y `/dev/sdc1`):',
      codigo: `sudo mdadm --create /dev/md0 ___ --raid-devices=2 /dev/sdb1 /dev/sdc1`,
      opciones: ['`--level=1`', '`--stripe=0`', '`--parity=5`', '`--mirror-only`'],
      correcta: 0,
      explicacion: 'En `mdadm`, `--level=1` (o `-l 1`) especifica una topología RAID 1 (espejo / mirroring) entre los dispositivos indicados.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para clonar byte a byte la imagen ISO en el pendrive `/dev/sdX` mostrando el progreso:',
      codigo: `sudo ___ if=ubuntu-server.iso of=/dev/sdX bs=4M status=progress oflag=sync`,
      opciones: ['`dd`', '`cp`', '`rsync`', '`tar`'],
      correcta: 0,
      explicacion: 'El comando `dd` copia bloques a bajo nivel desde el archivo de entrada (`if=`) hacia el dispositivo de bloques de salida (`of=`).',
    },
  ],

  'gestion-bases-datos': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en SQL para crear un índice compuesto que acelere las búsquedas por `modulo_id` y `activa` en la tabla `preguntas`:',
      codigo: `CREATE ___ idx_preguntas_modulo_activa
ON preguntas (modulo_id, activa);`,
      opciones: ['`INDEX`', '`VIEW`', '`SEQUENCE`', '`TRIGGER`'],
      correcta: 0,
      explicacion: '`CREATE INDEX nombre ON tabla (col1, col2)` construye un índice B-Tree sobre las columnas especificadas para evitar escaneos secuenciales (`Seq Scan`).',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en PostgreSQL para analizar el plan de ejecución real ejecutando la consulta y midiendo tiempos reales:',
      codigo: `___ SELECT * FROM respuestas WHERE usuario_id = 3;`,
      opciones: ['`EXPLAIN ANALYZE`', '`SHOW PLAN`', '`DESCRIBE QUERY`', '`TRACE SQL`'],
      correcta: 0,
      explicacion: '`EXPLAIN ANALYZE` ejecuta realmente la sentencia SQL y muestra el plan elegido por el optimizador junto con el coste estimado y el tiempo real en milisegundos.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para conceder únicamente permisos de lectura e inserción sobre la tabla `partidas` al rol `app_lectura`:',
      codigo: `___ SELECT, INSERT ON TABLE partidas TO app_lectura;`,
      opciones: ['`GRANT`', '`REVOKE`', '`ALLOW`', '`PERMIT`'],
      correcta: 0,
      explicacion: 'En SQL estándar (DCL), la sentencia `GRANT <privilegios> ON TABLE <tabla> TO <rol>` otorga permisos específicos siguiendo el principio de mínimo privilegio.',
    },
  ],

  'administracion-so': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en PowerShell para crear un nuevo usuario en Active Directory dentro de la Unidad Organizativa `Alumnos`:',
      codigo: `Import-Module ActiveDirectory
___ -Name "Ayoub Dev" -SamAccountName "ayoub" -Path "OU=Alumnos,DC=examendev,DC=local" -Enabled $true`,
      opciones: ['`New-ADUser`', '`Add-LocalUser`', '`Create-DomainUser`', '`Set-ADAccount`'],
      correcta: 0,
      explicacion: 'El cmdlet `New-ADUser` del módulo `ActiveDirectory` da de alta una cuenta de usuario de dominio en la ruta LDAP (`-Path`) indicada.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en `/etc/exports` de un servidor NFS en Linux para compartir `/srv/compartido` en modo lectura/escritura con la subred:',
      codigo: `/srv/compartido 192.168.1.0/24(___,sync,no_subtree_check)`,
      opciones: ['`rw`', '`ro`', '`rwx`', '`write`'],
      correcta: 0,
      explicacion: 'En `/etc/exports`, la opción `rw` habilita lectura y escritura para los clientes NFS autorizados, mientras que `ro` limita a solo lectura.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en crontab para programar la ejecución del script de copia de seguridad todos los días a las 03:30 de la madrugada:',
      codigo: `# m h dom mon dow comando
___ /usr/local/bin/backup-diario.sh`,
      opciones: ['`30 3 * * *`', '`3 30 * * *`', '`0 3 30 * *`', '`* 3 30 * *`'],
      correcta: 0,
      explicacion: 'El formato de `crontab` es `minuto hora día_mes mes día_semana`; por tanto, `30 3 * * *` se ejecuta en el minuto 30 de la hora 3 todos los días.',
    },
  ],

  'servicios-red-internet': [
    {
      tema: 0,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en un archivo de zona de BIND9 para declarar el servidor de correo prioritario del dominio:',
      codigo: `@   IN  SOA ns1.examendev.es. admin.examendev.es. ( 2026110901 3600 1800 604800 86400 )
@   IN  NS  ns1.examendev.es.
@   IN  ___ 10 mail.examendev.es.`,
      opciones: ['`MX`', '`CNAME`', '`PTR`', '`SRV`'],
      correcta: 0,
      explicacion: 'El registro DNS de tipo `MX` (Mail Exchange) especifica el servidor encargado de recibir el correo electrónico del dominio junto con su prioridad numérica.',
    },
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en `dhcpd.conf` (ISC DHCP) para reservar una dirección IP fija a un servidor según su dirección MAC:',
      codigo: `host servidor-bd {
  ___ 00:1A:2B:3C:4D:5E;
  fixed-address 192.168.1.50;
}`,
      opciones: ['`hardware ethernet`', '`mac-address`', '`client-id`', '`ether-bind`'],
      correcta: 0,
      explicacion: 'En ISC DHCP, la directiva `hardware ethernet <MAC>;` identifica la interfaz física del cliente al que se asigna la `fixed-address`.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Apache (`VirtualHost`) para redirigir permanentemente (301) todo el tráfico HTTP hacia HTTPS:',
      codigo: `<VirtualHost *:80>
    ServerName examendev.es
    ___ permanent / https://examendev.es/
</VirtualHost>`,
      opciones: ['`Redirect`', '`ProxyPass`', '`Alias`', '`DocumentRoot`'],
      correcta: 0,
      explicacion: 'La directiva `Redirect permanent / https://...` de `mod_alias` responde con un código HTTP `301 Moved Permanently` hacia la URL segura.',
    },
  ],

  'implantacion-aplicaciones-web': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en `docker-compose.yml` para garantizar que el contenedor `backend` espere a que `postgres` esté listo:',
      codigo: `services:
  backend:
    build: ./backend
    ___:
      - postgres`,
      opciones: ['`depends_on`', '`links_to`', '`requires`', '`after`'],
      correcta: 0,
      explicacion: 'En Docker Compose, `depends_on` define el orden de arranque y parada entre servicios.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en este workflow de GitHub Actions para ejecutar la batería de tests en cada `push` a la rama `main`:',
      codigo: `name: CI
___:
  push:
    branches: [ main ]
jobs:
  test:
    runs-on: ubuntu-latest`,
      opciones: ['`on`', '`trigger`', '`when`', '`events`'],
      correcta: 0,
      explicacion: 'En GitHub Actions, la clave raíz `on:` define los eventos (como `push`, `pull_request` o `schedule`) que disparan el flujo de trabajo.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en `php.ini` para impedir que JavaScript pueda leer la cookie de sesión en caso de ataque XSS:',
      codigo: `session.use_strict_mode = 1
session.cookie_secure = 1
___ = 1`,
      opciones: ['`session.cookie_httponly`', '`session.cookie_samesite`', '`session.use_only_cookies`', '`session.xss_protection`'],
      correcta: 0,
      explicacion: '`session.cookie_httponly = 1` añade el flag `HttpOnly` a la cookie de sesión, bloqueando su acceso desde `document.cookie` en el navegador.',
    },
  ],

  'administracion-sgbd': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para realizar una copia de seguridad lógica en formato personalizado comprimido de la base de datos `examendev` en PostgreSQL:',
      codigo: `___ -U postgres -Fc -f examendev_backup.dump examendev`,
      opciones: ['`pg_dump`', '`pg_basebackup`', '`psql`', '`pg_restore`'],
      correcta: 0,
      explicacion: '`pg_dump -Fc` genera un volcado lógico comprimido en formato custom, ideal para restauraciones selectivas con `pg_restore`.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en un disparador (trigger) de PostgreSQL para ejecutar la función de auditoría después de cada actualización de fila:',
      codigo: `CREATE TRIGGER trg_auditar_cambio
AFTER UPDATE ON usuarios
___
EXECUTE FUNCTION registrar_auditoria();`,
      opciones: ['`FOR EACH ROW`', '`FOR EACH STATEMENT`', '`ON EVERY UPDATE`', '`WITH ROW LEVEL`'],
      correcta: 0,
      explicacion: '`FOR EACH ROW` hace que el trigger se dispare una vez por cada fila modificada, permitiendo acceder a los registros `OLD` y `NEW`.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en PostgreSQL para activar la seguridad a nivel de fila (Row-Level Security) en la tabla `partidas`:',
      codigo: `ALTER TABLE partidas ___ ROW LEVEL SECURITY;

CREATE POLICY partida_propia ON partidas
  USING (usuario_id = current_setting('app.usuario_id')::int);`,
      opciones: ['`ENABLE`', '`ACTIVATE`', '`FORCE ALL`', '`SET`'],
      correcta: 0,
      explicacion: '`ALTER TABLE <tabla> ENABLE ROW LEVEL SECURITY` activa las políticas RLS para restringir qué filas puede ver o modificar cada usuario.',
    },
  ],

  'seguridad-alta-disponibilidad': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en `iptables` para permitir la entrada de conexiones TCP nuevas al puerto 443 (HTTPS):',
      codigo: `sudo iptables -A INPUT -p tcp ___ 443 -m conntrack --ctstate NEW,ESTABLISHED -j ACCEPT`,
      opciones: ['`--dport`', '`--sport`', '`--port-in`', '`--target-port`'],
      correcta: 0,
      explicacion: 'En `iptables`, `--dport` (`--destination-port`) filtra los paquetes dirigidos al puerto de destino indicado (443 para HTTPS).',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en HAProxy para repartir la carga entre los servidores web usando el algoritmo de turno rotatorio:',
      codigo: `backend servidores_web
    ___ roundrobin
    option httpchk GET /api/salud
    server web1 10.0.0.11:80 check
    server web2 10.0.0.12:80 check`,
      opciones: ['`balance`', '`mode`', '`dispatch`', '`scheduler`'],
      correcta: 0,
      explicacion: 'En HAProxy, la directiva `balance <algoritmo>` define el algoritmo de balanceo de carga (`roundrobin`, `leastconn`, `source`, etc.).',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en OpenSSL para generar una clave privada RSA de 4096 bits cifrada con AES-256:',
      codigo: `openssl ___ -algorithm RSA -out privada.pem -aes256 -pkeyopt rsa_keygen_bits:4096`,
      opciones: ['`genpkey`', '`req`', '`x509`', '`dgst`'],
      correcta: 0,
      explicacion: 'El subcomando moderno `openssl genpkey` genera claves privadas para RSA, EC o Ed25519 permitiendo especificar opciones de algoritmo con `-pkeyopt`.',
    },
  ],

  'montaje-equipos': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Linux para listar todos los módulos y bancos de memoria RAM física instalados leyendo la tabla DMI de la placa base:',
      codigo: `sudo ___ --type memory`,
      opciones: ['`dmidecode`', '`lscpu`', '`free`', '`vmstat`'],
      correcta: 0,
      explicacion: '`dmidecode --type memory` extrae del firmware SMBIOS/DMI el factor de forma (DIMM/SO-DIMM), tipo (DDR4/DDR5), velocidad en MT/s y ranuras ocupadas.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para comprobar las temperaturas en tiempo real de los núcleos del procesador y la placa base en Linux:',
      codigo: `sudo sensors-detect --auto
___`,
      opciones: ['`sensors`', '`top`', '`lsusb`', '`lspci`'],
      correcta: 0,
      explicacion: 'El comando `sensors` (del paquete `lm-sensors`) lee los sensores térmicos y de voltaje de la CPU, chipset y ventiladores.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Windows (CMD como Administrador) para generar un informe detallado en HTML sobre la salud y capacidad real de la batería del portátil:',
      codigo: `powercfg ___ /output "C:\\informe_bateria.html"`,
      opciones: ['`/batteryreport`', '`/energy`', '`/sleepstudy`', '`/devicequery`'],
      correcta: 0,
      explicacion: '`powercfg /batteryreport` genera un informe completo con la capacidad de diseño frente a la capacidad de carga completa actual y los ciclos de batería.',
    },
  ],

  'so-monopuesto': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Windows (CMD como Administrador) para escanear y reparar archivos protegidos del sistema operativo dañados:',
      codigo: `DISM.exe /Online /Cleanup-image /Restorehealth
___ /scannow`,
      opciones: ['`sfc`', '`chkdsk`', '`diskpart`', '`bcdedit`'],
      correcta: 0,
      explicacion: '`sfc /scannow` (System File Checker) verifica la integridad de todos los archivos protegidos del sistema Windows y reemplaza las versiones dañadas.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Ubuntu/Debian para actualizar la lista de paquetes de los repositorios e instalar las actualizaciones disponibles:',
      codigo: `sudo apt update && sudo apt ___ -y`,
      opciones: ['`upgrade`', '`install`', '`autoremove`', '`search`'],
      correcta: 0,
      explicacion: '`apt update` descarga los índices actualizados de los repositorios y `apt upgrade` instala las nuevas versiones de los paquetes instalados.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Linux para crear un nuevo usuario llamado `tecnico` creando su carpeta `/home/tecnico` y asignándole `/bin/bash`:',
      codigo: `sudo ___ -m -s /bin/bash tecnico`,
      opciones: ['`useradd`', '`usermod`', '`passwd`', '`groupadd`'],
      correcta: 0,
      explicacion: '`useradd -m -s /bin/bash <usuario>` da de alta la cuenta en `/etc/passwd`, crea su directorio personal (`-m`) y define su shell por defecto (`-s`).',
    },
  ],

  'aplicaciones-ofimaticas': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en una hoja de cálculo (Excel / Calc) para buscar el precio de la referencia `A2` en la tabla `Productos!A2:D100` devolviendo la 3ª columna exacta:',
      codigo: `=___(A2; Productos!$A$2:$D$100; 3; FALSO)`,
      opciones: ['`BUSCARV`', '`SUMAR.SI`', '`CONTARA`', '`INDICE`'],
      correcta: 0,
      explicacion: '`BUSCARV(valor_buscado; matriz; indicador_columnas; FALSO)` busca verticalmente en la primera columna del rango y devuelve el valor exacto de la columna indicada.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para sumar únicamente los importes del rango `C2:C50` cuya categoría en `B2:B50` sea igual a `"Hardware"`:',
      codigo: `=___(B2:B50; "Hardware"; C2:C50)`,
      opciones: ['`SUMAR.SI`', '`CONTAR.SI`', '`PROMEDIO`', '`SI.ERROR`'],
      correcta: 0,
      explicacion: '`SUMAR.SI(rango_criterio; criterio; rango_suma)` totaliza las celdas de `rango_suma` solo en las filas que cumplen la condición.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para fijar de forma absoluta tanto la columna como la fila de la celda `F1` (tipo de IVA) al arrastrar la fórmula hacia abajo:',
      codigo: `=B2 * (1 + ___)`,
      opciones: ['`$F$1`', '`F$1`', '`$F1`', '`&F&1`'],
      correcta: 0,
      explicacion: 'La referencia absoluta `$F$1` inmoviliza tanto la columna `F` como la fila `1` al copiar o arrastrar la fórmula a otras celdas.',
    },
  ],

  'redes-locales': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Linux (iproute2) para asignar la dirección IP `192.168.10.25/24` a la interfaz de red `eth0`:',
      codigo: `sudo ip ___ add 192.168.10.25/24 dev eth0
sudo ip link set eth0 up`,
      opciones: ['`addr`', '`route`', '`neigh`', '`rule`'],
      correcta: 0,
      explicacion: '`ip addr add <IP/prefijo> dev <interfaz>` asigna una dirección de capa 3 a la tarjeta de red indicada.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Windows para vaciar la caché local de resolución de nombres DNS cuando un dominio ha cambiado de IP:',
      codigo: `ipconfig ___`,
      opciones: ['`/flushdns`', '`/release`', '`/all`', '`/displaydns`'],
      correcta: 0,
      explicacion: '`ipconfig /flushdns` purga la caché del cliente DNS de Windows forzando nuevas consultas a los servidores DNS configurados.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para mostrar la tabla ARP local que asocia direcciones IPv4 de la red local con sus direcciones físicas MAC:',
      codigo: `# Consultar la tabla de resolución de direcciones en Windows o Linux:
___ -a`,
      opciones: ['`arp`', '`ping`', '`tracert`', '`nslookup`'],
      correcta: 0,
      explicacion: '`arp -a` muestra las entradas de la caché ARP (Address Resolution Protocol) con la correspondencia entre IP y dirección MAC.',
    },
  ],

  'so-en-red': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en el archivo `/etc/samba/smb.conf` para que solo los miembros del grupo `profesores` puedan acceder al recurso compartido:',
      codigo: `[examenes]
   path = /srv/samba/examenes
   read only = no
   ___ = @profesores`,
      opciones: ['`valid users`', '`guest ok`', '`browseable`', '`create mask`'],
      correcta: 0,
      explicacion: 'En Samba (`smb.conf`), `valid users = @grupo` restringe el inicio de sesión en el recurso compartido a los usuarios pertenecientes a ese grupo del sistema.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Windows para forzar inmediatamente la actualización de las directivas de grupo (GPO) tanto de equipo como de usuario:',
      codigo: `___ /force`,
      opciones: ['`gpupdate`', '`gpresult`', '`dcpromo`', '`netdom`'],
      correcta: 0,
      explicacion: '`gpupdate /force` vuelve a descargar y aplicar todas las directivas de grupo (Group Policy Objects) desde el controlador de dominio sin esperar al intervalo periódico.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Windows para montar por consola la carpeta compartida `\\\\servidor\\datos` en la unidad de red `Z:`:',
      codigo: `___ Z: \\\\servidor\\datos /persistent:yes`,
      opciones: ['`net use`', '`net share`', '` net view`', '`mountvol`'],
      correcta: 0,
      explicacion: 'El comando `net use <letra>: \\\\servidor\\recurso` conecta una unidad de red SMB/CIFS y con `/persistent:yes` la reconecta en cada inicio de sesión.',
    },
  ],

  'seguridad-informatica': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` para comprobar que la imagen ISO descargada no ha sido manipulada verificando su suma de comprobación SHA-256:',
      codigo: `___ -c SHA256SUMS`,
      opciones: ['`sha256sum`', '`base64`', '`cryptsetup`', '`gpg-agent`'],
      correcta: 0,
      explicacion: '`sha256sum -c <archivo>` calcula el hash SHA-256 del fichero local y lo compara con el valor publicado en `SHA256SUMS` para verificar su integridad.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en el cortafuegos `ufw` de Ubuntu para bloquear por defecto todas las conexiones entrantes no solicitadas:',
      codigo: `sudo ufw default ___ incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw enable`,
      opciones: ['`deny`', '`accept`', '`forward`', '`listen`'],
      correcta: 0,
      explicacion: '`ufw default deny incoming` establece una política restrictiva por defecto (lista blanca), cerrando todos los puertos entrantes salvo los autorizados explícitamente.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en `/etc/ssh/sshd_config` para prohibir el inicio de sesión directo del usuario `root` por SSH:',
      codigo: `Port 22
PubkeyAuthentication yes
___ no`,
      opciones: ['`PermitRootLogin`', '`AllowUsersRoot`', '`RootPasswordAuth`', '`StrictModes`'],
      correcta: 0,
      explicacion: '`PermitRootLogin no` impide que atacantes puedan probar fuerza bruta directamente contra la cuenta `root` a través de SSH.',
    },
  ],

  'servicios-en-red': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en `/etc/squid/squid.conf` para permitir el acceso al proxy web únicamente a la red local declarada en la ACL `red_aula`:',
      codigo: `acl red_aula src 192.168.50.0/24
___ allow red_aula
http_access deny all`,
      opciones: ['`http_access`', '`proxy_allow`', '`acl_permit`', '`cache_peer`'],
      correcta: 0,
      explicacion: 'En Squid, las listas de control de acceso se definen con `acl` y se aplican en orden secuencial mediante reglas `http_access allow|deny`.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en `/etc/vsftpd.conf` para encerrar (enjaular) a los usuarios locales dentro de su propio directorio `/home/<usuario>`:',
      codigo: `anonymous_enable=NO
local_enable=YES
___=YES`,
      opciones: ['`chroot_local_user`', '`jail_home_dir`', '`isolate_users`', '`local_root_lock`'],
      correcta: 0,
      explicacion: '`chroot_local_user=YES` en vsftpd aplica una jaula `chroot` al directorio personal del usuario para que no pueda navegar por el resto del sistema de archivos.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` con la herramienta de línea de comandos que consulta directamente al servidor DNS `1.1.1.1` el registro `A` de `examendev.es`:',
      codigo: `___ @1.1.1.1 examendev.es A +short`,
      opciones: ['`dig`', '`whois`', '`netstat`', '`route`'],
      correcta: 0,
      explicacion: '`dig @<servidor> <dominio> <tipo> +short` realiza consultas DNS detalladas o resumidas directamente contra el servidor autoritativo o recursivo indicado.',
    },
  ],

  'aplicaciones-web': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en `wp-config.php` de WordPress para definir el nombre de la base de datos MySQL/MariaDB:',
      codigo: `define( '___', 'wordpress_db' );
define( 'DB_USER', 'wp_usuario' );
define( 'DB_HOST', 'localhost' );`,
      opciones: ['`DB_NAME`', '`DATABASE_URL`', '`MYSQL_DB`', '`WP_SCHEMA`'],
      correcta: 0,
      explicacion: 'En `wp-config.php`, la constante `DB_NAME` especifica el nombre de la base de datos a la que se conectará WordPress.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Apache (`.htaccess`) para activar el motor de reescritura de URLs amigables:',
      codigo: `<IfModule mod_rewrite.c>
___ On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule . /index.php [L]
</IfModule>`,
      opciones: ['`RewriteEngine`', '`RewriteMode`', '`EnableRewrite`', '`UrlRouter`'],
      correcta: 0,
      explicacion: '`RewriteEngine On` activa el módulo `mod_rewrite` de Apache para procesar las condiciones (`RewriteCond`) y reglas (`RewriteRule`) posteriores.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en SQL para crear el usuario de base de datos `cms_user` y darle permisos solo sobre la base de datos `cms_db`:',
      codigo: `CREATE USER 'cms_user'@'localhost' IDENTIFIED BY 'ClaveSegura!2026';
GRANT ___ ON cms_db.* TO 'cms_user'@'localhost';
FLUSH PRIVILEGES;`,
      opciones: ['`ALL PRIVILEGES`', '`SUPERUSER`', '`ROOT ACCESS`', '`FULL ADMIN`'],
      correcta: 0,
      explicacion: '`GRANT ALL PRIVILEGES ON cms_db.* TO ...` otorga todos los permisos únicamente sobre las tablas de la base de datos `cms_db` sin dar acceso al resto del servidor.',
    },
  ],

  itp: [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en la fórmula de cálculo de la base de cotización por contingencias comunes (BCCC) mensual con pagas extras prorrateadas:',
      codigo: `// Cálculo mensual en nómina:
BCCC = Salario_Base + Complementos_Salariales + ___`,
      opciones: ['`Prorrata_Pagas_Extra`', '`IRPF_Retenido`', '`Indemnizacion_Despido`', '`Dietas_Exentas`'],
      correcta: 0,
      explicacion: 'La BCCC suma las percepciones salariales mensuales más la parte proporcional (`Prorrata_Pagas_Extra`) de las pagas extraordinarias anuales.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en la evaluación del riesgo laboral según el método binario del INSST (`Riesgo = Probabilidad × ___`):',
      codigo: `// Matriz de evaluación de riesgos laborales (INSST):
Nivel_de_Riesgo = Probabilidad * ___`,
      opciones: ['`Severidad (Consecuencias)`', '`Antigüedad_Empresa`', '`Horas_Extra`', '`Salario_Bruto`'],
      correcta: 0,
      explicacion: 'El método del INSST estima la magnitud del riesgo cruzando la **Probabilidad** de que se materialice el peligro con la **Severidad** (daño o consecuencias esperadas).',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en la estructura jerárquica de aplicación de las medidas de prevención (art. 15 LPRL):',
      codigo: `// Orden de prioridad preventiva:
1. Evitar los riesgos en su origen
2. Evaluar los riesgos inevitables
3. Anteponer la protección ___ a la protección individual (EPI)`,
      opciones: ['`colectiva`', '`administrativa`', '`aseguradora`', '`voluntaria`'],
      correcta: 0,
      explicacion: 'El artículo 15 de la Ley de Prevención de Riesgos Laborales obliga a anteponer siempre las medidas de protección colectiva (barandillas, extracción, resguardos) frente a los EPI.',
    },
  ],

  'itp-2': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en la fórmula del Punto Muerto o Umbral de Rentabilidad (unidades mínimas a vender para cubrir costes):',
      codigo: `// Cálculo del Punto Muerto (Q*):
Q_equilibrio = Costes_Fijos / (Precio_Venta_Unitario - ___)`,
      opciones: ['`Coste_Variable_Unitario`', '`Impuesto_Sociedades`', '`Capital_Social`', '`Amortizacion_Acumulada`'],
      correcta: 0,
      explicacion: 'El umbral de rentabilidad divide los `Costes Fijos` entre el margen de contribución unitario (`Precio de venta unitario - Coste variable unitario`).',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en la ecuación fundamental del Balance de Situación contable de una empresa tecnológica:',
      codigo: `// Equilibrio patrimonial del Balance:
Activo_Total = ___ + Pasivo_Exigible`,
      opciones: ['`Patrimonio_Neto`', '`Cuenta_de_Perdidas`', '`Flujo_de_Caja`', '`IVA_Soportado`'],
      correcta: 0,
      explicacion: 'La ecuación fundamental del patrimonio establece que la estructura económica (`Activo`) es igual a la estructura financiera (`Patrimonio Neto + Pasivo`).',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en el cálculo del Fondo de Maniobra (Working Capital) para verificar la solvencia a corto plazo:',
      codigo: `// Solvencia a corto plazo:
Fondo_de_Maniobra = Activo_Corriente - ___`,
      opciones: ['`Pasivo_Corriente`', '`Activo_No_Corriente`', '`Reservas_Legales`', '`Capital_Suscrito`'],
      correcta: 0,
      explicacion: 'El Fondo de Maniobra (`Activo Corriente - Pasivo Corriente`) mide la capacidad de la empresa para atender sus deudas a corto plazo con sus activos líquidos.',
    },
  ],

  sostenibilidad: [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en el inventario corporativo del GHG Protocol para clasificar las emisiones indirectas derivadas de la electricidad consumida en el CPD:',
      codigo: `// Clasificación de Huella de Carbono (GHG Protocol):
Alcance_1 = Combustión directa en instalaciones propias
___       = Electricidad adquirida y consumida por los servidores
Alcance_3 = Cadena de suministro, viajes y hardware comprado`,
      opciones: ['`Alcance_2`', '`Alcance_0`', '`Alcance_4`', '`Emision_Biogenica`'],
      correcta: 0,
      explicacion: 'En el GHG Protocol, el **Alcance 2 (Scope 2)** contabiliza las emisiones indirectas de GEI asociadas a la generación de la electricidad, calor o vapor adquiridos y consumidos.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en la fórmula del indicador PUE (*Power Usage Effectiveness*) de eficiencia energética de un centro de datos:',
      codigo: `// PUE ideal -> cercano a 1.0
PUE = Energia_Total_Instalacion_CPD / ___`,
      opciones: ['`Energia_Consumida_Equipos_TI`', '`Numero_Total_Servidores`', '`Potencia_Contratada_Anual`', '`Superficie_Sala_Metros`'],
      correcta: 0,
      explicacion: 'El PUE divide la energía total consumida por todo el centro de datos (incluyendo refrigeración e iluminación) entre la energía consumida exclusivamente por el equipamiento TI.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en la métrica SCI (*Software Carbon Intensity*) de la Green Software Foundation:',
      codigo: `// Ecuación SCI = ((E * I) + M) / R
// E = Energía consumida (kWh), I = Intensidad de carbono de la red (gCO2eq/kWh)
// M = ___ (carbono incorporado del hardware), R = Unidad funcional (ej. por petición API)`,
      opciones: ['`Embodied_Emissions`', '`Memory_Allocated`', '`Megabits_Transferred`', '`Microservice_Count`'],
      correcta: 0,
      explicacion: 'En el estándar SCI, `M` representa las *Embodied Emissions* (emisiones incorporadas durante la fabricación y desecho del hardware prorrateadas por su vida útil y uso).',
    },
  ],

  digitalizacion: [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Python (cliente MQTT para IoT industrial) para suscribirse a todos los sensores de temperatura de la planta 1:',
      codigo: `import paho.mqtt.client as mqtt

def on_connect(client, userdata, flags, rc):
    # Comodín multinivel MQTT para la planta 1:
    client.___("fabrica/planta1/+/temperatura")`,
      opciones: ['`subscribe`', '`publish`', '`connect_topic`', '`listen_all`'],
      correcta: 0,
      explicacion: 'En MQTT (`paho-mqtt`), `client.subscribe("fabrica/planta1/+/temperatura")` suscribe al cliente al topic usando el comodín de un nivel `+`.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Python (`pandas`) para eliminar las filas duplicadas del dataset antes de entrenar el modelo de Machine Learning:',
      codigo: `import pandas as pd

df = pd.read_csv("telemetria_iot.csv")
df_limpio = df.___().dropna()`,
      opciones: ['`drop_duplicates`', '`remove_clones`', '`unique_rows`', '`filter_distinct`'],
      correcta: 0,
      explicacion: 'En `pandas`, `df.drop_duplicates()` elimina las filas repetidas del `DataFrame` y `dropna()` descarta los registros con valores nulos.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en la arquitectura Zero Trust (NIST SP 800-207) para validar cada petición a la API corporativa:',
      codigo: `// Principio rector Zero Trust:
// "Never trust, ___"
verificarIdentidadDispositivoYContexto(peticion);`,
      opciones: ['`always verify`', '`trust internal LAN`', '`cache credentials forever`', '`bypass VPN users`'],
      correcta: 0,
      explicacion: 'El lema fundamental de Zero Trust es *"Never trust, always verify"* (Nunca confíes, verifica siempre cada solicitud independientemente de si proviene de la red interna o externa).',
    },
  ],

  ingles: [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Complete the blank `___` in this professional pull request description using the correct conditional structure:',
      codigo: `// Pull Request Summary:
"If the database connection pool ___ exhausted, the middleware will now return a 503 Service Unavailable status instead of crashing."`,
      opciones: ['`becomes`', '`would become`', '`will become`', '`had became`'],
      correcta: 0,
      explicacion: 'In a First Conditional sentence (`If + Present Simple, will + infinitive`), the `if` clause uses the present simple (`becomes`) to describe a real technical condition.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Complete the blank `___` in this incident post-mortem report using the passive voice in the past simple:',
      codigo: `// Incident Post-Mortem:
"Root cause: The production environment variables ___ overwritten during the manual deployment at 14:20 UTC."`,
      opciones: ['`were accidentally`', '`have accidentally`', '`did accidentally`', '`was accidentally`'],
      correcta: 0,
      explicacion: 'Plural subject (`environment variables`) + Past Simple Passive (`were + adverb + past participle: overwritten`) is standard in technical post-mortems.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Complete the blank `___` with the right phrasal verb meaning "to revert to the previous stable version" in a deployment script log:',
      codigo: `[DEPLOY ERROR] Health check failed on v2.4.0.
[ACTION] Automatically ___ to release v2.3.9...`,
      opciones: ['`rolling back`', '`looking up`', '`calling off`', '`putting off`'],
      correcta: 0,
      explicacion: 'In software engineering and DevOps, **to roll back** (noun: *a rollback*) means reverting a deployment or database migration to a previous working state.',
    },
  ],

  'mpo-arquitectura-nube': [
    {
      tema: 1,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en Terraform (HCL) para inicializar el directorio de trabajo y descargar los proveedores cloud declarados:',
      codigo: `# 1. Inicializar backend y proveedores:
terraform ___
# 2. Previsualizar el plan de cambios:
terraform plan`,
      opciones: ['`init`', '`apply`', '`destroy`', '`fmt`'],
      correcta: 0,
      explicacion: '`terraform init` prepara el directorio de trabajo descargando los plugins de los proveedores (AWS, Azure, GCP) y configurando el backend de estado.',
    },
    {
      tema: 2,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en este manifiesto YAML de Kubernetes para definir el número de réplicas deseadas del `Deployment`:',
      codigo: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: examendev-api
spec:
  ___: 3
  selector:
    matchLabels:
      app: examendev-api`,
      opciones: ['`replicas`', '`instances`', '`containers`', '`nodes`'],
      correcta: 0,
      explicacion: 'En la especificación (`spec`) de un `Deployment` de Kubernetes, el campo `replicas` define cuántos `Pods` idénticos debe mantener en ejecución el `ReplicaSet`.',
    },
    {
      tema: 3,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` en una política IAM de AWS (JSON) para permitir únicamente la lectura de objetos dentro del bucket S3 `examendev-assets`:',
      codigo: `{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["___"],
    "Resource": "arn:aws:s3:::examendev-assets/*"
  }]
}`,
      opciones: ['`s3:GetObject`', '`s3:PutObject`', '`s3:DeleteBucket`', '`ec2:RunInstances`'],
      correcta: 0,
      explicacion: 'La acción IAM `s3:GetObject` autoriza exclusivamente la descarga/lectura de objetos del bucket S3 cumpliendo el principio de mínimo privilegio.',
    },
    {
      tema: 4,
      dificultad: 'dificil',
      enunciado: 'Completa el hueco `___` con el comando `kubectl` para escalar horizontalmente de forma automática el despliegue cuando el uso de CPU supere el 70 %:',
      codigo: `kubectl ___ deployment examendev-api --min=2 --max=10 --cpu-percent=70`,
      opciones: ['`autoscale`', '`rollout`', '`expose`', '`taint`'],
      correcta: 0,
      explicacion: '`kubectl autoscale deployment ...` crea un recurso `HorizontalPodAutoscaler` (HPA) que ajusta dinámicamente el número de Pods entre `--min` y `--max` según la carga de CPU.',
    },
  ],
};
