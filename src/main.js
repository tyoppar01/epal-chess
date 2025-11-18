// Import Section
import { initBoard } from "./const.js";
import { gameSummary, updateRound, updateTileCount } from "./counter.js";

// Variable Section
var roundN = 1;
let currentBoard;
const boardSize = 8;


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

    const cell = currentBoard[r][c];
    cell.val = value;

    const tileEl = cell.el;
    tileEl.innerHTML = "";

    const piece = document.createElement("div");
    piece.classList.add("piece", value === 1 ? "black" : "white");

    tileEl.appendChild(piece);
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

    // update round
    roundN = updateRound(roundN);

    // change tile
    updateBoard(r, c, playerN);

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

    board.forEach((row, r) => {
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

            board[r][c] = { 
                val: cellValue, 
                el: tile 
            };

        });
    });
    return board;
}

/**
 * Reset Board 
 */
const resetBoard = () => {
    // Reset data values
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {

            // clear value
            currentBoard[r][c].val = 0;

            // clear pieces on screen
            currentBoard[r][c].el.innerHTML = "";
        }
    }
};


/**
 * Reset Button 
 * Back to Default Mode
 */
document.getElementById("reset-btn").onclick = () => {
    console.log("Restarting Game...");
    resetBoard();
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