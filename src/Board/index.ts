import { isString, isValidArray } from '../utils';

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
        if (!isValidArray(teams)) {
            throw new Error('Teams need to be passed as an array of 2 elements');
        }
        if (!isString(teams)) {
            throw new Error('Teams need to be string');
        }
        this._matches.set(teams, [0, 0]);
    }
}

export default Board;
