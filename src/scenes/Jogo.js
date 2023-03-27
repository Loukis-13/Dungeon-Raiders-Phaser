import { Chefe, Golem, Necromante } from "../dungeon-raiders/chefes.js";
import { Monstro } from "../dungeon-raiders/monstro.js";
import { Tesouro } from "../dungeon-raiders/tesouro.js";
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
        this.salaAtual = this.masmorras[this.masmorra][this.sala]

        this.escolha = data.escolha;
        this.chefeEscolha = data.chefeEscolha;

        this.bolaDeCristal = data.bolaDeCristal

        let musica = `jogo${this.masmorra + 1}`;
        if (!this.sound.get(musica)) {
            this.sound.play(musica)
            this.sound.get(musica).setLoop(true)
        }
    }

    create() {
        this.sw = this.cameras.main.width;
        this.sh = this.cameras.main.height;
        this.style = { font: "32px Pirata_One" };
        let aviso_style = { font: "55px Pirata_One", stroke: '#000', strokeThickness: 2 }

        // plano de fundo
        let image = this.add.image(this.sw / 2, this.sh / 2, 'fundo');
        image.displayWidth = this.sw;
        image.displayHeight = this.sh;

        // botao para retornar ao menu
        new Botao(this, 100, 35, 'Menu', this.style, 'Escolha', 200, 60)

        // conteudo da sala
        this.salaAtual.escuro = false
        this.conteudoSala = this.add.image(this.sw / 2, this.sh / 2.2, this.salaAtual.imagem)
        this.conteudoSala.setScale(this.sh / this.conteudoSala.height / 2)

        // total de dano
        this.resultadoTexto = this.add.text(this.sw / 2, 100, '', aviso_style).setOrigin(.5).setAlpha(0);

        // informações dos jogadores
        this.infoJogs()

        // cartas do jogador 1
        this.mostrarCartasJogador()

        // mapa da masmorra
        this.mapa()

        // aviso caso nenhuma carta seja escolhida
        this.no_e = this.add.text(this.sw / 2, this.sh / 3.3, 'Escolhe uma carta', aviso_style).setOrigin(.5).setAlpha(0);

        // botao para jogar a carta escolhida
        this.botao = this.add.image(this.sw / 8 * 7, this.sh / 6 * 4, 'botao')
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.jogar());
        this.add.text(this.botao.x, this.botao.y, 'Jogar', this.style).setOrigin(.5);

        // logica da bola de cristal
        if (this.jogs[0].ultima == "bola_de_cristal") {
            for (let [i, j] of this.jogs.entries()) {
                this.cartaJogada[i].setTexture(j.ultima)
            }

            this.tweens.add({ targets: this.cartaJogada, alpha: 1, duration: 1000 })
        }

        // logica do chefe
        if (this.chefeEscolha) {
            this.no_e.setText("Escolhe outra carta\nou clica em 'Jogar'")
            this.tweens.add({ targets: this.no_e, alpha: 1, duration: 1000, yoyo: true, hold: 2000 })
        }
    }

    infoJogs() {
        this.jogInfo = this.add.group()
        this.cartaJogada = []
        this.cartaJogada2 = []
        this.resultadoPersona = []
        this.resultadoAboboda = []

        let x = this.chefeEscolha ? 230 : 180
        let h = 120
        for (let jog of this.jogs) {
            let per = this.add.image(105, h, jog.imagem).setScale(.70)
            this.jogInfo.add(per)
            this.add.text(per.x + 16, per.y, jog.vida, { font: "28px Pirata_One" }).setOrigin(.5)
            this.add.text(per.x + 64, per.y, jog.moedas, { font: "28px Pirata_One" }).setOrigin(.5)

            this.cartaJogada.push(this.add.image(per.x + 130, per.y, '0').setScale(.2).setAlpha(0))
            this.cartaJogada2.push(this.add.image(per.x + 180, per.y, '0').setScale(.2).setAlpha(0))
            this.resultadoPersona.push(this.add.text(per.x + x, per.y, '', this.style).setOrigin(.5).setAlpha(0))
            this.resultadoAboboda.push(this.add.image(per.x + x, per.y, '0').setScale(.2).setAlpha(0))

            h += 95
        }
    }

    mostrarCartasJogador() {
        this.selecionado = this.add.image(-500, -500, 'selecionado').setScale(.36).setOrigin(.5, 1).setDepth(1)

        let w = this.sw / 4
        for (let carta of this.jogs[0].cartas) {
            const cartaImg = this.add.image(w, this.sh, carta).setOrigin(.5, 1).setScale(.6)

            const sala = this.salaAtual
            if (
                ((carta == 'chave') && !(sala instanceof Tesouro) && !(sala instanceof Chefe)) ||
                ((carta == 'espada') && ((!(sala instanceof Monstro) && !(sala instanceof Chefe)) || (sala instanceof Golem))) ||
                ((carta == 'bola_de_cristal') && (sala instanceof Necromante))
            ) {
                this.plugins.get('rexgrayscalepipelineplugin').add(cartaImg);
            } else if (this.escolha == carta && this.chefeEscolha) {
                this.add.image(0, 0, 'selecionado').setScale(.36).setOrigin(.5, 1).setPosition(...this.chefeEscolha).setDepth(1);
                this.escolha = "";
            } else {
                cartaImg.setInteractive({ useHandCursor: true })
                cartaImg.on('pointerdown', () => {
                    this.escolha = carta

                    this.selecionado.setPosition(cartaImg.x, cartaImg.y)
                });
            }

            w += cartaImg.width / 1.7
        }
    }

    mapa() {
        let w = this.sw / 4 * 3 + 6
        for (let sala of this.masmorras[this.masmorra]) {
            let carta;

            if (sala.escuro && sala instanceof Chefe)
                carta = 'chefe'
            else if (sala.escuro)
                carta = 'vazio'
            else
                carta = sala.imagem

            let img = this.add.image(w, 0, carta)
                .setOrigin(1, 0)
                .setScale(.25)
                .setInteractive({ useHandCursor: true })
                .on('pointerup', this.mapaPopup, this)

            if (sala == this.salaAtual) {
                this.add.image(w, 0, 'selecionado')
                    .setOrigin(1, 0)
                    .setScale(.25)
                    .setInteractive({ useHandCursor: true })
                    .on('pointerup', this.mapaPopup, this)
            }

            w += img.width * .25 - 2
        }
    }

    mapaPopup() {
        let popup = this.add.group()
            .add(this.add.graphics().fillStyle(0x222222, 0.8).fillRect(0, 0, 1280, 720))
            .add(this.add.text(this.sw / 2, 120, `Masmorra ${this.masmorra + 1}`, this.style).setOrigin(.5))

        let w = 170
        for (let sala of this.masmorras[this.masmorra]) {
            let carta;
            if (sala.escuro && sala instanceof Chefe)
                carta = 'chefe'
            else if (sala.escuro)
                carta = 'vazio'
            else
                carta = sala.imagem

            const img = this.add.image(w, this.sh / 2, carta).setScale(.7)
            popup.add(img)

            if (sala == this.salaAtual) {
                popup.add(this.add.image(w, this.sh / 2, 'selecionado').setScale(.7))
            }

            w += img.width * .7 + 10
        }

        popup.children.each(c => c.setDepth(1))

        this.input.once('pointerdown', () => popup.children.each((child) => child.destroy()))
    }

    animacaoMorte(objMorto) {
        const morto = objMorto || this.conteudoSala
        let tremer = true
        const x = morto.x
        const y = morto.y


        this.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 1000,
            yoyo: true,
            hold: 2000,
            onUpdate: (tween) => {
                const cor = Phaser.Display.Color.Interpolate.RGBWithRGB(255, 255, 255, 255, 0, 0, 100, tween.getValue())
                morto.setTint(Phaser.Display.Color.GetColor(cor.r, cor.g, cor.b))
                if (tremer) {
                    morto.x = morto.x + Math.sin(tween.getValue()) * 2
                    morto.y = morto.y + Math.cos(tween.getValue()) * 2
                    if (tween.getValue() == 100) {
                        tremer = false
                        morto.x = x
                        morto.y = y
                    }
                }
            }
        })
    }

    jogar() {
        if (!this.escolha && !this.chefeEscolha) {
            this.tweens.add({ targets: this.no_e, alpha: 1, duration: 1000, yoyo: true, hold: 1000 })
            return;
        }

        if (this.escolha == "tocha" && !(this.salaAtual instanceof Chefe)) {
            this.masmorras[this.masmorra].forEach(m => m.escuro = false)
            this.jogs[0].cartas.splice(this.jogs[0].cartas.indexOf('tocha'), 1)
            this.scene.restart()
            return;
        }

        this.botao.removeAllListeners()

        if (!(this.salaAtual instanceof Chefe)) {
            this.jogs[0].ultima = [this.escolha]
            this.jogs[0].cartas.splice(this.jogs[0].cartas.indexOf(this.escolha), 1)

            if (!this.bolaDeCristal) {
                this.jogs.slice(1).forEach(jog => jog.jogar(this.salaAtual.constructor.name))
            }

            if (this.escolha == "bola_de_cristal") {
                this.scene.restart({ ...this, bolaDeCristal: true })
                return
            }

            this.salaAtual.resolver(this)
        } else {
            if (!Boolean(this.chefeEscolha)) {
                this.jogs[0].ultima = [this.escolha, '0']

                this.scene.restart({...this, chefeEscolha: [this.selecionado.x, this.selecionado.y]});
                return;
            } else {
                this.jogs[0].ultima[1] = this.escolha
                this.jogs[0].cartas.splice(this.jogs[0].cartas.indexOf(this.escolha), 1)
                this.jogs.slice(1).forEach(jog => jog.jogar(this.salaAtual.constructor.name, 2))

                this.salaAtual.resolver(this)
            }
        }

        for (let [i, jog] of this.jogs.entries()) {
            if (jog.vida == 0)
                this.animacaoMorte(this.jogInfo.getChildren()[i])

            this.cartaJogada[i].setTexture(jog.ultima[0])
            if (jog.ultima.length == 2)
                this.cartaJogada2[i].setTexture(jog.ultima[1])
        }

        this.tweens
            .add({
                targets: [this.resultadoTexto, ...this.cartaJogada, ...this.cartaJogada2, ...this.resultadoAboboda, ...this.resultadoPersona],
                alpha: 1,
                duration: 1000,
                yoyo: true,
                hold: 3000
            })
            .on('complete', function (tween, targets) {
                if (this.jogs[0].vida == 0) {
                    this.scene.start('Morte');
                    return;
                }

                this.jogs = this.jogs.filter(jog => jog.vida > 0)

                this.sala++;
                if (this.sala == 5) this.masmorra++;

                if (this.masmorra == 5 || this.jogs.length == 1) {
                    this.scene.start('FimDeJogo', { jogs: this.jogs });
                } else if (this.sala == 5) {
                    this.scene.start('Porta', { jogs: this.jogs, masmorras: this.masmorras, masmorra: this.masmorra });
                } else {
                    this.scene.start('Jogo', { jogs: this.jogs, masmorras: this.masmorras, masmorra: this.masmorra, sala: this.sala });
                }
            }, this);
    }
}
