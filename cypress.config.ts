import { defineConfig } from 'cypress';
import * as mochawesomePlugin from 'cypress-mochawesome-reporter/plugin';
import { loadAndValidateEnv } from './cypress/support/env';

const validated = loadAndValidateEnv();

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    baseUrl: validated.BASE_URL,

    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
      cypressMochawesomeReporterReporterOptions: {
        reportDir: 'reports/mochawesome',
        overwrite: false,
        html: true,
        json: true,
        charts: true,
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: false,
      },
      mochaJunitReporterReporterOptions: {
        mochaFile: 'reports/junit/junit-[hash].xml',
        toConsole: false,
        attachments: true,
      },
    },

    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    video: true,
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      (mochawesomePlugin as unknown as (on: Cypress.PluginEvents) => void)(on);

      config.env = {
        ...config.env,
        TEST_ENV: validated.TEST_ENV,
        USERNAME: validated.USERNAME,
        PASSWORD: validated.PASSWORD,
        ENABLE_ALLURE: validated.ENABLE_ALLURE,
        ENABLE_VISUAL: validated.ENABLE_VISUAL,
      };

      return config;
    },
  },
});