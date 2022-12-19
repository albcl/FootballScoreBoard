interface Match {
    teams: string[];
    score: number[];
}

class Match {
    constructor(teams: string[]) {
        this.teams = teams;
        this.score = [0, 0];
    }
}

export default Match;
