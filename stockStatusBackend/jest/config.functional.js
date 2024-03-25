/*
 * These tests only work after starting the local server:
 * npm start
 * npm run test:functional
 */
const config = require('./config.base');

config.testMatch = ['<rootDir>/**/*.functional.test.ts'];
config.globalSetup = '<rootDir>/jest/globalSetup.functional.ts';
config.globalTeardown = '<rootDir>/jest/globalTeardown.functional.ts';

module.exports = config;
