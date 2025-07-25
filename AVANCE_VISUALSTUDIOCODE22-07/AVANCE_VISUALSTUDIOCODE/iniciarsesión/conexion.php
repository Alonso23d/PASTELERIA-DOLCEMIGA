<?php
$host = "localhost";
$dbname = "pasteleria";
$user = "root";
$pass = "";

try {
    $conexion = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $conexion; // ⬅️ RETORNAMOS LA CONEXIÓN
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?>
