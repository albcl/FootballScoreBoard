import Board from '.';

describe('Board Cases', () => {
    let board: Board;
    const expectedMatches = new Map();
    const matches = [
        { teams: ['Team 01', 'Team 02'], score: [1, 4] },
        { teams: ['Team 03', 'Team 04'], score: [3, 0] },
        { teams: ['Team 05', 'Team 06'], score: [1, 1] },
        { teams: ['Team 07', 'Team 08'], score: [0, 2] },
        { teams: ['Team 09', 'Team 10'], score: [2, 1] },
        { teams: ['Team 11', 'Team 12'], score: [0, 0] },
    ];

    test('Create a new board just fine', () => {
        expect(() => (board = new Board())).not.toThrowError();
    });

    test('No games. Get empty Summary', () => {
        const summary = board.getLiveSummary();
        expect(summary).toEqual([]);
    });

    test.each(matches)('Add $teams match', ({ teams }) => {
        expectedMatches.set(JSON.stringify(teams), { teams: teams, score: [0, 0] });

        board.addMatch(teams);
        expect(board.getLiveSummary()).toMatchObject(expectedMatches);
    });

    test('Fail: Teams need to be string', () => {
        // @ts-ignore
        expect(() => board.addMatch([1, 'Team B'])).rejects.toThrowError();
    });

    test('Fail: Need two teams for a match', () => {
        expect(() => board.addMatch(['Lonely team'])).rejects.toThrowError();
    });

    test("Fail: Can't add match. It already exists", () => {
        expect(() => board.addMatch(['Team 01', 'Team 10'])).rejects.toThrow(/already playing/);
    });

    test("Fail: Can't add match. Both teams are the same", () => {
        expect(() => board.addMatch(['Team 01', 'Team 01'])).rejects.toThrow(
            /two different strings/,
        );
    });

    test.each(matches)('Update $teams score -> $score', async ({ teams, score }) => {
        const response = await board.updateScore(teams, score);
        expect(response).toBeTruthy();
    });

    test("Fail: Can't update. Teams need to be an array", () => {
        // @ts-ignore
        expect(() => board.updateScore('Team 01', [0, 1])).rejects.toThrow(/two different strings/);
    });

    test("Fail: Can't update. Invalid score", () => {
        // @ts-ignore
        expect(() => board.updateScore(matches[0].teams, 0)).rejects.toThrow(/not a valid score:/);
    });

    test("Fail: Can't update. Teams need to be string", () => {
        // @ts-ignore
        expect(() => board.updateScore([1, 'Team 01'], [0, 1])).rejects.toThrowError();
    });

    test("Fail: Can't update. Match doesn't exist", () => {
        const newValue = [2, 5];
        expect(() => board.updateScore(['abc', 'def'], newValue)).rejects.toThrowError();
    });

    test('Fail: Score needs to be an integer', () => {
        const newValue = [2.1, 5];
        expect(() => board.updateScore(matches[0].teams, newValue)).rejects.toThrow(
            /not a valid score/,
        );
    });

    test('Get current matches by total score (summary)', () => {
        const summary = board.getLiveSummary();

        const expectedOrder = [
            'Team 01 1 - Team 02 4',
            'Team 03 3 - Team 04 0',
            'Team 09 2 - Team 10 1',
            'Team 05 1 - Team 06 1',
            'Team 07 0 - Team 08 2',
            'Team 11 0 - Team 12 0',
        ];
        summary.forEach((line, ix) => {
            expect(line).toEqual(expectedOrder[ix]);
        });
    });

    test('Finish match', () => {
        expect(board.getLiveSummary().length).toBe(matches.length);
        board.finishMatch(matches[1].teams);
        expect(board.getLiveSummary().length).toBe(matches.length - 1);
    });

    test("Fail: Can't finish a game that isn't happening", () => {
        expect(() => board.finishMatch(['abc', 'def'])).rejects.toThrow(/not playing/);
    });

    test("Fail: Can't finish match. Team need to be string", () => {
        // @ts-ignore
        expect(() => board.finishMatch([1, 'def'])).rejects.toThrow(/string/);
    });

    test("Fail: Can't finish match. Teams need to be an array or won't be found on Map()", () => {
        // @ts-ignore
        expect(() => board.finishMatch('Team 01')).rejects.toThrowError();
    });

    test("Map() key as array doesn't fit our need", () => {
        // Map()'s key uses the reference to the array, not its content
        const map = new Map();

        const arrayA = ['Team A', 'Team B'];
        const arrayB = ['Team A', 'Team B'];

        map.set(arrayA, [0, 0]);
        expect(map.delete(arrayB)).toBeFalsy();
    });

    test('Map() key as stringify array does work better for us', () => {
        const map = new Map();

        const arrayA = JSON.stringify(['Team A', 'Team B']);
        const arrayB = JSON.stringify(['Team A', 'Team B']);

        map.set(arrayA, []);
        expect(map.delete(arrayB)).toBeTruthy();
    });
});
