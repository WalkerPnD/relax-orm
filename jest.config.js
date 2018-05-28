module.exports = {
  "collectCoverage": true,
  "roots": [ "<rootDir>/test" ],
  "coverageReporters": [ "json", "lcov", "text" ],
  "transform": { "^.+\\.tsx?$": "ts-jest" },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec|e2e))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": [ "ts", "js", "json", "node" ]
}
