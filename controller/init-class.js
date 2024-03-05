import { Player } from './classes/player-class.js';
import { Inimigo } from './classes/inimigo-class.js';
import { ImagemUI } from './classes/ImagemUI-class.js';
import { TextoUI } from './classes/textoUI-class.js';

export class Jogo {
    constructor() {
        console.log("Alocando variáveis...");
        this.tela = document.getElementById("canvas");
        this.ctx = this.tela.getContext("2d");

        this.inimigosArr = [];
        this.player = new Player(10, 0, 50, 50, this.ctx, 3, "nave", 10);
        this.level = 1;

        this.hudVidaPlayer = [];
        this.hudPontuacao;
        this.hudLevel;
        this.hudMostrarPontos = [];


        this.framerate;
        this.perdeu = false;
        this.venceu = false;

        this.TOKEN;
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
        this.hudMostrarPontos.forEach(p => p.DesenhaNaTela());
        this.hudPontuacao.DesenhaPontuacaoNaTela();
        this.hudLevel.DesenhaPontuacaoNaTela();
    }

    AtualizaTela() {
        this.ctx.clearRect(0, 0, this.tela.width, this.tela.height);

        if (this.player.morto || this.perdeu) {
            this.perdeu = true;
            this.GameOver();
            return
        }
        else if (this.inimigosArr.length === 0) {
            for (let i = 0; i < this.inimigosArr.length; i++) {
                this.inimigosArr[i].projeteis.forEach(p => p.y = this.tela.height+1);
            }
            this.player.projeteis.forEach(p => p.y = -1);
            this.DeletaProjetilForaDaTela();

            this.player.projeteis = [];
            this.level++;
            
            new TextoUI(this.tela.width/2, this.tela.height/2, `level ${this.level}`, this.ctx, { fonte: "'Press Start 2P'", tamanho: 24, cor: "#fff", modificadorFonte: "bold" }).DesenhaNaTela();
            
            setTimeout(()=>{
                this.IniciaJogo();
            }, 1000);
            return

        }

        for (let i = 0; i < this.inimigosArr.length; i++) {
            if (this.inimigosArr[i].morto) {
                this.inimigosArr[i].projeteis.forEach(p => p.morto = true);
                this.inimigosArr.splice(i, 1);
                continue
            }

            if (this.inimigosArr[i].y-this.inimigosArr[i].altura >= this.player.y-this.player.altura*2) {
                this.perdeu = true;
                break
            }

            this.inimigosArr[i].Movimento(this.tela.width);
        }

        this.hudPontuacao.texto = String(this.player.pontos);
        this.hudLevel.texto = `level ${this.level}`;

        this.DesenhaNaTela();
        this.DeletaProjetilForaDaTela();
        this.DetectaColisao();

        if (!this.player.morto || !this.perdeu) {
            this.framerate = requestAnimationFrame(this.AtualizaTela.bind(this));
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

                    let t = new TextoUI(this.inimigosArr[j].x, this.inimigosArr[j].y, `+${pontos}`, this.ctx, { fonte: "'Press Start 2P'", tamanho: 24, cor: "#fff", modificadorFonte: "bold" });
                    this.hudMostrarPontos.push(t);
                    setTimeout(() => {
                        let i = this.hudMostrarPontos.indexOf(t);
                        this.hudMostrarPontos.splice(i, 1);
                    }, 300);
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
                        setTimeout(() => { this.player.invencibilidade = false; }, 1000);

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
                    this.inimigosArr.push(new Inimigo(inicio, altura * i * 1.5, largura, altura, this.ctx, 1, "nave-inimigo-forte", this.level/5, true));
                }
                else if (i === 1) {
                    this.inimigosArr.push(new Inimigo(inicio, altura * i * 1.5, largura, altura, this.ctx, 1, "nave-inimigo-aleatorio", this.level/5, true));
                }
                else {
                    this.inimigosArr.push(new Inimigo(inicio, altura * i * 1.5, largura, altura, this.ctx, 1, "nave-inimigo", this.level/5, false));
                }
            }
        }

        console.log("Inimigos criados");
    }

    InimigosAtirarem(cotroleIntervalo) {
        if (this.inimigosArr.length < 1 || this.perdeu || this.venceu) {
            clearInterval(cotroleIntervalo);
            return
        }

        let atira = Math.floor(Math.random() * this.inimigosArr.length);
        if (!this.inimigosArr[atira]) {
            atira = Math.floor(Math.random() * this.inimigosArr.length);
        }
        this.inimigosArr[atira].Atirar();

    }

    DeletaProjetilForaDaTela() {
        for (let i = 0; i < this.player.projeteis.length; i++) {
            if (this.player.projeteis[i].y < 0 || this.player.projeteis[i].morto) {
                this.player.projeteis.splice(i, 1);
                console.log("Projetil fora da tela deletado");
            }
        }
        
        for (let i = 0; i < this.inimigosArr.length; i++) {
            for (let j = 0; j < this.inimigosArr[i].projeteis.length; j++) {
                if (this.inimigosArr[i].projeteis[j].y > this.tela.height || this.inimigosArr[i].projeteis[j].morto) {
                    this.inimigosArr[i].projeteis.splice(j, 1);
                    console.log("Projetil fora da tela deletado");
                }
            }
        }
    }

    GameOver() {
        for (let i = 0; i < this.inimigosArr.length; i++) {
            this.inimigosArr[i].projeteis.forEach(p => p.y = this.tela.height+1);
        }
        this.DeletaProjetilForaDaTela();

        this.ctx.clearRect(0,0,this.tela.width, this.tela.height);

        let pontuacao = 0;
        new TextoUI(this.tela.width/2, this.tela.height/2, "Game Over", this.ctx, {fonte: "'Press Start 2P'", tamanho: 24, cor: "#fff", modificadorFonte: "bold"}).DesenhaNaTela();
        new TextoUI(this.tela.width/2, this.tela.height/2+48, `Pontuação: ${this.player.pontos}`, this.ctx, {fonte: "'Press Start 2P'", tamanho: 24, cor: "#fff", modificadorFonte: "bold"}).DesenhaNaTela();

        try {
            if (localStorage.getItem("highScore") === null) {
                localStorage.setItem("highScore", this.player.pontos);
            }
            else {
                let highScore = Number(localStorage.getItem("highScore"));
                if (this.player.pontos > highScore) {
                    localStorage.removeItem("highScore");
                    localStorage.setItem("highScore", this.player.pontos);
                    pontuacao = this.player.pontos;
                }
                else {
                    pontuacao = highScore;
                }
            }
        }
        catch (e) {
            new TextoUI(this.tela.width/2, this.tela.height/2+96, `Não foi possível obter ou salvar o High Score`, this.ctx, {fonte: "'Press Start 2P'", tamanho: 16, cor: "#fff", modificadorFonte: "bold"}).DesenhaNaTela();
        }
        //this.AtualizaPontuacaoOnline();

        new TextoUI(this.tela.width/2, this.tela.height/2+96, `High Score: ${pontuacao}`, this.ctx, {fonte: "'Press Start 2P'", tamanho: 24, cor: "#fff", modificadorFonte: "bold"}).DesenhaNaTela();

        setTimeout(()=>{
            document.getElementsByClassName("modal")[0].style.display = "grid";
        }, 2000);
    }

    async PegaToken() {
        const url = "../model/autenticacao.php";
        const resposta = await fetch(url, {method: "POST"});
        if (!resposta.ok) {
            throw new Error("Erro ao fazer requisição do Token: "+ resposta.status);
        }
        
        return await resposta.json();
    }

    async AtualizaPontuacaoOnline() {
        const dados = new FormData();
        dados.append("nome", "Pedeo");
        dados.append("pontuacao", this.player.pontos);
    
        fetch("../model/criarJogador.php", {
            method: "POST",
            body: dados,
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } 
                throw new Error(`Erro na requisição: ${response.statusText}`);
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(`Erro durante a requisição: ${error.message}`);
            });
    }
    
    async ObterTopPontuacoes(quantidade) {
        try {
            const resposta = await fetch(`../model/getRankingPontuacao.php?quantidade=${quantidade}`, {method: "GET"});
            if (!resposta.ok) {
                throw new Error("Erro durante a requisição: "+resposta.statusText);
            }
    
            return await resposta.json();
        }
        catch(erro) {
            return erro
        }
    }

    async IniciaJogo() {
        console.log("Iniciando jogo...");
        this.TOKEN = await this.PegaToken();
        
        this.DefineTamanhoTelaJogo();
        this.CriaInimigos(5, 25, 50, 50);
        
        if (this.inimigosArr.length > 0) {
            let iniciaTiroteio = setInterval(() => {
                this.InimigosAtirarem(iniciaTiroteio);
            }, 2000);
        }

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
        this.hudPontuacao = new TextoUI(this.tela.width/2, 24, "0000", this.ctx, { fonte: "'Press Start 2P'", tamanho: 24, cor: "#fff", modificadorFonte: "bold" });
        this.hudLevel = new TextoUI(this.tela.width - 85, 18, `level ${this.level}`, this.ctx, { fonte: "'Press Start 2P'", tamanho: 18, cor: "#fff", modificadorFonte: "bold" })

        this.DetectaTeclaPressionada();
        this.AtualizaTela();
    }

    DetectaTeclaPressionada() {
        console.log("Ativando detecção de teclado...");

        window.addEventListener("keydown", (e) => {
            this.player.Acoes(e, this.tela.width);
        });
    }
}