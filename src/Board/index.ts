import { isString, isValidArray, isvalidScore } from '../utils';

interface Board {
    _matches: Map<string[], number[]>;
}

class Board {
    constructor() {
        this._matches = new Map();
    }

    /**
     * Check if a team is already playing
     *
     * @param {string[]} teams
     */
    _isTeamPlaying(teams: string[]) {
        teams.forEach(team => {
            for (let [key, value] of this._matches) {
                if (key.includes(team)) {
                    throw new Error(`Team ${team} is already playing`);
                }
            }
        });
    }

    /**
     * Start a new match
     *
     * @param {string[]} teams
     */
    addMatch(teams: string[]) {
        try {
            if (!isValidArray(teams)) {
                throw new Error('`Teams` needs to be passed as an array of 2 elements');
            }
            if (!isString(teams)) {
                throw new Error('Teams need to be string');
            }
            this._isTeamPlaying(teams);
            this._matches.set(teams, [0, 0]);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Update a match score
     *
     * @param {string[]} teams
     * @param {number[]} score
     */
    updateScore(teams: string[], score: number[]) {
        if (!isValidArray(teams)) {
            throw new Error('`Teams` needs to be passed as an array of 2 elements');
        }
        if (!isValidArray(score)) {
            throw new Error('`Score` needs to be passed as an array of 2 elements');
        }
        if (!isString(teams)) {
            throw new Error('Teams need to be string');
        }
        if (!this._matches.has(teams)) {
            throw new Error(`There is not ${teams.join(' - ')} match`);
        }
        if (!isvalidScore(score)) {
            throw new Error(`That's not a valid score: ${score}`);
        }

        this._matches.set(teams, score);
    }

    /**
     * Finish an active match
     *
     * @param {string[]} teams
     */
    finishMatch(teams: string[]) {
        if (!isString(teams)) {
            throw new Error('Teams need to be string');
        }
        if (!this._matches.delete(teams)) {
            throw new Error(`${teams.join(' - ')} are not playing at the moment`);
        }
    }

    /**
     * Get live matches sorted by total score and
     * ordered by most recently added for those
     * matches with same total score.
     *
     * @param {string[]} teams
     * @returns {string[]} Live matches
     */
    getSummary() {
        return [...this._matches]
            .sort((matchA, matchB) => {
                const totalScoreA = matchA[1][0] + matchA[1][1];
                const totalScoreB = matchB[1][0] + matchB[1][1];

                if (totalScoreA > totalScoreB) return -1;
                if (totalScoreA < totalScoreB) return 1;
                return 0;
            })
            .map(match => {
                const teams = match[0];
                const score = match[1];
                return `${teams[0]} ${score[0]} - ${teams[1]} ${score[1]}`;
            });
    }
}

export default Board;
