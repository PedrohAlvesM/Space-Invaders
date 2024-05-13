<?php
require_once("../model/main.php");

if (session_status() != 2) {
    session_start();
}

$token = CriarToken();
$_SESSION["TOKEN"] = $token;
setcookie("TOKEN", $token, array("secure"=>1));
echo json_encode(array("token"=>$token));