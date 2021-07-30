import Menu from './scenes/Menu.js'
import Escolha from './scenes/Escolha.js';
import Regras from './scenes/Regras.js';
import Jogo from './scenes/Jogo.js';
import Preloader from './scenes/Preloader.js';

var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scale: {
        // mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Preloader, Menu, Escolha, Regras, Jogo]
};

var game = new Phaser.Game(config);
