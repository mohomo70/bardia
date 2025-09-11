export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
        
        // Enemy properties
        this.health = 1;
        this.maxHealth = 1;
        this.isDead = false;
        this.knockbackForce = 200;
        
        // Create animations
        this.createAnimations();
        
        this.play('idle');
    }

    createAnimations() {
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'hit',
            frames: this.anims.generateFrameNumbers('enemy', { start: 4, end: 4 }),
            frameRate: 1
        });

        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers('enemy', { start: 5, end: 7 }),
            frameRate: 8,
            repeat: 0
        });
    }

    takeDamage(damage) {
        if (this.isDead) return;

        this.health -= damage;
        
        // Visual feedback
        this.setTint(0xff0000);
        this.scene.time.delayedCall(100, () => {
            this.clearTint();
        });

        // Knockback
        const direction = this.x < this.scene.player.x ? -1 : 1;
        this.setVelocityX(direction * this.knockbackForce);

        if (this.health <= 0) {
            // Slow-motion effect on lethal blow
            this.scene.timeScale = 0.3;
            this.scene.time.delayedCall(200, () => {
                this.scene.timeScale = 1.0;
            });
            this.die();
        }
    }

    die() {
        if (this.isDead) return;
        
        this.isDead = true;
        this.play('death', true);
        
        // Drop coin
        this.dropCoin();
        
        // Particle burst
        this.createDeathParticles();
        
        // Remove from scene after animation
        this.scene.time.delayedCall(500, () => {
            this.destroy();
        });
    }

    dropCoin() {
        const coin = this.scene.add.image(this.x, this.y, 'coin');
        coin.setScale(0.5);
        
        // Animate coin collection
        this.scene.tweens.add({
            targets: coin,
            y: coin.y - 50,
            alpha: 0,
            scale: 1.5,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                coin.destroy();
                // Update coin count
                const currentCoins = this.scene.registry.get('coins');
                this.scene.registry.set('coins', currentCoins + 1);
                this.scene.coinsText.setText(`Coins: ${currentCoins + 1}`);
                try {
                    this.scene.sound.play('coin', { volume: 0.3 });
                } catch (e) {
                    console.log('Coin sound not available');
                }
            }
        });
    }

    createDeathParticles() {
        for (let i = 0; i < 8; i++) {
            const particle = this.scene.add.rectangle(
                this.x + Phaser.Math.Between(-10, 10),
                this.y + Phaser.Math.Between(-10, 10),
                4,
                4,
                0xffff00
            );
            
            this.scene.tweens.add({
                targets: particle,
                x: particle.x + Phaser.Math.Between(-50, 50),
                y: particle.y + Phaser.Math.Between(-50, 50),
                alpha: 0,
                scale: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    particle.destroy();
                }
            });
        }
    }

    update() {
        if (this.isDead) return;
        
        // Simple AI - move towards player
        const distance = Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y);
        if (distance < 200) {
            const direction = this.x < this.scene.player.x ? 1 : -1;
            this.setVelocityX(direction * 50);
        } else {
            this.setVelocityX(0);
        }
    }
}