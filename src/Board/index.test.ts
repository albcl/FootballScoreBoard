import Board from '.';

describe('Board Cases', () => {
    test('Create a new board just fine', () => {
        expect(() => new Board()).not.toThrowError();
    });
});
