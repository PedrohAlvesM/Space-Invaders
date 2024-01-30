<?php
    require "conexao.php";

    if (!empty($_POST["nome"] && !empty($_POST["pontuacao"]))) {
        $nome = $_POST["nome"];
        $pontuacao = $_POST["pontuacao"];
        
        $verificaNomeRepetido = "SELECT nome FROM pontuacao WHERE nome = '$nome'";
        $stmt = $banco->query($verificaNomeRepetido);
        $nomeRepetido = $stmt->fetchAll();


        if (sizeof($nomeRepetido) > 1 ) {
            header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode(array("erro"=>"Nome de usuário já registrado."));
            exit;
        }
        
        if (empty($nomeRepetido)) {
            $stmt = $banco->prepare("INSERT INTO pontuacao (nome, pontuacao) VALUES (:nome, :pontuacao)");
            $stmt->execute(array(":nome"=>$nome, ":pontuacao"=>$pontuacao));
        }
        else if (sizeof($nomeRepetido) === 1) {
            $atualizarPontos = "UPDATE pontuacao SET pontuacao = :pontuacao WHERE nome = :nome AND :pontuacao > pontuacao";
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
    }

?>