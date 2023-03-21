import { DICT_CARTAS } from "./utils.js"

export class Tesouro {
    constructor(bau1, bau2, imagem) {
        this.bau1 = bau1
        this.bau2 = bau2
        this.imagem = imagem
        this.escuro = false
    }

    resolver(jogs) {
        let din = Array(jogs.length).fill(['', '#ff0'])
        let valCartas = jogs.map(j => DICT_CARTAS[j.ultima]).sort((a, b) => a - b)
        let max = Math.max(...valCartas)

        let x = Math.floor(this.bau1 / valCartas.filter(i => i == max).length)
        for (let [i, jog] of jogs.entries()) {
            if (DICT_CARTAS[jog.ultima] == max) {
                jog.moedas += x
                din[i] = [`+${x}`, '#ff0']
            }
        }

        if (this.bau2) {
            valCartas = valCartas.filter(i => i != max)
            max = Math.max(...valCartas)

            if (valCartas.length > 0) {
                x = Math.floor(this.bau2 / valCartas.filter(i => i == max).length)
                for (let [i, jog] of jogs.entries()) {
                    if (DICT_CARTAS[jog.ultima] == max) {
                        jog.moedas += x
                        din[i] = [`+${x}`, '#ff0']
                    }
                }
            }
        }

        return ['', din, false]
    }
}
