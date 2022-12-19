import Board from '.';

describe('Board Cases', () => {
    let board: Board;
    const team = ['Team 01', 'Team 02'];

    test('Create a new board just fine', () => {
        expect(() => (board = new Board())).not.toThrowError();
    });

    test('Add match', () => {
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

    test("Fail: Can't add match. It already exists", () => {
        expect(() => board.addMatch(['Team 01', 'Team 10'])).toThrow(/already playing/);
    });

    test('Update score', () => {
        board.updateScore(team, [1, 0]);
        expect(board._matches.get(team)).toMatchObject([1, 0]);
    });

    test("Fail: Can't update. Teams need to be an array", () => {
        // @ts-ignore
        expect(() => board.updateScore('Team 01', [0, 1])).toThrowError();
    });

    test("Fail: Can't update. Invalid score", () => {
        // @ts-ignore
        expect(() => board.updateScore(team, 0)).toThrowError();
    });

    test("Fail: Can't update. Teams need to be string", () => {
        // @ts-ignore
        expect(() => board.updateScore([1, 'Team 01'], [0, 1])).toThrowError();
    });

    test("Fail: Can't update. Match doesn't exist", () => {
        const newValue = [2, 5];
        expect(() => board.updateScore(['abc', 'def'], newValue)).toThrowError();
    });

    test('Fail: Score needs to be an integer', () => {
        const newValue = [2.1, 5];
        expect(() => board.updateScore(team, newValue)).toThrowError();
    });
});
