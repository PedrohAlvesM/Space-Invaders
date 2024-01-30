export class TextoUI {
    #x; 
    #y;
    #texto;
    #fonte = {};
    #contexto;
    constructor (x,y, texto, contexto, fonte) {
        this.#x = x;
        this.#y = y;
        this.#texto = texto;
        this.#contexto = contexto;
        this.#fonte = fonte;
    }

    get x () {
        return this.#x;
    }
    set x (x) {
        if (typeof x !== "number") {
            throw new Error("X deve ser do tipo Number.");
        }
        this.#x = x;
    }

    get y () {
        return this.#y;
    }
    set y (y) {
        if (typeof y !== "number") {
            throw new Error("Y deve ser do tipo Number.");
        }
    }

    get texto () {
        return this.#texto;
    }
    set texto (texto) {
        if (typeof texto !== "string") {
            throw new Error("Texto deve ser do tipo String.");
        }
        this.#texto = texto;
    }

    get fonte () {
        return this.#fonte;
    }
    set fonte (dadoFonte) {
        if (!Object.hasOwn(dadoFonte.fonte) && !Object.hasOwn(dadoFonte.tamanho) && !Object.hasOwn(dadoFonte.cor)) {
            throw new Error("DadoFonte deve ser um objeto que contanha as chaves 'fonte', 'tamanho' e 'cor' para que seja definido as características da fonte.")
        }

        let modificadorFonte = dadoFonte.modificador ?? "";

        this.#fonte.fonte = dadoFonte.fonte;
        this.#fonte.tamanho = dadoFonte.fonte;
        this.#fonte.cor = dadoFonte.cor;
        this.#fonte.modificador = modificadorFonte;       
    }

    
    
    get contexto () {
        return this.#contexto;
    }
    set contexto(ctx) {
        if (typeof ctx !== "object" && ctx.getContext("2d")) {
            throw new Error("Ctx deve ser o contexto de um elemento HTML Canvas e o Browser deve suportar essa funcionalidade.");
        }
        this.#contexto = ctx;
    }
    
    DefinePontuacao () {
        let placarMaximo = "9999";
        let zeros = placarMaximo.length-this.#texto.length;

        let placar = "";
        for (let i = 0; i < zeros; i++) {
            placar += "0";
        }
        
        return placar += String(this.#texto);
    }
    
    DesenhaPontuacaoNaTela() {
        this.#contexto.beginPath();
        this.#contexto.textAlign = "center";
        this.#contexto.font = `${this.#fonte.modificadorFonte} ${this.#fonte.tamanho}px ${this.#fonte.fonte}`;
        this.#contexto.fillStyle = this.#fonte.cor;

        this.#contexto.fillText(this.DefinePontuacao(), this.#x, this.#y);
        this.#contexto.closePath();
    }
    
    DesenhaNaTela() {
        this.#contexto.beginPath();
        this.#contexto.textAlign = "center";
        this.#contexto.font = `${this.#fonte.modificadorFonte} ${this.#fonte.tamanho}px ${this.#fonte.fonte}`;
        this.#contexto.fillStyle = this.#fonte.cor;
    
        this.#contexto.fillText(this.#texto, this.#x, this.#y);
        this.#contexto.closePath();
    }
}