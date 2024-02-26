<?php 
    session_start();
    $_SESSION["logado"] = true;
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="../assets/aviao.png">

    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Press+Start+2P">
    <title>Space Invaders</title>
</head>

<body>
    <main class="container">
        <div id="logo-container">
            <h1 id="logo" class="">SPACE INVADERS</h1>
        </div>
        <menu class="">
            <li id="btn-comecar">Jogar</li>
            <li id="btn-como-jogar">Como jogar?</li>
            <li id="btn-sobre">O que é Space Invaders?</li>
        </menu>

        <section class="container sobre">
            Space Invaders, lançado em 1978 pela Taito Corporation para fliperamas, desempenhou um papel crucial na
            história dos videogames. Sua revolucionária introdução do conceito de high score incentivou os jogadores a
            competir por pontuações cada vez mais altas nas máquinas de arcade, tornando-se um marco na cultura dos
            jogos eletrônicos. Além disso, sua influência na indústria dos videogames foi imensurável, pavimentando o
            caminho para o sucesso de muitos títulos subsequentes. Ainda hoje, Space Invaders é reverenciado como um dos
            jogos mais influentes de todos os tempos. Em uma homenagem à sua importância, reimaginei esse clássico
            usando JavaScript, destacando seu legado duradouro no mundo dos jogos eletrônicos.
        </section>

        <section class="container como-jogar">
            <p>Se movimente usando (setinhas yeah)</p>
            <p>Mate os <img src="../assets/aviao-inimigo.png" style="transform: rotate(180deg)"> para fazer pontos</p>
            <p>Quando matar todos os inimigos começará uma nova onda</p>
        </section>

        <button id="btn-voltar"> Voltar para o menu </button>

    </main>

    <section id="jogo">
        <canvas id="canvas"></canvas>
        <section style="display: none;">
            <div>
                <span class="sprite nave"></span>
                <p id="vida">0</p>
            </div>
            <div>
                <span class="sprite inimigo"></span>
                <p id="nInimigos">0</p>
            </div>
            <div>
                <p id="level">Level: 0</p>
            </div>
        </section>

    </section>
    <canvas id="estrelas"></canvas>



    <section id="assets">
        <img src="../assets/aviao.png" id="nave">
        <img src="../assets/aviao-inimigo.png" id="nave-inimigo">
        <img src="../assets/aviao-inimigo-aleatorio.png" alt="" id="nave-inimigo-aleatorio">
        <img src="../assets/aviao-inimigo-forte.png" alt="" id="nave-inimigo-forte">

        <img src="../assets/laser-inimigo.png" id="laser-inimigo">
        <img src="../assets/laser-player.png" id="laser-player">
    </section>


    <script type="module" src="../controller/main.js"></script>
    <script src="../controller/estrelas-animacao.js"></script>
</body>

</html>