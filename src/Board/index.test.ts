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

    test('Fail: Teams need to be string', () => {
        // @ts-ignore
        expect(() => board.addMatch([1, 'Team B'])).toThrowError();
    });

    test('Fail: Need two teams for a match', () => {
        expect(() => board.addMatch(['Lonely team'])).toThrowError();
    });
});
