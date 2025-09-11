# Phaser 3 – "Sword-of-Xolan-like" 2D Action Platformer
## Road-map & Check-list

This is a "living" README you can drop in the root of your new repo.
It is written as a checklist so you can literally tick boxes as you go.
Everything is split into 5 phases; finish one phase before you open the next.
Each phase contains only the work that unlocks the next, so you never feel lost.

---

## PHASE 0 – One-time Setup (½ h)

- [ ] `npm init -y`
- [ ] `npm i phaser@latest vite@latest`
- [ ] Add scripts to package.json:
  ```json
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
  ```
- [ ] Create folder tree:
  ```
  src/
  ├─ main.js
  ├─ scenes/
  │  ├─ Boot.js
  │  ├─ Preload.js
  │  └─ Game.js
  ├─ entities/
  │  ├─ Player.js
  │  ├─ Enemy.js
  │  └─ Collectible.js
  ├─ utils/
  │  └─ Animations.js
  assets/
  ├─ sprites/
  ├─ tilesets/
  ├─ sfx/
  └─ music/
  ```
- [ ] Drop free placeholder assets (Kenney, OpenGameArt) so you never block coding.
- [ ] Git init & first commit.

---

## PHASE 1 – Minimal Playable Shell (2–3 h)
**Goal:** you can move, jump, and hit a static enemy with a sword.

- [ ] `main.js` → create 800×600 game, include the three scenes.
- [ ] `Boot.js` → scale RESIZE, background #2c3e50.
- [ ] `Preload.js` → load spritesheet player.png (32×32), enemy, sword slash FX, jump & hit SFX.
- [ ] `Player.js` class:
  - [ ] `handleMovement()` left / right / jump (arcade physics).
  - [ ] `handleAttack()` spawn melee hit-box for 6 frames, play slash sound.
- [ ] `Enemy.js` class (dummy):
  - [ ] 1 HP, takes knock-back, tint red on hit, dies and drops coin.
- [ ] `Game.js` scene:
  - [ ] add tile sprite for ground, player, one enemy.
  - [ ] collisions: player ↔ world, player ↔ enemy, sword hit-box ↔ enemy.
- [ ] Camera: setBounds, startFollow(player, true, 0.05, 0.05).
- [ ] HUD text: "Coins: 0".
- [ ] Commit: "Phase-1 playable shell".

---

## PHASE 2 – Core Game Feel (4–5 h)
**Goal:** movement & combat feel juicy; first level block-out.

- [ ] Coyote-time jump (5 frames grace after leaving ground).
- [ ] Variable jump height (shorter tap = smaller apex).
- [ ] Attack buffer (if pressed 4 frames before landing, attack starts on landing).
- [ ] Sword hit-box: use Phaser.Geom.Rectangle and draw debug rect for tuning.
- [ ] Screenshake 4 px on hit.
- [ ] Hit-stop: `this.physics.pause()` 100 ms on successful strike.
- [ ] Particle burst on enemy death (tiny yellow squares).
- [ ] Import Tiled map (level1.json) with simple tileset.
- [ ] Parse layers: "ground" (collides), "decoration" (no collide), "spawns" (player, enemies).
- [ ] Place 3 enemy spawns in Tiled; spawn them at runtime.
- [ ] Parallax background 3 layers (mountains, clouds, sky).
- [ ] Commit: "Phase-2 game feel".

---

## PHASE 3 – Content & Systems (6–8 h)
**Goal:** 3 short levels, checkpoints, health, UI, collectibles.

- [ ] Player health (3 hearts), invulnerability frames (1 s) with blink tween.
- [ ] Heart pick-up (restore 1 HP).
- [ ] Checkpoint flag: save coins, HP, level progress to localStorage.
- [ ] Breakable crates (1 HP) that drop coins or hearts.
- [ ] Moving platform (tween x or y).
- [ ] Spikes tile-index → instant 1 damage.
- [ ] Level exit portal → fade-out → next scene.
- [ ] Scene `LevelSelect.js` → three buttons that launch Game.js with different map keys.
- [ ] Add Level2.tmx and Level3.tmx with increasing difficulty (more enemies, moving platforms, spike pits).
- [ ] Global registry `registry.coins` and `registry.maxHP` so HUD persists between levels.
- [ ] Simple fade-transition plugin (`this.cameras.main.fadeOut` / `fadeIn`) reused on level start / end.
- [ ] Sound-manager utility (`src/utils/SoundManager.js`) that handles mute, volume slider, and caches sfx.
- [ ] Background music per level (looped OGG).
- [ ] Commit: "Phase-3 content & systems".

