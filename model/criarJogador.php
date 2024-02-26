<?php
    require "conexao.php";
    session_start();

    if (!isset($_SESSION["logado"])) {
        header('Content-Type: application/json');
        http_response_code(403);
        echo json_encode(array("erro"=>"Bloqueado o envio de requests para este endpoint."));
        exit;
    }

    if (!empty($_POST["nome"] && !empty($_POST["senha"]) && !empty($_POST["pontuacao"]) && !empty($_POST["level"]))) {
        $nome = $_POST["nome"];
        $senha = $_POST["senha"];
        $pontuacao = $_POST["pontuacao"];
        $level = $_POST["level"];
        $email = "";
        if (strlen($_POST["email"] > 0)) {
            $email = $_POST["email"];
        }
        
        $verificaNomeRepetido = "SELECT nome FROM jogador WHERE nome = '$nome'";
        $stmt = $banco->query($verificaNomeRepetido);
        $nomeRepetido = $stmt->fetchAll();


        if (!empty($nomeRepetido)) {
            header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode(array("erro"=>"Nome de usuário já registrado."));
            exit;
        }
        
        if (empty($nomeRepetido)) {
            $query = "INSERT INTO jogador (nome, senha, pontuacao, level) VALUES (:nome, :senha, :pontuacao, :level)";
            $dados = array(":nome"=>$nome, ":senha"=>password_hash($senha, PASSWORD_BCRYPT), ":pontuacao"=>$pontuacao, ":level"=> $level);
            if (strlen($email) > 0) {
                $query = "INSERT INTO jogador (nome, email, senha, pontuacao, level) VALUES (:nome, :email, :senha, :pontuacao, :level)";
                $dados = array(":nome"=>$nome, ":email"=>$email, ":senha"=>password_hash($senha, PASSWORD_BCRYPT), ":pontuacao"=>$pontuacao, ":level"=> $level);
            }
            $stmt = $banco->prepare($query);
            $stmt->execute($dados);
        }
        else if (sizeof($nomeRepetido) === 1) {
            $atualizarPontos = "UPDATE jogador SET pontuacao = :pontuacao WHERE nome = :nome AND :pontuacao > pontuacao";
            $stmt = $banco->prepare($atualizarPontos);
            $stmt->execute(array(":pontuacao"=>$pontuacao, ":nome"=>$nome));
        }

        header('Content-Type: application/json');
        http_response_code(200);
        echo json_encode(array("sucesso"=>"Pontuacao registrada com sucesso."));
        exit;
    }
    else {
        header('Content-Type: application/json');
        http_response_code(400);
        echo json_encode(array("erro"=>"Dados enviados não correspondem ao necessário."));
        exit;
    }

?>