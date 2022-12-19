import Board from '.';

describe('Board Cases', () => {
    let board: Board;

    test('Create a new board just fine', () => {
        expect(() => (board = new Board())).not.toThrowError();
    });

    test('Add match', () => {
        const team = ['Team 01', 'Team 02'];
        const expectedMatches = new Map();
        expectedMatches.set(team, [0, 0]);

        board.addMatch(team);
        expect(board._matches).toMatchObject(expectedMatches);
    });
});
