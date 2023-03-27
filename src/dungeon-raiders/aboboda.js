export class Aboboda {
	constructor(id, imagem) {
        if (id == 1)
		    this.itens = [['tocha', 'c'], ['bola_de_cristal', 'c'], ['chave', 'c'], ['espada', 'c'], [1, 'v']]
        else
            this.itens = [[1, 'm'], [2, 'm'], [1, 'v'], [3, 'm'], [2, 'v']]

		this.imagem = imagem
		this.escuro = false
	}

	resolver(game) {
        const { jogs } = game

		for (let [i, jog] of jogs.entries()) {
            let [item, type] = this.itens[Number(jog.ultima[0]) - 1]

            switch (type) {
                case 'c':
                    jog.cartas.push(item)
                    game.resultadoAboboda[i].setTexture(item)
                    break;
                case 'v':
                    jog.vida += item
                    game.resultadoPersona[i].setText(`+${item}`).setColor('#f00')
                    break;
                case 'm':
                    jog.moedas += item
                    game.resultadoPersona[i].setText(`+${item}`).setColor('#ff0')
                    break;
            }
        }
	}
}
