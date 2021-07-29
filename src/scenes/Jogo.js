import Botao from "../objects/Botao.js";

import {gerar_jogadores, gerar_masmorra} from "../DungeonRaiders.js"

export default class Jogo extends Phaser.Scene {
    constructor() {
        super('Jogo');
    }

    init(data) {
        this.escolha = data.escolha;
        this.qjog = data.qjog;
    }

    preload() {
        
    }

    create() {
        let sw = this.cameras.main.width;
        let sh = this.cameras.main.height;
        let style = {font: "32px Pirata_One"};

        var masmorra = 0;
        var sala = 0;

        let jogs = gerar_jogadores(this.qjog, this.escolha)
        let masmorras = gerar_masmorra()

        // console.log(jogs)
        // console.log(masmorras)

        this.cameras.main.fadeIn(100, 0, 0, 0)

        let image = this.add.image(sw/2, sh/2, 'fundo');
        image.displayWidth = sw;
        image.displayHeight = sh;

        new Botao(this, 130, 40, 'Menu', style, 'Escolha')

        let conteudoSala = this.add.image(sw/2, sh/2.2, masmorras[masmorra][sala].imagem)
        conteudoSala.setScale(sh/conteudoSala.height/2)

        let h = 150
        for (let i of jogs) {
            let per = this.add.image(110, h, i.imagem)
            per.setScale(sh/conteudoSala.height/4)
            h += 100
        }

        // this.plugins.get('rexgrayscalepipelineplugin').add(xx);
    }
}