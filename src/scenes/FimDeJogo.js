import Botao from "../objects/Botao.js";

export default class FimDeJogo extends Phaser.Scene {
    constructor() {
        super('FimDeJogo');
    }

    init(data) {
        this.jogs = data.jogs;
    }

    create() {
        let sw = this.cameras.main.width;
        let sh = this.cameras.main.height;
        let style = {font: "32px Pirata_One"};

        let image = this.add.image(sw/2, sh/2, 'fundo');
        image.displayWidth = sw;
        image.displayHeight = sh;

        let h = 120
        for (let jog of this.jogs) {
            let per = this.add.image(105, h, jog.imagem).setScale(.70);
            this.add.text(per.x+16, per.y, jog.vida, {font: "28px Pirata_One"}).setOrigin(.5);
            this.add.text(per.x+64, per.y, jog.moedas, {font: "28px Pirata_One"}).setOrigin(.5);

            h += 95;
        }

        this.add.text(sw/2, sh/4, "FIM DE JOGO", {font: "120px Pirata_One", stroke: '#000', strokeThickness: 2}).setOrigin(.5);

        let vivos = this.add.text(sw/2, sh/4*2-40, '', {font: "40px Pirata_One", stroke: '#000', strokeThickness: 2}).setOrigin(.5);
        let mortos = this.add.text(sw/2, sh/4*2+60, '', {font: "40px Pirata_One", stroke: '#000', strokeThickness: 2}).setOrigin(.5);

        let plural = n => n==1 ? 0 : 1
        let es = ["", "es"]
        let m  = ["", "m"]

        if (this.jogs.length == 1) {
            vivos.setText('Todos estão mortos, exceto tu')
            mortos.setText('Venceste')
        }
        else if (this.jogs.length == 2) {
            if (this.jogs[0].moedas > this.jogs[1].moedas)
                vivos.setText(`Jogador ${this.jogs[0].nome} vence a partida`)
            else if (this.jogs[1].moedas > this.jogs[0].moedas)
                vivos.setText(`Jogador ${this.jogs[1].nome} vence a partida`)
            else if (this.jogs[0].vida > this.jogs[1].vida)
                vivos.setText(`Jogador ${this.jogs[0].nome} vence a partida`)
            else if (this.jogs[1].vida > this.jogs[0].vida)
                vivos.setText(`Jogador ${this.jogs[1].nome} vence a partida`)
            else
                vivos.setText('Empate')
        }
        else {
            var vida = this.jogs.map(jog=>jog.vida).sort((a,b)=>a-b)
            var moeda = this.jogs.filter(jog=>jog.vida>0).map(jog=>jog.moedas).sort((a,b)=>a-b)
            var nomes = []

            if (new Set(vida).size > 1) {
                for (let jog of this.jogs) {
                    if (jog.vida == vida[0]) {
                        nomes.push(jog.nome);
                    }
                }
                mortos.setText(`Jogador${es[plural(nomes.length)]} ${nomes.join(', ')} morre${m[plural(nomes.length)]}`)

                nomes = [];
                for (let jog of this.jogs) {
                    if (jog.moedas == moeda[moeda.length-1]) {
                        nomes.push(jog.nome)
                    }
                }
                vivos.setText(`Jogador${es[plural(nomes.length)]} ${nomes.join(', ')} vence${m[plural(nomes.length)]} a partida`)
            }
            else if (new Set(vida).size == 1 && new Set(moeda).size > 1) {
                self.ids['morre'].text = 'Ninguém morre'
                for (let jog of this.jogs) {
                    if (jog.moedas == moeda[moeda.length-1]) {
                        nomes.push(jog.nome)
                    }
                }
                vivos.setText(`Jogador${es[plural(nomes.length)]} ${nomes.join(', ')} vence${m[plural(nomes.length)]} a partida`)
            }
            else if (new Set(vida).size == 1 && new Set(moeda).size == 1) {
                vivos.setText('Empate')
            }
        }

        new Botao(this, sw/3, sh/4*3, 'Jogar Novamente', style, 'Escolha');
        new Botao(this, sw/3*2, sh/4*3, 'Menu', style, 'Menu');
    }
}