import { DICT_CARTAS } from "./utils.js"

export class Chefe {
    constructor(nome, vida, dano, imagem, funcAtacar, dictCartas) {
        this.nome = nome
        this.vida = vida
        this.dano = dano
        this.imagem = imagem
        this.funcAtacar = funcAtacar
        this.escuro = true
        this.morto = false
        this.dictCartas = dictCartas || DICT_CARTAS

        this.danos = []
        this.valCartas = []
    }

    resolver(jogs, funcAtacar) {
        this.danos = Array(jogs.length).fill(['', '#f00']);

        // dois jogadores
        if (jogs.length == 2) {
            const [j1, j2] = jogs.map(j => j.ultima.map(i => DICT_CARTAS[i]).reduce((acc, x) => acc + x))

            if (j1 == j2)
                return ['? ? ?', this.danos, this.morto]

            i = j1 > j2
            funcAtacar(i, jog)
            return ['', this.danos, this.morto]
        }

        this.valCartas = jogs
            .flatMap(j => j.ultima.map(i => DICT_CARTAS[i]))
            .sort((a, b) => a - b);

        const danoTotal = val_cartas.reduce((acc, x) => acc + x)

        if (danoTotal >= this.vida[jogs.length]) {
            this.morto = true
        } else {
            for (let [i, jog] of jogs.entries()) {
                funcAtacar(i, jog)
            }
        }

        return [String(danoTotal), this.danos, this.morto]
    }
}

// TODO: consertar valor da ultima carta dos jogadores
export class MatilhaDeLobos extends Chefe {
    constructor() {
        super("Matilha de Lobos", { 3: 14, 4: 14, 5: 18 }, 3, 'matilha_de_lobos')
    }

    resolver(jogs) {
        super.resolver(jogs, this.#atacar)
    }

    #atacar(i, jog) {
        if (!jog.ultima.includes('tocha') && jog.ultima.map(i => this.dictCartas[i]).includes(this.valCartas[0])) {
            jog.vida -= this.dano
            this.danos[i] = [String(-this.dano), '#f00']
        }
    }
}

// TODO: implementar habilidade de baú do Megadragão
export class Megadragao extends Chefe {
    constructor() {
        super('Megadragão', { 3: 16, 4: 23, 5: 29 }, 4, 'megadragao')
    }

    resolver(jogs) {
        super.resolver(jogs, this.#atacar)
    }

    #atacar(i, jog) {
        if (jog.ultima.includes(this.valCartas[0])) {
            jog.vida -= this.dano
            this.danos[i] = [String(-this.dano), '#f00']
        }
    }
}

export class Medusa extends Chefe {
    constructor() {
        super('Medusa', { 3: 12, 4: 14, 5: 20 }, 10, 'medusa')
    }

    resolver(jogs) {
        super.resolver(jogs, this.#atacar)
    }

    #atacar(i, jog) {
        if (jog.ultima.includes(this.valCartas[0])) {
            jog.vida -= this.dano
            this.danos[i] = [String(-this.dano), '#f00']
        }
    }
}

export class Minotauro extends Chefe {
    constructor() {
        super('Minotauro', { 3: 11, 4: 15, 5: 19 }, 4, 'minotauro')
    }

    resolver(jogs) {
        super.resolver(jogs, this.#atacar)
    }

    #atacar(i, jog) {
        if (jog.ultima.includes(this.valCartas[this.valCartas.length - 1])) {
            jog.vida -= this.dano
            this.danos[i] = [String(-this.dano), '#f00']
        }
    }
}

export class ColetorDeImpostos extends Chefe {
    constructor() {
        super('Coletor de Impostos', { 3: 14, 4: 18, 5: 23 }, 4, 'coletor_de_impostos')
    }

    resolver(jogs) {
        super.resolver(jogs, this.#atacar)
    }

    #atacar(i, jog) {
        if (jog.ultima.includes(this.valCartas[0])) {
            jog.vida -= this.dano
            jog.moedas -= this.valCartas[this.valCartas.length - 1]
            this.danos[i] = [String(-this.dano), '#f00']
        }
    }
}

export class Golem extends Chefe {
    constructor() {
        super('Golem', { 3: 14, 4: 18, 5: 23 }, 0, 'golem')
    }

    resolver(jogs) {
        super.resolver(jogs, this.#atacar)
    }

    #atacar(i, jog) {
        if (jog.ultima.includes(this.valCartas[0])) {
            this.dano = this.valCartas[this.valCartas.length - 1]
            jog.vida -= this.dano
            this.danos[i] = [String(-this.dano), '#f00']
        }
    }
}

export class Necromante extends Chefe {
    constructor() {
        super('Necromante', { 3: 12, 4: 15, 5: 19 }, 2, 'necromante')
    }

    resolver(jogs) {
        super.resolver(jogs, this.#atacar)
    }

    #atacar(i, jog) {
        if (
            jog.ultima.includes(this.valCartas[0]) ||
            jog.ultima.includes(this.valCartas.filter(x => x != this.valCartas[0])[0])
        ) {
            jog.vida -= this.dano
            this.danos[i] = [String(-this.dano), '#f00']
        }
    }
}

export class Vampiro extends Chefe {
    constructor() {
        super('Vampiro', { 3: 14, 4: 18, 5: 23 }, 3, 'vampiro', { ...DICT_CARTAS, tocha: 3 })
    }

    resolver(jogs) {
        super.resolver(jogs, this.#atacar)
    }

    #atacar(i, jog) {
        if (
            jog.ultima.includes(this.valCartas[0]) ||
            jog.ultima.includes(this.valCartas.filter(x => x != this.valCartas[0])[0])
        ) {
            jog.vida -= this.dano
            this.danos[i] = [String(-this.dano), '#f00']
        }
    }
}

export class Esfinge extends Chefe {
    constructor() {
        super('Esfinge', { 3: 14, 4: 18, 5: 23 }, 4, 'esfinge', { ...DICT_CARTAS, bola_de_cristal: 5 })
    }

    resolver(jogs) {
        super.resolver(jogs, this.#atacar)
    }

    #atacar(i, jog) {
        if (jog.ultima.includes(this.valCartas[0])) {
            jog.vida -= this.dano
            this.danos[i] = [String(-this.dano), '#f00']
        }
    }
}

export class Mumia extends Chefe {
    constructor() {
        super('Múmia', { 3: 13, 4: 18, 5: 23 }, 4, 'mumia', { ...DICT_CARTAS, tocha: 5 })
    }

    resolver(jogs) {
        super.resolver(jogs, this.#atacar)
    }

    #atacar(i, jog) {
        if (jog.ultima.includes(this.valCartas[0])) {
            jog.vida -= this.dano
            this.danos[i] = [String(-this.dano), '#f00']
        }
    }
}

// TODO: implementar habilidade da Hídra
export class Hidra extends Chefe {
    constructor() {
        super('Hídra', { 3: 8, 4: 10, 5: 13 }, 2, 'hidra')
    }

    resolver(jogs) {
        super.resolver(jogs, this.#atacar)
    }

    #atacar(i, jog) {
        if (jog.ultima.includes(this.valCartas[0])) {
            jog.vida -= this.dano
            this.danos[i] = [String(-this.dano), '#f00']
        }
    }
}
