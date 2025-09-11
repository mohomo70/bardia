export default class Checkpoint extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'checkpoint');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setScale(0.8);
        this.isActivated = false;
        
        // Create flag animation
        this.scene.tweens.add({
            targets: this,
            y: this.y - 5,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Create pulsing animation
        this.scene.tweens.add({
            targets: this,
            scaleX: 0.9,
            scaleY: 0.9,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    activate() {
        if (this.isActivated) return;
        
        this.isActivated = true;
        this.setTint(0x00ff00); // Green when activated
        
        // Save game state
        this.saveGameState();
        
        // Create activation effect
        this.createActivationEffect();
    }

    saveGameState() {
        // Save player position, health, and coins
        const gameState = {
            playerX: this.scene.player.x,
            playerY: this.scene.player.y,
            health: this.scene.player.health,
            coins: this.scene.registry.get('coins')
        };
        
        localStorage.setItem('gameState', JSON.stringify(gameState));
        console.log('Game state saved!');
    }

    createActivationEffect() {
        // Create sparkle particles
        for (let i = 0; i < 12; i++) {
            const particle = this.scene.add.rectangle(
                this.x + Phaser.Math.Between(-15, 15),
                this.y + Phaser.Math.Between(-15, 15),
                6,
                6,
                0x00ff00
            );
            
            this.scene.tweens.add({
                targets: particle,
                x: particle.x + Phaser.Math.Between(-40, 40),
                y: particle.y + Phaser.Math.Between(-40, 40),
                alpha: 0,
                scale: 0,
                duration: 1500,
                ease: 'Power2',
                onComplete: () => {
                    particle.destroy();
                }
            });
        }
    }
}