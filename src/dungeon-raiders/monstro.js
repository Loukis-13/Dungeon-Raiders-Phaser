import { DICT_CARTAS } from "./utils.js"

export class Monstro {
    constructor(nome, vida, dano, imagem) {
        this.nome = nome
        this.vida = vida
        this.dano = dano
        this.imagem = imagem
        this.escuro = false
        this.morto = false
        this.dictCartas = DICT_CARTAS
        this.valCartas = []
    }

    resolver(game) {
        const { jogs } = game
        let resultado = ''

        // dois jogadores
        if (jogs.length == 2) {
            const [j1, j2] = jogs.map(j => j.ultima.map(i => this.dictCartas[i]).reduce((acc, x) => acc + x, 0))

            if (j1 == j2) {
                resultado = '? ? ?'
            } else {
                const i = j1 > j2
                this.atacar(jogs[i])
                game.resultadoPersona[i].setText(`-${this.dano}`).setColor('#f00')
            }
        } else {
            this.valCartas = jogs
                .map(j => j.ultima.map(i => this.dictCartas[i]).reduce((acc, x) => acc + x, 0))
                .sort((a, b) => a - b);
            const danoTotal = this.valCartas.reduce((acc, x) => acc + x)
            resultado = String(danoTotal)

            if (danoTotal >= this.vida[jogs.length]) {
                this.morto = true
                game.animacaoMorte()
            } else {
                for (let [i, jog] of jogs.entries()) {
                    if (this.atacar(jog)) {
                        game.resultadoPersona[i].setText(`-${this.dano}`).setColor('#f00')
                    }
                }
            }
        }

        game.resultadoTexto.setText(resultado)
    }

    atacar(jog) {
        if (jog.total(this.dictCartas) == this.valCartas[0]) {
            jog.vida -= this.dano
            return true
        }
    }
}
