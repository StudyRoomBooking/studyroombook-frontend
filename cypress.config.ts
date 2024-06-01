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
    // testFiles: '**/*.{js,jsx,ts,tsx}', // Adjust the file extensions as needed
    specPattern: 'cypress/component-tests/**/*.cy.{js,jsx,ts,tsx}', // Adjust the pattern to match your directory structure and file naming
  },
});
