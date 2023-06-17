/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: './',
    testPathIgnorePatterns : ["<rootDir>/node_modules/", "<rootDir>/build/"],
    globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly'
    }
};