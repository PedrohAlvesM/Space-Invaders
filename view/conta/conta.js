import { Jogador } from "../../controller/classes/jogador-class.js";

const jogador = new Jogador();

document.getElementById("entrar").addEventListener("click", async (e) => {
    const mensagem = await jogador.LogarJogador(e.target.parentElement);
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
    const mensagem = await jogador.RegistrarJogador(e.target.parentElement);
    if (mensagem.sucesso) {
        document.getElementsByClassName("mensagem-registrar")[0].innerText = "Registrado com sucesso!";
        document.getElementsByClassName("mensagem-registrar")[0].style.opacity = "100";
    }
    else {
        document.getElementsByClassName("mensagem-registrar")[0].innerText = `${mensagem.erro} Tente novamente.`;
        document.getElementsByClassName("mensagem-registrar")[0].style.opacity = "100";
    }
});
