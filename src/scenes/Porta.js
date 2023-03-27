import { gerarJogadores, gerarMasmorra } from "../DungeonRaiders.js"

export default class Porta extends Phaser.Scene {
    constructor() {
        super('Porta');
    }

    init(data) {
        if (!data.jogs) {
            this.masmorra = 0;
            this.sala = 0;

            this.jogs = gerarJogadores(data.qjog, data.escolha);
            this.masmorras = gerarMasmorra();
        } else {
            this.jogs = data.jogs;
            this.masmorras = data.masmorras;

            this.sala = 0;
            this.masmorra = data.masmorra;

            this.jogs.forEach(jog => jog.redefinir());
        }

        this.time.delayedCall(4000, () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0).on('camerafadeoutcomplete', () => {
                this.scene.start('Jogo', { jogs: this.jogs, masmorras: this.masmorras, sala: this.sala, masmorra: this.masmorra, mute: this.mute });
            });
        });
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0)

        let sw = this.cameras.main.width;
        let sh = this.cameras.main.height;

        let image = this.add.image(sw / 2, sh / 2, 'porta');
        image.displayWidth = sw;
        image.displayHeight = sh;

        this.add.text(sw / 2, 50, `Masmorra ${this.masmorra + 1}`, { font: "40px Pirata_One" }).setOrigin(.5)

        this.sound.getAll().forEach(musica => {
            this.tweens.addCounter({
                from: 10, to: 0, duration: 3000,
                onUpdate: (t) => { musica.setVolume(.1 * t.getValue()) }
            }).on('complete', () => {
                this.sound.removeAll()
            })
        })
    }
}