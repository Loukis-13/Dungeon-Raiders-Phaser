import Botao from "../objects/Botao.js";

export default class FimDeJogo extends Phaser.Scene {
    constructor() {
        super('FimDeJogo');
    }

    init(data) {
        this.jogs = data.jogs;

        if (!this.sound.get('fim')) {
            this.sound.removeAll()
            this.sound.play('fim')
            this.sound.get('fim')
        }
    }

    create() {
        let sw = this.cameras.main.width;
        let sh = this.cameras.main.height;
        let style = { font: "32px Pirata_One" };

        let image = this.add.image(sw / 2, sh / 2, 'fundo');
        image.displayWidth = sw;
        image.displayHeight = sh;

        let h = 120
        for (let jog of this.jogs) {
            let per = this.add.image(105, h, jog.imagem).setScale(.70);
            this.add.text(per.x + 16, per.y, jog.vida, { font: "28px Pirata_One" }).setOrigin(.5);
            this.add.text(per.x + 64, per.y, jog.moedas, { font: "28px Pirata_One" }).setOrigin(.5);

            h += 95;
        }

        this.add.text(sw / 2, sh / 4, "FIM DE JOGO", { font: "120px Pirata_One", stroke: '#000', strokeThickness: 2 }).setOrigin(.5);

        let vivos = this.add.text(sw / 2, sh / 4 * 2 - 40, '', { font: "40px Pirata_One", stroke: '#000', strokeThickness: 2 }).setOrigin(.5);
        let mortos = this.add.text(sw / 2, sh / 4 * 2 + 60, '', { font: "40px Pirata_One", stroke: '#000', strokeThickness: 2 }).setOrigin(.5);

        if (this.jogs.length == 1) {
            vivos.setText('Todos estão mortos, exceto tu')
            mortos.setText('Venceste')
        } else if (this.jogs.length == 2) {
            let [j1, j2] = this.jogs

            if (j1.moedas == j2.moedas && j1.vida == j2.vida) {
                vivos.setText('Empate')
            } else {
                let vencedor;
                if (j1.moedas == j2.moedas)
                    vencedor = j2.vida > j1.vida
                else
                    vencedor = j2.moedas > j1.moedas
                vivos.setText(`Jogador ${this.jogs[vencedor].nome} vence a partida`)
            }
        } else {
            let vida = new Set(this.jogs.map(jog => jog.vida))
            let vidaMin = Math.min(...vida)
            let moeda = new Set(this.jogs.filter(jog => jog.vida > vidaMin).map(jog => jog.moedas))
            let moedaMax = Math.max(...moeda)

            if (vida.size == 1 && moeda.size == 1) {
                vivos.setText('Todos vencem')
            } else {
                const es = ["", "es"]
                const m = ["", "m"]

                if (vida.size > 1) {
                    let nomes = this.jogs.filter(j => j.vida == vidaMin).map(j => j.nome)
                    let n = Number(nomes.length > 1)
                    mortos.setText(`Jogador${es[n]} ${nomes.join(', ')} morre${m[n]}`)
                } else {
                    mortos.setText('Ninguém morre')
                }

                if (moeda.size > 1) {
                    let nomes = this.jogs.filter(j => j.vida > vidaMin && j.moedas == moedaMax).map(j => j.nome)
                    let n = Number(nomes.length > 1)
                    vivos.setText(`Jogador${es[n]} ${nomes.join(', ')} vence${m[n]} a partida`)
                } else {
                    vivos.setText('Empate')
                }
            }
        }

        new Botao(this, sw / 3, sh / 4 * 3, 'Jogar Novamente', style, 'Escolha');
        new Botao(this, sw / 3 * 2, sh / 4 * 3, 'Menu', style, 'Menu');
    }
}
