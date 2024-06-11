<?php
require_once("../model/conexao.php");

if (!empty($_POST["nome"]) && !empty($_POST["senha"])) {
    $nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_SPECIAL_CHARS);
    $senha = $_POST["senha"];
    
    $queryJogador = "SELECT * FROM jogador WHERE nome = '$nome'";
    $stmt = $banco->query($queryJogador);
    $jogador = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!empty($jogador) && password_verify($senha, $jogador[0]["senha"])) {
        $queryDeletar = "DELETE FROM jogador WHERE nome = :nome AND senha = :senha";
        $stmt = $banco->prepare($queryDeletar);
        $sucesso = $stmt->execute(array(":nome"=>$nome, ":senha"=>$jogador[0]["senha"]));   
        
        if ($sucesso) {
            header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode(array("sucesso"=>"Jogador deletado com sucesso."));
            exit;
        }
            
    }
            
    header('Content-Type: application/json');
    http_response_code(400);
    echo json_encode(array("erro"=>"Nome ou senha do jogador não foi encontrado."));
    exit;
}

header('Content-Type: application/json');
http_response_code(400);
echo json_encode(array("erro"=>"Nome ou senha do jogador não fornecido."));
exit;
