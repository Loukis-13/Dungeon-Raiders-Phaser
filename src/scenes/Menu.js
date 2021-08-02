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
        let screenWidth = this.cameras.main.width;
        let screenHeight = this.cameras.main.height;
        let style = { font: "32px Pirata_One"};

        let image = this.add.sprite(screenWidth/2, screenHeight/2, 'menu');
        image.displayWidth = screenWidth;
        image.displayHeight = screenHeight;

        new Botao(this, screenWidth/2, screenHeight/1.1, 'Jogar', style, 'Escolha')

        new Botao(this, screenWidth/1.15, screenHeight/1.1, 'Regras', style, 'Regras')
    }
}
