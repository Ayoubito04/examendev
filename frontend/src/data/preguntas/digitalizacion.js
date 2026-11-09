// Formato: enunciado, opciones (4), correcta (índice 0-3), explicación y tema (1-6).
// Unidades (Hoja de ruta oficial de Digitalización aplicada a los sectores productivos):
// 1: UT1 · La digitalización en el sector del desarrollo de aplicaciones web
// 2: UT2 · Tecnologías digitales habilitadoras (THD) aplicadas al desarrollo web
// 3: UT3 · La nube y los servicios cloud en el desarrollo web
// 4: UT4 · Inteligencia artificial aplicada al desarrollo web
// 5: UT5 · Datos, analítica y ciberseguridad en el desarrollo web
// 6: UT6 · Proyecto de transformación digital de una empresa de desarrollo web

export default [
  // --- 20 preguntas originales (mantienen su posición 01..20 para conservar IDs) ---
  {
    tema: 1,
    enunciado: '¿Qué diferencia existe entre «digitización» (digitization), «digitalización» (digitalization) y «transformación digital»?',
    opciones: [
      'Son tres sinónimos exactos sin ninguna diferencia',
      'Digitización es pasar información analógica a formato digital; digitalización es usar esa tecnología para mejorar procesos; transformación digital es el cambio profundo del modelo de negocio y cultura de la organización',
      'La transformación digital consiste únicamente en escanear facturas en PDF',
      'La digitalización solo se aplica a empresas que fabrican microprocesadores',
    ],
    correcta: 1,
    explicacion: 'Escanear un documento en papel es digitización; automatizar el flujo de aprobación es digitalización; crear un nuevo servicio digital basado en datos cambia el modelo de negocio (transformación digital).',
  },
  {
    tema: 1,
    enunciado: 'En la Industria 4.0, ¿qué significan las siglas IT y OT cuando hablamos de convergencia IT/OT?',
    opciones: [
      'Information Technology (Tecnologías de la Información) y Operational Technology (Tecnologías de Operación industrial)',
      'Internet Total y Oficina Telemática',
      'Interfaz de Texto y Ordenador Terminal',
      'Ingeniería Técnica y Organización Temporal',
    ],
    correcta: 0,
    explicacion: 'IT gestiona datos, servidores y aplicaciones corporativas; OT controla la maquinaria, sensores, PLCs y procesos físicos de planta. Su integración es la base de la Industria 4.0.',
  },
  {
    tema: 3,
    enunciado: '¿Cuáles son las tres modalidades principales de servicio en Cloud Computing según el nivel de abstracción?',
    opciones: [
      'LAN, MAN y WAN',
      'IaaS (Infraestructura), PaaS (Plataforma) y SaaS (Software como Servicio)',
      'HTML, CSS y JavaScript',
      'TCP, UDP e ICMP',
    ],
    correcta: 1,
    explicacion: 'IaaS ofrece máquinas virtuales, redes y discos (ej. AWS EC2); PaaS ofrece entornos listos para desplegar código (ej. Render, Google App Engine); SaaS ofrece aplicaciones finales (ej. Microsoft 365).',
  },
  {
    tema: 3,
    enunciado: '¿En qué consiste el paradigma de «Edge Computing» (computación en el borde) frente al Cloud Computing centralizado?',
    opciones: [
      'En procesar los datos cerca del lugar donde se generan (sensores, dispositivos IoT o pasarelas locales) para reducir la latencia y el ancho de banda',
      'En usar exclusivamente el navegador Microsoft Edge',
      'En enviar todos los datos sin filtrar a un único servidor situado en otro continente',
      'En apagar la red local y trabajar sin ordenadores',
    ],
    correcta: 0,
    explicacion: 'El Edge Computing resulta crítico en vehículos autónomos, robótica industrial o telemedicina, donde unos milisegundos de latencia hacia la nube no son asumibles.',
  },
  {
    tema: 2,
    enunciado: '¿Qué es un «Gemelo Digital» (Digital Twin) en un entorno productivo?',
    opciones: [
      'Una copia de seguridad guardada en un pendrive USB',
      'Una réplica virtual dinámica de un producto, proceso o planta física alimentada con datos en tiempo real para simular, monitorizar y predecir su comportamiento',
      'Dos monitores conectados al mismo ordenador',
      'Un usuario con dos cuentas de correo electrónico',
    ],
    correcta: 1,
    explicacion: 'El Gemelo Digital combina sensores IoT, modelos 3D e IA para ensayar cambios o predecir averías (mantenimiento predictivo) sin detener ni poner en riesgo el sistema físico.',
  },
  {
    tema: 5,
    enunciado: 'Tradicionalmente, ¿con qué «5 V» se caracteriza el concepto de Big Data?',
    opciones: [
      'Volumen, Velocidad, Variedad, Veracidad y Valor',
      'Voltaje, Vatios, Velocidad, Vector y Ventana',
      'Ventas, Visitas, Vídeos, Vínculos y Versiones',
      'Virtualización, VLAN, VPN, VoIP y VRAM',
    ],
    correcta: 0,
    explicacion: 'Big Data gestiona grandes cantidades de datos (Volumen), generados en tiempo real (Velocidad), en múltiples formatos estructurados y no estructurados (Variedad), asegurando su fiabilidad (Veracidad) para obtener utilidad de negocio (Valor).',
  },
  {
    tema: 2,
    enunciado: '¿Qué protocolo ligero de mensajería basado en publicación/suscripción (pub/sub) es el estándar más utilizado para comunicar sensores y dispositivos IoT con bajo ancho de banda?',
    opciones: ['FTP', 'MQTT', 'SMTP', 'POP3'],
    correcta: 1,
    explicacion: 'MQTT (Message Queuing Telemetry Transport) está diseñado para dispositivos con recursos limitados y redes inestables mediante un broker central al que los nodos publican y se suscriben a topics.',
  },
  {
    tema: 4,
    enunciado: 'Dentro de la Inteligencia Artificial, ¿cuál es la diferencia entre el aprendizaje supervisado y el no supervisado en Machine Learning?',
    opciones: [
      'El supervisado se entrena con datos etiquetados (conociendo la respuesta esperada); el no supervisado busca patrones o agrupaciones (clustering) en datos sin etiquetar',
      'El supervisado exige que un técnico mire la pantalla mientras se ejecuta el bucle',
      'El no supervisado no utiliza ningún dato de entrada',
      'Solo el aprendizaje no supervisado puede ejecutarse en tarjetas gráficas',
    ],
    correcta: 0,
    explicacion: 'En aprendizaje supervisado (clasificación, regresión) el modelo aprende a partir de pares entrada-etiqueta; en el no supervisado descubre estructuras ocultas o segmentos por sí mismo.',
  },
  {
    tema: 2,
    enunciado: '¿Para qué se utiliza la tecnología RPA (Robotic Process Automation) en la digitalización de una empresa?',
    opciones: [
      'Para soldar chasis de automóviles con brazos mecánicos pesados',
      'Para automatizar mediante robots de software tareas administrativas repetitivas y basadas en reglas (como leer facturas, cruzar datos entre ERP y CRM o rellenar formularios)',
      'Para sustituir el cableado de red por Wi-Fi',
      'Para diseñar logotipos vectoriales',
    ],
    correcta: 1,
    explicacion: 'Los bots de RPA interactúan con las interfaces o APIs de las aplicaciones corporativas para liberar a las personas de tareas mecánicas de alto volumen y propensas a errores.',
  },
  {
    tema: 2,
    enunciado: '¿Qué propiedad fundamental aporta la tecnología Blockchain (cadena de bloques) a la trazabilidad logística o a los contratos inteligentes (Smart Contracts)?',
    opciones: [
      'Un registro distribuido, descentralizado e inmutable donde las transacciones quedan enlazadas criptográficamente sin depender de un único intermediario central',
      'Una base de datos en la que cualquier usuario anónimo puede borrar filas antiguas sin dejar rastro',
      'Compresión gratuita de archivos de vídeo en alta definición',
      'Aumento de la velocidad del reloj de la CPU local',
    ],
    correcta: 0,
    explicacion: 'Cada bloque contiene el hash criptográfico del bloque anterior; alterar un registro pasado invalidaría toda la cadena posterior en los nodos de la red.',
  },
  {
    tema: 5,
    enunciado: 'En ciberseguridad aplicada a entornos digitalizados, ¿qué principio define a una arquitectura «Zero Trust» (Confianza Cero)?',
    opciones: [
      'Confiar por defecto en cualquier dispositivo que esté conectado dentro de la red Wi-Fi de la oficina',
      '«Nunca confiar, siempre verificar»: autenticar, autorizar y validar continuamente a cada usuario y dispositivo, esté dentro o fuera del perímetro de la red',
      'Prohibir el uso de contraseñas para que el acceso sea más rápido',
      'Dar permisos de administrador (root) a todos los empleados desde el primer día',
    ],
    correcta: 1,
    explicacion: 'Zero Trust elimina la confianza implícita por ubicación de red y aplica el principio de mínimo privilegio, autenticación multifactor (MFA) y microsegmentación.',
  },
  {
    tema: 2,
    enunciado: '¿Cuál es la diferencia entre Realidad Virtual (VR) y Realidad Aumentada (AR) en aplicaciones industriales y formativas?',
    opciones: [
      'La VR sumerge completamente al usuario en un entorno 100 % digital simulado; la AR superpone elementos digitales (indicaciones, esquemas 3D) sobre la visión del mundo físico real',
      'La AR requiere estar totalmente a oscuras y la VR solo funciona en papel impreso',
      'Son exactamente la misma tecnología',
      'La VR no utiliza pantallas ni visores',
    ],
    correcta: 0,
    explicacion: 'En mantenimiento industrial, unas gafas o tablet de Realidad Aumentada permiten ver sobre la propia máquina real qué pieza desmontar y a qué par de apriete.',
  },
  {
    tema: 5,
    enunciado: 'En una arquitectura de datos moderna, ¿qué diferencia hay entre un «Data Warehouse» y un «Data Lake»?',
    opciones: [
      'El Data Warehouse almacena datos estructurados y procesados listos para análisis BI; el Data Lake almacena datos en bruto (estructurados, semiestructurados y no estructurados) en su formato nativo',
      'El Data Lake solo admite tablas relacionales con claves foráneas estrictas',
      'El Data Warehouse solo guarda imágenes y archivos de audio',
      'Un Data Lake es un sistema de refrigeración por agua para servidores',
    ],
    correcta: 0,
    explicacion: 'Hoy en día muchas arquitecturas combinan ambos enfoques en lo que se denomina «Data Lakehouse».',
  },
  {
    tema: 1,
    enunciado: '¿Qué ventaja clave ofrece la tecnología 5G en entornos industriales (Industria 4.0) frente a generaciones móviles anteriores?',
    opciones: [
      'Funciona únicamente por cable coaxial',
      'Baja latencia (del orden de 1 ms en URLLC), alta velocidad y capacidad para conectar masivamente miles de sensores IoT por kilómetro cuadrado',
      'No utiliza ondas electromagnéticas',
      'Sustituye la necesidad de tener bases de datos en las empresas',
    ],
    correcta: 1,
    explicacion: 'El 5G define tres perfiles clave: eMBB (banda ancha móvil mejorada), URLLC (comunicaciones ultra fiables y de baja latencia) y mMTC (comunicaciones masivas tipo máquina para IoT).',
  },
  {
    tema: 4,
    enunciado: '¿Qué es el «mantenimiento predictivo» habilitado por la digitalización?',
    opciones: [
      'Reparar una máquina únicamente después de que se haya roto por completo (correctivo)',
      'Utilizar datos de sensores (vibración, temperatura, consumo) y algoritmos de analítica/IA para anticipar un fallo antes de que ocurra y programar la intervención justo cuando es necesaria',
      'Cambiar todas las piezas de la fábrica cada lunes aunque estén nuevas',
      'Apagar los servidores los fines de semana',
    ],
    correcta: 1,
    explicacion: 'El mantenimiento predictivo reduce las paradas no planificadas respecto al correctivo y evita sustituir componentes aún en buen estado como ocurre a veces en el preventivo fijo.',
  },
  {
    tema: 1,
    enunciado: '¿Qué función cumplen las APIs (Interfaces de Programación de Aplicaciones) en el ecosistema digital de una empresa?',
    opciones: [
      'Impedir que dos programas puedan intercambiar información',
      'Permitir que distintos sistemas y aplicaciones (ERP, CRM, e-commerce, pasarelas de pago, apps móviles) se comuniquen e integren datos de forma estandarizada',
      'Sustituir la fuente de alimentación del servidor',
      'Formatear el disco duro cada vez que se inicia sesión',
    ],
    correcta: 1,
    explicacion: 'Las APIs son el pegamento de la digitalización moderna, evitando los silos de información entre departamentos y plataformas.',
  },
  {
    tema: 5,
    enunciado: '¿En qué consiste un ataque de «Ransomware», uno de los mayores riesgos para las empresas digitalizadas?',
    opciones: [
      'Un fallo eléctrico en la compañía suministradora',
      'Un malware que cifra los archivos o sistemas de la organización y exige el pago de un rescate económico para devolver el acceso (y a menudo para no publicar los datos robados)',
      'Una actualización oficial del navegador web',
      'Un test de velocidad de la conexión de fibra óptica',
    ],
    correcta: 1,
    explicacion: 'La defensa frente al ransomware exige copias de seguridad inmutables y aisladas (regla 3-2-1), parches al día, formación contra phishing y segmentación de red.',
  },
  {
    tema: 6,
    enunciado: '¿Qué son las plataformas «Low-Code / No-Code» dentro de una estrategia de transformación digital?',
    opciones: [
      'Entornos de programación exclusivamente en lenguaje ensamblador y código máquina',
      'Herramientas que permiten crear aplicaciones y automatizar flujos de trabajo mediante interfaces visuales y configuración declarativa reduciendo el código manual',
      'Sistemas operativos que no admiten conexión a Internet',
      'Editores de texto sin resaltado de sintaxis',
    ],
    correcta: 1,
    explicacion: 'Las herramientas Low-Code aceleran la creación de herramientas internas, prototipos y automatizaciones conectadas a bases de datos y APIs corporativas.',
  },
  {
    tema: 5,
    enunciado: '¿Qué mide un KPI (Key Performance Indicator) en un cuadro de mando (dashboard) de Business Intelligence?',
    opciones: [
      'El tamaño en píxeles del logotipo de la empresa',
      'Una métrica cuantificable clave que permite evaluar el grado de cumplimiento de los objetivos estratégicos u operativos del negocio',
      'El código fuente de una hoja de estilos CSS',
      'La dirección MAC de la tarjeta de red del portátil',
    ],
    correcta: 1,
    explicacion: 'Convertir los datos en información accionable mediante KPIs claros en tiempo real permite tomar decisiones basadas en datos (Data-Driven Decision Making).',
  },
  {
    tema: 1,
    enunciado: '¿Qué es un «cobot» (robot colaborativo) en una planta inteligente?',
    opciones: [
      'Un robot diseñado para trabajar de forma segura codo con codo con operarios humanos sin necesidad de jaulas de aislamiento, gracias a sus sensores de fuerza y parada automática',
      'Un virus informático que se propaga por correo electrónico',
      'Un servidor DNS secundario',
      'Un protocolo de cifrado de correo',
    ],
    correcta: 0,
    explicacion: 'Los cobots son una de las Tecnologías Habilitadoras Digitales (THD) clave de la Industria 4.0 y 5.0, combinando la precisión robótica con la destreza y criterio de las personas.',
  },

  // --- Nuevas preguntas (21..30) para cubrir las 6 Unidades de la Hoja de Ruta ---
  {
    tema: 3,
    enunciado: 'En la Unidad 3 (La nube y el borde), ¿cómo funciona una CDN (Content Delivery Network) y qué efecto tiene sobre una aplicación web?',
    opciones: [
      'Distribuye copias en caché de los recursos (imágenes, CSS, JS, vídeo) en servidores repartidos geográficamente para servirlos desde el nodo más cercano al usuario, reduciendo la latencia y la carga del servidor origen',
      'Obliga a que todas las peticiones viajen a un único ordenador sin conexión a internet',
      'Traduce automáticamente el código PHP a lenguaje ensamblador',
      'Elimina la necesidad de tener un nombre de dominio DNS',
    ],
    correcta: 0,
    explicacion: 'Una CDN acerca el contenido al borde de la red (Edge), acelerando drásticamente el tiempo de carga y absorbiendo picos de tráfico.',
  },
  {
    tema: 3,
    enunciado: 'En el continuo de computación desde el dispositivo físico hasta el centro de datos central, ¿cuál es el orden correcto desde el extremo más cercano al sensor hasta el más lejano?',
    opciones: [
      'Mist Computing (en el propio sensor/microcontrolador) → Fog Computing (nodos en la red local/planta) → Edge Computing (borde de red próximo) → Cloud Computing (centro de datos remoto)',
      'Cloud Computing → Mist Computing → Cinta magnética → Papel',
      'HTML → CSS → SQL → BIOS',
      'Todos se ejecutan exclusivamente dentro del navegador del cliente',
    ],
    correcta: 0,
    explicacion: 'El continuo Mist → Fog → Edge → Cloud permite filtrar y procesar datos en tiempo real cerca del origen y enviar a la nube central solo la información agregada o histórica.',
  },
  {
    tema: 3,
    enunciado: '¿Qué diferencia a una arquitectura de «nube híbrida» frente a una nube pública o privada pura?',
    opciones: [
      'Combina infraestructura privada (propia o dedicada para datos/sistemas críticos) con servicios de nube pública conectados entre sí, permitiendo mover cargas o absorber picos de demanda',
      'Utiliza únicamente ordenadores analógicos sin red',
      'Es una nube pública donde no existe ningún mecanismo de autenticación',
      'Impide usar contenedores o máquinas virtuales',
    ],
    correcta: 0,
    explicacion: 'La nube híbrida permite mantener datos regulados o sistemas heredados en entorno privado mientras se aprovecha la elasticidad de la nube pública.',
  },
  {
    tema: 4,
    enunciado: 'En la Unidad 4 (IA aplicada al desarrollo web), ¿qué diferencia hay entre «automatizar» y «optimizar» un proceso?',
    opciones: [
      'Automatizar consiste en que un sistema ejecute pasos repetitivos siguiendo reglas fijas sin intervención manual; optimizar consiste en analizar datos para encontrar la mejor decisión o ajuste que maximice un resultado',
      'Automatizar requiere siempre IA generativa y optimizar se hace a mano en papel',
      'Son dos términos idénticos',
      'Optimizar significa borrar las pruebas automáticas del proyecto',
    ],
    correcta: 0,
    explicacion: 'Un script de despliegue automatiza una tarea fija; un modelo que ajusta dinámicamente recursos o recomendaciones según el comportamiento real optimiza el resultado.',
  },
  {
    tema: 4,
    enunciado: '¿Cuáles son los principales riesgos y límites al usar IA generativa en un estudio de desarrollo web que obligan a mantener siempre un circuito de revisión humana?',
    opciones: [
      'La invención plausible de datos o APIs inexistentes (alucinaciones), los sesgos heredados de los datos de entrenamiento, las dudas de propiedad intelectual y la introducción de vulnerabilidades en el código generado',
      'Que la IA generativa se niega a escribir código en horario de tarde',
      'Que el código generado por IA nunca compila en ningún lenguaje',
      'Que los modelos de IA solo entienden código binario de 8 bits',
    ],
    correcta: 0,
    explicacion: 'La IA generativa acelera borradores y código, pero el profesional es siempre responsable de verificar su exactitud, seguridad, autoría y ausencia de sesgos antes de publicar.',
  },
  {
    tema: 4,
    enunciado: '¿Qué obligación de transparencia establece el Reglamento Europeo de Inteligencia Artificial — Reglamento (UE) 2024/1689 (AI Act) para sistemas que interactúan con usuarios (como chatbots) o generan contenido sintético?',
    opciones: [
      'Informar de manera clara y visible a las personas usuarias de que están interactuando con un sistema de IA o ante contenido generado/manipulado artificialmente',
      'Prohibir el uso de hojas de estilo CSS en la Unión Europea',
      'Obligar a publicar las contraseñas de todos los usuarios en el repositorio Git',
      'Exigir que todas las webs funcionen sin base de datos',
    ],
    correcta: 0,
    explicacion: 'El Reglamento (UE) 2024/1689 clasifica los sistemas de IA por nivel de riesgo e impone deberes expresos de transparencia cuando una persona interactúa con IA o consume contenido generado.',
  },
  {
    tema: 6,
    enunciado: 'En la Unidad 6 (Proyecto de transformación digital), ¿por qué fracasa un proyecto cuya única justificación es «porque hay que modernizarse»?',
    opciones: [
      'Porque la digitalización debe estar siempre alineada al servicio de objetivos concretos del negocio (reducir plazos o costes, captar o retener clientes, abrir una línea de servicio) y medirse con indicadores',
      'Porque las empresas pequeñas tienen prohibido usar herramientas digitales',
      'Porque solo se puede digitalizar una empresa cambiando su logotipo',
      'Porque la tecnología nunca mejora la productividad',
    ],
    correcta: 0,
    explicacion: 'Adoptar herramientas sin un objetivo de negocio claro genera gasto, rechazo del equipo y herramientas infrautilizadas.',
  },
  {
    tema: 6,
    enunciado: 'Tras diagnosticar la madurez digital de una empresa, ¿qué dos criterios se cruzan en una matriz de priorización para decidir por qué iniciativa empezar?',
    opciones: [
      'El impacto esperado en los objetivos del negocio frente al esfuerzo (coste, tiempo y complejidad) necesario para implantarla',
      'El orden alfabético del nombre del proveedor y el color de su icono',
      'Únicamente el tamaño en megabytes del instalador',
      'Elegir siempre primero la iniciativa más cara y larga aunque aporte poco valor',
    ],
    correcta: 0,
    explicacion: 'Empezar por iniciativas de alto impacto y esfuerzo asumible (quick wins) genera retorno rápido y confianza en el equipo para abordar fases más complejas.',
  },
  {
    tema: 6,
    enunciado: 'En el documento de un proyecto de transformación digital, ¿por qué el apartado de «Alcance» debe especificar explícitamente tanto lo que entra como lo que queda fuera?',
    opciones: [
      'Para acotar las expectativas, evitar que el proyecto crezca sin control (scope creep) y asegurar que los plazos y el presupuesto sean realistas',
      'Para rellenar más páginas en el archivo PDF',
      'Porque la ley prohíbe hacer proyectos de menos de diez años',
      'Para ocultar a los responsables qué tareas tienen asignadas',
    ],
    correcta: 0,
    explicacion: 'Definir qué queda fuera de una fase es tan importante como definir qué entra: evita desviaciones interminables de calendario y presupuesto.',
  },
  {
    tema: 6,
    enunciado: '¿Por qué es imprescindible incluir un plan de formación y «gestión del cambio» para las personas afectadas en un proyecto de transformación digital?',
    opciones: [
      'Porque el éxito del proyecto depende de que el equipo adopte realmente los nuevos procesos y herramientas en su trabajo diario sin bloqueo ni desconfianza',
      'Porque basta con comprar licencias caras para que todo el mundo sepa usarlas sin formación',
      'Porque la transformación digital consiste en despedir a todos los departamentos técnicos',
      'Porque la formación sustituye a las copias de seguridad de la base de datos',
    ],
    correcta: 0,
    explicacion: 'La mayor barrera en la transformación digital no suele ser técnica sino cultural y organizativa; formar y acompañar a las personas garantiza la adopción real.',
  },
];
