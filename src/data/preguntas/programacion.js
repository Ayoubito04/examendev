// Formato: enunciado, opciones (4), correcta (índice 0-3) y explicación.
// Añade preguntas nuevas siempre al final: el id se genera por posición.
export default [
  {
    enunciado: '¿Qué palabra clave de Java impide que una clase pueda ser heredada?',
    opciones: ['abstract', 'final', 'static', 'private'],
    correcta: 1,
    explicacion: 'Una clase declarada como `final` no admite subclases. `abstract` obliga justo a lo contrario: a heredar para poder instanciar.',
  },
  {
    enunciado: '¿Qué tipo primitivo de Java almacena un único carácter Unicode?',
    opciones: ['String', 'char', 'Character', 'byte'],
    correcta: 1,
    explicacion: '`char` es el primitivo de 16 bits para un carácter. `Character` es su clase envoltorio y `String` es una clase, no un primitivo.',
  },
  {
    enunciado: '¿Qué valor devuelve la expresión `7 / 2` en Java?',
    opciones: ['3.5', '3', '4', '3.0'],
    correcta: 1,
    explicacion: 'La división entre enteros trunca la parte decimal, así que el resultado es el entero `3`.',
  },
  {
    enunciado: '¿Qué bucle garantiza que su cuerpo se ejecuta al menos una vez?',
    opciones: ['for', 'while', 'do-while', 'for-each'],
    correcta: 2,
    explicacion: 'En `do-while` la condición se evalúa después de ejecutar el cuerpo, por lo que siempre hay al menos una iteración.',
  },
  {
    enunciado: '¿Qué es la sobrecarga de métodos?',
    opciones: [
      'Redefinir en una subclase un método heredado',
      'Declarar varios métodos con el mismo nombre y distinta lista de parámetros',
      'Llamar a un método desde sí mismo',
      'Declarar un método sin cuerpo',
    ],
    correcta: 1,
    explicacion: 'La sobrecarga se resuelve en compilación por la firma. Redefinir un método heredado es sobrescritura (override).',
  },
  {
    enunciado: '¿Cuál de estas excepciones es comprobada (checked)?',
    opciones: ['NullPointerException', 'ArithmeticException', 'IOException', 'ArrayIndexOutOfBoundsException'],
    correcta: 2,
    explicacion: '`IOException` hereda de `Exception` pero no de `RuntimeException`, así que el compilador obliga a capturarla o declararla con `throws`.',
  },
  {
    enunciado: '¿Cómo se compara correctamente el contenido de dos objetos `String`?',
    opciones: ['Con `==`', 'Con `equals()`', 'Con `hashCode()`', 'Con `instanceof`'],
    correcta: 1,
    explicacion: '`==` compara referencias. `equals()` compara el contenido de las cadenas.',
  },
  {
    enunciado: '¿Qué interfaz de colecciones de Java no admite elementos duplicados?',
    opciones: ['List', 'Set', 'Queue', 'Deque'],
    correcta: 1,
    explicacion: 'Un `Set` modela un conjunto matemático: cada elemento aparece como mucho una vez.',
  },
  {
    enunciado: '¿Qué modificador de acceso hace que un miembro solo sea visible dentro de su propia clase?',
    opciones: ['public', 'protected', 'private', 'Sin modificador (package-private)'],
    correcta: 2,
    explicacion: '`private` restringe el acceso a la propia clase. Es la base del encapsulamiento.',
  },
  {
    enunciado: '¿Qué anotación indica que un método sobrescribe uno de la superclase?',
    opciones: ['@Overload', '@Override', '@Super', '@Inherited'],
    correcta: 1,
    explicacion: '`@Override` hace que el compilador compruebe que de verdad existe un método con esa firma en la superclase o interfaz.',
  },
  {
    enunciado: '¿Qué ocurre si una clase no declara ningún constructor?',
    opciones: [
      'No se puede instanciar',
      'El compilador añade un constructor por defecto sin parámetros',
      'Se produce un error de compilación',
      'Hereda obligatoriamente el constructor de `Object` con parámetros',
    ],
    correcta: 1,
    explicacion: 'Si no escribes ningún constructor, Java genera uno sin parámetros. Si declaras alguno, ese constructor por defecto deja de generarse.',
  },
  {
    enunciado: '¿Qué valor tiene un atributo de tipo `int` que no se ha inicializado explícitamente?',
    opciones: ['null', '0', '-1', 'Está indefinido y da error al leerlo'],
    correcta: 1,
    explicacion: 'Los atributos de clase reciben valores por defecto: `0` para numéricos, `false` para boolean y `null` para referencias. Las variables locales, en cambio, deben inicializarse.',
  },
  {
    enunciado: '¿Qué significa que un atributo sea `static`?',
    opciones: [
      'Que su valor no puede cambiar',
      'Que pertenece a la clase y lo comparten todas las instancias',
      'Que solo es accesible desde la propia clase',
      'Que se guarda en disco',
    ],
    correcta: 1,
    explicacion: 'Un miembro `static` es de la clase, no de cada objeto. Que no pueda cambiar lo indica `final`.',
  },
  {
    enunciado: '¿Qué interfaz debe implementar un recurso para usarse en un `try-with-resources`?',
    opciones: ['Serializable', 'Runnable', 'AutoCloseable', 'Comparable'],
    correcta: 2,
    explicacion: 'El bloque llama automáticamente a `close()` al terminar, que es el método que define `AutoCloseable` (y `Closeable`, que la extiende).',
  },
  {
    enunciado: '¿Qué hace la sentencia `break` dentro de un bucle?',
    opciones: [
      'Salta a la siguiente iteración',
      'Termina el bucle y continúa tras él',
      'Termina el método',
      'Reinicia el bucle desde el principio',
    ],
    correcta: 1,
    explicacion: '`break` sale del bucle más interno. Saltar a la siguiente iteración es lo que hace `continue`.',
  },
  {
    enunciado: '¿Qué índice tiene el primer elemento de un array en Java?',
    opciones: ['0', '1', '-1', 'Depende de cómo se declare'],
    correcta: 0,
    explicacion: 'Los arrays en Java empiezan en 0; el último elemento está en `length - 1`.',
  },
];
