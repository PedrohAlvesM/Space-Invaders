import { Projetil } from "./projetil-class.js";
import { Entidade } from "./entidade-class.js";

export class Player extends Entidade{
    #pontos = 0;
    #podeAtirar = true;

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
                    const p = new Projetil(this.x+this.largura/2-11, this.y-20, 16, 16, this.contexto, "player", "laser-player", 48);
                    this.projeteis.push(p);
                    p.IniciaTrajetoria();
        
                    this.#podeAtirar = false;

                    setTimeout(()=>{this.#podeAtirar = true}, 1000);
                }
            }
        }
        if(acoesPossiceis[tecla.key]){
            acoesPossiceis[tecla.key]();
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
}