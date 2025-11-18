import { describe, test, expect, beforeEach } from '@jest/globals';
import { tileCount, updateRound } from '../utils/counter.js';

const mockBoard = [
        [{ val: 1 }, { val: 0 }, { val: -1 }],
        [{ val: 1 }, { val: 1 }, { val: 0 }],
        [{ val: -1 }, { val: 0 }, { val: 1 }]
    ];

describe('Counter Functions', () => {

    describe('tileCount', () => {

        test('should count black tiles (1) correctly', () => {
            const board = mockBoard;
            expect(tileCount(board, 1)).toBe(4);
        });

        test('should count white tiles (-1) correctly', () => {
            const board = mockBoard;
            expect(tileCount(board, -1)).toBe(2);
        });

        test('should handle board with only primitive values', () => {
            const board = [
                [1, 0, -1],
                [1, 1, 0],
                [-1, 0, 1]
            ];
            expect(tileCount(board, 1)).toBe(4);
            expect(tileCount(board, -1)).toBe(2);
        });

        test('should return 0 for empty board', () => {
            const board = [
                [{ val: 0 }, { val: 0 }, { val: 0 }],
                [{ val: 0 }, { val: 0 }, { val: 0 }]
            ];
            expect(tileCount(board, 1)).toBe(0);
            expect(tileCount(board, -1)).toBe(0);
        });
    });

    describe('updateRound', () => {
        beforeEach(() => {
            // Mock the DOM element
            document.body.innerHTML = '<span id="roundN"></span>';
        });

        test('should increment round number by 1', () => {
            expect(updateRound(1)).toBe(2);
            expect(updateRound(63)).toBe(64);
        });

        test('should update DOM element with new round number', () => {
            const roundElement = document.getElementById('roundN');
            updateRound(5);
            expect(roundElement.textContent).toBe('6');
        });
    });

});