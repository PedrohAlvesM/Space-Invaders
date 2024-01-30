export class ImagemUI {
    #x;
    #y;
    #largura;
    #altura;
    #idSprite;
    #contexto;

    constructor (x,y,largura,altura,idSprite, contexto) {
        this.#x = x;
        this.#y = y;
        this.#largura = largura;
        this.#altura = altura;
        this.#idSprite = idSprite;
        this.#contexto = contexto;
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
            throw new Error("Y deve ser do tipo Number.");
        }
        this.#y = y;
    }

    get largura() {
        return this.#largura;
    }
    set largura(largura) {
        if (typeof largura !== "number") {
            throw new Error("Largura deve ser do tipo number");
        }
        this.#largura = largura;
    }

    get altura() {
        return this.#altura;
    }
    set altura(altura) {
        if (typeof altura !== "number") {
            throw new Error("Altura deve ser do tipo number");
        }
        this.#altura = altura;
    }

    get idSprite() {
        return this.#idSprite;
    }
    set idSprite(id) {
        if (typeof id !== "string" && (document.getElementById(img) !== null)) {
            throw new Error("Img deve ser o ID de um elemento <img> HTML.");
        }
        this.#idSprite = document.getElementById(id);
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


    DesenhaNaTela() {
        this.#contexto.drawImage(document.getElementById(this.#idSprite), this.#x, this.#y, this.#largura, this.#altura);
    }
}