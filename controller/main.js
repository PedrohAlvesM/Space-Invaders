import { Jogo } from "./init-class.js";

document.getElementById("btn-comecar").addEventListener("click", () => {
    const jogo = new Jogo();
    document.getElementsByTagName("main")[0].style.display = "none";
    document.getElementById("jogo").style.display = "grid";

    document.getElementById("reiniciar-jogo").addEventListener("click", () => jogo.IniciaJogo());

    jogo.IniciaJogo();
});