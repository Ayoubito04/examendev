// Ciclos y módulos profesionales técnicos (títulos LOE).
// El reparto por curso sigue la organización más habitual; puede variar según la comunidad autónoma.

export const CICLOS = [
  { id: 'dam', sigla: 'DAM', nombre: 'Desarrollo de Aplicaciones Multiplataforma', grado: 'Grado Superior' },
  { id: 'daw', sigla: 'DAW', nombre: 'Desarrollo de Aplicaciones Web', grado: 'Grado Superior' },
  { id: 'asir', sigla: 'ASIR', nombre: 'Administración de Sistemas Informáticos en Red', grado: 'Grado Superior' },
  { id: 'smr', sigla: 'SMR', nombre: 'Sistemas Microinformáticos y Redes', grado: 'Grado Medio' },
];

// Secciones de la vista "Todos" del temario. Un módulo compartido puede aparecer en varias.
export const SECCIONES = [
  { id: 'desarrollo-1', titulo: '1º · DAM y DAW (comunes)', ciclo: 'DAM', curso: 1 },
  { id: 'daw-2', titulo: '2º · DAW', ciclo: 'DAW', curso: 2 },
  { id: 'dam-2', titulo: '2º · DAM', ciclo: 'DAM', curso: 2 },
  { id: 'asir-1', titulo: '1º · ASIR', ciclo: 'ASIR', curso: 1 },
  { id: 'asir-2', titulo: '2º · ASIR', ciclo: 'ASIR', curso: 2 },
  { id: 'smr-1', titulo: '1º · SMR', ciclo: 'SMR', curso: 1 },
  { id: 'smr-2', titulo: '2º · SMR', ciclo: 'SMR', curso: 2 },
];

