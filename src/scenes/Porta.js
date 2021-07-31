import {gerarJogadores, gerarMasmorra} from "../DungeonRaiders.js"

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
        }
        else {
            this.jogs = data.jogs;
            this.masmorras = data.masmorras;

            this.masmorra = data.masmorra+1;
            this.sala = 0;

            this.jogs.forEach(jog=>jog.redefinir());
        }
        this.time.delayedCall(4000, ()=>{
            this.cameras.main.fadeOut(1000, 0, 0, 0).on('camerafadeoutcomplete', ()=>{
                if (this.masmorra < 5)
                    this.scene.start('Jogo', {jogs: this.jogs, masmorras: this.masmorras, sala: this.sala, masmorra: this.masmorra});
                else
                    this.scene.start('FimDeJogo', {jogs: this.jogs, masmorras: this.masmorras, sala: this.sala, masmorra: this.masmorra});
            });
        });
    }

    create() {
        this.sw = this.cameras.main.width;
        this.sh = this.cameras.main.height;

        let image = this.add.image(this.sw/2, this.sh/2, 'porta');
        image.displayWidth = this.sw;
        image.displayHeight = this.sh;

        this.cameras.main.fadeIn(1000, 0, 0, 0)
    }
}