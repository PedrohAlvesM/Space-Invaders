export class Entidade {
    #x;
    #y;
    #largura;
    #altura;
    #projeteis = [];
    #contexto;
    #vida;
    #morto = false;
    #invencibilidade = false;
    #sprite;
    #velocidade;

    constructor(x, y, largura, altura, contexto, vida, idSprite, velocidade) {
        this.#x = x;
        this.#y = y;
        this.#largura = largura;
        this.#altura = altura;
        this.#contexto = contexto;
        this.#vida = vida;
        this.#sprite = idSprite;
        this.#velocidade = velocidade;

        this.#morto = false;
        this.#invencibilidade = false;
    }
    DesenhaNaTela() {
        this.#contexto.drawImage(document.getElementById(this.#sprite), this.#x, this.#y, this.#largura, this.#altura);
    }

    Colisao(projetilX, projetilY) {
        if (projetilX >= this.#x && projetilX <= this.#x + this.#largura &&
            projetilY >= this.#y && projetilY <= this.#y + this.#altura) {

            this.#vida--;

            if (this.#vida <= 0) {
                this.#morto = true;
            }
            return true
        }
        return false        
    }

    NovoProjetil(projetilObj) {
        this.#projeteis.push(projetilObj);
    }

    // getters e setters
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

    get largura() {
        return this.#largura;
    }
    set largura(largura) {
        if (typeof largura !== "number") {
            throw new Error("Largura deve ser do tipo Number.");
        }
        this.#largura = largura;
    }

    get altura() {
        return this.#altura;
    }
    set altura(altura) {
        if (typeof altura !== "number") {
            throw new Error("Altura deve ser do tipo Number.");
        }
        this.#altura = altura;
    }

    get projeteis() {
        return this.#projeteis;
    }
    set projeteis(projeteis) {
        if (typeof projeteis !== "object") {
            throw new Error("Projeteis devem ser um array.");
        }
        this.#projeteis = projeteis;
    }

    get contexto() {
        return this.#contexto;
    }
    set contexto(ctx) {
        if (typeof ctx !== "object" && ctx.getContext("2d")) {
            throw new Error("Ctx deve ser o contexto de um elemento HTML Canvas e o Browser deve suportar essa funcionalidade.");
        }
        this.#contexto = ctx;
    }

    get vida() {
        return this.#vida;
    }
    set vida(vida) {
        if (typeof vida !== "number") {
            throw new Error("Vida deve ser do tipo Number.");
        }
        this.#vida = vida;
    }

    get morto() {
        return this.#morto;
    }
    set morto (morreu) {
        if (typeof morreu !== "boolean") {
            throw new Error("Morto deve ser do tipo Boolean");
        }
        this.#morto = morreu;
    }

    get invencibilidade() {
        return this.#invencibilidade;
    }
    set invencibilidade (invencivel) {
        if (typeof invencivel !== "boolean") {
            throw new Error("Invecibilidade deve ser do tipo Boolean");
        }
        this.#invencibilidade = invencivel;
    }

    get sprite() {
        return this.#sprite;
    }
    set sprite(img) {
        if (typeof img !== "string" && (document.getElementById(img) !== null)) {
            throw new Error("Img deve ser o ID de um elemento <img> HTML.");
        }
        this.#sprite = img;
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