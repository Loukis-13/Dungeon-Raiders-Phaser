import Botao from "../objects/Botao.js";

export default class Morte extends Phaser.Scene {
    constructor() {
        super('Morte');
    }

    create() {
        let sw = this.cameras.main.width;
        let sh = this.cameras.main.height;

        let image = this.add.image(sw/2, sh/2, 'fundo');
        image.displayWidth = sw;
        image.displayHeight = sh;

        this.add.text(sw/2, sh/3, "MORRESTE", {font: "150px Pirata_One", stroke: '#000', strokeThickness: 2}).setOrigin(.5)

        new Botao(this, sw/2, sh/3*2, 'Jogar Novamente', {font: "32px Pirata_One"}, 'Escolha')
    }
}