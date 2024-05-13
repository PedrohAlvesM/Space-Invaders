<?php
require_once("../model/conexao.php");

if (!empty($_GET["nome"])) {
    $nome = filter_input(INPUT_GET, 'nome', FILTER_SANITIZE_SPECIAL_CHARS);
    $stmt = $banco->query("SELECT nome, pontuacao, level FROM jogador WHERE nome = '$nome'");
    $jogador = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($jogador)) {
        header('Content-Type: application/json');
        http_response_code(404);
        echo json_encode(array("erro"=>"Jogador não encontrado."));
        exit;
    }

    header('Content-Type: application/json');
    http_response_code(200);
    echo json_encode($jogador);
    exit;

}
else {
    header('Content-Type: application/json');
    http_response_code(400);
    echo json_encode(array("erro"=>"Nome do jogador não fornecido."));
    exit;
}