export const MODULOS = [
  // ---------- DAM y DAW · 1º (comunes) ----------
  {
    id: 'programacion',
    nombre: 'Programación',
    ciclos: ['DAM', 'DAW'],
    curso: 1,
    descripcion: 'Java, programación orientada a objetos, estructuras de control, colecciones y excepciones.',
    temas: ['Tipos de datos y operadores', 'Estructuras de control', 'Clases, herencia y polimorfismo', 'Colecciones', 'Excepciones y ficheros'],
  },
  {
    id: 'bases-de-datos',
    nombre: 'Bases de datos',
    ciclos: ['DAM', 'DAW'],
    curso: 1,
    descripcion: 'Modelo entidad-relación, modelo relacional, normalización y SQL (DDL, DML, DCL).',
    temas: ['Modelo E/R', 'Modelo relacional y normalización', 'Consultas SQL', 'Transacciones', 'Vistas y privilegios'],
  },
  {
    id: 'entornos-de-desarrollo',
    nombre: 'Entornos de desarrollo',
    ciclos: ['DAM', 'DAW'],
    curso: 1,
    descripcion: 'Ciclo de vida del software, control de versiones con Git, pruebas, depuración y UML.',
    temas: ['Compilación e interpretación', 'Control de versiones', 'Pruebas y JUnit', 'Refactorización', 'Diagramas UML'],
  },
  {
    id: 'lenguajes-de-marcas',
    nombre: 'Lenguajes de marcas y sistemas de gestión de información',
    ciclos: ['DAM', 'DAW', 'ASIR'],
    curso: 1,
    descripcion: 'HTML, CSS, XML, validación con DTD y XSD, XPath, XSLT, XQuery y JSON.',
    temas: ['HTML semántico', 'CSS', 'XML bien formado y válido', 'XPath, XSLT y XQuery', 'JSON y sindicación'],
  },
  {
    id: 'sistemas-informaticos',
    nombre: 'Sistemas informáticos',
    ciclos: ['DAM', 'DAW'],
    curso: 1,
    descripcion: 'Hardware, sistemas operativos Windows y Linux, redes, direccionamiento IP y virtualización.',
    temas: ['Hardware y almacenamiento', 'Administración de Linux', 'Redes y TCP/IP', 'Servicios de red', 'Virtualización'],
  },

  // ---------- DAW · 2º ----------
  {
    id: 'cliente',
    nombre: 'Desarrollo web en entorno cliente',
    ciclos: ['DAW'],
    curso: 2,
    descripcion: 'JavaScript moderno, DOM, eventos, asincronía, fetch y almacenamiento en el navegador.',
    temas: ['Sintaxis y tipos', 'Arrays y objetos', 'DOM y eventos', 'Promesas y async/await', 'Almacenamiento web'],
  },
  {
    id: 'servidor',
    nombre: 'Desarrollo web en entorno servidor',
    ciclos: ['DAW'],
    curso: 2,
    descripcion: 'PHP, HTTP, sesiones y cookies, acceso a bases de datos, seguridad, MVC y APIs REST.',
    temas: ['PHP básico', 'Formularios, sesiones y cookies', 'Acceso a datos y seguridad', 'Arquitectura MVC', 'Servicios REST'],
  },
  {
    id: 'despliegue',
    nombre: 'Despliegue de aplicaciones web',
    ciclos: ['DAW'],
    curso: 2,
    descripcion: 'Servidores web y de aplicaciones, DNS, HTTPS, transferencia de ficheros, Docker y CI/CD.',
    temas: ['Apache y Nginx', 'Servidores de aplicaciones', 'DNS y HTTPS', 'Contenedores', 'Integración continua'],
  },
  {
    id: 'interfaces-web',
    nombre: 'Diseño de interfaces web',
    ciclos: ['DAW'],
    curso: 2,
    descripcion: 'Diseño responsive, maquetación con Flexbox y Grid, color, tipografía, accesibilidad y usabilidad.',
    temas: ['Diseño responsive', 'Maquetación CSS', 'Color y tipografía', 'Multimedia', 'Accesibilidad y usabilidad'],
  },

  // ---------- DAM · 2º ----------
  {
    id: 'acceso-a-datos',
    nombre: 'Acceso a datos',
    ciclos: ['DAM'],
    curso: 2,
    descripcion: 'Ficheros, JDBC, mapeo objeto-relacional con JPA/Hibernate, XML y bases de datos NoSQL.',
    temas: ['Ficheros y serialización', 'JDBC', 'ORM con JPA', 'Procesado de XML', 'Bases de datos NoSQL'],
  },
  {
    id: 'moviles',
    nombre: 'Programación multimedia y dispositivos móviles',
    ciclos: ['DAM'],
    curso: 2,
    descripcion: 'Android con Kotlin: actividades, ciclo de vida, intents, listas, persistencia y Compose.',
    temas: ['Kotlin', 'Actividades y ciclo de vida', 'Intents y fragments', 'Persistencia', 'Jetpack Compose'],
  },
  {
    id: 'procesos',
    nombre: 'Programación de servicios y procesos',
    ciclos: ['DAM'],
    curso: 2,
    descripcion: 'Procesos e hilos, sincronización, sockets TCP/UDP y fundamentos de criptografía.',
    temas: ['Procesos', 'Hilos y concurrencia', 'Sincronización', 'Sockets', 'Seguridad y criptografía'],
  },
  {
    id: 'interfaces',
    nombre: 'Desarrollo de interfaces',
    ciclos: ['DAM'],
    curso: 2,
    descripcion: 'Interfaces de escritorio con JavaFX y Swing, componentes, informes, usabilidad y distribución.',
    temas: ['JavaFX y FXML', 'Swing y eventos', 'Componentes reutilizables', 'Informes', 'Usabilidad'],
  },
  {
    id: 'gestion-empresarial',
    nombre: 'Sistemas de gestión empresarial',
    ciclos: ['DAM'],
    curso: 2,
    descripcion: 'ERP y CRM, implantación, Odoo y desarrollo de módulos, inteligencia de negocio.',
    temas: ['ERP y CRM', 'Implantación', 'Arquitectura de Odoo', 'Desarrollo de módulos', 'Business Intelligence'],
  },

  // ---------- ASIR · 1º ----------
  {
    id: 'implantacion-so',
    nombre: 'Implantación de sistemas operativos',
    ciclos: ['ASIR'],
    curso: 1,
    descripcion: 'Estructura de un sistema operativo, instalación, particionado, usuarios, permisos y procesos en Windows y Linux.',
    temas: ['Arquitectura del SO', 'Instalación y arranque', 'Sistemas de ficheros', 'Usuarios y permisos', 'Procesos y servicios'],
  },
  {
    id: 'planificacion-redes',
    nombre: 'Planificación y administración de redes',
    ciclos: ['ASIR'],
    curso: 1,
    descripcion: 'Modelos OSI y TCP/IP, cableado, conmutación, VLAN, direccionamiento, enrutamiento y redes inalámbricas.',
    temas: ['Modelos OSI y TCP/IP', 'Medios y cableado', 'Conmutación y VLAN', 'Direccionamiento IPv4/IPv6', 'Enrutamiento'],
  },
  {
    id: 'fundamentos-hardware',
    nombre: 'Fundamentos de hardware',
    ciclos: ['ASIR'],
    curso: 1,
    descripcion: 'Componentes del equipo, almacenamiento, RAID, alimentación, copias de seguridad y gestión de residuos.',
    temas: ['Arquitectura del equipo', 'Almacenamiento y RAID', 'Alimentación y SAI', 'Copias de seguridad', 'Prevención y residuos'],
  },
  {
    id: 'gestion-bases-datos',
    nombre: 'Gestión de bases de datos',
    ciclos: ['ASIR'],
    curso: 1,
    descripcion: 'Sistemas gestores, diseño conceptual y lógico, normalización y SQL para definir y manipular datos.',
    temas: ['SGBD y arquitectura', 'Diseño E/R', 'Normalización', 'DDL y restricciones', 'Consultas SQL'],
  },

  // ---------- ASIR · 2º ----------
  {
    id: 'administracion-so',
    nombre: 'Administración de sistemas operativos',
    ciclos: ['ASIR'],
    curso: 2,
    descripcion: 'Servicio de directorio (Active Directory y LDAP), directivas de grupo, automatización con scripts y servicios en Linux.',
    temas: ['Active Directory', 'LDAP', 'Directivas de grupo', 'Scripts en Bash y PowerShell', 'Servicios y tareas programadas'],
  },
  {
    id: 'servicios-red-internet',
    nombre: 'Servicios de red e Internet',
    ciclos: ['ASIR'],
    curso: 2,
    descripcion: 'DNS, DHCP, servidores web, transferencia de ficheros, correo electrónico, acceso remoto y proxy.',
    temas: ['DNS', 'DHCP', 'Servidor web', 'FTP y correo', 'Acceso remoto y proxy'],
  },
  {
    id: 'implantacion-aplicaciones-web',
    nombre: 'Implantación de aplicaciones web',
    ciclos: ['ASIR'],
    curso: 2,
    descripcion: 'Pila LAMP, instalación y administración de CMS y LMS, PHP básico y mantenimiento de aplicaciones web.',
    temas: ['Servidores y pila LAMP', 'Gestores de contenidos', 'PHP básico', 'Bases de datos para la web', 'Mantenimiento y copias'],
  },
  {
    id: 'administracion-sgbd',
    nombre: 'Administración de sistemas gestores de bases de datos',
    ciclos: ['ASIR'],
    curso: 2,
    descripcion: 'Instalación y configuración de MySQL, usuarios y privilegios, rendimiento, programación en el servidor, copias y replicación.',
    temas: ['Instalación y configuración', 'Usuarios y privilegios', 'Índices y rendimiento', 'Procedimientos y triggers', 'Copias y replicación'],
  },
  {
    id: 'seguridad-alta-disponibilidad',
    nombre: 'Seguridad y alta disponibilidad',
    ciclos: ['ASIR'],
    curso: 2,
    descripcion: 'Principios de seguridad, cortafuegos, VPN, detección de intrusiones, criptografía, alta disponibilidad y legislación.',
    temas: ['Principios de seguridad', 'Cortafuegos y DMZ', 'VPN e IDS/IPS', 'Alta disponibilidad', 'Legislación'],
  },

  // ---------- SMR · 1º ----------
  {
    id: 'montaje-equipos',
    nombre: 'Montaje y mantenimiento de equipos',
    ciclos: ['SMR'],
    curso: 1,
    descripcion: 'Componentes, montaje del equipo, fuente de alimentación, diagnóstico de averías y mantenimiento.',
    temas: ['Componentes', 'Montaje', 'Alimentación', 'Diagnóstico y averías', 'Mantenimiento'],
  },
  {
    id: 'so-monopuesto',
    nombre: 'Sistemas operativos monopuesto',
    ciclos: ['SMR'],
    curso: 1,
    descripcion: 'Instalación y uso de Windows y Linux en un equipo, sistemas de ficheros, línea de comandos y virtualización.',
    temas: ['Conceptos y licencias', 'Instalación', 'Sistemas de ficheros', 'Línea de comandos', 'Máquinas virtuales'],
  },
  {
    id: 'aplicaciones-ofimaticas',
    nombre: 'Aplicaciones ofimáticas',
    ciclos: ['SMR'],
    curso: 1,
    descripcion: 'Procesador de textos, hoja de cálculo, bases de datos de escritorio y presentaciones.',
    temas: ['Procesador de textos', 'Hoja de cálculo', 'Funciones', 'Bases de datos de escritorio', 'Presentaciones'],
  },
  {
    id: 'redes-locales',
    nombre: 'Redes locales',
    ciclos: ['SMR'],
    curso: 1,
    descripcion: 'Elementos de una red local, cableado estructurado, conectores, dispositivos de interconexión y Wi-Fi.',
    temas: ['Conceptos de red', 'Cableado y conectores', 'Dispositivos', 'Redes inalámbricas', 'Comprobación de la red'],
  },

  // ---------- SMR · 2º ----------
  {
    id: 'so-en-red',
    nombre: 'Sistemas operativos en red',
    ciclos: ['SMR'],
    curso: 2,
    descripcion: 'Dominios y grupos de trabajo, usuarios y grupos, recursos compartidos, permisos y acceso remoto.',
    temas: ['Dominio y grupo de trabajo', 'Usuarios y grupos', 'Recursos compartidos', 'Permisos', 'Acceso remoto'],
  },
  {
    id: 'seguridad-informatica',
    nombre: 'Seguridad informática',
    ciclos: ['SMR'],
    curso: 2,
    descripcion: 'Seguridad física y lógica, malware, copias de seguridad, cifrado, cortafuegos y buenas prácticas.',
    temas: ['Seguridad física y lógica', 'Malware', 'Copias de seguridad', 'Criptografía básica', 'Seguridad en redes'],
  },
  {
    id: 'servicios-en-red',
    nombre: 'Servicios en red',
    ciclos: ['SMR'],
    curso: 2,
    descripcion: 'Instalación y configuración de DHCP, DNS, servidor web, FTP, correo y acceso remoto.',
    temas: ['DHCP', 'DNS', 'Servidor web', 'FTP y correo', 'Acceso remoto y NAT'],
  },
  {
    id: 'aplicaciones-web',
    nombre: 'Aplicaciones web',
    ciclos: ['SMR'],
    curso: 2,
    descripcion: 'Servidores web locales, gestores de contenidos, blogs, wikis, foros y plataformas de aprendizaje.',
    temas: ['Conceptos web', 'Entorno de pruebas', 'Gestores de contenidos', 'Blogs, wikis y foros', 'Administración del sitio'],
  },
];

