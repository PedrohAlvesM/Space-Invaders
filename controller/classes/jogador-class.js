export class Jogador {
    #nome;
    #maiorPontuacao;
    #maiorLevel;
    #TOKEN = null;
    #cookies;
    #jogadorLogado = false;

    async RegistrarJogador(form) {
        const dados = new FormData(form);
        dados.append("pontuacao", this.#maiorPontuacao ?? 1);
        dados.append("level", this.#maiorLevel ?? 1);

        if ((dados.get("senha") !== dados.get("confirmar-senha")) && (dados.get("senha").length === 0)) {
            throw new Error("Senhas são diferentes");
        }

        try {
            if (this.#TOKEN === null) await this.PegaToken();

            const requisicao = await fetch(`../../api/criarJogador.php`, 
                { 
                    method: "POST",
                    body: dados,
                    headers: {
                    "mode": "same-origin",
                    } 
                });
            const mensagem = await requisicao.json();
            if (!requisicao.ok || mensagem.erro) {
                return mensagem;
            }

            this.#jogadorLogado = true;
            return mensagem;
        }
        catch (erro) {
            throw erro;
        }
    }

    async LogarJogador(form) {
        const dadosEnviar = new FormData(form);
        
        try {
            if (this.#TOKEN === null) await this.PegaToken();

            const requisicao = await fetch(`../../api/logarJogador.php`, { 
                method: "POST",
                body: dadosEnviar,
                headers: {
                    "mode": "same-origin",
                } 
            });

            const dados = await requisicao.json();
            if (!requisicao.ok || dados.erro) {
                return dados;
            }

            this.nome = dados.nome;
            this.maiorPontuacao = Number(dados.pontuacao);
            this.maiorLevel = Number(dados.level);
            this.#TOKEN = dados.token;

            this.#jogadorLogado = true;

            return dados;
        }
        catch (erro) {
            throw erro;
        }
    }

    async DeletarJogador(form) {
        const dadosEnviar = new FormData(form);
        
        if (dadosEnviar.get("nome") === "" || dadosEnviar.get("senha") === "") {
            throw new Error("Nome ou senha estão vazios.");
        }

        try {
            const requisicao = await fetch("../../api/deletarJogador.php", {
                method: "POST",
                body: dadosEnviar,
                headers: {
                    "mode": "same-origin",
                }
            });

            const dados = await requisicao.json();
            if (!requisicao.ok || dados.erro) {
                return dados;
            }

            return dados;
        }
        catch (erro) {
            throw erro;
        }
    }

    async PegaToken() {
        const url = "../../api/autenticacao.php";
        const resposta = await fetch(url, { method: "POST" });
        if (!resposta.ok) {
            const mensagemErro = await resposta.json();
            return mensagemErro.erro;
        }

        const dado = await resposta.json();
        this.#TOKEN = dado.token;
    }

    get nome() {
        return this.#nome;
    }

    get maiorPontuacao() {
        return this.#maiorPontuacao;
    }

    get maiorLevel() {
        return this.#maiorLevel;
    }

    get TOKEN() {
        return this.#TOKEN;
    }

    get cookies() {
        return this.#cookies;
    }

    get jogadorLogado() {
        return this.#jogadorLogado;
    }

    set nome(valor) {
        if (typeof valor !== "string") {
            throw new Error("O nome deve ser uma string.");
        }
        this.#nome = valor;
    }

    set maiorPontuacao(valor) {
        if (typeof valor !== "number") {
            throw new Error("A maior pontuação deve ser um número.");
        }
        this.#maiorPontuacao = valor;
    }

    set maiorLevel(valor) {
        if (typeof valor !== "number") {
            throw new Error("O maior nível deve ser um número.");
        }
        this.#maiorLevel = valor;
    }

    set TOKEN(valor) {
        if (typeof valor !== "string" || valor !== null) {
            throw new Error("O TOKEN deve ser uma string ou null.");
        }
        this.#TOKEN = valor;
    }

    set cookies(valor) {
        if (typeof valor !== "boolean") {
            throw new Error("Os cookies devem ser do tipo booleano.");
        }
        this.#cookies = valor;
    }

    set jogadorLogado(valor) {
        if (typeof valor !== "boolean") {
            throw new Error("O status do jogador logado deve ser do tipo booleano.");
        }
        this.#jogadorLogado = valor;
    }

}