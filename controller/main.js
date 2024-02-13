import {Jogo} from "./init-class.js";

document.getElementById("btn-comecar").addEventListener("click", ()=>{
    document.getElementsByTagName("main")[0].style.display = "none";
    document.getElementById("jogo").style.display = "block";
    const jogo = new Jogo();
    jogo.IniciaJogo();

});

document.getElementById("btn-sobre").addEventListener("click", ()=>{
    document.querySelector("main > menu").style.display = "none";
    document.getElementsByClassName("container sobre")[0].style.display = "block";
    document.getElementById("btn-voltar").style.display = "block";
});

document.getElementById("btn-como-jogar").addEventListener("click", ()=>{
    document.querySelector("main > menu").style.display = "none";
    document.getElementsByClassName("container como-jogar")[0].style.display = "block";
    document.getElementById("btn-voltar").style.display = "block";
});

document.getElementById("btn-voltar").addEventListener("click", ()=>{
    document.getElementsByClassName("container sobre")[0].style.display = "none";
    document.getElementsByClassName("container como-jogar")[0].style.display = "none";

    document.querySelector("main > menu").style.display = "block";
    document.getElementById("btn-voltar").style.display = "none";
});


async function CriarUsuario() {
    const dados = new FormData();
    dados.append("nomte", "Pedeo");
    dados.append("pontuacao", "1100");

    fetch("../model/criarUsuarioPontuacao.php", {
        method: "POST",
        body: dados,
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } 
            throw new Error(`Erro na requisição: ${response.statusText}`);
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(`Erro durante a requisição: ${error.message}`);
        });
}

async function ObterTopPontuacoes(quantidade) {
    try {
        const resposta = await fetch(`../model/getRankingPontuacao.php?quantidade=${quantidade}`, {method: "GET"});
        if (!resposta.ok) {
            throw new Error("Erro durante a requisição: "+resposta.statusText);
        }

        return await resposta.json();
    }
    catch(erro) {
        return erro
    }
}