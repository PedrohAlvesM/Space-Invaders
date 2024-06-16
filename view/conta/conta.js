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

document.getElementById("abrir-modal").addEventListener("click", ()=>{
    document.getElementsByClassName("modal-overlay")[0].style.display = "flex";
});
document.getElementById("fechar-modal").addEventListener("click", ()=>{
    document.getElementsByClassName("modal-overlay")[0].style.display = "none";
});

document.getElementById("deletar-conta").addEventListener("click", async () => {
    const mensagem = await jogador.DeletarJogador(document.getElementsByClassName("form-entrar")[0]);

    if (mensagem.sucesso) {
        document.getElementsByClassName("mensagem-entrar")[0].innerText = `${mensagem.sucesso}`;
        document.getElementsByClassName("mensagem-entrar")[0].style.opacity = "100";
    }
    else {
        document.getElementsByClassName("mensagem-entrar")[0].innerText = `${mensagem.erro} Tente novamente.`;
        document.getElementsByClassName("mensagem-entrar")[0].style.opacity = "100";
    }
    document.getElementsByClassName("modal-overlay")[0].style.display = "none";
});