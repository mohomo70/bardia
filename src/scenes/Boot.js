export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot' });
    }

    create() {
        // Scale configuration
        this.scale.on('resize', this.resize, this);
        
        // Set background color
        this.cameras.main.setBackgroundColor('#2c3e50');
        
        // Start preload scene
        this.scene.start('Preload');
    }

    resize(gameSize, baseSize, displaySize, resolution) {
        const { width, height } = gameSize;
        this.cameras.main.setViewport(0, 0, width, height);
    }
}