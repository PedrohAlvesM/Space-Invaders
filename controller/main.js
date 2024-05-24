import { Jogo } from "./init-class.js";

const jogo = new Jogo();
let QUANTIDADE_JOGADORES_CARREGADOS = 10;
let ULTIMO_JOGADOR_CARREGADO = {};

document.getElementById("btn-comecar").addEventListener("click", () => {
    document.getElementsByTagName("main")[0].style.display = "none";
    document.getElementById("jogo").style.display = "grid";

    document.getElementById("reiniciar-jogo").addEventListener("click", () => jogo.IniciaJogo());

    jogo.IniciaJogo();
});

document.getElementById("aceitar-cookies").addEventListener("click", () => {
    localStorage.setItem("cookiesAtivados", "true");

    document.getElementsByClassName("cookies")[0].style.display = "none";
});
document.getElementById("recusar-cookies").addEventListener("click", () => {
    localStorage.setItem("cookiesAtivados", "false");

    document.getElementsByClassName("cookies")[0].style.display = "none";
});

document.getElementById("btn-sobre").addEventListener("click", () => {
    document.getElementsByTagName("main")[0].style.display = "none";
    document.getElementsByClassName("sobre")[0].style.display = "flex";
});

document.getElementById("btn-como-jogar").addEventListener("click", () => {
    document.getElementsByTagName("main")[0].style.display = "none";
    document.getElementsByClassName("como-jogar")[0].style.display = "flex";
});

document.getElementById("btn-tela-login").addEventListener("click", () => {
    document.getElementsByClassName("sobre")[0].style.display = "none";
    document.getElementsByClassName("como-jogar")[0].style.display = "none";
    document.getElementsByTagName("main")[0].style.display = "none";

    document.getElementById("conta").style.display = "grid";
});

document.getElementById("fechar-login").addEventListener("click", () => {
    document.getElementsByClassName("mensagem-entrar")[0].style.opacity = 0;
    document.getElementsByClassName("mensagem-registrar")[0].style.opacity = 0;

    document.getElementsByClassName("como-jogar")[0].style.display = "none";
    document.getElementById("conta").style.display = "none";

    document.getElementsByTagName("main")[0].style.display = "flex";
});


document.getElementById("entrar").addEventListener("click", async (e) => {
    const mensagem = await jogo.jogador.LogarJogador(e.target.parentElement);
    if (mensagem.sucesso) {
        document.getElementsByClassName("mensagem-entrar")[0].innerText = "Logado com sucesso!";
        document.getElementsByClassName("mensagem-entrar")[0].style.opacity = "100";
    }
    else {
        document.getElementsByClassName("mensagem-entrar")[0].innerText = `${mensagem.erro} Tente novamente.`;
        document.getElementsByClassName("mensagem-entrar")[0].style.opacity = "100";
    }
});
document.getElementById("registrar").addEventListener("click", async (e) => {
    const mensagem = await jogo.jogador.RegistrarJogador(e.target.parentElement);
    if (mensagem.sucesso) {
        document.getElementsByClassName("mensagem-registrar")[0].innerText = "Registrado com sucesso!";
        document.getElementsByClassName("mensagem-registrar")[0].style.opacity = "100";
    }
    else {
        document.getElementsByClassName("mensagem-registrar")[0].innerText = `${mensagem.erro} Tente novamente.`;
        document.getElementsByClassName("mensagem-registrar")[0].style.opacity = "100";
    }
});

document.getElementById("btn-tela-ranking").addEventListener("click", async () => {
    await CarregarJogadoresRanking()
});

document.getElementById("jogadores").addEventListener("scrollend", async (e) => {
    const scrollTop = e.target.scrollTop;
    const scrollHeight = e.target.scrollHeight;
    const clientHeight = e.target.clientHeight;

    const porcentagemScroll = (scrollTop / (scrollHeight - clientHeight)) * 100;

    if (porcentagemScroll > 50) {
        await CarregarJogadoresRanking();
    }
});

document.getElementById("registrar-entrar").addEventListener("click", () => {
    jogo.perdeu = true;
    document.getElementById("jogo").style.display = "none";
    document.getElementById("conta").style.display = "grid";
});

if (!localStorage.getItem("cookiesAtivados")) {
    document.getElementsByClassName("cookies")[0].style.display = "flex";
}

const btnVoltar = document.getElementsByClassName("btn-voltar");
for (let btn of btnVoltar) {
    btn.addEventListener("click", () => {
        document.getElementsByClassName("sobre")[0].style.display = "none";
        document.getElementsByClassName("como-jogar")[0].style.display = "none";
        document.getElementById("conta").style.display = "none";
        document.getElementById("jogo").style.display = "none";
        document.getElementsByClassName("ranking")[0].style.display = "none";

        document.getElementsByTagName("main")[0].style.display = "flex";
        document.documentElement.style.overflow = "hidden";
    });
}

async function CarregarJogadoresRanking() {
    try {
        const requisicao = await fetch(`../api/getRanking.php?quantidade=${QUANTIDADE_JOGADORES_CARREGADOS}`);
        const resposta = await requisicao.json();

        if (!requisicao.ok || resposta.erro) {
            throw new Error("Erro ao carregar o ranking");
        }
        
        if (ULTIMO_JOGADOR_CARREGADO.nome === resposta[resposta.length-1].nome &&
            ULTIMO_JOGADOR_CARREGADO.pontuacao === resposta[resposta.length-1].pontuacao &&
            ULTIMO_JOGADOR_CARREGADO.level === resposta[resposta.length-1].level
        ) 
        {
            return
        } 

        document.getElementById("jogadores").innerHTML = "";
        document.getElementById("jogadores").style.gridTemplateRows = `repeat(${resposta.length}, 1fr)`;

        const nomeElemento = document.createElement("p");
        const pontuacaoElemento = document.createElement("p");
        const levelElemento = document.createElement("p");

        nomeElemento.innerText = "nome";
        pontuacaoElemento.innerText = "pontuação";
        levelElemento.innerText = "level";

        document.getElementById("jogadores").appendChild(nomeElemento);
        document.getElementById("jogadores").appendChild(pontuacaoElemento);
        document.getElementById("jogadores").appendChild(levelElemento);

        for (let jogador of resposta) {
            const nomeElemento = document.createElement("p");
            const pontuacaoElemento = document.createElement("p");
            const levelElemento = document.createElement("p");

            nomeElemento.innerText = DecodificarNome(jogador.nome);
            pontuacaoElemento.innerText = jogador.pontuacao;
            levelElemento.innerText = jogador.level;

            document.getElementById("jogadores").appendChild(nomeElemento);
            document.getElementById("jogadores").appendChild(pontuacaoElemento);
            document.getElementById("jogadores").appendChild(levelElemento);
        }

        document.getElementsByClassName("sobre")[0].style.display = "none";
        document.getElementsByClassName("como-jogar")[0].style.display = "none";
        document.getElementsByTagName("main")[0].style.display = "none";

        document.getElementsByClassName("ranking")[0].style.display = "flex";
        document.documentElement.style.overflow = "auto";

        QUANTIDADE_JOGADORES_CARREGADOS += 10;
        ULTIMO_JOGADOR_CARREGADO = resposta[resposta.length-1];
    }
    catch (e) {
        document.getElementsByClassName("mensagem-ranking")[0].innerText = e.message;
        document.getElementsByClassName("mensagem-ranking")[0].style.display = "block";
    }
}

function DecodificarNome(nome) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(nome, 'text/html');
    return doc.documentElement.textContent;
}