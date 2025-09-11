import Player from '../entities/Player.js';
import Enemy from '../entities/Enemy.js';
import { LEVEL1_DATA, TILE_TYPES } from '../data/Level1.js';

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
    }

    create() {
        // Create parallax background
        this.createBackground();
        
        // Create level from data
        this.createLevel();
        
        // Create player at spawn point
        const playerSpawn = this.findSpawnPoint(TILE_TYPES.PLAYER_SPAWN);
        this.player = new Player(this, playerSpawn.x, playerSpawn.y);

        // Create enemies at spawn points
        this.enemies = [];
        const enemySpawns = this.findSpawnPoints(TILE_TYPES.ENEMY_SPAWN);
        enemySpawns.forEach(spawn => {
            const enemy = new Enemy(this, spawn.x, spawn.y);
            this.enemies.push(enemy);
        });

        // Set up physics
        this.physics.add.collider(this.player, this.groundLayer);
        this.enemies.forEach(enemy => {
            this.physics.add.collider(enemy, this.groundLayer);
        });
        
        // Player-enemy collision
        this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
            // Handle player taking damage from enemy
            if (enemy.isDead) return;
            // For now, just push player back
            const direction = player.x < enemy.x ? -1 : 1;
            player.setVelocityX(direction * 100);
        });

        // Set up camera
        this.cameras.main.setBounds(0, 0, LEVEL1_DATA.width * LEVEL1_DATA.tileWidth, LEVEL1_DATA.height * LEVEL1_DATA.tileHeight);
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

    createLevel() {
        const { width, height, tileWidth, tileHeight, layers } = LEVEL1_DATA;
        
        // Create ground layer
        this.groundLayer = this.add.group();
        
        // Create tiles for ground layer
        const groundLayer = layers.find(layer => layer.name === 'ground');
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const tileIndex = y * width + x;
                const tileType = groundLayer.data[tileIndex];
                
                if (tileType === TILE_TYPES.GROUND) {
                    const tile = this.add.image(x * tileWidth + tileWidth/2, y * tileHeight + tileHeight/2, 'ground');
                    tile.setOrigin(0.5, 0.5);
                    this.groundLayer.add(tile);
                }
            }
        }
        
        // Create decoration layer
        const decorationLayer = layers.find(layer => layer.name === 'decoration');
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const tileIndex = y * width + x;
                const tileType = decorationLayer.data[tileIndex];
                
                if (tileType === TILE_TYPES.GRASS) {
                    const decoration = this.add.image(x * tileWidth + tileWidth/2, y * tileHeight + tileHeight/2, 'ground');
                    decoration.setOrigin(0.5, 0.5);
                    decoration.setTint(0x00ff00); // Green tint for grass
                }
            }
        }
    }

    findSpawnPoint(tileType) {
        const spawnLayer = LEVEL1_DATA.layers.find(layer => layer.name === 'spawns');
        const { width, tileWidth, tileHeight } = LEVEL1_DATA;
        
        for (let y = 0; y < LEVEL1_DATA.height; y++) {
            for (let x = 0; x < width; x++) {
                const tileIndex = y * width + x;
                if (spawnLayer.data[tileIndex] === tileType) {
                    return {
                        x: x * tileWidth + tileWidth/2,
                        y: y * tileHeight + tileHeight/2
                    };
                }
            }
        }
        return { x: 100, y: 400 }; // Fallback
    }

    findSpawnPoints(tileType) {
        const spawnLayer = LEVEL1_DATA.layers.find(layer => layer.name === 'spawns');
        const { width, tileWidth, tileHeight } = LEVEL1_DATA;
        const spawns = [];
        
        for (let y = 0; y < LEVEL1_DATA.height; y++) {
            for (let x = 0; x < width; x++) {
                const tileIndex = y * width + x;
                if (spawnLayer.data[tileIndex] === tileType) {
                    spawns.push({
                        x: x * tileWidth + tileWidth/2,
                        y: y * tileHeight + tileHeight/2
                    });
                }
            }
        }
        return spawns;
    }

    createBackground() {
        // Sky layer (furthest back)
        this.sky = this.add.rectangle(
            LEVEL1_DATA.width * LEVEL1_DATA.tileWidth / 2,
            LEVEL1_DATA.height * LEVEL1_DATA.tileHeight / 2,
            LEVEL1_DATA.width * LEVEL1_DATA.tileWidth,
            LEVEL1_DATA.height * LEVEL1_DATA.tileHeight,
            0x87CEEB
        );
        this.sky.setScrollFactor(0);
        
        // Mountains layer
        this.mountains = this.add.rectangle(
            LEVEL1_DATA.width * LEVEL1_DATA.tileWidth / 2,
            LEVEL1_DATA.height * LEVEL1_DATA.tileHeight - 100,
            LEVEL1_DATA.width * LEVEL1_DATA.tileWidth,
            200,
            0x8B7355
        );
        this.mountains.setScrollFactor(0.3);
        
        // Clouds layer
        this.clouds = this.add.rectangle(
            LEVEL1_DATA.width * LEVEL1_DATA.tileWidth / 2,
            100,
            LEVEL1_DATA.width * LEVEL1_DATA.tileWidth,
            100,
            0xFFFFFF
        );
        this.clouds.setScrollFactor(0.5);
    }

    update() {
        this.player.update();
        this.enemies.forEach(enemy => {
            if (enemy && enemy.update) {
                enemy.update();
            }
        });
    }
}