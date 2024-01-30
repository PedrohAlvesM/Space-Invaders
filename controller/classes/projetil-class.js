import { Entidade } from "./entidade-class.js";
export class Projetil extends Entidade{
    
    constructor (x, y, largura, altura, contexto, atirou, idSprite, velocidade){
        super(x, y,largura,altura,contexto,vida,idSprite, velocidade);
        this.atirou = atirou;

    }

    IniciaTrajetoria(aleatorio=false) {
        if (aleatorio) {
            let animacao = setInterval(()=>{this.ViajandoAleatorio(animacao)}, 500);
        }
        else {
            let animacao = setInterval(()=>{this.Viajando(animacao)}, 500);
        }
    }

    Viajando(animacao){
        this.contexto.clearRect(this.x, this.y, this.largura, this.altura);
        
        if (this.y <= 0 || this.y > this.contexto.canvas.height) {
            clearInterval(animacao);
        }

        this.atirou === "player" ?  this.y -= this.velocidade : this.y += this.velocidade;

        this.DesenhaNaTela();
    }
    
    ViajandoAleatorio(animacao) {
        let movimentoAleatorio = Math.random();

        this.contexto.clearRect(this.x, this.y, this.largura, this.altura);
        
        if (this.y <= 0 || this.y > this.contexto.canvas.height) {
            clearInterval(animacao);
        }
  
        this.atirou === "player" ?  this.y -= this.velocidade : this.y += this.velocidade;
        movimentoAleatorio > 0.5 ? this.x+= 15 : this.x-= 15;

        this.DesenhaNaTela();

    }
}
