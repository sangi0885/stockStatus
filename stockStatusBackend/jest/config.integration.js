const config = require('./config.base');

config.testMatch = ['<rootDir>/**/*.integration.test.ts'];

config.testTimeout = 50000;

module.exports = config;
