/**
 * Check if values (or value) are strings
 *
 * @param {any|any[]} values
 * @returns {boolean}
 */
export const isString = (values: any | any[]) => {
    if (typeof values !== 'object') {
        return typeof values === 'string';
    }

    return values.every(value => {
        return typeof value === 'string';
    });
};

/**
 * Check if parameter is an array of two elements
 *
 * @param {(string|number)[]} parameter
 * @returns {boolean}
 */
export const isValidArray = (parameter: (string | number)[]) => {
    return typeof parameter === 'object' && parameter.length === 2 && parameter[0] != parameter[1];
};

/**
 * Check if score is an array of two integer values
 *
 * @param {number[]} score
 * @returns {boolean}
 */
export const isvalidScore = (score: number[]) => {
    if (typeof score !== 'object') return false;
    if (score.length !== 2) return false;
    if (!score.every(value => !isNaN(value))) return false;
    if (!score.every(value => Number.isInteger(value))) return false;
    if (!score.every(value => value >= 0)) return false;

    return true;
};

/**
 * Return a stringify string
 *
 * @param {any} value
 * @returns {string} Stringify string
 */
export const setKey = (value: any) => JSON.stringify(value);
