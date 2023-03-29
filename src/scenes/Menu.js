import Botao from "../objects/Botao.js";

export default class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    init() {
        if (!this.sound.get('menu')) {
            this.sound.removeAll()
            this.sound.play('menu')
            this.sound.get('menu').setLoop(true)
        }
    }

    create() {
        let sw = this.cameras.main.width;
        let sh = this.cameras.main.height;
        let style = { font: "32px Pirata_One" };

        let image = this.add.sprite(sw / 2, sh / 2, 'menu');
        image.displayWidth = sw;
        image.displayHeight = sh;

        new Botao(this, sw / 2, sh / 1.1, 'Jogar', style, 'Escolha')

        new Botao(this, sw / 1.15, sh / 1.1, 'Regras', style, 'Regras')

        let som = this.add.image(sw - 5, 5, this.sound.mute ? 'mudo' : 'som')
            .setOrigin(1, 0)
            .setScale(.5)
            .setInteractive({ useHandCursor: true })
        som.on('pointerdown', () => {
            this.sound.mute = !this.sound.mute
            som.setTexture(this.sound.mute ? 'mudo' : 'som')
        });
    }
}
