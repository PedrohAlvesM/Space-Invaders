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