import { Entidade } from "./entidade-class.js";
export class Projetil extends Entidade{
    
    constructor (x, y, largura, altura, contexto, vida, atirou, idSprite, velocidade){
        super(x, y,largura,altura,contexto,vida,idSprite, velocidade);
        this.atirou = atirou;

    }

    IniciaTrajetoria(aleatorio=false) {
        if (aleatorio) {
            let animacao = setInterval(()=>{this.Viajando(animacao, aleatorio)}, 500);
        }
        else {
            let animacao = setInterval(()=>{this.Viajando(animacao)}, 500);
        }
    }

    Viajando(animacao, aleatorio=false){
        this.contexto.clearRect(this.x, this.y, this.largura, this.altura);
        
        if (this.y <= 0 || this.y > this.contexto.canvas.height || this.morto) {    
            this.atirou === "player" ? this.y = -1 : this.y = this.contexto.canvas.height+1; //colocando o projetil fora da tela para ser apagado no método DeletaProjetilForaDaTela da classe Init
            clearInterval(animacao);
        }
        
        this.atirou === "player" ?  this.y -= this.velocidade : this.y += this.velocidade;
        if (aleatorio) {
            let movimentoAleatorio = Math.random();
            movimentoAleatorio > 0.5 ? this.x+= 15 : this.x-= 15;
        }

        this.DesenhaNaTela();
    }
}
