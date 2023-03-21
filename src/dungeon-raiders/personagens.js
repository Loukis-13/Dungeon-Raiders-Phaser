export class Personagem {
    #vida
    #moedas

    constructor(nome, vida, moedas, imagem, cartas) {
        this.nome = nome;
        this.#vida = vida;
        this.#moedas = moedas;
        this.imagem = imagem;
        this.cartas = cartas;
        this.ultima;
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

    jogar(tipo) {
        var carta;
        while (true) {
            carta = this.cartas[Math.floor(Math.random() * this.cartas.length)];
            if (((carta == 'chave') && (tipo != 'Tesouro')) || ((carta == 'espada') && (tipo != 'Monstro')))
                continue;
            if ((carta == 'tocha') || (carta == 'bola_de_cristal'))
                continue;
            break;
        }
        this.ultima = carta;
        this.cartas.splice(this.cartas.indexOf(carta), 1);
    }

    chefe_jogar(hab) {
        let carta;
        while (true) {
            carta = this.cartas[Math.floor(Math.random() * this.cartas.length)];
            if (hab.includes(3) && (carta == 'espada'))
                continue;
            if (hab.includes(7) && (carta == 'bola_de_cristal'))
                continue;
            break;
        }
        this.ultima = [carta, '0'];
        this.cartas.splice(this.cartas.indexOf(carta), 1);

        this.cartas.push('0', '0', '0');
        while (true) {
            carta = this.cartas[Math.floor(Math.random() * this.cartas.length)];
            if (hab.includes(3) && carta == 'espada')
                continue;
            if (hab.includes(7) && carta == 'bola_de_cristal')
                continue;
            break;
        }
        this.ultima[1] = carta;
        this.cartas.splice(this.cartas.indexOf(carta), 1);
    }

    redefinir() {
        this.cartas = this.cartas.filter(c => !['1', '2', '3', '4', '5'].includes(c))
        this.cartas = ['1', '2', '3', '4', '5', ...this.cartas]
    }
}