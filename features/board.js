export const initBoard = 
    [
        [0,0,0,0,0,0,0,0 ],
        [0,0,0,0,0,0,0,0 ],
        [0,0,0,0,0,0,0,0 ],
        [0,0,0,-1,1,0,0,0],
        [0,0,0,1,-1,0,0,0],
        [0,0,0,0,0,0,0,0 ],
        [0,0,0,0,0,0,0,0 ],
        [0,0,0,0,0,0,0,0 ],
    ]

/**
 * Deepcopy a board to not overwrite
 * @param {*} board 
 * @returns 
 */
export const copyBoard = (board = initBoard) => {
    return [...board]
}

