import Match from '../Match';
import { isString, isValidArray, isvalidScore, setKey } from '../utils';

class Board {
    #matches: Map<string, Match>;

    constructor() {
        this.#matches = new Map();
    }

    /**
     * Check if a team is already playing
     *
     * @param {string[]} teams
     */
    #isTeamPlaying(teams: string[]) {
        teams.forEach(team => {
            for (let [key, value] of this.#matches) {
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
     * @returns {promise}
     */
    addMatch(teams: string[]) {
        return new Promise<string | boolean>((resolve, reject) => {
            try {
                if (!isValidArray(teams)) {
                    throw new Error('Teams have to be two different strings');
                }
                if (!isString(teams)) {
                    throw new Error('Teams need to be string');
                }
                this.#isTeamPlaying(teams);
                this.#matches.set(setKey(teams), new Match(teams));
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Update a match score
     *
     * @param {string[]} teams
     * @param {number[]} score
     * @returns {promise}
     */
    updateScore(teams: string[], score: number[]) {
        return new Promise<string | boolean>((resolve, reject) => {
            try {
                if (!isValidArray(teams)) {
                    throw new Error('Teams have to be two different strings');
                }
                if (!isString(teams)) {
                    throw new Error('Teams need to be string');
                }
                if (!isvalidScore(score)) {
                    throw new Error(`That's not a valid score: ${score}`);
                }

                const mapKey = setKey(teams);
                if (!this.#matches.has(setKey(teams))) {
                    throw new Error(`There is not ${teams.join(' - ')} match`);
                }

                const match = this.#matches.get(mapKey);
                match.updateScore(score);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Finish an active match
     *
     * @param {string[]} teams
     * @returns {promise}
     */
    finishMatch(teams: string[]) {
        return new Promise<string | boolean>((resolve, reject) => {
            try {
                if (!isString(teams)) {
                    throw new Error('Teams need to be string');
                }
                if (!this.#matches.delete(setKey(teams))) {
                    throw new Error(`${teams.join(' - ')} are not playing at the moment`);
                }
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Get live matches sorted by total score and
     * ordered by most recently added for those
     * matches with same total score.
     *
     * @returns {string[]} Live matches
     */
    getLiveSummary() {
        return [...this.#matches.values()]
            .sort((matchA, matchB) => {
                const totalScoreA = matchA.score[0] + matchA.score[1];
                const totalScoreB = matchB.score[0] + matchB.score[1];

                if (totalScoreA > totalScoreB) return -1;
                if (totalScoreA < totalScoreB) return 1;
                return 0;
            })
            .map(match => {
                const { teams, score } = match;
                return `${teams[0]} ${score[0]} - ${teams[1]} ${score[1]}`;
            });
    }
}

export default Board;
