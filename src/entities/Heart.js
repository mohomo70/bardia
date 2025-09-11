export default class Heart extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'heart');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setScale(0.5);
        this.setBounce(0.3);
        
        // Create floating animation
        this.scene.tweens.add({
            targets: this,
            y: this.y - 10,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Create pulsing animation
        this.scene.tweens.add({
            targets: this,
            scaleX: 0.6,
            scaleY: 0.6,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    collect() {
        // Heal player
        if (this.scene.player && this.scene.player.heal) {
            this.scene.player.heal(1);
        }
        
        // Create collection effect
        this.createCollectionEffect();
        
        // Destroy heart
        this.destroy();
    }

    createCollectionEffect() {
        // Create sparkle particles
        for (let i = 0; i < 8; i++) {
            const particle = this.scene.add.rectangle(
                this.x + Phaser.Math.Between(-10, 10),
                this.y + Phaser.Math.Between(-10, 10),
                4,
                4,
                0xff69b4
            );
            
            this.scene.tweens.add({
                targets: particle,
                x: particle.x + Phaser.Math.Between(-30, 30),
                y: particle.y + Phaser.Math.Between(-30, 30),
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
}