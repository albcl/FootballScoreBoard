interface Board {
    _matches: Map<string[], number[]>;
}

class Board {
    constructor() {
        this._matches = new Map();
    }

    /**
     * Start a new match
     *
     * @param {string[]} teams
     */
    addMatch(teams: string[]) {
        this._matches.set(teams, [0, 0]);
    }
}

export default Board;
