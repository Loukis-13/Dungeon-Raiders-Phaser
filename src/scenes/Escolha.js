import Botao from "../plugins/Botao.js";

export default class Escolha extends Phaser.Scene {
    constructor() {
        super('Escolha');
    }

    preload() {
        this.load.image('fundo', 'img/plano_de_fundo.jpg');
        this.load.image('faixa', 'img/faixa.png');

        this.load.image('ladra', 'img/personagens/ladra.png');
        this.load.image('guerreiro', 'img/personagens/guerreiro.png');
        this.load.image('cavaleiro', 'img/personagens/cavaleiro.png');
        this.load.image('mago', 'img/personagens/mago.png');
        this.load.image('exploradora', 'img/personagens/exploradora.png');
        this.load.image('aleatorio', 'img/personagens/aleatorio.png');
        this.load.image('selecionado', 'img/personagens/selecionado.png');

        this.load.image('numero', 'img/personagens/numero.png');
        this.load.image('numeroselec', 'img/personagens/numeroselec.png');
    }

    create() {
        let sw = this.cameras.main.width;
        let sh = this.cameras.main.height;
        let style = {font: "32px Pirata_One"};

        this.cameras.main.fadeIn(100, 0, 0, 0)

        let image = this.add.image(sw/2, sh/2, 'fundo');
        image.displayWidth = sw;
        image.displayHeight = sh;

        new Botao(this, 130, 40, 'Menu', style, 'Menu')

        let faixa = this.add.image(sw/2, 80, 'faixa')
        let textoFaixa = this.add.text(sw/2, 80, 'ESCOLHE TEU PERSONAGEM', {font: "38px Pirata_One", color: "#000"})
        Phaser.Display.Align.In.Center(textoFaixa, faixa); 

        let personagens = {'ladra': null, 'mago': null, 'guerreiro': null, 'exploradora': null, 'cavaleiro': null, 'aleatorio': null}

        let escolha = ""

        let pad = 130
        for (let per of ['ladra', 'mago', 'guerreiro', 'exploradora', 'cavaleiro', 'aleatorio']) {
            let persona = this.add.image(pad, sh/2, per)
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', ()=>{
                    if (escolha) personagens[escolha][1].setVisible(false);
                    escolha = per;
                    personagens[per][1].setVisible(true);
                });
            persona.displayWidth = sw/6.5;
            persona.displayHeight = sh/2;

            let selec = this.add.image(pad, sh/2, 'selecionado')
            selec.displayWidth = sw/6.5;
            selec.displayHeight = sh/2;
            selec.setVisible(false);

            personagens[per] = [persona, selec]

            pad += 205;
        }

        this.add.text(160, sh/1.28, 'QUANTOS JOGADORES TERÁ A PARTIDA?', {font: "32px Pirata_One", stroke: '#000', strokeThickness: 1});

        let qjog = 0
        let numero = {'2': null, '3': null, '4': null, '5': null}

        pad = 130
        for (let num of '2345') {
            let x = this.add.image(pad, sh/1.10, 'numero')
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', ()=>{
                    if (qjog) numero[String(qjog)].setTexture('numero');
                    qjog = Number(num);
                    numero[num].setTexture('numeroselec');
                });
            x.displayWidth = 80;
            x.displayHeight = 80;
            numero[num] = x;

            let y = this.add.text(pad, sh/1.10, String(num), {font: "38px Pirata_One", color: "#000"});

            Phaser.Display.Align.In.Center(y, x); 

            pad += 150;
        }

        new Botao(this, sw/1.2, sh/1.1, 'Seguir', style, 'Menu');
    }
}