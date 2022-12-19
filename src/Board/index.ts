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
        return this._matches.delete(teams);
    }
}

export default Board;
