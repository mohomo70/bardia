import Player from '../entities/Player.js';
import Enemy from '../entities/Enemy.js';

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
    }

    create() {
        // Create ground
        this.ground = this.add.tileSprite(0, 550, 1600, 100, 'ground');
        this.ground.setOrigin(0, 0);

        // Create player
        this.player = new Player(this, 100, 400);

        // Create enemy
        this.enemy = new Enemy(this, 300, 400);

        // Set up physics
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.enemy, this.ground);

        // Set up camera
        this.cameras.main.setBounds(0, 0, 1600, 600);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        // Create HUD
        this.coinsText = this.add.text(16, 16, 'Coins: 0', {
            fontSize: '32px',
            fill: '#fff'
        });
        this.coinsText.setScrollFactor(0);

        // Initialize registry
        this.registry.set('coins', 0);
    }

    update() {
        this.player.update();
        this.enemy.update();
    }
}