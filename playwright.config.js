// @ts-check
const { defineConfig, devices } = require("@playwright/test");
const { allure } = require("allure-playwright");
import os from "os";
import { reportGenerationPath } from "./src/config/test.config";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  timeout: 10 * 60 * 1000,
  testDir: "./src/tests",
  snapshotDir: "./src/snapshots",
  /* Run tests in files in parallel */
  fullyParallel: true,
  workers: 1,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html"],
    [
      "allure-playwright",
      {
        outputFolder: reportGenerationPath,
        suiteTitle: true,
        detail: true,
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
        },
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on",
    contextOptions: {
      recordVideo: {
        dir: "./test-results",
        size: { width: 1500, height: 820 },
      },
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "SauceDemo Automation",
      use: {
        ...devices["Desktop Chrome"],
        deviceScaleFactor: undefined,
        viewport: null,
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },

    /*  {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

       {npx playwright test  MyTest1.spec.js   
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
*/
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
