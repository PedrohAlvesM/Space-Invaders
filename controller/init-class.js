import { Player } from './classes/player-class.js';
import { Inimigo } from './classes/inimigo-class.js';
import { ImagemUI } from './classes/ImagemUI-class.js';
import { TextoUI } from './classes/textoUI-class.js';
import { Jogador } from './classes/jogador-class.js';

export class Jogo {
    constructor() {
        console.log("Alocando variáveis...");
        this.tela = document.getElementById("canvas");
        this.ctx = this.tela.getContext("2d");

        this.jogador = new Jogador();
        this.inimigosArr = [];
        this.player = new Player(10, 0, 50, 50, this.ctx, 3, "nave", 10);
        this.level = 1;

        this.TAMANHO_FONTE = 24;
        this.hudVidaPlayer = [];
        this.hudPontuacao;
        this.hudLevel;
        this.hudMostrarPontos = [];

        this.atualizar;
        this.framerate = 1000 / 60; //60fps
        this.ultimoQuadroAtualizado = 0;
        this.tempoInimigoAtirar = 2000;
        this.ultimoQuadroInimigoAtirou = 0;
        this.ultimoQuadroMudandoLevel = 0;
        this.tempoMudandoLevel = 1500;

        this.perdeu = false;
        this.venceu = false;
        this.mudandoLevel = false;
    }

    DefineTamanhoTelaJogo() {
        console.log("Definindo tamanho da tela...");

        this.tela.width = window.innerWidth / 3;
        this.tela.height = window.innerHeight - 10;
    }

    DesenhaNaTela() {
        this.player.DesenhaNaTela();
        this.inimigosArr.forEach(inimigo => inimigo.DesenhaNaTela());
        this.player.projeteis.forEach(bala => bala.DesenhaNaTela());

        for (let inimigo of this.inimigosArr) {
            inimigo.projeteis.forEach(bala => bala.DesenhaNaTela());
        }

        this.hudVidaPlayer.forEach(img => img.DesenhaNaTela());
        this.hudMostrarPontos.forEach(p => p.DesenhaNaTela(this.framerate));
        this.hudPontuacao.DesenhaPontuacaoNaTela();
        this.hudLevel.DesenhaPontuacaoNaTela();
    }

    AtualizaTela() {
        let quadroAtual = performance.now();

        if (quadroAtual - this.ultimoQuadroAtualizado < this.framerate) {
            requestAnimationFrame(this.AtualizaTela.bind(this));
            return
        }
        if (quadroAtual - this.ultimoQuadroMudandoLevel >= this.tempoMudandoLevel && this.mudandoLevel) {
            this.mudandoLevel = false;
            this.ultimoQuadroMudandoLevel = quadroAtual;
            this.IniciaJogo();
        }

        if (quadroAtual - this.ultimoQuadroInimigoAtirou >= this.tempoInimigoAtirar) {
            this.ultimoQuadroInimigoAtirou = quadroAtual;
            this.InimigoAtirar();
        }
        if (this.player.invencibilidade) this.player.MudarTempoInvencibilidade(this.framerate);
        if (this.player.podeAtirar === false) this.player.MudarTempoAtirar(this.framerate);

        this.ultimoQuadroAtualizado = quadroAtual;

        this.ctx.clearRect(0, 0, this.tela.width, this.tela.height);

        if (this.player.morto || this.perdeu) {
            this.perdeu = true;
            this.GameOver();
            return
        }
        else if (this.inimigosArr.length === 0) {
            if (this.mudandoLevel) {
                new TextoUI(this.tela.width / 2, this.tela.height / 2, `level ${this.level}`, this.ctx, { fonte: "'Press Start 2P'", tamanho: this.TAMANHO_FONTE, cor: "#fff", modificadorFonte: "bold" }, this.tempoMudandoLevel).DesenhaNaTela(this.framerate);
                requestAnimationFrame(this.AtualizaTela.bind(this));
                return
            }

            for (let i = 0; i < this.inimigosArr.length; i++) {
                this.inimigosArr[i].projeteis.forEach(p => p.y = this.tela.height + 1);
            }
            this.player.projeteis.forEach(p => p.y = -1);
            this.DeletaProjetilForaDaTela();

            this.player.projeteis = [];
            this.level++;

            this.mudandoLevel = true;
            this.ultimoQuadroMudandoLevel = performance.now();
            requestAnimationFrame(this.AtualizaTela.bind(this));
            return
        }

        for (let i = 0; i < this.inimigosArr.length; i++) {
            if (this.inimigosArr[i].y - this.inimigosArr[i].altura >= this.player.y - this.player.altura * 2) {
                this.perdeu = true;
                break
            }
        }
        this.inimigosArr = this.inimigosArr.filter(inimigo => !inimigo.morto);
        this.hudMostrarPontos = this.hudMostrarPontos.filter(e => e.tempoTela > 0);

        this.hudPontuacao.texto = String(this.player.pontos);
        this.hudLevel.texto = `level ${this.level}`;
        
        this.inimigosArr.forEach(inimigo => inimigo.Movimento(this.tela.width));
        this.inimigosArr.forEach(inimigo => inimigo.projeteis.forEach(p => p.Viajando()));
        this.player.projeteis.forEach(p => p.Viajando());

        this.DesenhaNaTela();      
        this.DeletaProjetilForaDaTela();
        this.DetectaColisao();

        if (!this.player.morto || !this.perdeu) {
            requestAnimationFrame(this.AtualizaTela.bind(this));
        }
    }

