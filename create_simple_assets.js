const fs = require('fs');
const path = require('path');

// Create simple colored rectangle assets as base64 encoded data URLs
// These will be minimal but functional placeholder images

const createSimpleImage = (width, height, color, filename) => {
    // Create a simple SVG that can be used as a placeholder
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${width}" height="${height}" fill="${color}"/>
    </svg>`;
    
    const filePath = path.join(__dirname, 'assets', 'sprites', filename);
    fs.writeFileSync(filePath, svg);
    console.log(`Created ${filename}`);
};

// Create assets directory
const assetsDir = path.join(__dirname, 'assets', 'sprites');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

// Create simple placeholder assets
createSimpleImage(512, 32, '#6496ff', 'player.svg');
createSimpleImage(256, 32, '#ff6464', 'enemy.svg');
createSimpleImage(32, 32, '#ffd700', 'coin.svg');
createSimpleImage(32, 32, '#8b4513', 'ground.svg');
createSimpleImage(64, 32, '#ffff64', 'sword-slash.svg');

console.log('Simple SVG assets created!');