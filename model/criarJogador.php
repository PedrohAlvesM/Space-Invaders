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

if (!empty($_POST["nome"]) && !empty($_POST["senha"]) && !empty($_POST["pontuacao"]) && !empty($_POST["level"])) {

    $nome = filter_input(INPUT_POST, "nome", FILTER_SANITIZE_SPECIAL_CHARS);
    $senha = $_POST["senha"]; 
    $pontuacao =  filter_input(INPUT_POST, 'pontuacao', FILTER_VALIDATE_INT);
    $level = filter_input(INPUT_POST, 'level', FILTER_VALIDATE_INT);

    if ($level == "" || $pontuacao == "") {
        header('Content-Type: application/json');
        http_response_code(400);
        echo json_encode(array("erro" => "Level ou pontuação são inválidos."));
        exit;
    }

    $verificaNomeRepetido = "SELECT nome FROM jogador WHERE nome = '$nome'";
    $stmt = $banco->query($verificaNomeRepetido);
    $nomeRepetido = $stmt->fetchAll(PDO::FETCH_ASSOC);


    if (!empty($nomeRepetido)) {
        header('Content-Type: application/json');
        http_response_code(200);
        echo json_encode(array("erro" => "Nome de usuário já registrado."));
        exit;
    }

    if (empty($nomeRepetido)) {
        $query = "INSERT INTO jogador (nome, senha, pontuacao, level) VALUES (:nome, :senha, :pontuacao, :level)";
        $dados = array(":nome" => $nome, ":senha" => password_hash($senha, PASSWORD_BCRYPT), ":pontuacao" => $pontuacao, ":level" => $level);
        $stmt = $banco->prepare($query);
        $stmt->execute($dados);
    }

    header('Content-Type: application/json');
    http_response_code(200);
    echo json_encode(array("sucesso" => "Jogador registrado com sucesso."));
    exit;
}

header('Content-Type: application/json');
http_response_code(400);
echo json_encode(array("erro" => "Dados enviados não correspondem ao necessário."));
exit;
