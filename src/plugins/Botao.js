export default class Botao extends Phaser.GameObjects.Container {
    constructor(tela, x, y, txt, style, cena, dw=0, dh=0) {
        super(tela);
        
        let botao = tela.add.image(x, y, 'botao')
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', ()=>{
                tela.cameras.main.fadeOut(100, 0, 0, 0);
                tela.scene.start(cena);
            });
        if (dw) botao.displayWidth  = dw
        if (dh) botao.displayHeight = dh
            
        let textoBotao = tela.add.text(x, y, txt, style);

        Phaser.Display.Align.In.Center(textoBotao, botao);    
        
        this.add(botao);
        this.add(textoBotao);    
        
        tela.add.existing(this);
    }
}
