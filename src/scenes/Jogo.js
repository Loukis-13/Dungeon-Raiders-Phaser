import Botao from "../objects/Botao.js";

export default class Jogo extends Phaser.Scene {
    constructor() {
        super('Jogo');
    }

    init(data) {
        this.jogs = data.jogs;
        this.masmorras = data.masmorras;

        this.masmorra = data.masmorra;
        this.sala = data.sala;

        this.escolha = "";
    }

    create() {
        this.sw = this.cameras.main.width;
        this.sh = this.cameras.main.height;
        this.style = {font: "32px Pirata_One"};
        let aviso_style = {font: "55px Pirata_One", stroke: '#000', strokeThickness: 2}

        let image = this.add.image(this.sw/2, this.sh/2, 'fundo');
        image.displayWidth = this.sw;
        image.displayHeight = this.sh;

        new Botao(this, 100, 35, 'Menu', this.style, 'Escolha', 200, 60)

        this.masmorras[this.masmorra][this.sala].escuro = false
        this.conteudoSala = this.add.image(this.sw/2, this.sh/2.2, this.masmorras[this.masmorra][this.sala].imagem)
        this.conteudoSala.setScale(this.sh/this.conteudoSala.height/2)

        this.resultadoTexto = this.add.text(this.sw/2, this.sh/5, '', aviso_style).setOrigin(.5).setAlpha(0);

        this.infoJogs()

        this.cartasJogador()

        this.mapa()
        
        this.no_e = this.add.text(this.sw/2, this.sh/3.3, 'Escolhe uma carta', aviso_style).setOrigin(.5).setAlpha(0);

        this.botao = this.add.image(this.sw/8*7, this.sh/6*4, 'botao')
            .setInteractive({useHandCursor: true})
            .on('pointerdown', ()=>this.jogar());
        this.add.text(this.botao.x, this.botao.y, 'Jogar', this.style).setOrigin(.5);
    }

    infoJogs() {
        this.cartaJogada = []
        this.resultadoPersona = []

        let h = 120
        for (let jog of this.jogs) {
            let per = this.add.image(105, h, jog.imagem).setScale(.70)
            this.add.text(per.x+16, per.y, jog.vida, {font: "28px Pirata_One"}).setOrigin(.5)
            this.add.text(per.x+64, per.y, jog.moedas, {font: "28px Pirata_One"}).setOrigin(.5)

            this.resultadoPersona.push(this.add.text(per.x+180, per.y, '', this.style).setOrigin(.5).setAlpha(0))
            this.cartaJogada.push(this.add.image(per.x+130, per.y, '1').setScale(.2).setAlpha(0))

            h += 95
        }
    }

    cartasJogador() {
        let selecionado = this.add.image(-500, -500, 'selecionado').setScale(.36).setOrigin(.5, 1).setDepth(1)

        let w = this.sw/4
        for (let carta of this.jogs[0].cartas) {
            let cartaImg = this.add.image(w, this.sh, carta).setOrigin(.5, 1).setScale(.6)

            let sala = this.masmorras[this.masmorra][this.sala]
            if (
                ((carta == 'chave') && (sala.tipo != 'Tesouro') && (sala.tipo != 'Chefe')) ||
                ((carta == 'espada') && (((sala.tipo != 'Monstro') && (sala.tipo != 'Chefe')) || (3 in (sala.hab?sala.hab:[])))) ||
                ((carta == 'bola_de_cristal') && (7 in (sala.hab?sala.hab:[])))
            ) {
                this.plugins.get('rexgrayscalepipelineplugin').add(cartaImg);
            } else {
                cartaImg.setInteractive({useHandCursor: true})
                cartaImg.on('pointerdown', ()=>{
                    this.escolha = carta

                    selecionado.setPosition(cartaImg.x, cartaImg.y)
                });
            }

            w += cartaImg.width/1.7
        }
    }

    mapa() {
        let w = this.sw/4*3 +6
        for (let sala of this.masmorras[this.masmorra]) {
            let s;
            if (sala.escuro && (sala.tipo == 'Chefe'))
                s = this.add.image(w, 0, 'chefe').setOrigin(1, 0).setScale(.25)
            else if (sala.escuro)
                s = this.add.image(w, 0, 'vazio').setOrigin(1, 0).setScale(.25)
            else
                s = this.add.image(w, 0, sala.imagem).setOrigin(1, 0).setScale(.25)
            w += s.width * .25 -2
        }
    }

    jogar() {
        if (this.escolha == "") {
            this.tweens.add({targets: this.no_e, alpha: 1, duration:1000, yoyo:true, hold: 1000})
        }
        else if (this.escolha == "tocha") {
            this.masmorras[this.masmorra].forEach(m=>m.escuro=false)
            this.jogs[0].cartas.splice(this.jogs[0].cartas.indexOf('tocha'), 1)
            this.scene.start('Jogo', {jogs: this.jogs, masmorras: this.masmorras, sala: this.sala, masmorra: this.masmorra});
        }
        else {
            this.botao.removeAllListeners()

            this.jogs[0].ultima = this.escolha
            this.jogs[0].cartas.splice(this.jogs[0].cartas.indexOf(this.escolha), 1)
            this.jogs.slice(1).forEach(jog=>jog.jogar())

            let res = this.masmorras[this.masmorra][this.sala].resolver(this.jogs)

            this.resultadoTexto.setText(res[0])
            this.tweens.add({targets: this.resultadoTexto, alpha: 1, duration:1000, yoyo:true, hold: 3000})

            if (res[2]) {
                this.tweens.addCounter({
                    from: 0,
                    to: 100,
                    duration:1000, 
                    yoyo:true, 
                    hold: 2000,
                    onUpdate: (tween)=>{
                        let cor = Phaser.Display.Color.Interpolate.RGBWithRGB(255,255,255, 255,0,0, 100, tween.getValue())
                        this.conteudoSala.setTint(Phaser.Display.Color.GetColor(cor.r, cor.g, cor.b))
                    }
                })
            }

            for (let [i, j] of this.jogs.entries()) {
                this.cartaJogada[i].setTexture(j.ultima)
            }
            this.tweens.add({targets: this.cartaJogada, alpha: 1, duration:1000, yoyo:true, hold: 3000})
            
            for (let [i, j] of res[1].entries()) {
                this.resultadoPersona[i].setText(j[0]).setColor(j[1])
            }
            this.tweens.add({targets: this.resultadoPersona, alpha: 1, duration:1000, yoyo:true, hold: 3000})
                .on('complete', function(tween, targets){
                    this.sala++;

                    if (this.sala == 5) 
                        this.scene.start('Porta', {jogs: this.jogs, masmorras: this.masmorras, sala: this.sala, masmorra: this.masmorra});
                    else
                        this.scene.start('Jogo', {jogs: this.jogs, masmorras: this.masmorras, sala: this.sala, masmorra: this.masmorra});
                }, this);
        }
    }
}