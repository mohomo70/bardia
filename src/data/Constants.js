// Game constants
export const GAME_CONFIG = {
    WIDTH: 800,
    HEIGHT: 600,
    GRAVITY: 300,
    PLAYER_SPEED: 200,
    JUMP_VELOCITY: -330,
    COYOTE_TIME_MAX: 5,
    ATTACK_BUFFER_MAX: 4,
    ATTACK_COOLDOWN: 30
};

// Scene keys
export const SCENES = {
    BOOT: 'Boot',
    PRELOAD: 'Preload',
    GAME: 'Game',
    LEVEL_SELECT: 'LevelSelect'
};

// Animation keys
export const ANIMATIONS = {
    PLAYER_IDLE: 'idle',
    PLAYER_RUN: 'run',
    PLAYER_JUMP: 'jump',
    PLAYER_ATTACK: 'attack',
    ENEMY_IDLE: 'enemy_idle',
    ENEMY_HIT: 'enemy_hit',
    ENEMY_DEATH: 'enemy_death'
};

// Sound keys
export const SOUNDS = {
    JUMP: 'jump',
    HIT: 'hit',
    COIN: 'coin'
};