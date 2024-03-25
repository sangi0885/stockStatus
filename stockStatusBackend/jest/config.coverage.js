const config = require("./config.base");

// Note: it is a known issue that some tests will fail when running coverage.
// https://github.com/facebook/jest/issues/2007
module.exports = {
  ...config,
  collectCoverage: true,
  coverageReporters: [
    // Available reporters are here:
    // https://jestjs.io/docs/en/configuration#coveragereporters-array-string
    // text is good for the command line
    // html is good for something prettier (view it at testCoverage/index.html)
    // other reporters intergrate well with continuous deployment/integration tooling
    "text",
    "html"
  ],
  coverageDirectory: "testCoverage"
};
