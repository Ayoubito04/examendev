# DAW - PROMETEO by thePower
## Despliegue de aplicaciones web
### Conoce los objetivos de la asignatura

---

## UNIDAD 1: IMPLANTACIÓN DE ARQUITECTURAS WEB

### Resumen general de la unidad
Ya sabes construir aplicaciones web; ahora aprenderás a ponerlas en funcionamiento en un servidor para que estén disponibles en Internet. Eso es el despliegue: preparar la infraestructura, instalar y configurar los servidores, subir la aplicación y verificar que funciona de forma segura. Es la última etapa antes de que los usuarios usen el producto, y una competencia muy valorada, en la frontera entre el desarrollo y la administración de sistemas (DevOps).

### Temas y objetivos

#### 1.1. Arquitecturas web y el servidor web
Una arquitectura web describe cómo se organizan las piezas de una aplicación. La más común es la de tres capas: presentación (cliente), lógica (servidor de aplicaciones) y datos (base de datos), a menudo repartidas en varios servidores para escalar y ganar seguridad.
* **Objetivos:**
  * Analizar las arquitecturas web, sus características, ventajas e inconvenientes.
  * Describir los fundamentos y protocolos del funcionamiento de un servidor web.

#### 1.2. Instalación, pruebas y documentación
La instalación puede hacerse directamente en el sistema (con el gestor de paquetes) o, mejor, con contenedores, que evitan "en mi máquina funciona": un archivo describe todo el entorno y lo levanta igual en desarrollo y en producción.
* **Objetivos:**
  * Instalar y configurar servidores web y de aplicaciones.
  * Usar tecnologías de virtualización de servidores.

#### 1.3. El protocolo HTTP por dentro
Todo el despliegue gira alrededor de un diálogo muy simple: el cliente pide y el servidor responde. Conocer ese diálogo con detalle no es teoría: es lo que permite entender por qué una página devuelve un error, por qué el navegador guarda una versión antigua en caché o por qué una redirección deja al usuario dando vueltas.
* **Objetivos:**
  * Analizar la estructura y los recursos de una aplicación web y sus requerimientos.
  * Realizar pruebas de funcionamiento y documentar el proceso.

#### 1.4. Instalación y configuración básica de los servidores
El currículo pide instalar y configurar servidores web y de aplicaciones. Aunque el trabajo diario se haga después con contenedores, hay que saber hacerlo sobre el sistema: es lo que permite entender qué hay dentro de la imagen y depurar cuando algo falla.
* **Objetivos:**
  * Interpretar los métodos, los códigos de estado y las cabeceras del protocolo HTTP.

#### 1.5. Virtualización, contenedores y nube
Una máquina virtual emula un ordenador completo: sobre el equipo físico corre un hipervisor (tipo 1 si va directamente sobre el hardware, como Proxmox o ESXi; tipo 2 si va sobre un sistema operativo, como VirtualBox) y cada máquina virtual lleva su propio núcleo y su sistema operativo entero. Eso da un aislamiento muy fuerte, pero cuesta gigabytes de disco y minutos de arranque.
* **Objetivos:**
  * Distinguir las máquinas virtuales de los contenedores y los modelos de servicio en la nube.

#### 1.6. La aplicación: estructura, requisitos y documentación
Antes de tocar el servidor hay que mirar dentro de la aplicación. Una aplicación web moderna separa el directorio público (lo único que el servidor web debe exponer: el archivo de entrada, las hojas de estilo, los scripts y las imágenes) del código fuente, la configuración, las dependencias descargadas y los archivos generados (registros, caché, subidas de usuarios).
* **Objetivos:**
  * Levantar un entorno completo con Docker Compose y comprobar su estado.

---

## UNIDAD 2: DESPLIEGUE EN SERVIDORES WEB

### Resumen general de la unidad
Con la infraestructura preparada, toca desplegar la aplicación en el servidor web y configurarlo para que funcione de forma segura. Aquí es donde la aplicación pasa de "funciona en mi ordenador" a estar publicada en Internet, con un dominio, cifrado HTTPS y las medidas de seguridad adecuadas.

### Temas y objetivos

#### 2.1. Administración del servidor web
Un servidor web se administra mediante sus archivos de configuración, donde se ajustan parámetros como el puerto, el directorio raíz, los tipos de contenido o los límites. Su funcionalidad se amplía con módulos que se activan según se necesiten:
* **Objetivos:**
  * Reconocer los parámetros de administración más importantes del servidor web.
  * Ampliar la funcionalidad del servidor activando y configurando módulos.

