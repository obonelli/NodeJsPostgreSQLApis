module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    collectCoverage: true,
    coverageReporters: ['text', 'lcov'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts'],
  };
  