import { DICT_CARTAS } from "./utils.js"

export class Monstro {
    constructor(nome, vida, dano, imagem) {
        this.nome = nome
        this.vida = vida
        this.dano = dano
        this.imagem = imagem
        this.escuro = false
        this.morto = false
    }

    resolver(jogs) {
        let danos = Array(jogs.length).fill(['', '#f00'])

        // dois jogadores
        if (jogs.length == 2) {
            const [j1, j2] = jogs.map(j => DICT_CARTAS[j.ultima]).reduce((acc, x) => acc + x)

            if (j1 == j2)
                return ['? ? ?', danos, this.morto]

            i = j1 > j2
            jogs[i].vida += this.dano
            danos[i] = [String(-this.dano), '#f00']
            return ['', danos, this.morto]
        }

        let valCartas = jogs.map(j => DICT_CARTAS[j.ultima]).sort((a, b) => a - b)

        const danoTotal = valCartas.reduce((acc, x) => acc + x)

        if (danoTotal >= this.vida[jogs.length]) {
            this.morto = true
        } else {
            for (let [i, jog] of jogs.entries()) {
                if (DICT_CARTAS[jog.ultima] == valCartas[0]) {
                    jog.vida -= this.dano
                    danos[i] = [String(-this.dano), '#f00']
                }
            }
        }

        return [String(danoTotal), danos, this.morto]
    }
}
