# Sword of Xolan-like 2D Action Platformer

A Phaser 3 based 2D action platformer inspired by Sword of Xolan.

## Current Status: Phase 1 - Minimal Playable Shell

### ✅ Completed Features
- Basic project setup with Vite and Phaser 3
- Player movement (left/right/jump) with arcade physics
- Basic enemy with simple AI
- Sword attack system with hit detection
- Coin collection system
- Camera following player
- Basic HUD showing coin count

### 🎮 Controls
- **Arrow Keys**: Move left/right and jump
- **Space**: Attack with sword

### 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:3000`

### 📁 Project Structure
```
src/
├── main.js              # Game entry point
├── scenes/              # Game scenes
│   ├── Boot.js         # Initial setup
│   ├── Preload.js      # Asset loading
│   └── Game.js         # Main game scene
├── entities/            # Game objects
│   ├── Player.js       # Player character
│   └── Enemy.js        # Enemy character
├── data/
│   └── Constants.js    # Game constants
└── utils/              # Utility functions

assets/
├── sprites/            # Image assets (currently SVG placeholders)
└── sfx/               # Sound effects (placeholder files)
```

### 🎯 Next Steps (Phase 2)
- Add coyote-time jump
- Variable jump height
- Attack buffer system
- Screen shake and hit-stop effects
- Particle effects on enemy death
- Import Tiled map for level design
- Parallax background layers

### 📝 Notes
- Currently using SVG placeholder assets
- Sound effects are placeholder files
- Basic physics and collision detection implemented
- Camera follows player with smooth interpolation

### 🐛 Known Issues
- Placeholder assets are simple colored rectangles
- No actual sound effects (placeholder files)
- Basic enemy AI (moves toward player)
- No level progression system yet

---

**Phase Progress**: 1/5 Complete
- ✅ Phase 0: One-time Setup
- 🔄 Phase 1: Minimal Playable Shell (In Progress)
- ⏳ Phase 2: Core Game Feel
- ⏳ Phase 3: Content & Systems
- ⏳ Phase 4: Polishing Loop
- ⏳ Phase 5: Shipping & Stretch Goals