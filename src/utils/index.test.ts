import { isString, areValidTeams, isvalidScore, setKey } from '.';

describe('Utils Cases', () => {
    test('Is string', () => {
        expect(isString(['a'])).toBeTruthy();
    });

    test('Is not string', () => {
        expect(isString([1])).toBeFalsy();
    });

    test('Is string not array', () => {
        expect(isString('a')).toBeTruthy();
    });

    test('Is not string nor array', () => {
        expect(isString(2)).toBeFalsy();
    });

    test('Is a valid array', () => {
        expect(areValidTeams(['a ', 'a2b'])).toBeTruthy();
    });

    test('Is not a valid array', () => {
        expect(areValidTeams(['a', 'b', 'c'])).toBeFalsy();
        expect(areValidTeams(['a', 2])).toBeFalsy();
        expect(areValidTeams(['', ' '])).toBeFalsy();
        expect(areValidTeams(['1', '2'])).toBeFalsy();
    });

    test('Is not an array', () => {
        // @ts-ignore
        expect(areValidTeams('a')).toBeFalsy();
    });

    test('Cannot contain the same values', () => {
        expect(areValidTeams(['a', 'a'])).toBeFalsy();
        expect(areValidTeams(['2', 2])).toBeFalsy();
    });

    test('Score is valid', () => {
        expect(isvalidScore([2, 4])).toBeTruthy();
    });

    test('Fail: Score is < 2', () => {
        expect(isvalidScore([2])).toBeFalsy();
    });

    test('Fail: Score is not a number', () => {
        // @ts-ignore
        expect(isvalidScore(['a', 2])).toBeFalsy();
    });

    test('Fail: Score is decimal', () => {
        expect(isvalidScore([1.2, 2])).toBeFalsy();
    });

    test('Fail: Score is below zero', () => {
        expect(isvalidScore([-1, 0])).toBeFalsy();
    });

    test('Set key from any param', () => {
        expect(setKey(['value a', 'value b'])).toEqual('["value a","value b"]');
        expect(setKey([0, 1])).toBe('[0,1]');
        expect(setKey('value a')).toBe('"value a"');
        expect(setKey(0)).toBe('0');
        expect(setKey(null)).toBe('null');
    });
});
