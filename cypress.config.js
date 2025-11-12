const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    baseUrl: "https://www.saucedemo.com",
    supportFile: "cypress/support/e2e.js",
    pageLoadTimeout: 300000, // 5 minutes - very large timeout to avoid false timeouts
    requestTimeout: 10000,
    responseTimeout: 30000,
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false, // Disable web security to avoid some load issues
    modifyObstructiveCode: false,

    async setupNodeEvents(on, config) {
      // Register the cucumber preprocessor
      await addCucumberPreprocessorPlugin(on, config);

      // Register the esbuild bundler
      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));

      // Add Chrome args to help with page loading issues
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push('--disable-blink-features=AutomationControlled');
          launchOptions.args.push('--disable-features=IsolateOrigins,site-per-process');
        }
        return launchOptions;
      });

      return config;
    },
  },
});
