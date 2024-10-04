import { Entidade } from "./entidade-class.js";
export class Projetil extends Entidade{
    
    constructor (x, y, largura, altura, contexto, vida, atirou, idSprite, velocidade, aleatorio){
        super(x, y,largura,altura,contexto,vida,idSprite, velocidade);
        this.atirou = atirou;
        this.aleatorio = aleatorio;
    }

    Viajando(){
        this.contexto.clearRect(this.x, this.y, this.largura, this.altura);
        
        if (this.y <= 0 || this.y > this.contexto.canvas.height || this.morto) {    
            this.atirou === "player" ? this.y = -1 : this.y = this.contexto.canvas.height+1;
        }
        
        this.atirou === "player" ?  this.y -= this.velocidade : this.y += this.velocidade;
        if (this.aleatorio) {
            let movimentoAleatorio = Math.random();
            movimentoAleatorio > 0.5 ? this.x+= 5 : this.x-= 5;
        }

        this.DesenhaNaTela();
    }
}
