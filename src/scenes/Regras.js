import Botao from "../objects/Botao.js";

export default class Regras extends Phaser.Scene {
    constructor() {
        super('Regras');
    }

    create() {
        let screenWidth = this.cameras.main.width;
        let screenHeight = this.cameras.main.height;
        let style = {font: "32px Pirata_One"};

        let pg = 1;

        this.cameras.main.fadeIn(100, 0, 0, 0)

        let image = this.add.image(screenWidth/2, screenHeight/2, 'p1');
        image.displayWidth = screenWidth;
        image.displayHeight = screenHeight;
        
        new Botao(this, 80, 30, 'Menu', style, 'Menu', 150, 50)

        this.add.text(70, screenHeight/2, '<', {font: "100px Pirata_One", padding:{x:50, y:200}},).setOrigin(.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', ()=>image.setTexture(`p${pg>1 ? --pg : pg}`) );

        this.add.text(screenWidth-70, screenHeight/2, '>', {font: "100px Pirata_One", padding:{x:50, y:200}}).setOrigin(.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', ()=>image.setTexture(`p${pg<6 ? ++pg : pg}`) );
    }
}