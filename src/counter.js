/**
 * Count tiles for a specific player
 * @param {Array<Array>} board 
 * @param {Number} playerA 1 = black, -1 = white
 */
export const tileCount = (board, playerA = 1) => {
    return board.flat().filter(tile => (tile.val ?? tile) === playerA).length;
};

/**
 * Update scoreboard UI
 * @param {Array<Array>} board 
 */
export const updateTileCount = (board) => {

    const black = tileCount(board, 1);
    const white = tileCount(board, -1);

    document.getElementById("black-count").textContent = black;
    document.getElementById("white-count").textContent = white;
};

/**
 * Update Round Counter
 * @param {*} n 
 */
export const updateRound = (n) => {
    n ++;
    document.getElementById("roundN").textContent = n;
    return n;
}

export const gameSummary = (board) => {

    const black = tileCount(board, 1);
    const white = tileCount(board, -1);

    black > white ? alert.log("Player A has won!") : alert.log("Player B has won!");
}