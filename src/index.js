import Preloader from './scenes/Preloader.js';
import Menu from './scenes/Menu.js';
import Regras from './scenes/Regras.js';
import Escolha from './scenes/Escolha.js';
import Porta from './scenes/Porta.js';
import Jogo from './scenes/Jogo.js';
import Morte from './scenes/Morte.js';
import FimDeJogo from './scenes/FimDeJogo.js';

var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scale: {
        mode: (window.screen.availWidth < 1280 || window.screen.availHeight < 720) ? Phaser.Scale.FIT : Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Preloader, Menu, Regras, Escolha, Porta, Jogo, Morte, FimDeJogo]
};

var game = new Phaser.Game(config);
