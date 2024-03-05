import {Jogo} from "./init-class.js";

document.getElementById("btn-comecar").addEventListener("click", ()=>{
    document.getElementsByTagName("main")[0].style.display = "none";
    document.getElementById("jogo").style.display = "block";
    const jogo = new Jogo();
    jogo.IniciaJogo();
    
    document.getElementById("reiniciar-jogo").addEventListener("click", jogo.IniciaJogo);
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

function FormularioValido(formulario) {
    const tamanhoMaximoTexto = 32;
    const tamanhoMaximoSenha = 60;
    const tamanhoMaximoEmail = 60;

    const input = formulario.querySelectorAll("input");

    for (let dado in input) {
        const valor = dado.value.trim();

        if (dado.type === "text") {
            if (valor.length > tamanhoMaximoTexto || valor.length === 0) {
                throw new Error("Nome inserido ultrapassa o máximo de caracteres ou está vazio");
            }
        }
        else if (dado.type === "email" || dado.type === "password") {
            if (valor.length > tamanhoMaximoEmail || valor.length < 10) { //a@gmail.com
                throw new Error("Email ou senha ultrapassa o tamanho máximo de caracteres ou está vazio.")
            }

        }
    }
    return true
}