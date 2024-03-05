import { Projetil } from "./projetil-class.js";
import { Entidade } from "./entidade-class.js";

export class Inimigo extends Entidade {
    constructor(x, y, largura, altura, contexto, vida, idSprite, velocidade, atiraAleatorio=false) {
        super(x, y, largura, altura, contexto, vida, idSprite, velocidade);
        this.atiraAleatorio = atiraAleatorio;
    }

    Atirar() {
        if (this.sprite === "nave-inimigo-forte") {
            let num = Math.floor(Math.random()*5);
            
            for (let i = 0; i < num;  i++) {
                let velocidadeAlatoria = Math.floor(Math.random() * 10);
                let p = new Projetil(this.x+this.largura/2-11, this.y+this.altura+2, 16, 16, this.contexto, 1, "inimigo", "laser-inimigo", 48+velocidadeAlatoria);
                this.projeteis.push(p);
                p.IniciaTrajetoria(true);
            }
            return
        }
        
        const p = new Projetil(this.x+this.largura/2-11, this.y+this.altura+2, 16, 16, this.contexto, 1, "inimigo", "laser-inimigo", 48);
        this.projeteis.push(p);

        if (this.atiraAleatorio) {
            p.IniciaTrajetoria(true);
            return
        }
        p.IniciaTrajetoria();
    }
    
    Movimento(larguraTela) {        
        if (this.x+this.largura+10 > larguraTela) {
            this.x = 10;
            this.y += this.altura;
        }
        this.x += this.velocidade;
    }
}