#### 2.2. Seguridad, contenedores y logs
Hoy toda aplicación debe servirse por HTTPS, que cifra la comunicación entre el cliente y el servidor con un certificado digital. Los certificados gratuitos de Let's Encrypt se obtienen e instalan de forma automática con Certbot:
* **Objetivos:**
  * Crear y configurar sitios virtuales.
  * Configurar la autenticación y el control de acceso del servidor.

#### 2.3. Autenticación y control de acceso
No todo lo que hay en un servidor debe ser público. Un panel de administración, un entorno de preproducción o una carpeta de informes necesitan una barrera, y el servidor web puede ponerla antes incluso de que la petición llegue a la aplicación. Es una defensa barata y muy eficaz: si el código nunca se ejecuta, sus fallos tampoco se explotan.
* **Objetivos:**
  * Obtener e instalar certificados digitales y asegurar las comunicaciones (HTTPS).
  * Desplegar en contenedores y en la nube y gestionar los logs.

#### 2.4. Certificados y HTTPS en profundidad
Un certificado digital es un archivo que asocia un nombre de dominio con una clave pública y está firmado por una autoridad de certificación (CA). El navegador confía en un conjunto de autoridades raíz que trae instaladas; el certificado del sitio suele estar firmado por una autoridad intermedia, que a su vez firma la raíz. Esa secuencia es la cadena de confianza, y el servidor tiene que enviarla completa.
* **Objetivos:**
  * Proteger rutas con autenticación básica y control de acceso por dirección.

#### 2.5. Poner la aplicación en el servidor web
Con el sitio virtual y el certificado listos queda el trabajo menos vistoso y más delicado: colocar los archivos con los permisos correctos. La regla es sencilla de enunciar y fácil de incumplir: el servidor web debe poder leer todo el proyecto y escribir únicamente en los directorios que lo necesitan (caché, registros, subidas).
* **Objetivos:**
  * Ajustar permisos, reescritura de URL y raíz del sitio para publicar la aplicación.

#### 2.6. Registros, rotación y observabilidad
El servidor web escribe dos registros distintos y confundirlos hace perder tiempo. El de acceso anota una línea por petición atendida (quién, cuándo, qué pidió, con qué código respondió y cuántos bytes se enviaron). El de error recoge lo que ha ido mal en el propio servidor: configuraciones rechazadas, permisos denegados, tiempos agotados esperando al intérprete. Cuando una página devuelve 502, la explicación está en el registro de errores.
* **Objetivos:**
  * Leer, rotar y centralizar los registros del servidor web.

---

## UNIDAD 3: DESPLIEGUE EN SERVIDORES DE APLICACIONES

### Resumen general de la unidad
El servidor web entrega el contenido, pero quien ejecuta la lógica de la aplicación es el servidor de aplicaciones (o el intérprete del lenguaje). Según la tecnología, será PHP-FPM, un servidor Node.js, Tomcat (Java) o Gunicorn (Python). Desplegar bien una aplicación exige configurar ese servidor de aplicaciones y hacer que coopere con el servidor web.

### Temas y objetivos

#### 3.1. Servidores de aplicaciones
Un servidor de aplicaciones proporciona el entorno donde se ejecuta el código de la aplicación y los servicios que necesita. Sus componentes y su configuración dependen de la tecnología:
* **Objetivos:**
  * Describir los componentes y servicios de un servidor de aplicaciones.
  * Identificar sus archivos de configuración y bibliotecas compartidas.

#### 3.2. Despliegue, rendimiento y nube
Desplegar una aplicación implica ajustar el servidor a sus necesidades: número de procesos o hilos, variables de entorno, permisos de archivos y conexión a la base de datos. En aplicaciones Node se usan gestores de procesos como PM2, que mantienen la aplicación viva y la reinician si falla:
* **Objetivos:**
  * Configurar el servidor de aplicaciones para cooperar con el servidor web.
  * Activar los mecanismos de seguridad y usar sus componentes web.

#### 3.3. PHP-FPM: configuración y ajuste
PHP-FPM (FastCGI Process Manager) es el servidor de aplicaciones de PHP, y el más probable en un primer despliegue profesional. Su funcionamiento es sencillo: mantiene un conjunto de procesos hijo esperando trabajo; cuando el servidor web le pasa una petición por FastCGI, uno de esos procesos ejecuta el script y devuelve la salida. Todo el ajuste consiste en decidir cuántos procesos hay, cuánto pueden consumir y cuánto tiempo pueden tardar.
* **Objetivos:**
  * Desplegar aplicaciones y realizar pruebas de funcionamiento y rendimiento.
  * Usar la virtualización en la nube y documentar la administración.

