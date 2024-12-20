export const preset = "jest-preset-angular";
export const setupFilesAfterEnv = ["<rootDir>/setup-jest.ts"];
export const testEnvironment = "jsdom";
export const testPathIgnorePatterns = ["/node_modules/", "/dist/"];
export const moduleNameMapper = {
  "^@app/(.*)$": "<rootDir>/src/app/$1",
};
export const globals = {
  "ts-jest": {
    tsconfig: "tsconfig.spec.json",
  },
};
