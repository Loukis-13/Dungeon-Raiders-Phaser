import { DICT_CARTAS } from "./utils.js"

export class Tesouro {
    constructor(baus, imagem) {
        this.baus = baus
        this.imagem = imagem
        this.escuro = false
    }

    resolver(game) {
        const { jogs } = game
        const dictCartas = { ...DICT_CARTAS, chave: 5 }

        let valCartas = jogs.map(j => dictCartas[j.ultima[0]]).filter(i => i > 0)
        let max = -1

        for (const bau of this.baus) {
            valCartas = valCartas.map(i => i != max ? i : 0)
            max = Math.max(...valCartas)

            const x = Math.floor(bau / valCartas.filter(i => i == max).length)
            for (const [i, jog] of jogs.entries()) {
                if (valCartas[i] == max) {
                    jog.moedas += x
                    game.resultadoPersona[i].setText(`+${x}`).setColor('#ff0')
                }
            }
        }
    }
}
