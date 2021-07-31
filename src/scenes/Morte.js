export default class Morte extends Phaser.Scene {
    constructor() {
        super('Morte');
    }

    preload() {

    }

    create() {
        this.sw = this.cameras.main.width;
        this.sh = this.cameras.main.height;

        let image = this.add.image(this.sw/2, this.sh/2, 'fundo');
        image.displayWidth = this.sw;
        image.displayHeight = this.sh;
    }
}