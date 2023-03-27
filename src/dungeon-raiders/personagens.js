export class Personagem {
    #vida
    #moedas

    constructor(nome, vida, moedas, imagem, cartas) {
        this.nome = nome;
        this.#vida = vida;
        this.#moedas = moedas;
        this.imagem = imagem;
        this.cartas = cartas;
        this.ultima = [];
    }

    get vida() {
        return this.#vida
    }

    set vida(dano) {
        this.#vida = dano
        if (this.#vida < 0) this.#vida = 0
        if (this.#vida > 10) this.#vida = 10
    }

    get moedas() {
        return this.#moedas
    }

    set moedas(qnt) {
        this.#moedas = qnt
        if (this.#moedas < 0) this.#moedas = 0
        if (this.#moedas > 20) this.#moedas = 20
    }

    jogar(classeSala, qnt) {
        this.ultima = []
        qnt = qnt || 1
        for (let index = 0; index < qnt; index++) {
            const cartas = this.cartas.filter(carta => !(
                (carta == "tocha") ||
                (carta == "bola_de_cristal") ||
                ((carta == "chave") && (classeSala != "Tesouro")) ||
                ((carta == "espada") && (classeSala != "Monstro")) ||
                ((carta == "espada") && (classeSala == "Golem")) ||
                ((carta == "bola_de_cristal") && (classeSala == "Necromante"))
            ))

            if (cartas.length == 0) {
                this.ultima.push("0");
                continue
            }

            const carta = cartas[Math.floor(Math.random() * cartas.length)];
            this.ultima.push(carta);
            this.cartas.splice(this.cartas.indexOf(carta), 1);
        }
    }

    redefinir() {
        this.cartas = this.cartas.filter(c => !"12345".includes(c))
        this.cartas = [..."12345", ...this.cartas]
    }
}
