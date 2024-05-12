import { Jogo } from "./init-class.js";

const jogo = new Jogo();
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

        document.getElementsByTagName("main")[0].style.display = "flex";
    });
}