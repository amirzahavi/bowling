
module.exports = {
  ...require('@snowpack/app-scripts-react/jest.config.js')(),
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  resetMocks: true
};