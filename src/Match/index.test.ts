import Match from '.';

describe('Match Cases', () => {
    const teams = ['Team 01', 'Team 02'];

    test('Set a new match with 0 - 0 default score', () => {
        const match = new Match([teams[0], teams[1]]);
        expect(match.teams.length).toBe(2);
        expect(match.score).toEqual([0, 0]);
    });
});
