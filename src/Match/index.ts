import { isValidArray, isString } from '../utils';

interface Match {
    teams: string[];
    score: number[];
}

class Match {
    constructor(teams: string[]) {
        if (!isValidArray(teams)) {
            throw new Error('A match needs two teams for it to happen');
        }
        if (!isString(teams)) {
            throw new Error('Teams need to be string');
        }

        this.teams = teams;
        this.score = [0, 0];
    }

    /**
     * Update score
     *
     * @param {number[]} score
     */
    updateScore(score: number[]) {}
}

export default Match;