export const modulosDeCiclo = (sigla, curso) =>
  MODULOS.filter((m) => m.ciclos.includes(sigla) && (curso == null || m.curso === curso));

// Nombres cortos para gráficos y espacios reducidos.
export const NOMBRES_CORTOS = {
  programacion: 'Programación',
  'bases-de-datos': 'Bases de datos',
  'entornos-de-desarrollo': 'Entornos',
  'lenguajes-de-marcas': 'L. de marcas',
  'sistemas-informaticos': 'Sistemas inf.',
  cliente: 'Entorno cliente',
  servidor: 'Entorno servidor',
  despliegue: 'Despliegue',
  'interfaces-web': 'Interfaces web',
  'acceso-a-datos': 'Acceso a datos',
  moviles: 'Móviles',
  procesos: 'Servicios y proc.',
  interfaces: 'Interfaces',
  'gestion-empresarial': 'SGE',
  'implantacion-so': 'Implantación SO',
  'planificacion-redes': 'Redes',
  'fundamentos-hardware': 'Hardware',
  'gestion-bases-datos': 'Gestión BD',
  'administracion-so': 'Admin. SO',
  'servicios-red-internet': 'Servicios red',
  'implantacion-aplicaciones-web': 'Implant. web',
  'administracion-sgbd': 'Admin. SGBD',
  'seguridad-alta-disponibilidad': 'Seguridad y AD',
  'montaje-equipos': 'Montaje',
  'so-monopuesto': 'SO monopuesto',
  'aplicaciones-ofimaticas': 'Ofimática',
  'redes-locales': 'Redes locales',
  'so-en-red': 'SO en red',
  'seguridad-informatica': 'Seguridad',
  'servicios-en-red': 'Servicios en red',
  'aplicaciones-web': 'Aplicaciones web',
};

export const nombreCorto = (id) => NOMBRES_CORTOS[id] ?? id;
