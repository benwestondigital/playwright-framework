import { PlaywrightTestConfig } from '@playwright/test';
import { FixtureOptions } from 'src/fixtures/test';

const config: PlaywrightTestConfig<FixtureOptions> = {
  fullyParallel: true,
  timeout: 60_000,
  retries: 1,
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    browserName: 'chromium',
  },
  projects: [
    {
      name: 'basket',
      use: {
        baseURL: 'https://www.johnlewis.com/',
      },
      testDir: 'suites/basket',
      grep: /@com/,
    },
    {
      name: 'checkout',
      use: {
        baseURL: 'https://www.johnlewis.com/',
      },
      testDir: 'suites/checkout',
      grep: /@com/,
    },
    {
      name: 'payments',
      use: {
        baseURL: 'https://www.johnlewis.com/',
      },
      testDir: 'suites/payments',
      grep: /@com/,
    },
  ],
  workers: process.env.CI ? 6 : 4,
  reporter: process.env.CI
    ? [['allure-playwright'], ['junit', { outputFile: 'test-results/junit.xml' }], ['line']]
    : 'line',
  expect: {
    toHaveScreenshot: {
      threshold: 0.2,
      maxDiffPixelRatio: 0.2,
    },
    toMatchSnapshot: {
      threshold: 0.2,
      maxDiffPixelRatio: 0.2,
    },
  },
};
export default config;
