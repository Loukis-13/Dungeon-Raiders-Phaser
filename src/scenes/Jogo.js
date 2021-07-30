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
        this.sw = this.cameras.main.width;
        this.sh = this.cameras.main.height;
        this.style = {font: "32px Pirata_One"};

        this.masmorra = 0;
        this.sala = 0;

        this.jogs = gerar_jogadores(this.qjog, this.escolha)
        this.masmorras = gerar_masmorra()

        this.escolha = ""

        // console.log(jogs)
        // console.log(masmorras)

        this.cameras.main.fadeIn(100, 0, 0, 0)

        let image = this.add.image(this.sw/2, this.sh/2, 'fundo');
        image.displayWidth = this.sw;
        image.displayHeight = this.sh;

        new Botao(this, 130, 40, 'Menu', this.style, 'Escolha')

        let conteudoSala = this.add.image(this.sw/2, this.sh/2.2, this.masmorras[this.masmorra][this.sala].imagem)
        conteudoSala.setScale(this.sh/conteudoSala.height/2)

        this.infoJogs()

        this.cartasJogador()

        this.mapa()

        // this.plugins.get('rexgrayscalepipelineplugin').add(xx);
    }

    infoJogs() {
        let h = 150
        for (let jog of this.jogs) {
            let per = this.add.image(110, h, jog.imagem)
            per.setScale(.75)

            let vida = this.add.text(per.x+16, per.y, jog.vida, this.style).setOrigin(.5)

            let moedas = this.add.text(per.x+69, per.y, jog.moedas, this.style).setOrigin(.5)

            h += 100
        }
    }

    cartasJogador() {
        this.cartaSelec = this.add.image(-500, -500, 'selecionado').setScale(.36).setOrigin(.5, 1).setDepth(1)

        let w = this.sw/4
        for (let carta of this.jogs[0].cartas) {
            let cartaImg = this.add.image(w, this.sh, carta)
            cartaImg.setOrigin(.5, 1)
            cartaImg.setScale(.6)
            if (
                ((carta == 'chave') && (this.masmorras[this.masmorra][this.sala].tipo != 'Tesouro') && (this.masmorras[this.masmorra][this.sala].tipo != 'Chefe')) ||
                ((carta == 'espada') && (((this.masmorras[this.masmorra][this.sala].tipo != 'Monstro') && (this.masmorras[this.masmorra][this.sala].tipo != 'Chefe')) || (3 in this.masmorras[this.masmorra][this.sala].hab))) ||
                ((carta == 'boladecristal') && (7 in this.masmorras[this.masmorra][this.sala].hab))
            ) {
                this.plugins.get('rexgrayscalepipelineplugin').add(cartaImg);
            } else {
                cartaImg.setInteractive({useHandCursor: true})
                cartaImg.on('pointerdown', ()=>{
                    this.escolha = carta

                    this.cartaSelec.setPosition(cartaImg.x, cartaImg.y)
                });
            }

            w += cartaImg.width/1.7
        }
    }

    mapa() {
        let w = this.sw/4*3 +6
        for (let sala of this.masmorras[this.masmorra]) {
            let s;
            if (sala.escuro)
                s = this.add.image(w, 0, 'vazio').setOrigin(1, 0).setScale(.25)
            else
                s = this.add.image(w, 0, sala.imagem).setOrigin(1, 0).setScale(.25)
            w += s.width * .25 -2
        }
    }
}