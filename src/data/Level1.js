// Simple level data for Level 1
export const LEVEL1_DATA = {
    width: 50,
    height: 20,
    tileWidth: 32,
    tileHeight: 32,
    layers: [
        {
            name: 'ground',
            data: [
                // Row 0-10: Empty space
                ...Array(11 * 50).fill(0),
                // Row 11: Ground platform
                ...Array(10).fill(0), // Empty space
                ...Array(30).fill(1), // Ground tiles
                ...Array(10).fill(0), // Empty space
                // Row 12-19: Empty space
                ...Array(8 * 50).fill(0),
                // Row 19: Bottom ground
                ...Array(50).fill(1)
            ]
        },
        {
            name: 'decoration',
            data: [
                // Row 11: Some decoration on ground
                ...Array(10).fill(0),
                ...Array(5).fill(0), // Empty
                ...Array(5).fill(2), // Grass decoration
                ...Array(5).fill(0), // Empty
                ...Array(5).fill(2), // Grass decoration
                ...Array(5).fill(0), // Empty
                ...Array(5).fill(2), // Grass decoration
                ...Array(10).fill(0),
                // Rest empty
                ...Array(9 * 50).fill(0)
            ]
        },
        {
            name: 'spawns',
            data: [
                // Player spawn at position (5, 10)
                ...Array(5 * 50 + 10).fill(0),
                1, // Player spawn
                ...Array(44).fill(0),
                // Enemy spawns
                ...Array(15 * 50 + 20).fill(0),
                2, // Enemy 1
                ...Array(29).fill(0),
                ...Array(15 * 50 + 30).fill(0),
                2, // Enemy 2
                ...Array(19).fill(0),
                ...Array(15 * 50 + 40).fill(0),
                2, // Enemy 3
                ...Array(9).fill(0),
                // Rest empty
                ...Array(4 * 50).fill(0)
            ]
        }
    ]
};

// Tile types
export const TILE_TYPES = {
    EMPTY: 0,
    GROUND: 1,
    GRASS: 2,
    PLAYER_SPAWN: 1,
    ENEMY_SPAWN: 2
};