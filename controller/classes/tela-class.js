export class Tela {
    constructor (conteudo, sujeito) {
        this.conteudo = conteudo;
        this.sujeito = sujeito;
        this.tela;
        this.contexto;
        this.atualiza;
    }
    DefineTela() {
        let novaTela = document.createElement("canvas");
        document.body.appendChild(novaTela);

        this.tela = document.getElementsByTagName("canvas");
        this.tela = this.tela[this.tela.length-1];
        this.contexto = this.tela.getContext("2d");
    }
    DefineTamanhoTela() {
        this.tela.width = window.innerWidth/3;
        this.tela.height = window.innerHeight-10;
    }
    AtualizaTela() {
        contexto.clearRect(0,0, this.tela.width, this.tela,height);
        sujeito.DesenhaNaTela();
        atualiza = window.requestAnimationFrame(this.AtualizaTela.bind(this));
    }

}