import { describe, test, expect } from '@jest/globals';
import { initBoard } from '../enums/const.js';

describe('Constants', () => {

    test('initBoard should be 8x8 grid', () => {
        expect(initBoard.length).toBe(8);
        expect(initBoard[0].length).toBe(8);
    });

    test('initBoard should have correct initial pieces', () => {
        // Black (1) at position [3][4] and [4][3]
        expect(initBoard[3][4]).toBe(1);
        expect(initBoard[4][3]).toBe(1);
        
        // White (-1) at position [3][3] and [4][4]
        expect(initBoard[3][3]).toBe(-1);
        expect(initBoard[4][4]).toBe(-1);
    });

    test('initBoard should have 2 black pieces', () => {
        const blackCount = initBoard.flat().filter(val => val === 1).length;
        expect(blackCount).toBe(2);
    });

    test('initBoard should have 2 white pieces', () => {
        const whiteCount = initBoard.flat().filter(val => val === -1).length;
        expect(whiteCount).toBe(2);
    });
});
