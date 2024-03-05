<?php
use Firebase\JWT\JWT;
require_once("../vendor/autoload.php");
require_once("main.php");

session_start();

$data = new DateTimeImmutable();
$dataExpirar = $data->modify('+1 hour')->getTimestamp();
            
$request_data = [
    'iat'  => $data->getTimestamp(),         
    'nbf'  => $data->getTimestamp(),         
    'exp'  => $dataExpirar,                    
];

$token = JWT::encode($request_data, $CHAVE_CRIPTOGRAFIA, $ALGORITMO_CRIPTOGRAFIA);

$_SESSION["TOKEN"] = $token;

echo json_encode(array("token"=>$token));