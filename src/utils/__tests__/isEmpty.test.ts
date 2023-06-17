import { isEmpty } from '../isEmpty';
import { describe, expect, it } from '@jest/globals';

describe('#isEmpty', () => {
    it('Should return true if the object is empty', () => {
        expect(isEmpty({})).toBe(true);
        expect(isEmpty([])).toBe(true);
        expect(isEmpty(undefined)).toBe(true);
        expect(isEmpty(null)).toBe(true);
        expect(isEmpty('')).toBe(true);
        expect(isEmpty('    ')).toBe(true);
    });
});