export default class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload' });
    }

    preload() {
        // Create loading bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        const { width } = this.cameras.main;
        const { height } = this.cameras.main;
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        const assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', (value) => {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('fileprogress', (file) => {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        this.load.on('loaderror', (file) => {
            console.warn('Failed to load asset:', file.key);
        });

        // Load placeholder assets
        this.load.spritesheet('player', 'assets/sprites/player.svg', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemy', 'assets/sprites/enemy.svg', { frameWidth: 32, frameHeight: 32 });
        this.load.image('sword-slash', 'assets/sprites/sword-slash.svg');
        this.load.image('coin', 'assets/sprites/coin.svg');
        this.load.image('ground', 'assets/sprites/ground.svg');
        
        // Load sounds (placeholder files for now)
        // Note: These are placeholder files and won't play actual sounds
        this.load.audio('jump', 'assets/sfx/jump.wav');
        this.load.audio('hit', 'assets/sfx/hit.wav');
        this.load.audio('coin', 'assets/sfx/coin.wav');
    }

    create() {
        this.scene.start('Game');
    }
}