<?php

require "main.php";
require "conexao.php";

if  (!empty($_POST["nome"]) && !empty($_POST["senha"])) {
    $nome = filter_input(INPUT_POST, "nome", FILTER_SANITIZE_SPECIAL_CHARS);
    $senha = $_POST["senha"];

    $verificaDados = "SELECT nome, pontuacao, level, senha FROM jogador WHERE nome = '$nome'";
    $stmt = $banco->query($verificaDados);
    $jogadorLogado = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!password_verify($senha, $jogadorLogado[0]["senha"])) {
        header('Content-Type: application/json');
        http_response_code(400);
        echo json_encode(array("erro" => "Senha incorreta."));
        exit;
    }

    if (count($jogadorLogado) === 1) {
        if (session_status() != 2) {
            session_start();
        }
        $token = CriarToken();
        $_SESSION["TOKEN"] = $token;
        
        header('Content-Type: application/json');
        http_response_code(200);
        echo json_encode(array("token" => $token, "nome"=>$jogadorLogado[0]["nome"], "pontuacao"=>$jogadorLogado[0]["pontuacao"], "level"=> $jogadorLogado[0]["level"], "sucesso"=>"Jogador logado com sucesso."));
        exit;
    }

    header('Content-Type: application/json');
    http_response_code(400);
    echo json_encode(array("erro" => "Jogador não encontrado."));
    exit;
}

header('Content-Type: application/json');
http_response_code(400);
echo json_encode(array("erro" => "Dados enviados não correspondem ao necessário."));
exit;

?>