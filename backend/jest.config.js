module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@infra/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.spec.ts', '!src/app.ts', '!src/**/index.ts'],
};
