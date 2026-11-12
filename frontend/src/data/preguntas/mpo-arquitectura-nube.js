// Banco de preguntas oficial de MPO II · Arquitectura en la nube (DAW / DAM)
// Cada pregunta incluye 'tema' (1 al 11) correspondiente a las 11 unidades del temario.
export default [
  // --- UNIDAD 1: Estrategias de nube: híbrida, multicloud y migración ---
  {
    tema: 1,
    enunciado: 'Dentro del marco de migración de las «6 R», ¿qué diferencia hay entre «Rehost» (lift-and-shift) y «Refactor / Re-architect»?',
    opciones: [
      'Rehost traslada la aplicación a la nube sin apenas cambios en su arquitectura; Refactor rediseña la aplicación para aprovechar servicios nativos de la nube (como microservicios o serverless)',
      'Rehost obliga a reescribir todo el código desde cero y Refactor apaga el servidor sin migrarlo',
      'Son exactamente la misma estrategia con distinto nombre comercial',
      'Rehost solo aplica a bases de datos NoSQL y Refactor solo a HTML estático',
    ],
    correcta: 0,
    explicacion: 'En las «6 R» (Rehost, Replatform, Repurchase, Refactor, Retire, Retain), Rehost migra rápido levantando los servidores tal cual (ej. con AWS MGN), mientras que Refactor/Re-architect transforma la arquitectura para ganar agilidad y escalabilidad cloud-native.',
  },
  {
    tema: 1,
    enunciado: 'Antes de migrar cargas de trabajo a la nube, ¿qué es una «Landing Zone» (zona de aterrizaje)?',
    opciones: [
      'La página de inicio pública del frontend de la aplicación web',
      'Un entorno cloud preconfigurado, seguro, multi-cuenta y gobernado (con red, identidad, auditoría y políticas base) listo para recibir las cargas migradas',
      'Un servidor físico temporal instalado en la oficina del cliente',
      'Una herramienta exclusiva para comprimir imágenes antes de subirlas a S3',
    ],
    correcta: 1,
    explicacion: 'Una Landing Zone prepara la nube antes de migrar nada: define la estructura de cuentas, IAM, redes, registros de seguridad y controles de coste para que las cargas entren de forma ordenada y segura.',
  },
  {
    tema: 1,
    enunciado: '¿Qué combinación de servicios de AWS automatiza la replicación de servidores en un «rehost» y la migración de bases de datos (incluso entre motores distintos) con mínima interrupción?',
    opciones: [
      'Amazon CloudFront y Amazon Route 53',
      'AWS Application Migration Service (MGN) para servidores y AWS Database Migration Service (DMS) para bases de datos',
      'AWS Budgets y AWS Cost Explorer',
      'Amazon ElastiCache y AWS X-Ray',
    ],
    correcta: 1,
    explicacion: 'AWS MGN replica los servidores hacia AWS para automatizar el rehost, mientras que AWS DMS migra bases de datos de forma continua manteniendo el origen activo hasta el corte final.',
  },

  // --- UNIDAD 2: Infraestructura global y diseño multi-región ---
  {
    tema: 2,
    enunciado: 'En una estrategia de Recuperación ante Desastres (DR), ¿qué miden exactamente los objetivos RPO y RTO?',
    opciones: [
      'RPO mide la cantidad máxima de datos (en tiempo) que se acepta perder; RTO mide el tiempo máximo que puede tardar el servicio en volver a estar operativo tras la caída',
      'RPO mide el presupuesto mensual en euros y RTO el número de programadores de guardia',
      'RPO es el ancho de banda de la red y RTO la latencia del DNS',
      'Ambos miden únicamente la velocidad del procesador del servidor de base de datos',
    ],
    correcta: 0,
    explicacion: 'RPO (Recovery Point Objective) mira hacia atrás en el tiempo (cuántos datos perdemos desde la última copia/réplica) y RTO (Recovery Time Objective) mira hacia adelante (cuánto tardamos en recuperar el servicio web).',
  },
  {
    tema: 2,
    enunciado: '¿Qué diferencia aporta AWS Global Accelerator frente a una CDN como Amazon CloudFront en una aplicación web global?',
    opciones: [
      'CloudFront cachea contenido estático/dinámico en los Edge Locations; Global Accelerator utiliza direcciones IP estáticas Anycast para enrutar el tráfico TCP/UDP desde el borde directamente por la red troncal privada de AWS hacia el backend más cercano y sano',
      'Global Accelerator solo sirve para guardar copias de seguridad en cinta magnética',
      'CloudFront solo funciona dentro de una única subred privada sin salida a Internet',
      'Global Accelerator sustituye al motor de base de datos relacional',
    ],
    correcta: 0,
    explicacion: 'CloudFront optimiza la entrega mediante caché en el edge, mientras que Global Accelerator optimiza la ruta de red global (TCP/UDP) entrando lo antes posible en la fibra privada de AWS con conmutación por error instantánea entre regiones.',
  },
  {
    tema: 2,
    enunciado: '¿En qué consiste el «Chaos Engineering» (ingeniería del caos) y qué servicio de AWS permite automatizarlo?',
    opciones: [
      'En desplegar código en producción sin hacer pruebas ni usar control de versiones',
      'En inyectar fallos de forma controlada (apagar instancias, cortar una AZ, añadir latencia) para verificar que la arquitectura resiste y descubrir debilidades antes de un incidente real, automatizándolo con AWS Fault Injection Service (FIS)',
      'En borrar aleatoriamente las tablas de producción sin copia de seguridad',
      'En desactivar el cortafuegos para comprobar cuántos ataques entran',
    ],
    correcta: 1,
    explicacion: 'La resiliencia por diseño no se asume, se prueba: AWS Fault Injection Service (FIS) permite ejecutar experimentos controlados de ingeniería del caos para validar la alta disponibilidad.',
  },

  // --- UNIDAD 3: Seguridad avanzada y gobernanza ---
  {
    tema: 3,
    enunciado: 'En un entorno profesional multi-cuenta con AWS Organizations, ¿qué función cumplen las SCP (Service Control Policies)?',
    opciones: [
      'Conceder permisos directamente a usuarios anónimos de Internet',
      'Establecer guardarraíles (límites máximos de permisos) a nivel de organización o unidad organizativa que ni siquiera el administrador de una cuenta miembro puede saltarse',
      'Sustituir el cifrado TLS de los certificados HTTPS',
      'Hacer copias de seguridad automáticas del frontend en GitHub',
    ],
    correcta: 1,
    explicacion: 'Las SCP no otorgan permisos por sí mismas, sino que definen el filtro máximo de lo que está permitido hacer en las cuentas miembro (por ejemplo, prohibir desplegar fuera de regiones europeas o impedir desactivar CloudTrail).',
  },
  {
    tema: 3,
    enunciado: '¿Por qué el backend de una aplicación web debe usar AWS Secrets Manager junto con AWS KMS en lugar de guardar las credenciales de la base de datos en el código fuente?',
    opciones: [
      'Porque el código fuente no admite cadenas de texto',
      'Porque permite cifrar los secretos con claves gestionadas en KMS, recuperarlos dinámicamente en tiempo de ejecución y rotar automáticamente las contraseñas sin tocar ni redesplegar el código',
      'Porque Secrets Manager hace que las consultas SQL no necesiten índices',
      'Porque KMS convierte automáticamente una base de datos relacional en NoSQL',
    ],
    correcta: 1,
    explicacion: 'KMS gestiona las claves criptográficas y Secrets Manager almacena, audita y rota automáticamente credenciales (como las de RDS/Aurora) evitando exponer secretos en repositorios Git.',
  },
  {
    tema: 3,
    enunciado: '¿Cuál es el papel respectivo de AWS CloudTrail, AWS Config y Amazon GuardDuty en la seguridad y cumplimiento de una plataforma en la nube?',
    opciones: [
      'CloudTrail registra todas las llamadas a la API (quién hizo qué); AWS Config evalúa la configuración de los recursos frente a reglas de cumplimiento; GuardDuty detecta amenazas analizando eventos y tráfico de forma inteligente',
      'Los tres son gestores de paquetes de JavaScript para el frontend',
      'CloudTrail bloquea peticiones SQL, Config cifra contraseñas y GuardDuty crea máquinas virtuales',
      'Solo sirven para calcular la factura eléctrica del centro de datos',
    ],
    correcta: 0,
    explicacion: 'CloudTrail aporta trazabilidad forense de API, AWS Config vigila desviaciones de configuración (ej. un bucket S3 público) y GuardDuty actúa como detector inteligente de amenazas.',
  },

  // --- UNIDAD 4: Redes avanzadas y conectividad híbrida ---
  {
    tema: 4,
    enunciado: 'Cuando una organización pasa de tener 2 VPC a tener decenas de VPC (por entornos y microservicios), ¿por qué se prefiere AWS Transit Gateway (patrón hub-and-spoke) frente al VPC Peering malla completa?',
    opciones: [
      'Porque el VPC Peering no es transitivo y obliga a crear conexiones punto a punto entre cada par de VPC ($N(N-1)/2$), mientras que Transit Gateway actúa como un concentrador central de enrutamiento escalable',
      'Porque Transit Gateway es exclusivo para redes Wi-Fi domésticas',
      'Porque VPC Peering envía todo el tráfico sin cifrar a través de la Internet pública',
      'Porque Transit Gateway no permite conectar redes on-premise',
    ],
    correcta: 0,
    explicacion: 'Con Transit Gateway cada VPC y cada conexión híbrida (VPN / Direct Connect) se conecta a un único hub central en estrella, simplificando tablas de rutas y escalabilidad.',
  },
  {
    tema: 4,
    enunciado: '¿Qué diferencia clave hay entre conectar el centro de datos propio con AWS mediante una VPN Site-to-Site frente a AWS Direct Connect?',
    opciones: [
      'La VPN viaja cifrada sobre la Internet pública (rápida de montar pero sujeta a la variabilidad de Internet); Direct Connect establece un enlace físico dedicado y privado con ancho de banda garantizado y latencia predecible',
      'Direct Connect funciona por satélite doméstico y la VPN no utiliza criptografía',
      'La VPN solo permite enviar correos electrónicos y Direct Connect solo páginas HTML',
      'Direct Connect es gratuito e instantáneo sin necesidad de infraestructura física',
    ],
    correcta: 0,
    explicacion: 'En arquitecturas híbridas críticas suele combinarse Direct Connect como enlace principal de alta capacidad y baja latencia con una VPN Site-to-Site como respaldo (backup).',
  },
  {
    tema: 4,
    enunciado: '¿Para qué sirve configurar VPC Endpoints / AWS PrivateLink cuando el backend necesita acceder a Amazon S3, DynamoDB o un servicio interno en otra VPC?',
    opciones: [
      'Para que el tráfico hacia esos servicios viaje íntegramente por la red privada de AWS sin necesidad de salir a Internet ni pasar por un NAT Gateway',
      'Para hacer públicos todos los datos de la base de datos en un buscador web',
      'Para asignar una dirección IP pública a cada contenedor del backend',
      'Para sustituir el uso de grupos de seguridad (Security Groups)',
    ],
    correcta: 0,
    explicacion: 'PrivateLink y los VPC Endpoints (Gateway e Interface) mantienen el tráfico dentro de la red troncal privada de AWS, mejorando la seguridad y ahorrando costes de procesamiento en NAT Gateway.',
  },

  // --- UNIDAD 5: Cómputo avanzado: contenedores y serverless ---
  {
    tema: 5,
    enunciado: 'Al desplegar contenedores en AWS con Amazon ECS o Amazon EKS, ¿qué significa elegir el modelo de ejecución AWS Fargate?',
    opciones: [
      'Que el equipo debe instalar y parchear manualmente el sistema operativo Linux de cada servidor EC2',
      'Que es un motor de ejecución serverless para contenedores: ejecutas los contenedores definiendo su CPU y memoria sin tener que aprovisionar ni administrar nodos/instancias EC2 subyacentes',
      'Que los contenedores solo pueden ejecutarse en el ordenador local del desarrollador',
      'Que se prohíbe el uso de imágenes Docker',
    ],
    correcta: 1,
    explicacion: 'ECS y EKS son los orquestadores; Fargate abstrae la capa de servidores (nodos) para que solo gestiones las tareas o pods en pago por uso.',
  },
  {
    tema: 5,
    enunciado: 'En una arquitectura serverless en AWS, ¿cómo se reparten las responsabilidades AWS Lambda, Amazon API Gateway, AWS Step Functions y Amazon EventBridge?',
    opciones: [
      'API Gateway expone la API HTTP; Lambda ejecuta el código de las funciones; Step Functions orquesta flujos de trabajo con estado; EventBridge enruta eventos entre servicios desacoplados',
      'Lambda es una base de datos relacional y EventBridge es un navegador web',
      'Step Functions sirve archivos CSS estáticos y API Gateway compila código Java',
      'Todos hacen exactamente la misma tarea de almacenamiento en disco',
    ],
    correcta: 0,
    explicacion: 'Una aplicación serverless moderna combina API Gateway como puerta de entrada, Lambda como cómputo efímero, Step Functions para coordinar procesos de varios pasos y EventBridge como bus de eventos.',
  },
  {
    tema: 5,
    enunciado: '¿Qué dos retos técnicos son críticos al diseñar funciones serverless (como AWS Lambda) para un backend de pagos o pedidos?',
    opciones: [
      'Elegir la marca del monitor y el color del chasis del servidor físico',
      'Gestionar el arranque en frío (cold start) —por ejemplo con Concurrencia Provisionada— y diseñar funciones idempotentes para que un reintento automático no duplique un pedido o cobro',
      'Particionar manualmente el disco duro mecánico cada mañana',
      'Configurar el cableado estructurado de categoría 6 en la oficina',
    ],
    correcta: 1,
    explicacion: 'En sistemas distribuidos y serverless los eventos pueden entregarse más de una vez (at-least-once); la idempotencia garantiza que procesar el mismo evento dos veces produzca el mismo resultado sin duplicar efectos.',
  },

  // --- UNIDAD 6: Almacenamiento y datos avanzados ---
  {
    tema: 6,
    enunciado: '¿Para qué se utilizan las políticas de Ciclo de Vida (Lifecycle Policies) en Amazon S3?',
    opciones: [
      'Para cambiar automáticamente los objetos entre clases de almacenamiento más económicas (Standard → Intelligent-Tiering / IA → Glacier) o expirarlos según su antigüedad y frecuencia de acceso',
      'Para reiniciar las instancias EC2 cada cinco minutos',
      'Para traducir automáticamente el código JavaScript a Python',
      'Para aumentar el precio por gigabyte de los archivos antiguos',
    ],
    correcta: 0,
    explicacion: 'Las políticas de ciclo de vida automatizan el ahorro de costes moviendo logs, históricos o copias de seguridad a clases frías (como S3 Glacier) cuando dejan de consultarse con frecuencia.',
  },
  {
    tema: 6,
    enunciado: 'En una plataforma de datos en la nube sobre un Data Lake en S3, ¿qué papel cumplen AWS Glue, Amazon Athena y formatos de tabla abiertos como Apache Iceberg (arquitectura Lakehouse)?',
    opciones: [
      'Glue cataloga y transforma los datos (ETL); Athena permite consultarlos directamente en S3 con SQL estándar serverless; Apache Iceberg aporta transacciones ACID y evolución de esquema al Data Lake (Lakehouse)',
      'Son tres editores de vídeo para redes sociales',
      'Athena es un cortafuegos físico y Glue un cable de fibra óptica',
      'Obligan a descargar todos los terabytes de datos al portátil del usuario antes de hacer un SELECT',
    ],
    correcta: 0,
    explicacion: 'La arquitectura Lakehouse une la flexibilidad y bajo coste de S3 con capacidades propias de un Data Warehouse gracias al catálogo/ETL de Glue, consultas serverless con Athena y tablas transaccionales Iceberg gobernadas con AWS Lake Formation.',
  },
  {
    tema: 6,
    enunciado: '¿Cuál es la arquitectura de referencia más disponible, escalable y económica en AWS para alojar el frontend de una SPA (HTML, CSS, JS e imágenes)?',
    opciones: [
      'Alojar los ficheros en un bucket privado de Amazon S3 y servirlos globalmente a través de Amazon CloudFront (CDN) con HTTPS (ACM) y DNS en Route 53, sin ningún servidor web que mantener',
      'Contratar veinte servidores dedicados físicos solo para servir un archivo index.html',
      'Guardar el HTML dentro de una cola SQS',
      'Ejecutar un clúster de bases de datos Oracle para servir hojas de estilo CSS',
    ],
    correcta: 0,
    explicacion: 'S3 + CloudFront elimina la gestión de servidores web para activos estáticos, ofrece altísima disponibilidad, caché en el borde mundial y coste mínimo por transferencia.',
  },

  // --- UNIDAD 7: Bases de datos avanzadas y caché ---
  {
    tema: 7,
    enunciado: '¿Qué ventaja arquitectónica distingue a Amazon Aurora frente a una base de datos relacional tradicional en una única instancia?',
    opciones: [
      'Separa la capa de cómputo de una capa de almacenamiento distribuida que replica los datos automáticamente 6 veces en 3 Zonas de Disponibilidad (AZ), permitiendo hasta 15 réplicas de lectura de baja latencia y failover rápido',
      'No permite usar el lenguaje SQL ni crear tablas relacionales',
      'Guarda todos los datos únicamente en la memoria caché del navegador del cliente',
      'Solo funciona con bases de datos de menos de 1 megabyte',
    ],
    correcta: 0,
    explicacion: 'Amazon Aurora (compatible con PostgreSQL y MySQL) desacopla cómputo y almacenamiento compartido multi-AZ, logrando un rendimiento y disponibilidad muy superiores a un RDS clásico.',
  },
  {
    tema: 7,
    enunciado: 'En el backend de una aplicación web con millones de usuarios simultáneos, ¿cuándo es preferible usar Amazon DynamoDB junto con Amazon ElastiCache (Redis)?',
    opciones: [
      'DynamoDB para cargas NoSQL clave-valor/documental que requieren latencia constante de milisegundos a cualquier escala (sesiones, carritos, eventos); ElastiCache para servir desde memoria RAM las consultas más repetidas sin golpear la base de datos',
      'Cuando no queremos que la aplicación funcione en Internet',
      'Para almacenar vídeos de varias horas en formato sin comprimir dentro de una fila de caché',
      'Solo cuando la aplicación tiene menos de 2 usuarios al mes',
    ],
    correcta: 0,
    explicacion: 'Combinar una base de datos escalable (Aurora o DynamoDB) con caché en memoria en ElastiCache (aplicando patrones como Cache-Aside o Write-Through) descarga la base de datos y reduce la latencia a sub-milisegundos.',
  },
  {
    tema: 7,
    enunciado: '¿Para qué sirve activar Performance Insights en una base de datos gestionada como Amazon RDS o Aurora?',
    opciones: [
      'Para visualizar la carga de la base de datos (DB Load), identificar qué consultas SQL concretas están generando cuellos de botella o esperas (waits) y optimizar índices antes de que el frontend sufra lentitud',
      'Para cambiar el diseño CSS de la página de login',
      'Para eliminar automáticamente las claves primarias de todas las tablas',
      'Para enviar correos publicitarios a los usuarios registrados',
    ],
    correcta: 0,
    explicacion: 'La observabilidad de la capa de datos con Performance Insights permite diagnosticar consultas lentas, bloqueos y consumo de CPU/I/O en tiempo real.',
  },

  // --- UNIDAD 8: Infraestructura como código (IaC) ---
  {
    tema: 8,
    enunciado: '¿Qué es la Infraestructura como Código (IaC) y qué problema evita frente a crear recursos manualmente en la consola web («ClickOps»)?',
    opciones: [
      'Permite declarar y versionar en archivos de código (Git) toda la infraestructura (redes, cómputo, BD, permisos), evitando errores humanos, garantizando entornos reproducibles (dev/staging/prod idénticos) y detectando desviaciones (drift)',
      'Consiste en escribir el código HTML del frontend dentro de la BIOS del servidor',
      'Obliga a comprar servidores físicos nuevos cada vez que se hace un commit en Git',
      'Sustituye la necesidad de tener sistemas operativos en los servidores',
    ],
    correcta: 0,
    explicacion: 'Con IaC la infraestructura pasa por el mismo ciclo de revisión (Pull Request, tests, CI/CD) que el código de la aplicación, asegurando repetibilidad y trazabilidad.',
  },
  {
    tema: 8,
    enunciado: '¿Qué diferencia existe entre AWS CloudFormation, Terraform y OpenTofu?',
    opciones: [
      'CloudFormation es el motor IaC nativo exclusivo de AWS (YAML/JSON); Terraform (de HashiCorp) es multicloud con lenguaje HCL (bajo licencia BUSL desde 2023); OpenTofu es la bifurcación open-source (MPL 2.0) alojada en la Linux Foundation compatible con HCL',
      'Son tres motores de bases de datos relacionales incompatibles con la nube',
      'CloudFormation solo funciona en Azure y Terraform solo en ordenadores sin red',
      'OpenTofu es un framework de estilos CSS para React',
    ],
    correcta: 0,
    explicacion: 'Terraform y OpenTofu permiten gestionar recursos de múltiples proveedores (AWS, Azure, GCP, Cloudflare, Vercel...) con un mismo lenguaje declarativo HCL y un archivo de estado (state).',
  },
  {
    tema: 8,
    enunciado: '¿Qué aportan herramientas como AWS CDK (Cloud Development Kit) o Pulumi frente a las plantillas declarativas tradicionales en YAML o HCL?',
    opciones: [
      'Permiten definir la infraestructura utilizando lenguajes de programación completos (TypeScript, Python, Java...), aprovechando bucles, condicionales, tipado, autocompletado y tests unitarios en el mismo lenguaje que el backend',
      'Eliminan la necesidad de tener una cuenta en un proveedor cloud',
      'Solo permiten crear un único recurso por cada proyecto',
      'No generan ni aplican infraestructura real en la nube',
    ],
    correcta: 0,
    explicacion: 'AWS CDK y Pulumi acercan la infraestructura al desarrollador de software permitiendo reutilizar abstracciones, clases y pruebas de su lenguaje habitual.',
  },

  // --- UNIDAD 9: Observabilidad y escalado avanzado ---
  {
    tema: 9,
    enunciado: '¿Cuáles son los «tres pilares de la observabilidad» en una arquitectura de microservicios distribuida y cómo se relacionan con OpenTelemetry (OTel)?',
    opciones: [
      'Métricas (valores numéricos agregados), Logs (registros de eventos con marca temporal) y Trazas distribuidas (recorrido completo de una petición entre servicios); OpenTelemetry es el estándar abierto para instrumentarlos sin depender de un único proveedor',
      'HTML, CSS y JavaScript',
      'Teclado, Ratón y Monitor',
      'Desarrollo, Producción y Vacaciones',
    ],
    correcta: 0,
    explicacion: 'En sistemas distribuidos una métrica te dice que algo va mal, la traza distribuida (ej. X-Ray / OTel) te muestra en qué microservicio está el cuello de botella y el log te da el detalle exacto del error.',
  },
  {
    tema: 9,
    enunciado: 'En ingeniería de fiabilidad del sitio (SRE), ¿qué diferencia hay entre SLI, SLO y «Error Budget» (presupuesto de error)?',
    opciones: [
      'SLI es la métrica medida (ej. latencia o % de respuestas 200 OK); SLO es el objetivo interno fijado para ese indicador (ej. 99,9 %); el Error Budget es el margen permitido de fallo (0,1 %) antes de priorizar la estabilidad sobre nuevas funcionalidades',
      'Son tres tipos de impuestos aplicables a los servidores en la nube',
      'SLI es el nombre del servidor, SLO la contraseña y Error Budget el coste en euros de los errores de sintaxis',
      'Todos significan apagar el servidor cuando hay mucho tráfico',
    ],
    correcta: 0,
    explicacion: 'Definir SLI, SLO y Error Budget alinea al equipo de desarrollo y al de operaciones: mientras quede presupuesto de error se puede desplegar rápido; si se agota, se congela el lanzamiento de features para reforzar la fiabilidad.',
  },
  {
    tema: 9,
    enunciado: 'En Kubernetes (Amazon EKS), ¿cómo se complementan el HPA (Horizontal Pod Autoscaler) y Karpenter?',
    opciones: [
      'HPA escala horizontalmente el número de réplicas de pods de la aplicación según la carga; si no caben más pods en el clúster, Karpenter aprovisiona nuevos nodos de cómputo óptimos en segundos',
      'HPA borra la base de datos y Karpenter reinicia el router de la oficina',
      'Ambos sirven únicamente para escalar sitios web estáticos en S3',
      'Karpenter es un editor de código y HPA un navegador web',
    ],
    correcta: 0,
    explicacion: 'El escalado moderno en contenedores actúa en dos niveles: HPA ajusta los pods del microservicio y Karpenter ajusta la capacidad de nodos subyacentes de forma rápida y eficiente.',
  },

  // --- UNIDAD 10: Costes, presupuestos y FinOps ---
  {
    tema: 10,
    enunciado: '¿Qué combinación de modelos de compra en la nube resulta óptima para la arquitectura de una aplicación web en producción?',
    opciones: [
      'Reserved Instances / Savings Plans (1 o 3 años) para la carga base estable y predecible; On-Demand o Serverless para los picos variables; e Instancias Spot (con hasta un 90 % de descuento) para cargas tolerantes a interrupciones como jobs por lotes o entornos de CI/CD',
      'Usar exclusivamente Instancias Spot sin réplicas para la base de datos principal de producción',
      'Pagar siempre la tarifa más cara sin apagar nunca los entornos de pruebas por la noche',
      'Comprar todos los servidores a 10 años vista el primer día antes de saber si la app tendrá usuarios',
    ],
    correcta: 0,
    explicacion: 'Combinar compromisos de ahorro (Savings Plans/RI) para la línea base con la elasticidad On-Demand/Serverless y el descuento de Spot para tareas tolerantes a fallos reduce drásticamente la factura.',
  },
  {
    tema: 10,
    enunciado: 'En la cultura FinOps avanzada, ¿qué son los «Unit Economics» (economía unitaria) aplicados a una aplicación web?',
    opciones: [
      'Relacionar el gasto en la nube con una métrica de valor del negocio (por ejemplo, coste por usuario activo, coste por cada 1.000 peticiones a la API o coste por pedido procesado)',
      'Mirar únicamente el total de la factura anual sin desglosar ningún servicio',
      'Prohibir a los desarrolladores ver cuánto cuestan los recursos que despliegan',
      'El precio de compra de una mesa de oficina',
    ],
    correcta: 0,
    explicacion: 'Si la factura sube un 20 % pero el número de usuarios de pago ha subido un 80 %, los Unit Economics muestran que la arquitectura es cada vez más eficiente; medir el coste unitario permite tomar decisiones de ingeniería y negocio fundamentadas.',
  },
  {
    tema: 10,
    enunciado: '¿Por qué en el Well-Architected Framework el pilar de Optimización de Costes y el pilar de Sostenibilidad están estrechamente vinculados?',
    opciones: [
      'Porque prácticas como el right-sizing (ajustar tamaño), apagar entornos ociosos, escalar a cero con serverless y usar procesadores ARM eficientes como AWS Graviton reducen a la vez la factura económica y el consumo energético (huella de carbono)',
      'Porque gastar más dinero en servidores vacíos reduce las emisiones de CO2',
      'Porque no tienen ninguna relación técnica entre sí',
      'Porque la sostenibilidad exige mantener encendidos servidores que nadie utiliza',
    ],
    correcta: 0,
    explicacion: 'El recurso más barato y más ecológico es el que no se malgasta: eliminar la capacidad ociosa y elegir instancias eficientes (como Graviton) ahorra dinero y energía simultáneamente.',
  },

  // --- UNIDAD 11: Arquitecturas modernas, DevOps y proyecto de arquitectura ---
  {
    tema: 11,
    enunciado: 'En una arquitectura de microservicios, ¿por qué se utilizan colas de mensajes (Amazon SQS) y notificaciones pub/sub (Amazon SNS) entre los componentes del backend?',
    opciones: [
      'Para desacoplar los servicios: si el servicio de facturación o envío de correos tarda o sufre un pico, las peticiones quedan amortiguadas en la cola sin bloquear ni tumbar a la API principal ni al usuario en el frontend',
      'Para hacer que todas las llamadas sean síncronas y bloqueantes',
      'Para sustituir el uso de HTML en el navegador',
      'Para que si un microservicio falla se caiga inmediatamente toda la empresa',
    ],
    correcta: 0,
    explicacion: 'El desacoplamiento asíncrono mediante colas (SQS, punto a punto con cola de mensajes fallidos DLQ) y tópicos pub/sub (SNS) evita la propagación de fallos en cascada y absorbe picos de tráfico.',
  },
  {
    tema: 11,
    enunciado: '¿Qué es la «Ingeniería de Plataformas» (Platform Engineering) y el concepto de «Golden Paths» (carreteras pavimentadas) en equipos de desarrollo modernos?',
    opciones: [
      'Crear una plataforma interna de desarrollo (IDP) que ofrece a los desarrolladores autoservicio con plantillas ya estandarizadas (con IaC, CI/CD, seguridad y observabilidad integradas) para desplegar aplicaciones rápido y sin fricción',
      'Obligar a cada programador junior a configurar desde cero la red BGP y el cortafuegos antes de escribir una línea de código',
      'Eliminar los pipelines de integración continua y subir los archivos por FTP manual',
      'Pintar de color dorado los racks del centro de datos',
    ],
    correcta: 0,
    explicacion: 'Platform Engineering evoluciona la cultura DevOps reduciendo la carga cognitiva del equipo de desarrollo mediante caminos estandarizados, seguros y automatizados por defecto.',
  },
  {
    tema: 11,
    enunciado: 'Al diseñar y defender el proyecto de arquitectura de una aplicación web, ¿qué es un ADR (Architecture Decision Record)?',
    opciones: [
      'Un documento breve versionado en el repositorio que registra una decisión arquitectónica relevante (el contexto, las alternativas valoradas, la opción elegida y sus consecuencias/trade-offs)',
      'Un archivo binario con las contraseñas sin cifrar de los usuarios',
      'Un comando de Linux para formatear particiones',
      'La factura mensual del proveedor de dominio DNS',
    ],
    correcta: 0,
    explicacion: 'En arquitectura de software no hay soluciones mágicas sino equilibrios (trade-offs); los ADR documentan qué se decidió y por qué (por ejemplo, por qué se eligió Aurora frente a DynamoDB para un módulo concreto).',
  },
];
