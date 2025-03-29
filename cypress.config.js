const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "69ii39",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    experimentalStudio: true,
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
