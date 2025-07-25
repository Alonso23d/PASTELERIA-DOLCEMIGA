PASOS PARA EJECUTAR EL PROYECTO:

Instalar y Configurar XAMPP: Asegúrate de tener XAMPP instalado en tu máquina. Si no lo tienes, descárgalo e instálalo desde XAMPP.
Una vez instalado, abre el Panel de Control de XAMPP y ejecuta los servicios de Apache (para el servidor web) y MySQL (para la base de datos).

Configurar la Base de Datos en MySQL: Abre tu navegador y accede a phpMyAdmin desde http://localhost/phpmyadmin/.
Crea una nueva base de datos para tu proyecto. En la página principal de phpMyAdmin:

Haz clic en Nueva.

Escribe un nombre para tu base de datos (por ejemplo, pasteleria).

Haz clic en Crear.

Crear la Tabla usuarios: Con la base de datos pasteleria seleccionada en phpMyAdmin, ve a la pestaña SQL.
Pega el siguiente código SQL para crear la tabla usuarios: CREATE TABLE usuarios ( id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(100) NOT NULL, usuario VARCHAR(50) NOT NULL UNIQUE, contrasena VARCHAR(250) NOT NULL ); Haz clic en Ejecutar para insertar los datos en la tabla.

Configurar tu Proyecto en Visual Studio Code: Abre Visual Studio Code.

Abre la carpeta de tu proyecto de pastelería en Visual Studio Code.

Si tienes archivos PHP que manejan la base de datos, asegúrate de tener el archivo db.php (o similar) para establecer la conexión a la base de datos MySQL.

Ubicar el Proyecto en la Carpeta Correcta de XAMPP: Coloca tu proyecto dentro de la carpeta htdocs en el directorio de instalación de XAMPP. La ruta típica es:

C:\xampp\htdocs\

Asegúrate de que tu proyecto esté dentro de esta carpeta para que sea accesible a través de tu servidor web local.

Probar la Conexión: En tu navegador, accede al archivo PHP que contiene la conexión: http://localhost/AVANCE_VISUALSTUDIOCODE22-07/AVANCE_VISUALSTUDIOCODE22-07/AVANCE_VISUALSTUDIOCODE/iniciarsesi%C3%B3n/iniciarsesi%C3%B3n.html Si todo está correcto, deberías ver el mensaje "Conectado exitosamente". Si aparece un error, revisa la configuración de la base de datos y el archivo de conexión.

LISTO, AHORA PODRAS EJECUTAR EL PROYECTO

NOMBRE DEL PROYECTO Dolce Miga - Página Web de Pastelería 🍰

Este proyecto consiste en el desarrollo de una pagina web interactiva para la pastelería Dolce Miga, utilizando tecnologías web como HTML, CSS y JavaScript. El objetivo es crear una plataforma en línea donde los usuarios puedan explorar productos, realizar compras, iniciar sesión y gestionar su carrito de compras de forma sencilla y eficiente.

CARACTERISTICAS DEL PROYECTO: Estructura de Páginas 📄: La web incluye páginas clave como inicio, carrito de compras, y formularios de inicio de sesión.

Diseño Responsivo 📱💻: Implementación de un diseño responsivo para garantizar una experiencia de usuario fluida en dispositivos móviles, tabletas y computadoras de escritorio.

Interactividad 🎮: Uso de JavaScript para crear una experiencia interactiva, permitiendo la gestión del carrito de compras, actualización dinámica de productos y navegación entre categorías.

Optimización de Rendimiento ⚡: Se ha optimizado el rendimiento del sitio con imágenes comprimidas y archivos CSS/JS minificados, reduciendo los tiempos de carga y mejorando la velocidad de navegación.

Funcionalidades del Carrito de Compras 🛒: Los usuarios pueden agregar, quitar y modificar productos dentro del carrito de compras en tiempo real, facilitando la compra de productos.

Seguridad 🔒: Implementación básica de seguridad para el formulario de inicio de sesión (con validación de datos).

TECNOLOGIAS USADAS: HTML 📑: Estructura básica de las páginas web.

CSS 🎨: Estilos y diseño visual del sitio.

JavaScript ⚙️: Funcionalidades interactivas, como la gestión del carrito y el inicio de sesión.
