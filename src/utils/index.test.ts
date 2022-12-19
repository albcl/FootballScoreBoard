import { isString, isValidArray, isvalidScore } from '.';

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
        expect(isValidArray(['a', 2])).toBeTruthy();
    });

    test('Is not a valid array', () => {
        expect(isValidArray(['a', 'b', 'c'])).toBeFalsy();
    });

    test('Is not an array', () => {
        // @ts-ignore
        expect(isValidArray('a')).toBeFalsy();
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
});
