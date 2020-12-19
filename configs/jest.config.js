const rootDir = require('app-root-path').path

module.exports = {
  rootDir,
  transform: { '^.+\\.js$': 'babel-jest' },
  testMatch: ['<rootDir>/src/**/__tests__/**/*.js?(x)'],
  collectCoverageFrom: ['<rootDir>/src/index.js'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'es6'],
  globals: { __DEV__: true },
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/configs/setupTests.js'],
}
