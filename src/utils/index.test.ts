import { isString } from '.';

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
});
