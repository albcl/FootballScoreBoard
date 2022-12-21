import { areValidTeams, isString, isvalidScore } from '../utils';

interface Match {
    teams: string[];
    score: number[];
}

class Match {
    constructor(teams: string[]) {
        if (!areValidTeams(teams)) {
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
    updateScore(score: number[]) {
        if (!isvalidScore(score)) {
            throw new Error(`That's not a valid score: ${score}`);
        }
        this.score = score;
    }
}

export default Match;
