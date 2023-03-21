import { DICT_CARTAS } from "./utils.js"

export class Armadilha {
    constructor(nome, afetaTodos, afetaMoedas, imagem) {
        this.nome = nome
        this.afetaTodos = afetaTodos
        this.afetaMoedas = afetaMoedas
        this.imagem = imagem
        this.escuro = false
    }

    resolver(jogs) {
        let danos = Array(jogs.length).fill(['', '#f00'])
        let valCartas = jogs.map(j => DICT_CARTAS[j.ultima]).sort((a, b) => a - b)
        let func
        let val

        if (this.afetaTodos) {
            switch (valCartas[0]) {
                case 1:
                    func = (n) => Math.floor(n / 2)
                    val = '/2'
                    break;
                case 2:
                    func = (n) => n - 2
                    val = '-2'
                    break;
                case 3:
                    func = (n) => n - 1
                    val = '-1'
                    break;
            }

            for (let [i, jog] of jogs.entries()) {
                if (this.afetaMoedas) {
                    jog.moedas = func(jog.moedas)
                    danos[i] = [val, '#ff0']
                } else {
                    jog.vida = func(jog.vida)
                    danos[i] = [val, '#f00']
                }
            }
        } else {
            switch (valCartas[valCartas.length - 1]) {
                case 5:
                    func = (n) => n - 3
                    val = '-3'
                    break;
                case 4:
                    func = (n) => n - 2
                    val = '-2'
                    break;
                case 3:
                    func = (n) => n - 1
                    val = '-1'
                    break;
            }

            let maior = Math.max(...jogs.map(j => this.afetaMoedas ? j.moedas : j.vida))

            for (let [i, jog] of jogs.entries()) {
                if (this.afetaMoedas) {
                    if (jog.moedas == maior) {
                        jog.moedas = func(jog.moedas)
                        danos[i] = [val, '#ff0']
                    }
                } else {
                    if (jog.vida == maior) {
                        jog.vida = func(jog.vida)
                        danos[i] = [val, '#f00']
                    }
                }
            }
        }

        return ['', danos, false]
    }
}
