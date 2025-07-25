<?php
require_once 'conexion.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST['usuario'];
    $contrasena = $_POST['contrasena'];

    $sql = "SELECT * FROM usuarios WHERE usuario = :usuario";
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':usuario', $usuario);
    $stmt->execute();

    $usuarioEncontrado = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usuarioEncontrado && password_verify($contrasena, $usuarioEncontrado['contrasena'])) {
        $_SESSION['usuario'] = $usuarioEncontrado['usuario'];
        $_SESSION['nombre'] = $usuarioEncontrado['nombre'];
        echo $usuarioEncontrado['nombre']; // <<< RETORNA EL NOMBRE REAL
    } else {
        echo "ERROR";
    }
}
?>

