<?php
require_once("../vendor/autoload.php");

$dotenv = Dotenv\Dotenv::createImmutable("../");
$dotenv->load();

$host = $_ENV["HOST_BD"];
$nome = $_ENV["NOME_BD"];
$usuario = $_ENV["USUARIO_BD"];
$senha = $_ENV["SENHA_BD"];

$banco = new PDO("mysql:host=$host;dbname=$nome", "$usuario", "$senha");
?>