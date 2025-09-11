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
        
        // Coyote time
        this.coyoteTime = 0;
        this.coyoteTimeMax = 5;
        
        // Attack buffer
        this.attackBuffer = 0;
        this.attackBufferMax = 4;
        
        // Create animations
        this.createAnimations();
        
        // Set initial animation
        this.play('idle');
        
        // Set up input
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
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

    handleMovement() {
        // Left/Right movement
        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.speed);
            this.setFlipX(true);
            if (this.body.touching.down) {
                this.play('run', true);
            }
        } else if (this.cursors.right.isDown) {
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

        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.coyoteTime > 0) {
            this.setVelocityY(this.jumpVelocity);
            this.coyoteTime = 0;
            try {
                this.scene.sound.play('jump', { volume: 0.3 });
            } catch (e) {
                console.log('Jump sound not available');
            }
        }

        // Variable jump height
        if (this.cursors.up.isUp && this.body.velocity.y < 0) {
            this.setVelocityY(this.body.velocity.y * 0.5);
        }
    }

    handleAttack() {
        if (this.attackCooldown > 0) {
            this.attackCooldown--;
            return;
        }

        // Attack buffer
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
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

        // Create sword hit box
        const hitBox = this.scene.add.rectangle(
            this.x + (this.flipX ? -20 : 20),
            this.y,
            40,
            30,
            0xff0000,
            0.5
        );
        hitBox.setDepth(1);

        // Check collision with enemies
        this.scene.physics.add.overlap(hitBox, this.scene.enemy, (hitBox, enemy) => {
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
}