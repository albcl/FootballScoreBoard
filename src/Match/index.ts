import { isValidArray } from '../utils';

interface Match {
    teams: string[];
    score: number[];
}

class Match {
    constructor(teams: string[]) {
        if (!isValidArray(teams)) {
            throw new Error('A match needs two teams for it to happen');
        }

        this.teams = teams;
        this.score = [0, 0];
    }
}

export default Match;
