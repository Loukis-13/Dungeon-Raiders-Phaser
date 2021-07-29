export default class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width/2 - 250, height/2 - 25, 500, 50);
        
        this.add.text(width / 2, height / 2 - 50, 'Carregando...', {font: '30px Pirata_One', fill: '#ffffff'}).setOrigin(0.5, 0.5);

        var percentText = this.add.text(width / 2, height / 2, '0%', {font: '25px Pirata_One', fill: '#ffffff'}).setOrigin(0.5, 0.5);

        this.load.on('progress', value=>{
            percentText.setText(parseInt(value * 100) + '%');

            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width/2 - 240, height/2 - 15, 480 * value, 30);
        });

        this.load.on('complete', ()=>{
            progressBar.destroy();
            progressBox.destroy();
            this.scene.start('Menu');
        });
    }

    preload() {
        this.load.image('menu', 'img/menu.png');
        this.load.image('botao', 'img/botao.png');

        for (let i=1; i<=6; i++) this.load.image(`p${i}`, `img/regras/p${i}.jpg`);

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

        this.load.image('lad', 'img/personagens/lad.png');
        this.load.image('gue', 'img/personagens/gue.png');
        this.load.image('cav', 'img/personagens/cav.png');
        this.load.image('mag', 'img/personagens/mag.png');
        this.load.image('exp', 'img/personagens/exp.png');

        this.load.image('1', 'img/cartas_de_ataque/1.png');
        this.load.image('2', 'img/cartas_de_ataque/2.png');
        this.load.image('3', 'img/cartas_de_ataque/3.png');
        this.load.image('4', 'img/cartas_de_ataque/4.png');
        this.load.image('5', 'img/cartas_de_ataque/5.png');
        this.load.image('chave', 'img/cartas_de_ataque/chave.png');
        this.load.image('tocha', 'img/cartas_de_ataque/tocha.png');
        this.load.image('espada', 'img/cartas_de_ataque/espada.png');
        this.load.image('bola_de_cristal', 'img/cartas_de_ataque/bola_de_cristal.png');
        this.load.image('selecionado_c', 'img/cartas_de_ataque/selecionado.png');

        let salas = ['aboboda0.png', 'tesouro2.png', 'dragao.png', 'cubo.png', 'vazio.jpg', 'tesouro5.png', 'aboboda1.png', 'armadilha3.png', 'goblin.png', 'cobra.png', 'zumbi.png', 'tesouro6.png', 'tesouro1.png', 'tesouro3.png', 'armadilha1.png', 'esqueleto.png', 'armadilha2.png', 'troll.png', 'tesouro4.png', 'tesouro0.png', 'armadilha0.png']
        for (let i of salas) this.load.image(`${i.split('.')[0]}`, `img/salas/${i}`);

        let chefes = ['vampiro.jpg', 'minotauro.jpg', 'megadragao.jpg', 'chefe.jpg', 'coletor_de_impostos.jpg', 'hidra1.jpg', 'hidra.jpg', 'mumia.jpg', 'golem.jpg', 'esfinge.jpg', 'necromante.jpg', 'matilha_de_lobos.jpg', 'medusa.jpg']
        for (let i of chefes) this.load.image(`${i.split('.')[0]}`, `img/chefes/${i}`);
        
        this.load.plugin('rexgrayscalepipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgrayscalepipelineplugin.min.js', true);
    }
}