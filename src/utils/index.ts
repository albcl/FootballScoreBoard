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
    return typeof parameter === 'object' && parameter.length === 2;
};
