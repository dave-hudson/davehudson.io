export default {
  preset: 'ts-jest',
  transform: {
    "^.+\\.tsx?$": 'ts-jest'
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/src/**/*.test.ts', '**/src/**/*.spec.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text']
};

