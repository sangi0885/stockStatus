// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  rootDir: process.cwd(),
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules'],
  // Map paths to reduce file-system coupling.
  // Mappings must exist in tsconfig.json, jest.config.json, and babel.config.json
  moduleNameMapper: {
    // Alias all top-level modules.
    // @stock/utilities -> ./src/utilities
    // @stock/domain/domainModel -> ./src/domainModel
    '^@stock/(.*)$': '<rootDir>/src/$1'
  },
  // Typescript support: add the ts extension.
  moduleFileExtensions: ['js', 'json', 'ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testMatch: [
    // The test file matching uses the micromatch syntax:
    // https://github.com/micromatch/micromatch
    '<rootDir>/**/*.unit.test.ts',
    '<rootDir>/**/*.e2e.test.ts',
    '<rootDir>/**/*.integration.test.ts'
    // We do not match the *.stress.test.ts files, because they are SLOW.
    // We do not match the *.functional.test.ts files in this base config,
    // because those tests starting the Firebase Functions, which is SLOW.
  ],
  transform: {
    // matches using regex
    '\\.(js|ts)$': 'babel-jest'
  },
  transformIgnorePatterns: ['/node_modules/(?!edge-parser|@poppinss)'],
  // Use `jsdom` for a browser-like environment;
  // use `node` for a node-like environment.
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest/setEnvVars.ts'],
  // Runs once per test file after the environment has loaded.
  setupFilesAfterEnv: [
    // Set up jest-extended
    // See also https://github.com/jest-community/jest-extended#setup
    'jest-extended',
    '<rootDir>/jest/forceGarbageCollection.ts',
    '<rootDir>/src/libraries_v2/jestExtensions/index.ts',
    '<rootDir>/jest/setupAfterEnv.base.ts'
  ]
};