#### 3.4. Tomcat: arquitectura, despliegue y dominios de seguridad
Tomcat es el servidor de aplicaciones de referencia en el mundo Java y el ejemplo más claro de servidor de aplicaciones «completo»: no se limita a ejecutar código, sino que ofrece servicios —gestión del ciclo de vida de las aplicaciones, sesiones, seguridad declarativa, agrupación de conexiones a la base de datos— que la aplicación consume sin programarlos.
* **Objetivos:**
  * Ajustar el número de procesos y los límites del intérprete según la carga.

#### 3.5. Administración de sesiones
HTTP no recuerda nada entre una petición y la siguiente. La sesión es el mecanismo que resuelve ese olvido: el servidor guarda los datos del usuario (quién es, qué lleva en el carrito) asociados a un identificador, y envía ese identificador al navegador en una cookie —`PHPSESSID` en PHP, `JSESSIONID` en Java— que vuelve en cada petición.
* **Objetivos:**
  * Configurar la autenticación mediante dominios de seguridad y administrar las sesiones.

#### 3.6. Node.js en producción, pruebas y rendimiento
Una aplicación Node es su propio servidor y muere si el proceso termina. Lanzarla con `node server.js` en una terminal sirve para desarrollar; en producción hace falta un supervisor que la reinicie si se cae y la arranque al encender la máquina. Hay dos caminos válidos.
* **Objetivos:**
  * Desplegar artefactos en el servidor de aplicaciones y mantenerlo vivo con un supervisor.

---

## UNIDAD 4: SERVIDORES DE TRANSFERENCIA DE ARCHIVOS

### Resumen general de la unidad
Para desplegar y mantener una aplicación hay que subir archivos al servidor: el código, las imágenes, las actualizaciones. El mecanismo clásico para ello es un servidor de transferencia de archivos (FTP y sus variantes seguras). Aunque hoy conviven con métodos más modernos (que verás en la última unidad, con Git y despliegue automático), siguen siendo una herramienta habitual y forman parte de la administración de servidores.

### Temas y objetivos

#### 4.1. Servidores de transferencia de archivos
Un servidor de transferencia de archivos permite subir y descargar archivos de forma remota. En Linux hay dos caminos: instalar un servidor FTP como vsftpd, que se ve en el punto 4, o —preferible siempre que se pueda— aprovechar el subsistema SFTP que ya trae OpenSSH, que no exige instalar nada nuevo y viaja cifrado desde el primer byte.
* **Objetivos:**
  * Instalar y configurar servidores de transferencia de archivos.
  * Crear usuarios y grupos para el acceso remoto al servidor.

#### 4.2. Transferencia segura e integración
El FTP tradicional envía las credenciales y los datos sin cifrar, por lo que no debe usarse en Internet. En su lugar se usan los protocolos seguros:
* **Objetivos:**
  * Comprobar el acceso en modo activo y pasivo.
  * Realizar pruebas con clientes de línea de comandos y gráficos.

#### 4.3. Modos de conexión y cortafuegos
El FTP clásico es un protocolo peculiar: usa dos conexiones. Una de mando, por el puerto 21, por la que viajan las órdenes y las respuestas, y otra de datos, que se abre y se cierra para cada listado o cada archivo. Quién abre esa segunda conexión es lo que distingue los dos modos.
* **Objetivos:**
  * Utilizar el protocolo seguro de transferencia de archivos.
  * Usar los servicios de transferencia integrados y la virtualización, y documentar.

#### 4.4. FTPS con vsftpd
Cuando hay que dar servicio a clientes que solo hablan FTP —equipos antiguos, procesos automáticos de terceros— la opción responsable no es abrir FTP en claro, sino FTPS: el mismo protocolo cifrado con TLS. El servidor más extendido en Linux para esto es vsftpd.
* **Objetivos:**
  * Encerrar a un usuario en su carpeta con la configuración de chroot de OpenSSH.

#### 4.5. Clientes, claves y automatización
El cliente `sftp` es interactivo y suficiente para el trabajo manual. `scp` copia de una sola orden, sin sesión, y encaja bien en guiones. `lftp` es el más completo de los tres: entiende FTP, FTPS y SFTP, y sabe sincronizar directorios enteros.
* **Objetivos:**
  * Abrir en el cortafuegos los puertos que el servicio necesita sin perder el acceso al servidor.

