const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "baseUrl": "https://merchants.sandbox-utrust.com",
    viewportWidth: 1920,
    viewportHeight: 1200,
    "experimentalSessionAndOrigin": true,
    setupNodeEvents(on, config)
    {
      // implement node event listeners here
    },
  },
});