    DetectaColisao() {

        for (let i = 0; i < this.player.projeteis.length; i++) {
            for (let j = 0; j < this.inimigosArr.length; j++) {

                let colidiu = this.inimigosArr[j].Colisao(this.player.projeteis[i].x, this.player.projeteis[i].y);

                if (colidiu) {
                    let pontuacao = {
                        "nave-inimigo": 10,
                        "nave-inimigo-aleatorio": 20,
                        "nave-inimigo-forte": 30,
                    }
                    let pontos = pontuacao[this.inimigosArr[j].sprite];
                    this.player.AumentarPontos(pontos);

                    let t = new TextoUI(this.inimigosArr[j].x, this.inimigosArr[j].y, `+${pontos}`, this.ctx, { fonte: "'Press Start 2P'", tamanho: this.TAMANHO_FONTE, cor: "#fff", modificadorFonte: "bold" }, 300);
                    this.hudMostrarPontos.push(t);
                    this.player.projeteis[i].morto = true;
                    console.log("Inimigo morto");
                    console.log("Colisão entre projetil e inimigo");
                    break
                }
            }

        }

        if (!this.player.invencibilidade) {
            for (let i = 0; i < this.inimigosArr.length; i++) {
                for (let j = 0; j < this.inimigosArr[i].projeteis.length; j++) {
                    let colidiu = this.player.Colisao(this.inimigosArr[i].projeteis[j].x, this.inimigosArr[i].projeteis[j].y);
                    if (colidiu) {
                        console.log("Colisão entre projetil e player\nVida do player: " + this.player.vida);

                        this.player.invencibilidade = true;
                        this.inimigosArr[i].projeteis[j].morto = true;
                        this.hudVidaPlayer.pop();
                        break
                    }
                }
            }
        }
    }

    CriaInimigos(nLinhas, nInimigos, largura, altura) {
        console.log("Criando inimigos...");

        let inimigoPLinha = Math.floor(nInimigos / nLinhas);

        const espacoEntreInimigo = 5;
        const totalLarguraInimigos = nInimigos * largura + (nInimigos - 1) * espacoEntreInimigo;
        const startX = this.tela.width - totalLarguraInimigos;

        for (let i = 0; i < nLinhas; i++) {
            for (let j = 0; j < inimigoPLinha; j++) {
                let inicio = (largura * j) + j * 10;

                if (i === 0) {
                    this.inimigosArr.push(new Inimigo(inicio, altura * i * 1.5, largura, altura, this.ctx, 1, "nave-inimigo-forte", this.level / 5, true));
                }
                else if (i === 1) {
                    this.inimigosArr.push(new Inimigo(inicio, altura * i * 1.5, largura, altura, this.ctx, 1, "nave-inimigo-aleatorio", this.level / 5, true));
                }
                else {
                    this.inimigosArr.push(new Inimigo(inicio, altura * i * 1.5, largura, altura, this.ctx, 1, "nave-inimigo", this.level / 5, false));
                }
            }
        }

        console.log("Inimigos criados");
    }

    InimigoAtirar() {
        if (this.inimigosArr.length === 0) return

        let atira = Math.floor(Math.random() * this.inimigosArr.length);
        if (!this.inimigosArr[atira]) {
            atira = Math.floor(Math.random() * this.inimigosArr.length);
        }
        this.inimigosArr[atira].Atirar();
    }

