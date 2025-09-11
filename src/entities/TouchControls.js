export default class TouchControls {
    constructor(scene) {
        this.scene = scene;
        this.isEnabled = false;
        this.buttons = {};
        this.touchAreas = {};
        this.swipeThreshold = 50;
        this.tapThreshold = 200;
        
        // Touch state
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchStartTime = 0;
        this.isTouching = false;
        
        // Virtual button states
        this.leftPressed = false;
        this.rightPressed = false;
        this.jumpPressed = false;
        this.attackPressed = false;
        
        this.createTouchAreas();
        this.setupTouchEvents();
        this.setupResizeHandler();
    }
    
    createTouchAreas() {
        const { width, height } = this.scene.scale;
        
        // Left movement area (left half of screen)
        this.touchAreas.left = this.scene.add.rectangle(
            width * 0.25, height * 0.5,
            width * 0.5, height,
            0x000000, 0.01
        );
        this.touchAreas.left.setScrollFactor(0);
        this.touchAreas.left.setInteractive();
        this.touchAreas.left.setDepth(1000);
        
        // Right movement area (right half of screen)
        this.touchAreas.right = this.scene.add.rectangle(
            width * 0.75, height * 0.5,
            width * 0.5, height,
            0x000000, 0.01
        );
        this.touchAreas.right.setScrollFactor(0);
        this.touchAreas.right.setInteractive();
        this.touchAreas.right.setDepth(1000);
        
        // Jump button (top right)
        this.buttons.jump = this.scene.add.circle(
            width - 80, 100,
            40,
            0x4CAF50, 0.7
        );
        this.buttons.jump.setScrollFactor(0);
        this.buttons.jump.setInteractive();
        this.buttons.jump.setDepth(1000);
        
        // Attack button (bottom right)
        this.buttons.attack = this.scene.add.circle(
            width - 80, height - 80,
            40,
            0xF44336, 0.7
        );
        this.buttons.attack.setScrollFactor(0);
        this.buttons.attack.setInteractive();
        this.buttons.attack.setDepth(1000);
        
        // Add button labels
        this.buttons.jumpLabel = this.scene.add.text(width - 80, 100, 'JUMP', {
            fontSize: '12px',
            fill: '#fff',
            align: 'center'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
        
        this.buttons.attackLabel = this.scene.add.text(width - 80, height - 80, 'ATTACK', {
            fontSize: '12px',
            fill: '#fff',
            align: 'center'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
        
        // Initially hide touch controls
        this.setVisible(false);
    }
    
    setupTouchEvents() {
        // Left area events
        this.touchAreas.left.on('pointerdown', () => {
            this.leftPressed = true;
            this.touchAreas.left.setAlpha(0.1);
        });
        
        this.touchAreas.left.on('pointerup', () => {
            this.leftPressed = false;
            this.touchAreas.left.setAlpha(0.01);
        });
        
        this.touchAreas.left.on('pointerout', () => {
            this.leftPressed = false;
            this.touchAreas.left.setAlpha(0.01);
        });
        
        // Right area events
        this.touchAreas.right.on('pointerdown', () => {
            this.rightPressed = true;
            this.touchAreas.right.setAlpha(0.1);
        });
        
        this.touchAreas.right.on('pointerup', () => {
            this.rightPressed = false;
            this.touchAreas.right.setAlpha(0.01);
        });
        
        this.touchAreas.right.on('pointerout', () => {
            this.rightPressed = false;
            this.touchAreas.right.setAlpha(0.01);
        });
        
        // Jump button events
        this.buttons.jump.on('pointerdown', () => {
            this.jumpPressed = true;
            this.buttons.jump.setScale(0.9);
        });
        
        this.buttons.jump.on('pointerup', () => {
            this.jumpPressed = false;
            this.buttons.jump.setScale(1);
        });
        
        this.buttons.jump.on('pointerout', () => {
            this.jumpPressed = false;
            this.buttons.jump.setScale(1);
        });
        
        // Attack button events
        this.buttons.attack.on('pointerdown', () => {
            this.attackPressed = true;
            this.buttons.attack.setScale(0.9);
        });
        
        this.buttons.attack.on('pointerup', () => {
            this.attackPressed = false;
            this.buttons.attack.setScale(1);
        });
        
        this.buttons.attack.on('pointerout', () => {
            this.attackPressed = false;
            this.buttons.attack.setScale(1);
        });
        
        // Global touch events for swipe gestures
        this.scene.input.on('pointerdown', (pointer) => {
            this.touchStartX = pointer.x;
            this.touchStartY = pointer.y;
            this.touchStartTime = Date.now();
            this.isTouching = true;
        });
        
        this.scene.input.on('pointerup', (pointer) => {
            if (!this.isTouching) return;
            
            const touchDuration = Date.now() - this.touchStartTime;
            const deltaX = pointer.x - this.touchStartX;
            const deltaY = pointer.y - this.touchStartY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            // Handle swipe gestures
            if (touchDuration < this.tapThreshold && distance < this.swipeThreshold) {
                // Quick tap - could be used for jump
                this.handleTap(pointer.x, pointer.y);
            } else if (distance > this.swipeThreshold) {
                // Swipe gesture
                this.handleSwipe(deltaX, deltaY);
            }
            
            this.isTouching = false;
        });
    }
    
    setupResizeHandler() {
        // Handle window resize to reposition touch controls
        this.scene.scale.on('resize', () => {
            this.updatePositions();
        });
    }
    
    updatePositions() {
        const { width, height } = this.scene.scale;
        
        // Update touch areas
        if (this.touchAreas.left) {
            this.touchAreas.left.setPosition(width * 0.25, height * 0.5);
            this.touchAreas.left.setSize(width * 0.5, height);
        }
        
        if (this.touchAreas.right) {
            this.touchAreas.right.setPosition(width * 0.75, height * 0.5);
            this.touchAreas.right.setSize(width * 0.5, height);
        }
        
        // Update buttons
        if (this.buttons.jump) {
            this.buttons.jump.setPosition(width - 80, 100);
        }
        
        if (this.buttons.attack) {
            this.buttons.attack.setPosition(width - 80, height - 80);
        }
        
        // Update labels
        if (this.buttons.jumpLabel) {
            this.buttons.jumpLabel.setPosition(width - 80, 100);
        }
        
        if (this.buttons.attackLabel) {
            this.buttons.attackLabel.setPosition(width - 80, height - 80);
        }
    }
    
    handleTap(x, y) {
        // Quick tap in center area could trigger jump
        const { width, height } = this.scene.scale;
        const centerX = width / 2;
        const centerY = height / 2;
        const distanceFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        
        if (distanceFromCenter < 100) {
            this.jumpPressed = true;
            // Reset after a short time
            this.scene.time.delayedCall(100, () => {
                this.jumpPressed = false;
            });
        }
    }
    
    handleSwipe(deltaX, deltaY) {
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);
        
        if (absDeltaX > absDeltaY) {
            // Horizontal swipe
            if (deltaX > 0) {
                // Swipe right
                this.rightPressed = true;
                this.scene.time.delayedCall(200, () => {
                    this.rightPressed = false;
                });
            } else {
                // Swipe left
                this.leftPressed = true;
                this.scene.time.delayedCall(200, () => {
                    this.leftPressed = false;
                });
            }
        } else {
            // Vertical swipe
            if (deltaY < 0) {
                // Swipe up - jump
                this.jumpPressed = true;
                this.scene.time.delayedCall(100, () => {
                    this.jumpPressed = false;
                });
            }
        }
    }
    
    enable() {
        this.isEnabled = true;
        this.setVisible(true);
    }
    
    disable() {
        this.isEnabled = false;
        this.setVisible(false);
        this.resetStates();
    }
    
    setVisible(visible) {
        Object.values(this.buttons).forEach(button => {
            if (button && button.setVisible) {
                button.setVisible(visible);
            }
        });
        Object.values(this.touchAreas).forEach(area => {
            if (area && area.setVisible) {
                area.setVisible(visible);
            }
        });
    }
    
    resetStates() {
        this.leftPressed = false;
        this.rightPressed = false;
        this.jumpPressed = false;
        this.attackPressed = false;
    }
    
    // Getters for input states
    get left() {
        return this.isEnabled && this.leftPressed;
    }
    
    get right() {
        return this.isEnabled && this.rightPressed;
    }
    
    get up() {
        return this.isEnabled && this.jumpPressed;
    }
    
    get space() {
        return this.isEnabled && this.attackPressed;
    }
    
    // Method to check if jump was just pressed
    isJumpJustPressed() {
        if (!this.isEnabled) return false;
        const wasPressed = this.jumpPressed;
        if (wasPressed) {
            this.jumpPressed = false; // Reset after checking
        }
        return wasPressed;
    }
    
    // Method to check if attack was just pressed
    isAttackJustPressed() {
        if (!this.isEnabled) return false;
        const wasPressed = this.attackPressed;
        if (wasPressed) {
            this.attackPressed = false; // Reset after checking
        }
        return wasPressed;
    }
}