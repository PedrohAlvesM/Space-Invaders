import { Projetil } from "./projetil-class.js";
import { Entidade } from "./entidade-class.js";

export class Player extends Entidade{
    #pontos = 0;
    #podeAtirar = true;
    #tempoInvencibilidade = 1000;
    #tempoPodeAtirar = 1000;

    constructor(x, y, largura, altura, contexto, vida, idSprite, velocidade){
        super(x, y, largura, altura, contexto, vida, idSprite,  velocidade);
    }

    AumentarPontos(soma) {
        this.#pontos += soma;
    }
    
    Acoes(tecla, larguraTela){
        const acoesPossiceis = {
            //Acoes de movimento
            ArrowUp: ()=>{
                this.y = this.y-this.velocidade;
            },
            ArrowDown: ()=>{
                this.y = this.y+this.velocidade;
            },
            
            ArrowLeft: ()=>{
                if(this.x < 0) {
                    return
                }
                if (tecla.repeat) {
                    this.x = this.x-1;
                }
                this.x = this.x-this.velocidade;
            },
            ArrowRight: ()=>{
                if(this.x > larguraTela-this.largura) {
                    return
                }
                if (tecla.repeat) {
                    this.x = this.x+1;
                }
                this.x = this.x+this.velocidade;
            },
           //Atirar com barra de espaço
            " ": ()=>{
                if (this.#podeAtirar) {
                    const p = new Projetil(this.x+this.largura/2-11, this.y-20, 16, 16, this.contexto, 1, "player", "laser-player", 5, false);
                    this.projeteis.push(p);
                    this.#podeAtirar = false;
                }
            }
        }
        if(acoesPossiceis[tecla.key]){
            acoesPossiceis[tecla.key]();
        }
    }

    MudarTempoInvencibilidade(framerate) {
        if (this.tempoInvencibilidade <= 0) {
            this.invencibilidade = false;
            this.tempoInvencibilidade = 1000;
        }
        else {
            this.tempoInvencibilidade -= framerate;
        }
    }
    MudarTempoAtirar(framerate) {
        if (this.#tempoPodeAtirar <= 0) {
            this.#podeAtirar = true;
            this.#tempoPodeAtirar = 1000;
        }
        else {
            this.#tempoPodeAtirar -= framerate;
        }
    }

    get pontos() {
        return this.#pontos;
    }
    set pontos (pontos) {
        this.#pontos = pontos;
    }

    get podeAtirar() {
        return this.#podeAtirar;
    }
    set podeAtirar(atirar) {
        if (typeof atirar !== "boolean") {
            throw new Error("PodeAtirar deve ser do tipo Boolean.");
        }

        this.#podeAtirar = atirar;
    }
    get tempoInvencibilidade() {
        return this.#tempoInvencibilidade;
    }
    set tempoInvencibilidade(tempo) {
        if (typeof tempo !== "number") {
            throw new Error("TempoInvencibilidade deve ser um número");
        }
        this.#tempoInvencibilidade = tempo;
    }
    get tempoPodeAtirar() {
        return this.#tempoPodeAtirar;
    }
    set tempoPodeAtirar(tempo) {
        if (typeof tempo !== "number") {
            throw new Error("TempoPodeAtirar deve ser um número");
        }
        this.#tempoPodeAtirar = tempo;
    }
}