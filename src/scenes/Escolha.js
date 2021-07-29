import Botao from "../objects/Botao.js";

export default class Escolha extends Phaser.Scene {
    constructor() {
        super('Escolha');
    }

    preload() {
        
    }

    create() {
        let sw = this.cameras.main.width;
        let sh = this.cameras.main.height;
        let style = {font: "32px Pirata_One"};

        this.cameras.main.fadeIn(100, 0, 0, 0)

        // plano de fundo
        let image = this.add.image(sw/2, sh/2, 'fundo');
        image.displayWidth = sw;
        image.displayHeight = sh;

        // botao para o menu
        new Botao(this, 130, 40, 'Menu', style, 'Menu')

        // texto de escolha de personagem
        let faixa = this.add.image(sw/2, 80, 'faixa')
        let textoFaixa = this.add.text(sw/2, 80, 'ESCOLHE TEU PERSONAGEM', {font: "38px Pirata_One", color: "#000"})
        Phaser.Display.Align.In.Center(textoFaixa, faixa); 

        // cartas dos personagens
        let personagens = {'ladra': null, 'mago': null, 'guerreiro': null, 'exploradora': null, 'cavaleiro': null, 'aleatorio': null}

        this.escolha = ""

        let pad = 130
        for (let per of ['ladra', 'mago', 'guerreiro', 'exploradora', 'cavaleiro', 'aleatorio']) {
            personagens[per] = this.add.image(pad, sh/2, per)
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', ()=>{
                    this.escolha = per;
                    selec.x = personagens[per].x
                    selec.y = personagens[per].y
                });
            personagens[per].displayWidth = sw/6.5;
            personagens[per].displayHeight = sh/2;

            pad += 205;
        }
        let selec = this.add.image(-100, sh/2, 'selecionado')
        selec.displayWidth = sw/6.5;
        selec.displayHeight = sh/2;

        // texto da quantidade de jogadores
        this.add.text(160, sh/1.28, 'QUANTOS JOGADORES TERÁ A PARTIDA?', {font: "32px Pirata_One", stroke: '#000', strokeThickness: 1});

        // opções de número de jogadores
        this.qjog = 0
        let numero = {'2': null, '3': null, '4': null, '5': null}

        pad = 130
        for (let num of '2345') {
            let x = this.add.image(pad, sh/1.10, 'numero')
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', ()=>{
                    if (this.qjog) numero[String(this.qjog)].setTexture('numero');
                    this.qjog = Number(num);
                    numero[num].setTexture('numeroselec');
                });
            x.displayWidth = 80;
            x.displayHeight = 80;
            numero[num] = x;

            let y = this.add.text(pad, sh/1.10, String(num), {font: "38px Pirata_One", color: "#000"});

            Phaser.Display.Align.In.Center(y, x); 

            pad += 150;
        }

        // textos de aviso
        let aviso_style = {font: "55px Pirata_One", stroke: '#000', strokeThickness: 2}
        this.no_p = this.add.text(sw/2, sh/3.3, 'Escolhe um personagem', aviso_style).setOrigin(.5).setAlpha(0);
        this.no_q = this.add.text(sw/2, sh/2.5, 'Escolhe a quantidade de jogadores', aviso_style).setOrigin(.5).setAlpha(0);
        

        // botão para iniciar o jogo
        new Botao(this, sw/1.2, sh/1.1, 'Seguir', style, '', 0, 0, this.aviso);
    }

    aviso (tela) {
        if (tela.escolha && tela.qjog)
            tela.scene.start('Jogo', {escolha: tela.escolha, qjog: tela.qjog});
        else {
            if (!tela.escolha)
                tela.tweens.add({targets: tela.no_p, alpha: 1, duration:1000, yoyo:true, hold: 1000})
            if (!tela.qjog)
                tela.tweens.add({targets: tela.no_q, alpha: 1, duration:1000, yoyo:true, hold: 1000})
        }
    }
}
