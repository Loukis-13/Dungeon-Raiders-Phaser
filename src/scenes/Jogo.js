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

        this.escolha = data.escolha;
        this.chefeEscolha = data.chefeEscolha;

        this.bolaDeCristal = data.bolaDeCristal

        let musica = 'jogo'+(this.masmorra+1);
        if (!this.sound.get(musica)) {
            this.sound.play(musica)
            this.sound.get(musica).setLoop(true)
        }
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

        this.resultadoTexto = this.add.text(this.sw/2, 100, '', aviso_style).setOrigin(.5).setAlpha(0);

        this.infoJogs()

        this.cartasJogador()

        this.mapa()
        
        this.no_e = this.add.text(this.sw/2, this.sh/3.3, 'Escolhe uma carta', aviso_style).setOrigin(.5).setAlpha(0);

        this.botao = this.add.image(this.sw/8*7, this.sh/6*4, 'botao')
            .setInteractive({useHandCursor: true})
            .on('pointerdown', ()=>this.jogar());
        this.add.text(this.botao.x, this.botao.y, 'Jogar', this.style).setOrigin(.5);

        if (this.jogs[0].ultima == "bola_de_cristal") {
            for (let [i, j] of this.jogs.entries()) {
                this.cartaJogada[i].setTexture(j.ultima)
            }

            this.tweens.add({targets: this.cartaJogada, alpha: 1, duration:1000})
        }

        if (this.chefeEscolha) {
            this.no_e.setText("Escolhe outra carta\nou clica em 'Jogar'") 
            this.tweens.add({targets: this.no_e, alpha: 1, duration:1000, yoyo:true, hold: 2000})
        }
    }

    infoJogs() {
        this.cartaJogada = []
        this.cartaJogada2 = []
        this.resultadoPersona = []
        this.resultadoAboboda = []

        let x = this.chefeEscolha ? 230 : 180
        let h = 120
        for (let jog of this.jogs) {
            let per = this.add.image(105, h, jog.imagem).setScale(.70)
            this.add.text(per.x+16, per.y, jog.vida, {font: "28px Pirata_One"}).setOrigin(.5)
            this.add.text(per.x+64, per.y, jog.moedas, {font: "28px Pirata_One"}).setOrigin(.5)

            this.cartaJogada.push(this.add.image(per.x+130, per.y, '0').setScale(.2).setAlpha(0))
            this.cartaJogada2.push(this.add.image(per.x+180, per.y, '0').setScale(.2).setAlpha(0))
            this.resultadoPersona.push(this.add.text(per.x+x, per.y, '', this.style).setOrigin(.5).setAlpha(0))
            this.resultadoAboboda.push(this.add.image(per.x+x, per.y, '0').setScale(.2).setAlpha(0))

            h += 95
        }
    }

    cartasJogador() {
        this.selecionado = this.add.image(-500, -500, 'selecionado').setScale(.36).setOrigin(.5, 1).setDepth(1)

        let w = this.sw/4
        for (let carta of this.jogs[0].cartas) {
            let cartaImg = this.add.image(w, this.sh, carta).setOrigin(.5, 1).setScale(.6)

            let sala = this.masmorras[this.masmorra][this.sala]
            if (
                ((carta == 'chave') && (sala.tipo != 'Tesouro') && (sala.tipo != 'Chefe')) ||
                ((carta == 'espada') && (((sala.tipo != 'Monstro') && (sala.tipo != 'Chefe')) || (sala.hab ? sala.hab : []).includes(3))) ||
                ((carta == 'bola_de_cristal') && (sala.hab ? sala.hab : []).includes(7))
            ) {
                this.plugins.get('rexgrayscalepipelineplugin').add(cartaImg);
            } else if (this.escolha == carta && this.chefeEscolha) {
                this.add.image(0, 0, 'selecionado').setScale(.36).setOrigin(.5, 1).setPosition(...this.chefeEscolha).setDepth(1);
                this.escolha = "";
            }
            else {
                cartaImg.setInteractive({useHandCursor: true})
                cartaImg.on('pointerdown', ()=>{
                    this.escolha = carta

                    this.selecionado.setPosition(cartaImg.x, cartaImg.y)
                });
            }

            w += cartaImg.width/1.7
        }

        if (Boolean(this.chefeEscolha)) {

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
        if (!this.escolha && !this.chefeEscolha) {
            this.tweens.add({targets: this.no_e, alpha: 1, duration:1000, yoyo:true, hold: 1000})
            return;
        }

        this.botao.removeAllListeners()
        
        if (this.escolha == "tocha" && (this.masmorra != 4 || this.sala != 4)) {
            this.masmorras[this.masmorra].forEach(m=>m.escuro=false)
            this.jogs[0].cartas.splice(this.jogs[0].cartas.indexOf('tocha'), 1)
            this.scene.start('Jogo', {jogs: this.jogs, masmorras: this.masmorras, sala: this.sala, masmorra: this.masmorra});
            return;
        } 

        if ((this.escolha == "bola_de_cristal" || this.bolaDeCristal) && (this.masmorra != 4 || this.sala != 4)) {
            this.jogs[0].ultima = this.escolha
            this.jogs[0].cartas.splice(this.jogs[0].cartas.indexOf(this.escolha), 1)

            if (!this.bolaDeCristal) {
                this.jogs.slice(1).forEach(jog=>jog.jogar())

                this.scene.start('Jogo', {jogs: this.jogs, masmorras: this.masmorras, sala: this.sala, masmorra: this.masmorra, bolaDeCristal: 1});
            }
            else {
                this.cartaJogada[0].setTexture(this.jogs[0].ultima)

                let res = this.masmorras[this.masmorra][this.sala].resolver(this.jogs)

                this.resultadoTexto.setText(res[0])
                this.tweens.add({targets: this.resultadoTexto, alpha: 1, duration:1000, yoyo:true, hold: 3000})

                this.tweens.add({targets: this.cartaJogada, alpha: 0, duration:1000, delay: 4000})

                if (res[2]) {
                    this.tweens.addCounter({from: 0, to: 100, duration:1000, yoyo:true, hold: 2000, onUpdate: (tween)=>{
                            let cor = Phaser.Display.Color.Interpolate.RGBWithRGB(255,255,255, 255,0,0, 100, tween.getValue())
                            this.conteudoSala.setTint(Phaser.Display.Color.GetColor(cor.r, cor.g, cor.b))
                        }
                    })
                }
                
                for (let [i, j] of res[1].entries()) {
                    if (String(j[0]).match(/[\+\-\/]\d+/))
                        this.resultadoPersona[i].setText(j[0]).setColor(j[1])
                    else
                        this.resultadoAboboda[i].setTexture(j[0])
                }
                this.tweens.add({targets: this.resultadoAboboda, alpha: 1, duration:1000, yoyo:true, hold: 3000});
                this.tweens.add({targets: this.resultadoPersona, alpha: 1, duration:1000, yoyo:true, hold: 3000})
                    .on('complete', function(tween, targets){
                        this.sala++;
    
                        if (this.sala == 5) 
                            this.scene.start('Porta', {jogs: this.jogs, masmorras: this.masmorras, sala: this.sala, masmorra: this.masmorra});
                        else
                            this.scene.start('Jogo', {jogs: this.jogs, masmorras: this.masmorras, sala: this.sala, masmorra: this.masmorra});
                    }, this);
            }
            return;
        }

        if (this.masmorra == 4 && this.sala == 4) {
            if (!Boolean(this.chefeEscolha)) {
                this.jogs[0].ultima = [this.escolha, '0']

                this.scene.start('Jogo', {jogs: this.jogs, masmorras: this.masmorras, sala: this.sala, masmorra: this.masmorra, chefeEscolha: [this.selecionado.x, this.selecionado.y], escolha: this.escolha});
                return;
            }
            else {
                this.jogs[0].ultima[1] = this.escolha
                this.jogs[0].cartas.splice(this.jogs[0].cartas.indexOf(this.escolha), 1)
                this.jogs.slice(1).forEach(jog=>jog.chefe_jogar(this.masmorras[this.masmorra][this.sala].hab))

                var res = this.masmorras[this.masmorra][this.sala].resolver(this.jogs)

                var cartasJogadas = this.jogs.map(j=>j.ultima[0])
                var cartasJogadas2 = this.jogs.map(j=>j.ultima[1])
            }
        }
        else {
            this.jogs[0].ultima = this.escolha
            this.jogs[0].cartas.splice(this.jogs[0].cartas.indexOf(this.escolha), 1)
            this.jogs.slice(1).forEach(jog=>jog.jogar())

            var res = this.masmorras[this.masmorra][this.sala].resolver(this.jogs)

            var cartasJogadas = this.jogs.map(j=>j.ultima)
            var cartasJogadas2;
        }

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

        // cartas jogadas
        for (let [i, c] of cartasJogadas.entries()) {
            this.cartaJogada[i].setTexture(c)
        }
        this.tweens.add({targets: this.cartaJogada, alpha: 1, duration:1000, yoyo:true, hold: 3000})

        // segundas cartas jogadas
        if (cartasJogadas2) {
            for (let [i, c] of cartasJogadas2.entries()) {
                this.cartaJogada2[i].setTexture(c)
            }
            this.tweens.add({targets: this.cartaJogada2, alpha: 1, duration:1000, yoyo:true, hold: 3000})
        }
        
        // resultado
        for (let [i, j] of res[1].entries()) {
            if (String(j[0]).match(/[\+\-\/]\d+/))
                this.resultadoPersona[i].setText(j[0]).setColor(j[1])
            else
                this.resultadoAboboda[i].setTexture(j[0])
        }
        this.tweens.add({targets: this.resultadoAboboda, alpha: 1, duration:1000, yoyo:true, hold: 3000});
        this.tweens.add({targets: this.resultadoPersona, alpha: 1, duration:1000, yoyo:true, hold: 3000})
            .on('complete', function(tween, targets){
                if (this.jogs[0].vida == 0) {
                    this.scene.start('Morte');
                    return;
                }

                this.jogs = this.jogs.filter(jog=>jog.vida>0)

                this.sala++;
                if (this.sala == 5) {this.masmorra++;}

                if (this.masmorra == 5 || this.jogs.length == 1) {
                    this.scene.start('FimDeJogo', {jogs: this.jogs});
                }
                else if (this.sala == 5) {
                    this.scene.start('Porta', {jogs: this.jogs, masmorras: this.masmorras, masmorra: this.masmorra});
                }
                else {
                    this.scene.start('Jogo', {jogs: this.jogs, masmorras: this.masmorras, sala: this.sala, masmorra: this.masmorra});
                }
            }, this);
    }
}