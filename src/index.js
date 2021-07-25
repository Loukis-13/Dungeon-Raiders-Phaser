import Menu from './scenes/Menu.js'
import Escolha from './scenes/Escolha.js';
import Regras from './scenes/Regras.js';

var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scene: [Menu, Escolha, Regras]
};

var game = new Phaser.Game(config);
