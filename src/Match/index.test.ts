import Match from '.';

describe('Match Cases', () => {
    const teams = ['Team 01', 'Team 02'];

    test('Set a new match with 0 - 0 default score', () => {
        const match = new Match([teams[0], teams[1]]);
        expect(match.teams.length).toBe(2);
        expect(match.score).toEqual([0, 0]);
    });

    test('Fail to set new match: Missing team', () => {
        // @ts-ignore
        expect(() => new Match('Team 01')).toThrow(/needs two teams/);
    });

    test('Fail to set new match: Team needs to be string', () => {
        // @ts-ignore
        expect(() => new Match(['Team 01', [0, 1]])).toThrow(/to be string/);
    });
});
