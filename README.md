# Sword of Xolan-like 2D Action Platformer

A Phaser 3 based 2D action platformer inspired by Sword of Xolan.

## Current Status: Phase 5 - Shipping & Stretch Goals ✅

### ✅ Completed Features
- **Phase 0**: Project setup with Vite and Phaser 3
- **Phase 1**: Player movement, jumping, and combat system
- **Phase 2**: Core game feel with coyote time, variable jump, attack buffer, level system, parallax background
- **Phase 3**: Health system, heart collectibles, checkpoint system
- **Phase 4**: Juice effects, speed-run timer, build pipeline
- **Phase 5**: GitHub Pages deployment, itch.io ready build

### 🎮 Controls
- **Arrow Keys**: Move left/right and jump
- **Space**: Attack with sword

### 🚀 Getting Started

#### Option 1: Docker (Recommended)

1. **Development with Docker:**
   ```bash
   # Quick start
   ./docker-run.sh dev
   
   # Or using docker-compose
   docker-compose --profile dev up --build
   ```

2. **Production with Docker:**
   ```bash
   # Production on port 80
   ./docker-run.sh prod
   
   # Production on port 8080
   ./docker-run.sh prod-custom
   ```

3. Open your browser to:
   - Development: `http://localhost:3000`
   - Production: `http://localhost` (port 80) or `http://localhost:8080`

#### Option 2: Local Development

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

### 🎯 Game Features
- **Movement**: Smooth platformer movement with coyote time and variable jump height
- **Combat**: Sword attack system with hit detection, screen shake, and hit-stop
- **Health System**: 3 hearts with invulnerability frames and heart collectibles
- **Checkpoints**: Save progress and restore health/coins
- **Speed-run Timer**: Track your best completion time
- **Juice Effects**: Dust particles, camera lookahead, slow-motion on kills
- **Level System**: Tile-based level with spawn points and decorations
- **Parallax Background**: Multi-layer scrolling background

### 🚀 Deployment

#### Docker Deployment
- **Development**: Hot reload with volume mounting
- **Production**: Optimized nginx server with gzip compression
- **Multi-stage Build**: Efficient production images
- **Easy Commands**: `./docker-run.sh [dev|prod|prod-custom]`

#### Traditional Deployment
- **GitHub Pages**: Automatic deployment on push to main
- **itch.io Ready**: Build includes README_itch.txt for publishing
- **Local Development**: `npm run dev` for development server
- **Production Build**: `npm run build` for optimized build

#### Docker Files
- `Dockerfile.dev` - Development environment
- `Dockerfile` - Production environment
- `docker-compose.yml` - Orchestration
- `nginx.conf` - Production server config
- `DOCKER.md` - Detailed Docker documentation

### 📝 Technical Notes
- Built with Phaser 3 and Vite
- Uses SVG placeholder assets (easily replaceable)
- Sound effects are placeholder files
- Local storage for best times and checkpoints
- Responsive design with camera following

### 🎮 How to Play
1. Use arrow keys to move and jump
2. Press space to attack enemies with your sword
3. Collect coins by defeating enemies
4. Collect hearts to restore health
5. Activate checkpoints to save progress
6. Try to beat your best completion time!

---

**Phase Progress**: 5/5 Complete ✅
- ✅ Phase 0: One-time Setup
- ✅ Phase 1: Minimal Playable Shell
- ✅ Phase 2: Core Game Feel
- ✅ Phase 3: Content & Systems
- ✅ Phase 4: Polishing Loop
- ✅ Phase 5: Shipping & Stretch Goals

**Status**: Ready for deployment and play! 🎉

---

## Development Commands

### Docker Commands (Recommended)
```bash
# Development with hot reload
./docker-run.sh dev
# or
docker-compose --profile dev up --build

# Production on port 80
./docker-run.sh prod
# or
docker-compose --profile prod up --build

# Production on port 8080
./docker-run.sh prod-custom
```

### Traditional Commands
```bash
# dev server with hot reload
npm run dev

# build for prod
npm run build

# preview prod build locally
npm run preview
```

## License

This project is open source and available under the [MIT License](LICENSE).