// Import Section
import { initBoard } from "./const.js";
import { gameSummary, updateRound, updateTileCount } from "./counter.js";

// Variable Section

var roundN = 1;

let currentBoard;
let previousBoard;


const boardSize = 8;


/**
 * Deepcopy a board to not overwrite
 * @param {*} board 
 * @returns 
 */
const copyBoard = (board = initBoard) => {
    return board.map(row =>
        row.map(cell => 
            typeof cell === "object"
                ? { val: cell.val, el: cell.el }
                : cell
        )
    );
};

const onTileClick = (r, c) => {

    console.log(`Tile clicked: row ${r}, col ${c}`);
    let playerN = ((roundN+1)%2) + 1;
    console.log(`Performed by Player ${playerN}`);
    roundN = updateRound(roundN);

    if (n === 64) gameSummary(currentBoard);
};

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
    const b = copyBoard(board);
    previousBoard = b;
    return b;
}

/**
 * Reset Button 
 * Back to Default Mode
 */
document.getElementById("reset-btn").onclick = () => {
    console.log("Restarting Game...");
    currentBoard = createInitBoard("board", initBoard);
    updateTileCount(currentBoard);
    roundN = 1;
    document.getElementById("roundN").textContent = roundN;
};

/**
 * Initialize the Game
 */
const initGame = () => {
    currentBoard = createInitBoard("board");
    updateTileCount(currentBoard);
    document.getElementById("roundN").textContent = roundN;
}

// Start Game
initGame();