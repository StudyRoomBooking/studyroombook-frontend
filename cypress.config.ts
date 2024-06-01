import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,


  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      // Set viewport size
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    // Save component tests in the "cypress/component" folder 
  },
});