    DeletaProjetilForaDaTela() {
        this.player.projeteis = this.player.projeteis.filter(p => p.y > 0 || !p.morto);

        for (let i = 0; i < this.inimigosArr.length; i++) {
            this.inimigosArr[i].projeteis = this.inimigosArr[i].projeteis.filter(p => p.y < this.tela.height || !p.morto);
        }
    }

    async GameOver() {
        for (let i = 0; i < this.inimigosArr.length; i++) {
            this.inimigosArr[i].projeteis.forEach(p => p.y = this.tela.height + 1);
        }
        this.DeletaProjetilForaDaTela();

        this.ctx.clearRect(0, 0, this.tela.width, this.tela.height);

        new TextoUI(this.tela.width / 2, this.tela.height / 2, "Game Over", this.ctx, { fonte: "'Press Start 2P'", tamanho: this.TAMANHO_FONTE, cor: "#fff", modificadorFonte: "bold" }, Infinity).DesenhaNaTela(this.framerate);
        new TextoUI(this.tela.width / 2, this.tela.height / 2 + this.TAMANHO_FONTE * 2, `Pontuação: ${this.player.pontos}`, this.ctx, { fonte: "'Press Start 2P'", tamanho: this.TAMANHO_FONTE, cor: "#fff", modificadorFonte: "bold" }, Infinity).DesenhaNaTela(this.framerate);


        let highScore = Number(localStorage.getItem("highScore"));
        if (this.player.pontos > highScore) {
            localStorage.removeItem("highScore");
            localStorage.setItem("highScore", this.player.pontos);

            this.jogador.maiorPontuacao = this.player.pontos;
            this.jogador.maiorLevel = this.level;

            highScore = this.player.pontos;

            if (this.jogador.TOKEN) await this.AtualizaPontuacaoOnline();
        }

        new TextoUI(this.tela.width / 2, this.tela.height / 2 + this.TAMANHO_FONTE * 4, `High Score: ${highScore}`, this.ctx, { fonte: "'Press Start 2P'", tamanho: this.TAMANHO_FONTE, cor: "#fff", modificadorFonte: "bold" }, Infinity).DesenhaNaTela(this.framerate);
    }

    async AtualizaPontuacaoOnline() {
        if (!this.jogador.cookies || this.jogador.TOKEN === null) {
            return
        }
        const dados = new FormData();
        dados.append("nome", this.jogador.nome);
        dados.append("pontuacao", this.player.pontos);
        dados.append("level", this.level);

        try {
            const resposta = await fetch(`../api/atualizarJogador.php`, { method: "POST", body: dados });
            const dados = await resposta.json();
            if (!resposta.ok || dados.erro) {
                return dados;
            }

            return dados;
        }
        catch (erro) {
            throw erro;
        }
    }

    IniciaJogo() {
        console.log("Iniciando jogo...");

        this.DefineTamanhoTelaJogo();
        this.CriaInimigos(5, 5, 50, 50);

        if (this.level > 1) {
            this.AtualizaTela();
            return
        }


        this.player.x = this.tela.width / 2 - this.player.largura / 2;
        this.player.y = this.tela.height - this.player.altura;

        for (let i = 0; i < this.player.vida; i++) {
            let tamanho = 25;
            this.hudVidaPlayer.push(new ImagemUI(tamanho * i, 0, tamanho, tamanho, "nave", this.ctx));
        }
        this.hudPontuacao = new TextoUI(this.tela.width / 2, 24, "0000", this.ctx, { fonte: "'Press Start 2P'", tamanho: this.TAMANHO_FONTE, cor: "#fff", modificadorFonte: "bold" }, Infinity);
        this.hudLevel = new TextoUI(this.tela.width - 85, 18, `level ${this.level}`, this.ctx, { fonte: "'Press Start 2P'", tamanho: 18, cor: "#fff", modificadorFonte: "bold" }, Infinity)

        this.DetectaTeclaPressionada();
        this.AtualizaTela(document.timeline.currentTime);
    }



    DetectaTeclaPressionada() {
        console.log("Ativando detecção de teclado...");

        window.addEventListener("keydown", (e) => {
            this.player.Acoes(e, this.tela.width);
        });
    }
}