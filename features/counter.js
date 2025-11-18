/**
 * Tile Counter (Applicable for both player)
 * @param {*} board 
 * @param {*} playerA 
 */
export const tileCount = (board, playerA = 1) => {
    board.flatten().filter(tile => tile === playerA).length;
} 

