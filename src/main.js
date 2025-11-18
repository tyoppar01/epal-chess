// Import Section
import { initBoard, boardSize } from "./const.js";
import { gameSummary, updateRound, updateTileCount } from "./counter.js";

// Variable Section
var roundN = 1;
let currentBoard;

/**
 * Update Board Action
 * @param {*} r 
 * @param {*} c 
 * @param {*} playerN 
 */
const updateBoard = (r, c, playerN) => {

    console.log(`Updating tiles: row ${r}, col ${c}`);
    
    // player value (1 is black, 2 is white) where (black is 1, white is -1)
    const value = playerN % 2 ? 1 : -1;

    // current cell content
    const cell = currentBoard[r][c];

    // modify cell value and DOM element
    cell.val = value;
    const tileEl = cell.el;
    tileEl.innerHTML = "";

    const piece = document.createElement("div");
    piece.classList.add("piece", value === 1 ? "black" : "white");

    tileEl.appendChild(piece);
}

/**
 * Verify Move where must flip at least one opponent tile
 * @param {*} r 
 * @param {*} c 
 * @param {*} playerN 
 * @returns 
 */
const verifyMove = (r, c, playerN) => {

    const value = playerN % 2 ? 1 : -1;
    let canPlace = false;

    const directions = [ 
        [-1, -1], [-1, 0], [-1, 1], [0, -1], 
        [0, 1], [1, -1],  [1, 0],  [1, 1] 
    ];

    // Iterate through 8 directions
    for (const [dr, dc] of directions) {
        let nr = r + dr;
        let nc = c + dc;
        let hasOpponentTile = false;

        // Traverse in this direction
        while (nr >= 0 && nr < boardSize && nc >= 0 && nc < boardSize) {
            const cell = currentBoard[nr][nc];
            
            if (cell.val === -value) {
                // Opponent's tile found
                hasOpponentTile = true;
            } else if (cell.val === value) {
                // Our tile found
                if (hasOpponentTile) {
                    canPlace = true;
                }
                break;
            } else {
                // Empty tile
                break;
            }
            
            nr += dr;
            nc += dc;
        }

        if (canPlace) break; // No need to check further if we can place
    }
    return canPlace;
}

/**
 * Update Tile Area Algorithm
 * @param {*} r 
 * @param {*} c 
 * @param {*} playerN 
 */
const updateTileArea = (r, c, playerN) => {

    const value = playerN % 2 ? 1 : -1;

    const directions = [ 
        [-1, -1], [-1, 0], [-1, 1], [0, -1], 
        [0, 1], [1, -1],  [1, 0],  [1, 1] 
    ];

    directions.forEach(([dr, dc]) => {
        const tilesToFlip = [];
        let nr = r + dr;
        let nc = c + dc;

        // Traverse in this direction
        while (nr >= 0 && nr < boardSize && nc >= 0 && nc < boardSize) {

            // current cell content
            const cell = currentBoard[nr][nc];
            
            // Empty tile, stop checking this direction
            if (cell.val === 0) {
                break;
            
            // Opponent's tile, add to potential flips
            } else if (cell.val === -value) {
                tilesToFlip.push([nr, nc]);
            
            // Our tile found, flip all tiles in between
            } else if (cell.val === value) {
                
                tilesToFlip.forEach(([fr, fc]) => {
                    updateBoard(fr, fc, playerN);
                });
                break;
            }
            nr += dr;
            nc += dc;
        }
    });
}

/**
 * Tile Click Action
 * @param {*} r 
 * @param {*} c 
 */
const onTileClick = (r, c) => {

    console.log(`Tile clicked: row ${r}, col ${c}`);

    // determine the player (1 is black, 2 is white)
    let playerN = ((roundN+1)%2) + 1;
    console.log(`Performed by Player ${playerN}`);
    
    // verify if the tile is already occupied
    if (currentBoard[r][c].val !== 0) {
        console.log("Tile already occupied. Choose another tile.");
        return;
    }

    // only can place at tile if it will flip at least one opponent tile
    if (!verifyMove(r, c, playerN)) {
        console.log("Invalid move. You must flip at least one opponent tile.");
        return;
    }

    // perform the move
    updateBoard(r, c, playerN);

    // update the surrounding tiles
    updateTileArea(r, c, playerN);

    // update round
    roundN = updateRound(roundN);

    // update tile counts
    updateTileCount(currentBoard);

    // validate if out of moves
    if (roundN === 65) gameSummary(currentBoard);
};

/**
 * Create Initialized Board
 * @param {*} cid 
 * @param {*} board 
 * @returns 
 */
const createInitBoard = (cid, board=initBoard) => {

    const container = document.getElementById(cid);
    container.innerHTML = "";

    // Create a fresh copy of the board to avoid mutating the original
    const newBoard = board.map(row => row.map(val => typeof val === "object" ? val.val : val));

    newBoard.forEach((row, r) => {
        row.forEach((val, c) => {

            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.row = r;
            tile.col = c;

            // Clickable Event - listen to click
            tile.addEventListener("click", () => onTileClick(r, c));

            const cellValue = typeof val === "object" ? val.val : val;

            // has a piece of chess?
            if (cellValue !== 0) {

                const piece = document.createElement("div");
                piece.classList.add("piece");
                piece.classList.add(cellValue === 1 ? "black" : "white");
                tile.appendChild(piece);
            }

            container.appendChild(tile);

            newBoard[r][c] = { 
                val: cellValue, 
                el: tile 
            };

        });
    });
    return newBoard;
}

/**
 * Reset Button 
 * Back to Default Mode
 */
document.getElementById("reset-btn").onclick = () => {
    console.log("Restarting Game...");
    currentBoard = createInitBoard("board");
    updateTileCount(currentBoard);
    roundN = 1;
    document.getElementById("roundN").textContent = roundN;
};

/**
 * Initialize the Game
 */
const initGame = () => {
    currentBoard = createInitBoard("board");
    console.log("Current Board Structure:", currentBoard);
    updateTileCount(currentBoard);
    document.getElementById("roundN").textContent = roundN;
}

// Start Game
initGame();