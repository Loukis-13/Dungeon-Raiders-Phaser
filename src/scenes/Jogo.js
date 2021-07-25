import Botao from "../objects/Botao.js";

export default class Jogo extends Phaser.Scene {
    constructor() {
        super('Jogo');
    }

    init(data) {
        this.escolha = data.escolha;
        this.qjog = data.qjog;
    }

    preload() {
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
        for (let i of salas)
            this.load.image(`${i.split('.')[0]}`, `img/salas/${i}`);

        let chefes = ['vampiro.jpg', 'minotauro.jpg', 'megadragao.jpg', 'chefe.jpg', 'coletor_de_impostos.jpg', 'hidra1.jpg', 'hidra.jpg', 'mumia.jpg', 'golem.jpg', 'esfinge.jpg', 'necromante.jpg', 'matilha_de_lobos.jpg', 'medusa.jpg']
        
        this.load.plugin('rexgrayscalepipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgrayscalepipelineplugin.min.js', true);

    }

    create() {
        let sw = this.cameras.main.width;
        let sh = this.cameras.main.height;
        let style = {font: "32px Pirata_One"};

        this.cameras.main.fadeIn(100, 0, 0, 0)

        let image = this.add.image(sw/2, sh/2, 'fundo');
        image.displayWidth = sw;
        image.displayHeight = sh;

        new Botao(this, 130, 40, 'Menu', style, 'Escolha')

        let xx = this.add.image(sw/2, sh/2, '1')

        this.plugins.get('rexgrayscalepipelineplugin').add(xx);
    }
}