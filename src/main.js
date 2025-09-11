import Phaser from 'phaser';
import Boot from './scenes/Boot.js';
import Preload from './scenes/Preload.js';
import Game from './scenes/Game.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#2c3e50',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Boot, Preload, Game]
};

const game = new Phaser.Game(config);