class Estrela {
    #x;
    #y;
    #raio;
    #velocidade;

    constructor(x, y, raio, velocidade) {
        this.#x = x;
        this.#y = y;
        this.#raio = raio;
        this.#velocidade = velocidade;
    }

    DesenhaNaTela(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(this.#x, this.#y, this.#raio, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    get x() {
        return this.#x;
    }
    set x(x) {
        if (typeof x !== "number") {
            throw new Error("X deve ser do tipo Number.");
        }
        this.#x = x;
    }

    get y() {
        return this.#y;
    }
    set y(y) {
        if (typeof y !== "number") {
            throw new Error("Y deve ser do tipo Number.")
        }
        this.#y = y;
    }

    get raio() {
        return this.#raio;
    }
    set raio(raio) {
        if (typeof raio !== "number") {
            throw new Error("Largura deve ser do tipo Number.");
        }
        this.#raio = raio;
    }

    get velocidade() {
        return this.#velocidade;
    }
    set velocidade(velocidade) {
        if (typeof velocidade !== "number") {
            throw new Error("Velocidade deve ser do tipo Number.");
        }
        this.#velocidade = velocidade;
    }
}

const tela = document.getElementById("estrelas");
tela.width = window.innerWidth;
tela.height = window.innerHeight;

const ctx = tela.getContext("2d");
ctx.filter = "blur(1px)";
let estrelas = [];
let animacao;

estrelas.push(new Estrela(Math.random() * tela.width, 0, 2, 1));



function Update() {

    if (estrelas.length === 0) {
        animacao = false;
        return
    }

    ctx.clearRect(0, 0, tela.width, tela.height);

    ctx.beginPath();
    const fundo = ctx.createLinearGradient(0, 0, tela.width, 0);
    fundo.addColorStop(0, "#120e1e");
    fundo.addColorStop(1, "#271950");

    ctx.fillStyle = fundo;

    ctx.fillRect(0, 0, tela.width, tela.height);

    ctx.closePath();

    for (let i = 0; i < estrelas.length; i++) {
        if (estrelas[i].y > tela.height) {
            estrelas.splice(i, 1);
            continue
        }

        estrelas[i].y += estrelas[i].velocidade;
        estrelas[i].DesenhaNaTela(ctx);
    }
    
    if (Math.random() < 0.05) {
        let numAleatorio = Math.random();

        estrelas.push(new Estrela(numAleatorio * tela.width, 0, numAleatorio*5, numAleatorio*2));
    }
    
    requestAnimationFrame(Update);
} 

Update();

window.addEventListener("resize", ()=>{
    tela.width = window.innerWidth;
    tela.height = window.innerHeight;
});