#### 4.6. La transferencia dentro del despliegue
Para publicar una aplicación, subir todos los archivos cada vez es lento e inseguro: durante la copia el sitio queda a medias. `rsync` compara origen y destino y transfiere solo las diferencias, viajando por SSH, lo que reduce el despliegue de minutos a segundos:
* **Objetivos:**
  * Automatizar la subida de la aplicación con claves SSH y sincronización incremental.

---

## UNIDAD 5: VERIFICACIÓN Y SERVICIOS DE RED

### Resumen general de la unidad
Para que una aplicación desplegada funcione de verdad para los usuarios, no basta con el servidor: intervienen servicios de red que hay que configurar y verificar. El principal es el DNS, que traduce el nombre de dominio (`miapp.com`) a la dirección del servidor; sin él, nadie encontraría la aplicación por su nombre. Otro es el servicio de directorio (LDAP / Active Directory), que centraliza los usuarios y la autenticación en organizaciones.

### Temas y objetivos

#### 5.1. DNS: el sistema de nombres
El DNS (Domain Name System) es un sistema jerárquico que traduce nombres de dominio en direcciones IP. Su estructura va del dominio raíz a los dominios de primer nivel (`.com`, `.es`), los dominios registrados (`miapp`) y los subdominios (`www`).
* **Objetivos:**
  * Describir la estructura y el funcionamiento del sistema de nombres de dominio (DNS).
  * Identificar las necesidades de configuración del servidor de nombres.

#### 5.2. Servicios de directorio y verificación
Un servicio de directorio (LDAP, o Active Directory en Windows) almacena de forma centralizada la información de una organización: usuarios, grupos, permisos y recursos, en una estructura lógica en árbol.
* **Objetivos:**
  * Reconocer la función y la estructura de un servicio de directorio.
  * Analizar el servicio de directorio como mecanismo de autenticación centralizada.

#### 5.3. El proceso de resolución y los resolutores
Detrás de la frase «el DNS traduce nombres en direcciones» hay un reparto de papeles que conviene distinguir, porque cada uno falla de una manera. El resolutor es el servidor al que pregunta el equipo del usuario (el del proveedor de Internet, el del centro, o uno público como `1.1.1.1`); es recursivo, es decir, se encarga de hacer todas las consultas necesarias hasta tener la respuesta. Los servidores autoritativos son los que guardan de verdad los datos de una zona y responden con autoridad sobre ella.
* **Objetivos:**
  * Verificar la ejecución de la aplicación comprobando los servicios de red.
  * Documentar las adaptaciones realizadas y usar la virtualización en la nube.

#### 5.4. Registros y zonas del despliegue
Una zona es el conjunto de registros de un dominio. Para publicar una aplicación no hacen falta todos, pero sí saber qué hace cada uno:
* **Objetivos:**
  * Seguir el proceso de resolución de un nombre y diagnosticarlo con herramientas de consulta.

#### 5.5. El servicio de directorio
Un servicio de directorio es una base de datos especializada en consultas: se lee muchísimo y se escribe poco. Su información se organiza en un árbol (DIT) cuyas ramas suelen reflejar la estructura de la organización. Cada nodo es una entrada con un nombre único, el DN (*Distinguished Name*), que no es un identificador arbitrario sino la ruta completa desde la entrada hasta la raíz del árbol.
* **Objetivos:**
  * Redactar los registros de una zona y planificar un cambio de servidor sin cortes.

#### 5.6. Autenticar la aplicación contra el directorio
Validar a un usuario contra LDAP consiste en intentar una operación de `bind` con su DN y su contraseña: si el servidor la acepta, las credenciales son correctas. El error de principiante es construir ese DN concatenando texto, del tipo `'uid=' + usuario + ',ou=usuarios,dc=...'`. Funciona en el laboratorio y se rompe en cuanto la organización real tiene a las personas repartidas en varias ramas.
* **Objetivos:**
  * Configurar la autenticación de la aplicación contra un servicio de directorio.

---

## UNIDAD 6: DOCUMENTACIÓN, CONTROL DE VERSIONES E INTEGRACIÓN CONTINUA

