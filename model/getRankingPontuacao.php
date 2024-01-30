<?php
    require "conexao.php";

    if (!empty($_GET["quantidade"])) {
        $quantidade = intval($_GET["quantidade"], 10);
        
        if ($quantidade === 0) {
            header('Content-Type: application/json');
            http_response_code(400);
            echo json_encode(array("erro"=>"Quantidade deve ser um número inteiro"));
            exit;
        }

        $select = "SELECT nome, pontuacao FROM pontuacao ORDER BY pontuacao DESC LIMIT $quantidade";
        $stmt = $banco->query($select);
        $ranking = $stmt->fetchAll();

        header('Content-Type: application/json');
        http_response_code(200);
        echo json_encode($ranking);
    }
    else {
        header('Content-Type: application/json');
        http_response_code(400);
        echo json_encode(array("erro"=>"Quantidade não especificada"));
    }
?>