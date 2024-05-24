let QUANTIDADE_JOGADORES_CARREGADOS = 10;
let ULTIMO_JOGADOR_CARREGADO = {};

async function CarregarJogadoresRanking() {
    try {
        const requisicao = await fetch(`../../api/getRanking.php?quantidade=${QUANTIDADE_JOGADORES_CARREGADOS}`);
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


document.getElementById("jogadores").addEventListener("scrollend", async (e) => {
    const scrollTop = e.target.scrollTop;
    const scrollHeight = e.target.scrollHeight;
    const clientHeight = e.target.clientHeight;

    const porcentagemScroll = (scrollTop / (scrollHeight - clientHeight)) * 100;

    if (porcentagemScroll > 50) {
        await CarregarJogadoresRanking();
    }
});

document.addEventListener("DOMContentLoaded", CarregarJogadoresRanking);