---

## PHASE 4 – Polishing Loop (4–6 h)
**Goal:** juice, game-loop, and a build you can send to a friend.

### Juice list (pick any 5):
- [ ] Enemy hit-flash white + knock-back tween.
- [ ] Dust cloud particle on player land / slide.
- [ ] Sword swipe animation rotated to face movement direction.
- [ ] Camera lookahead (shift 80 px in facing direction).
- [ ] Slow-motion 0.3× for 200 ms on lethal blow.

### Game-loop tuning:
- [ ] Balance enemy HP, damage, coin value so 3 levels take ~5 min speed-run.
- [ ] Add speed-run timer (stored in registry) and show best time on LevelSelect.

### Touch / game-pad input:
- [ ] On-screen buttons for mobile (left, right, A, B).
- [ ] Auto-detect game-pad and map to same actions.

### Build pipeline:
- [ ] `vite build` → dist/; test `npx serve dist`.
- [ ] Add `public/` folder for static metadata (favicon.ico, manifest.json, 512×512 icon).
- [ ] Create itch.io page zip: dist/ + README_itch.txt (controls, credits).

- [ ] Commit: "Phase-4 polished build".

---

## PHASE 5 – Shipping & Stretch Goals (open-ended)
**Goal:** publish and optionally expand.

- [ ] Deploy to GitHub Pages (gh-pages branch or GitHub Actions).
- [ ] Post on itch.io with gifs, tag "Phaser", "Pixel-art", "Retro".
- [ ] Collect feedback: Google Form or itch comments.
- [ ] Bug-fixes & hot-patch branch (v1.0.1).

### Stretch (pick 1–2):
- [ ] Boss at end of Level 3 (multi-phase, telegraphed attacks, weak-point).
- [ ] Shop between levels (spend coins on +1 max HP, wider sword arc, dash move).
- [ ] Speed-run leader-board (Firebase or Supabase).
- [ ] Steam wrap with Electron or Capacitor for desktop / mobile.

---

## Asset Checklist (copy / paste into Trello)

- [ ] Player spritesheet (idle, run, jump, fall, attack, hurt, die).
- [ ] Enemy sprites (at least 2 types: melee & projectile).
- [ ] Tileset 16×16 (dirt, grass, stone, spikes, crates, flag, portal).
- [ ] FX sprites (slash, dust, explosion, coin sparkle).
- [ ] SFX: jump, land, sword, hit, coin, death, UI click.
- [ ] Music: calm (level), intense (boss), victory jingle.

---

## Coding Conventions

- Classes named PascalCase, instances camelCase.
- Scene keys in CONST.js to avoid typos.
- Magic numbers (gravity, jump velocity, hit-box sizes) live in `src/data/Constants.js`.
- Always `scene.events.once('shutdown', …)` to clean up timers / listeners.

---

## Cheat-sheet Commands

```bash
# dev server with hot reload
npm run dev

# build for prod
npm run build

# preview prod build locally
npm run preview
```

---

## Getting Started

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Open your browser to the local development URL (usually `http://localhost:5173`)
5. Start with Phase 0 and work through each phase systematically

## Project Structure

```
├── src/
│   ├── main.js              # Game entry point
│   ├── scenes/              # Game scenes
│   │   ├── Boot.js         # Initial setup scene
│   │   ├── Preload.js      # Asset loading scene
│   │   ├── Game.js         # Main gameplay scene
│   │   └── LevelSelect.js  # Level selection scene
│   ├── entities/            # Game entities
│   │   ├── Player.js       # Player character
│   │   ├── Enemy.js        # Enemy characters
│   │   └── Collectible.js  # Collectible items
│   ├── utils/              # Utility functions
│   │   ├── Animations.js   # Animation helpers
│   │   └── SoundManager.js # Audio management
│   └── data/
│       └── Constants.js    # Game constants
├── assets/                  # Game assets
│   ├── sprites/            # Character and object sprites
│   ├── tilesets/           # Level tilesets
│   ├── sfx/               # Sound effects
│   └── music/             # Background music
├── public/                 # Static files for web deployment
└── dist/                   # Built game files (generated)
```

## License

This project is open source and available under the [MIT License](LICENSE).