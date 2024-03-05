<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once("../vendor/autoload.php");

session_start();

$CHAVE_CRIPTOGRAFIA = "";
$ALGORITMO_CRIPTOGRAFIA = "";

function TokenValido($token) {
    global $CHAVE_CRIPTOGRAFIA, $ALGORITMO_CRIPTOGRAFIA;

    if (!isset($token)) {
        header('Content-Type: application/json');
        http_response_code(401);
        echo json_encode(array("erro" => "Token não foi recebido. Acesso negado."));
        return false;
    } else if ($token !== $_POST["TOKEN"]) {
        header('Content-Type: application/json');
        http_response_code(401);
        echo json_encode(array("erro" => "Token recebido não corresponde ao necessário. Acesso negado."));
        return false;
    }
    
    try {
        $expirado = JWT::decode($token, new Key($CHAVE_CRIPTOGRAFIA, $ALGORITMO_CRIPTOGRAFIA));
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