### Resumen general de la unidad
Cierras el módulo de despliegue con las prácticas que profesionalizan el desarrollo y la puesta en producción: documentar bien, controlar el código con Git y automatizar la entrega con integración continua (CI/CD). Son la base de la cultura DevOps, que une desarrollo y operaciones para entregar software con rapidez y calidad.

### Temas y objetivos

#### 6.1. Documentación y control de versiones
La documentación se genera y mantiene con herramientas específicas, en varios formatos:
* **Objetivos:**
  * Identificar y usar herramientas de generación de documentación.
  * Documentar los componentes software en distintos formatos y de forma colaborativa.

#### 6.2. Integración y despliegue continuos (CI/CD)
La integración continua (CI) consiste en que, cada vez que se sube código al repositorio, un sistema automático lo compila y prueba; si algo falla, avisa enseguida. El despliegue continuo (CD) va más allá: si las pruebas pasan, despliega la aplicación automáticamente.
* **Objetivos:**
  * Instalar, configurar y utilizar un sistema de control de versiones.
  * Garantizar la accesibilidad y seguridad del código almacenado.

#### 6.3. Generar y publicar la documentación
La documentación del código se escribe junto al código, en bloques de comentario con un formato reconocible, y una herramienta la extrae y genera un sitio navegable. La ventaja es que vive donde se modifica: si el comentario está al lado de la función, hay alguna posibilidad de que se actualice cuando la función cambie.
* **Objetivos:**
  * Utilizar herramientas de integración continua.
  * Documentar el uso del control de versiones y del proceso de despliegue.

#### 6.4. Git: configuración y operaciones avanzadas
Antes del primer commit hay que decirle a Git quién eres, porque esos datos quedan grabados en cada cambio y después no se pueden corregir sin reescribir el historial:
* **Objetivos:**
  * Publicar un sitio de documentación y describir la API con un formato estándar.
  * Resolver conflictos y usar las operaciones avanzadas del control de versiones.

#### 6.5. Seguridad y accesibilidad del repositorio
El repositorio contiene el activo más valioso del proyecto, así que su acceso se gestiona con los mismos criterios que el de un servidor: visibilidad privada salvo decisión expresa, permisos por persona o por equipo, autenticación en dos pasos obligatoria y acceso por clave SSH o por testigo de duración limitada en lugar de contraseña.
* **Objetivos:**
  * Proteger el repositorio y actuar cuando se filtra un secreto.

#### 6.6. Canalizaciones y métricas de calidad
Una canalización es una secuencia de etapas que se ejecuta automáticamente ante un suceso del repositorio. Las etapas habituales, en este orden, son: obtener el código; preparar el entorno y las dependencias; analizar el estilo y la seguridad;
* **Objetivos:**
  * Vigilar las métricas de calidad del código dentro de la canalización.

---

## Resumen de la distribución de contenidos

| Unidad | Título | Temas principales |
| :--- | :--- | :--- |
| **Unidad 1** | Implantación de arquitecturas web | Arquitecturas web y el servidor web, Instalación, pruebas y documentación, El protocolo HTTP por dentro, Instalación y configuración básica de los servidores, Virtualización, contenedores y nube, La aplicación: estructura, requisitos y documentación |
| **Unidad 2** | Despliegue en servidores web | Administración del servidor web, Seguridad, contenedores y logs, Autenticación y control de acceso, Certificados y HTTPS en profundidad, Poner la aplicación en el servidor web, Registros, rotación y observabilidad |
| **Unidad 3** | Despliegue en servidores de aplicaciones | Servidores de aplicaciones, Despliegue, rendimiento y nube, PHP-FPM: configuración y ajuste, Tomcat: arquitectura, despliegue y dominios de seguridad, Administración de sesiones, Node.js en producción, pruebas y rendimiento |
| **Unidad 4** | Servidores de transferencia de archivos | Servidores de transferencia de archivos, Transferencia segura e integración, Modos de conexión y cortafuegos, FTPS con vsftpd, Clientes, claves y automatización, La transferencia dentro del despliegue |
| **Unidad 5** | Verificación y servicios de red | DNS: el sistema de nombres, Servicios de directorio y verificación, El proceso de resolución y los resolutores, Registros y zonas del despliegue, El servicio de directorio, Autenticar la aplicación contra el directorio |
| **Unidad 6** | Documentación, control de versiones e integración continua | Documentación y control de versiones, Integración y despliegue continuos (CI/CD), Generar y publicar la documentación, Git: configuración y operaciones avanzadas, Seguridad y accesibilidad del repositorio, Canalizaciones y métricas de calidad |