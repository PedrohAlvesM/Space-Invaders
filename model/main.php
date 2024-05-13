<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once("../vendor/autoload.php");

$dotenv = Dotenv\Dotenv::createImmutable("../");
$dotenv->load();

session_start();

function TokenValido($token) {
    $chave = $_ENV["CHAVE_CRIPTOGRAFIA"];
    $algoritmo = $_ENV["ALGORITMO_CRIPTOGRAFIA"];

    if (!isset($token)) {
        header('Content-Type: application/json');
        http_response_code(401);
        echo json_encode(array("erro" => "Token não foi recebido. Acesso negado."));
        return false;
    } 
    else if ($token !== $_COOKIE["TOKEN"]) {
        header('Content-Type: application/json');
        http_response_code(401);
        echo json_encode(array("erro" => "Token recebido não corresponde ao necessário. Acesso negado."));
        return false;
    }

    try {
        $expirado = JWT::decode($token, new Key($chave, $algoritmo));
    } catch (Exception $e) {
        if ($e->getMessage() === "Expired Token") {
            header('Content-Type: application/json');
            http_response_code(401);
            echo json_encode(array("erro" => "Token recebido foi expirado. Acesso negado."));
        }
        return false;
    }

    return true;
}

function CriarToken() {
    $chave = $_ENV["CHAVE_CRIPTOGRAFIA"];
    $algoritmo = $_ENV["ALGORITMO_CRIPTOGRAFIA"];

    $data = new DateTimeImmutable();
    $dataExpirar = $data->modify('+1 hour')->getTimestamp();

    $request_data = [
        'iat'  => $data->getTimestamp(),
        'nbf'  => $data->getTimestamp(),
        'exp'  => $dataExpirar,
    ];

    return JWT::encode($request_data, $chave, $algoritmo);
}
