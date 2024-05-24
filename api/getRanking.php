<?php
    require "../model/conexao.php";

    if (!empty($_GET["quantidade"])) {
        $quantidade = filter_input(INPUT_GET, 'quantidade', FILTER_VALIDATE_INT);
        if ($quantidade == "") {
            header('Content-Type: application/json');
            http_response_code(400);
            echo json_encode(array("erro"=>"Quantidade deve ser um número inteiro."));
            exit;
        }

        $select = "SELECT nome, pontuacao, level FROM jogador ORDER BY pontuacao DESC LIMIT $quantidade";
        $stmt = $banco->query($select);
        $ranking = $stmt->fetchAll(PDO::FETCH_ASSOC);

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