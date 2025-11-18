/**
 * Log Message Enums
 */
export const LogMessage = {
    // Tile Actions
    TILE_CLICKED: (r, c) => `Tile clicked: row ${r}, col ${c}`,
    TILE_UPDATING: (r, c) => `Updating tiles: row ${r}, col ${c}`,
    
    // Player Actions
    PLAYER_TURN: (playerN) => `Performed by Player ${playerN}`,
    
    // Error Messages
    TILE_OCCUPIED: "Tile already occupied. Choose another tile.",
    INVALID_MOVE: "Invalid move. You must flip at least one opponent tile.",
    
    // Game State
    RESTARTING_GAME: "Restarting Game...",
    BOARD_STRUCTURE: (board) => {
        console.log("Current Board Structure:", board);
        return "";
    },
    
    // Audio
    AUDIO_PLAY_FAILED: (error) => `Audio play failed: ${error}`,
};

/**
 * Single Logger Method
 * @param {string|function} message 
 * @param  {...any} args 
 */
export const log = (message, ...args) => {
    if (typeof message === 'function') {
        const result = message(...args);
        if (result) console.log(result);
    } else {
        console.log(message);
    }
};
