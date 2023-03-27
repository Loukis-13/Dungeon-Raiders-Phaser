import { DICT_CARTAS } from "./utils.js"

export class Chefe extends Monstro {
    constructor(nome, vida, dano, imagem, dictCartas) {
        super(nome, vida, dano, imagem)
        this.dictCartas = dictCartas || DICT_CARTAS
    }
}

export class MatilhaDeLobos extends Chefe {
    constructor() {
        super("Matilha de Lobos", { 3: 14, 4: 14, 5: 18 }, 3, 'matilha_de_lobos')
    }

    atacar(jog) {
        if (!jog.ultima.includes('tocha') && jog.ultima.map(j => this.dictCartas[j]).includes(this.valCartas[0])) {
            jog.vida -= this.dano
            return true
        }
    }
}

// TODO: implementar habilidade de baú do Megadragão
export class Megadragao extends Chefe {
    constructor() {
        super('Megadragão', { 3: 16, 4: 23, 5: 29 }, 4, 'megadragao')
    }

    atacar(jog) {
        if (jog.ultima.map(j => this.dictCartas[j]).includes(this.valCartas[0])) {
            jog.vida -= this.dano
            return true
        }
    }
}

export class Medusa extends Chefe {
    constructor() {
        super('Medusa', { 3: 12, 4: 14, 5: 20 }, 10, 'medusa')
    }

    atacar(jog) {
        if (jog.ultima.map(j => this.dictCartas[j]).includes(this.valCartas[0])) {
            jog.vida -= this.dano
            return true
        }
    }
}

export class Minotauro extends Chefe {
    constructor() {
        super('Minotauro', { 3: 11, 4: 15, 5: 19 }, 4, 'minotauro')
    }

    atacar(jog) {
        if (jog.ultima.map(j => this.dictCartas[j]).includes(this.valCartas[this.valCartas.length - 1])) {
            jog.vida -= this.dano
            return true
        }
    }
}

export class ColetorDeImpostos extends Chefe {
    constructor() {
        super('Coletor de Impostos', { 3: 14, 4: 18, 5: 23 }, 4, 'coletor_de_impostos')
    }

    atacar(jog) {
        if (jog.ultima.map(j => this.dictCartas[j]).includes(this.valCartas[0])) {
            jog.vida -= this.dano
            jog.moedas -= this.valCartas[this.valCartas.length - 1]
            return true
        }
    }
}

export class Golem extends Chefe {
    constructor() {
        super('Golem', { 3: 14, 4: 18, 5: 23 }, 0, 'golem')
    }

    atacar(jog) {
        if (jog.ultima.map(j => this.dictCartas[j]).includes(this.valCartas[0])) {
            this.dano = this.valCartas[this.valCartas.length - 1]
            jog.vida -= this.dano
            return true
        }
    }
}

export class Necromante extends Chefe {
    constructor() {
        super('Necromante', { 3: 12, 4: 15, 5: 19 }, 2, 'necromante')
    }

    atacar(jog) {
        if (
            jog.ultima.map(j => this.dictCartas[j]).includes(this.valCartas[0]) ||
            jog.ultima.map(j => this.dictCartas[j]).includes(this.valCartas.filter(x => x != this.valCartas[0])[0])
        ) {
            jog.vida -= this.dano
            return true
        }
    }
}

export class Vampiro extends Chefe {
    constructor() {
        super('Vampiro', { 3: 14, 4: 18, 5: 23 }, 3, 'vampiro', { ...DICT_CARTAS, tocha: 3 })
    }

    atacar(jog) {
        if (
            jog.ultima.map(j => this.dictCartas[j]).includes(this.valCartas[0]) ||
            jog.ultima.map(j => this.dictCartas[j]).includes(this.valCartas.filter(x => x != this.valCartas[0])[0])
        ) {
            jog.vida -= this.dano
            return true
        }
    }
}

export class Esfinge extends Chefe {
    constructor() {
        super('Esfinge', { 3: 14, 4: 18, 5: 23 }, 4, 'esfinge', { ...DICT_CARTAS, bola_de_cristal: 5 })
    }

    atacar(jog) {
        if (jog.ultima.map(j => this.dictCartas[j]).includes(this.valCartas[0])) {
            jog.vida -= this.dano
            return true
        }
    }
}

export class Mumia extends Chefe {
    constructor() {
        super('Múmia', { 3: 13, 4: 18, 5: 23 }, 4, 'mumia', { ...DICT_CARTAS, tocha: 5 })
    }

    atacar(jog) {
        if (jog.ultima.map(j => this.dictCartas[j]).includes(this.valCartas[0])) {
            jog.vida -= this.dano
            return true
        }
    }
}

// TODO: implementar habilidade da Hídra
export class Hidra extends Chefe {
    constructor() {
        super('Hídra', { 3: 8, 4: 10, 5: 13 }, 2, 'hidra')
    }

    atacar(jog) {
        if (jog.ultima.map(j => this.dictCartas[j]).includes(this.valCartas[0])) {
            jog.vida -= this.dano
            return true
        }
    }
}
