import Board from '.';

describe('Board Cases', () => {
    let board: Board;
    const expectedMatches = new Map();
    const matches = [
        { teams: ['Team 01', 'Team 02'], score: [1, 4] },
        { teams: ['Team 03', 'Team 04'], score: [3, 0] },
        { teams: ['Team 05', 'Team 06'], score: [1, 1] },
    ];

    test('Create a new board just fine', () => {
        expect(() => (board = new Board())).not.toThrowError();
    });

    test.each(matches)('Add $teams match', ({ teams }) => {
        expectedMatches.set(teams, [0, 0]);

        board.addMatch(teams);
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

    test.each(matches)('Update $teams score -> $score', ({ teams, score }) => {
        board.updateScore(teams, score);
        expect(board._matches.get(teams)).toMatchObject(score);
    });

    test("Fail: Can't update. Teams need to be an array", () => {
        // @ts-ignore
        expect(() => board.updateScore('Team 01', [0, 1])).toThrowError();
    });

    test("Fail: Can't update. Invalid score", () => {
        // @ts-ignore
        expect(() => board.updateScore(matches, 0)).toThrowError();
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
        expect(() => board.updateScore(matches[0].teams, newValue)).toThrow(/not a valid score/);
    });

    test('Finish match', () => {
        expect(board._matches.size).toBe(matches.length);
        const res = board.finishMatch(matches[1].teams);
        expect(res).toBeTruthy();
        expect(board._matches.size).toBe(matches.length - 1);
    });
});
