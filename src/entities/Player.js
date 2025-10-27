export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
        
        // Player properties
        this.speed = 200;
        this.jumpVelocity = -330;
        this.isAttacking = false;
        this.attackCooldown = 0;
        
        // Health system
        this.maxHealth = 3;
        this.health = this.maxHealth;
        this.isInvulnerable = false;
        this.invulnerabilityDuration = 1000; // 1 second
        
        // Coyote time (5 frames grace after leaving ground)
        this.coyoteTime = 0;
        this.coyoteTimeMax = 5;
        
        // Attack buffer
        this.attackBuffer = 0;
        this.attackBufferMax = 4;
        
        // For dust effect
        this.previousVelocityY = 0;
        
        // Create animations
        this.createAnimations();
        
        // Set initial animation
        this.play('idle');
        
        // Set up input
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        // Touch controls will be set by the Game scene
        this.touchControls = null;
    }

    createAnimations() {
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 8 }),
            frameRate: 1
        });

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
            frameRate: 15,
            repeat: 0
        });

        this.play('idle');
    }
    
    setTouchControls(touchControls) {
        this.touchControls = touchControls;
    }

    handleMovement() {
        // Left/Right movement - check both keyboard and touch
        const leftPressed = this.cursors.left.isDown || (this.touchControls && this.touchControls.left);
        const rightPressed = this.cursors.right.isDown || (this.touchControls && this.touchControls.right);
        
        if (leftPressed) {
            this.setVelocityX(-this.speed);
            this.setFlipX(true);
            if (this.body.touching.down) {
                this.play('run', true);
            }
        } else if (rightPressed) {
            this.setVelocityX(this.speed);
            this.setFlipX(false);
            if (this.body.touching.down) {
                this.play('run', true);
            }
        } else {
            this.setVelocityX(0);
            if (this.body.touching.down) {
                this.play('idle', true);
            }
        }

        // Jumping with coyote time
        if (this.body.touching.down) {
            this.coyoteTime = this.coyoteTimeMax;
        } else {
            this.coyoteTime--;
        }

        // Check for jump input from keyboard or touch
        const jumpPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up) || 
                           (this.touchControls && this.touchControls.isJumpJustPressed());
        
        if (jumpPressed && this.coyoteTime > 0) {
            this.setVelocityY(this.jumpVelocity);
            this.coyoteTime = 0;
            try {
                this.scene.sound.play('jump', { volume: 0.3 });
            } catch (e) {
                console.log('Jump sound not available');
            }
        }

        // Variable jump height (shorter tap = smaller apex)
        const upReleased = this.cursors.up.isUp && (!this.touchControls || !this.touchControls.up);
        if (upReleased && this.body.velocity.y < 0) {
            this.setVelocityY(this.body.velocity.y * 0.6);
        }

        // Dust cloud on landing
        if (this.body.touching.down && this.body.velocity.y > 0 && this.previousVelocityY < 0) {
            this.createLandingDust();
        }
        this.previousVelocityY = this.body.velocity.y;
    }

    handleAttack() {
        if (this.attackCooldown > 0) {
            this.attackCooldown--;
            return;
        }

        // Attack buffer - check both keyboard and touch
        const attackPressed = Phaser.Input.Keyboard.JustDown(this.spaceKey) || 
                             (this.touchControls && this.touchControls.isAttackJustPressed());
        
        if (attackPressed) {
            if (this.body.touching.down) {
                this.performAttack();
            } else {
                this.attackBuffer = this.attackBufferMax;
            }
        }

        // Check attack buffer
        if (this.attackBuffer > 0) {
            this.attackBuffer--;
            if (this.body.touching.down) {
                this.performAttack();
                this.attackBuffer = 0;
            }
        }
    }

    performAttack() {
        if (this.isAttacking) return;

        this.isAttacking = true;
        this.attackCooldown = 30; // 0.5 seconds at 60fps
        this.play('attack', true);

        // Create sword hit box using Phaser.Geom.Rectangle
        const hitBoxRect = new Phaser.Geom.Rectangle(
            this.x + (this.flipX ? -20 : 20),
            this.y - 15,
            40,
            30
        );
        
        // Create visual hit box for debugging
        const hitBox = this.scene.add.rectangle(
            hitBoxRect.x,
            hitBoxRect.y,
            hitBoxRect.width,
            hitBoxRect.height,
            0xff0000,
            0.5
        );
        hitBox.setDepth(1);

        // Check collision with enemies
        this.scene.physics.add.overlap(hitBox, this.scene.enemies, (hitBox, enemy) => {
            if (enemy.takeDamage) {
                enemy.takeDamage(1);
                try {
                    this.scene.sound.play('hit', { volume: 0.5 });
                } catch (e) {
                    console.log('Hit sound not available');
                }
                
                // Screen shake
                this.scene.cameras.main.shake(100, 4);
                
                // Hit stop
                this.scene.physics.pause();
                this.scene.time.delayedCall(100, () => {
                    this.scene.physics.resume();
                });
            }
        });

        // Remove hit box after 6 frames
        this.scene.time.delayedCall(100, () => {
            hitBox.destroy();
            this.isAttacking = false;
        });
    }

    update() {
        this.handleMovement();
        this.handleAttack();
    }

    takeDamage(damage) {
        if (this.isInvulnerable || this.health <= 0) return false;
        
        this.health -= damage;
        this.isInvulnerable = true;
        
        // Visual feedback - blink effect
        this.scene.tweens.add({
            targets: this,
            alpha: 0.3,
            duration: 100,
            yoyo: true,
            repeat: 5,
            onComplete: () => {
                this.alpha = 1;
            }
        });
        
        // Knockback
        const direction = this.x < this.scene.player.x ? -1 : 1;
        this.setVelocityX(direction * 200);
        this.setVelocityY(-100);
        
        // End invulnerability
        this.scene.time.delayedCall(this.invulnerabilityDuration, () => {
            this.isInvulnerable = false;
        });
        
        // Update health display
        this.scene.updateHealthDisplay();
        
        return true;
    }

    heal(amount) {
        this.health = Math.min(this.health + amount, this.maxHealth);
        this.scene.updateHealthDisplay();
    }

    isDead() {
        return this.health <= 0;
    }

    createLandingDust() {
        // Create dust cloud particles
        for (let i = 0; i < 6; i++) {
            const dust = this.scene.add.rectangle(
                this.x + Phaser.Math.Between(-15, 15),
                this.y + 10,
                3,
                3,
                0x8B7355
            );
            
            this.scene.tweens.add({
                targets: dust,
                x: dust.x + Phaser.Math.Between(-20, 20),
                y: dust.y + Phaser.Math.Between(5, 15),
                alpha: 0,
                scale: 0,
                duration: 800,
                ease: 'Power2',
                onComplete: () => {
                    dust.destroy();
                }
            });
        }
    }
}