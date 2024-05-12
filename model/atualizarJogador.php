<?php

require_once("conexao.php");
require_once("main.php");

if (!isset($_COOKIE["TOKEN"])) {
    header('Content-Type: application/json');
    http_response_code(400);
    echo json_encode(array("erro" => "Token de autenticação não fornecido."));
    exit;
}

if (!TokenValido($_COOKIE["TOKEN"])) {
    exit;
}

if (!empty($_POST["nome"]) && !empty($_POST["pontuacao"]) && !empty($_POST["level"])) {
    $nome = filter_input(INPUT_POST, "nome", FILTER_SANITIZE_SPECIAL_CHARS);
    $pontuacao =  filter_input(INPUT_POST, 'pontuacao', FILTER_VALIDATE_INT);
    $level = filter_input(INPUT_POST, 'level', FILTER_VALIDATE_INT);
    if ($level == "" || $pontuacao == "") {
        header('Content-Type: application/json');
        http_response_code(400);
        echo json_encode(array("erro" => "Level ou pontuação são inválidos"));
        exit;
    }

    $verificaNomeRepetido = "SELECT nome FROM jogador WHERE nome = '$nome'";
    $stmt = $banco->query($verificaNomeRepetido);
    $nomeRepetido = $stmt->fetchAll();


    if (empty($nomeRepetido)) {
        header('Content-Type: application/json');
        http_response_code(200);
        echo json_encode(array("erro" => "Nome de jogador não registrado."));
        exit;
    }

    $atualizarPontos = "UPDATE jogador SET pontuacao = :pontuacao, level = :level WHERE nome = :nome AND :pontuacao > pontuacao";
    $stmt = $banco->prepare($atualizarPontos);
    $stmt->execute(array(":pontuacao" => $pontuacao, ":level" => $level, ":nome" => $nome));

    header('Content-Type: application/json');
    http_response_code(200);
    echo json_encode(array("sucesso" => "Pontuacao e level alterados com sucesso."));
    exit;
}
