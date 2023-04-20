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
    baseURL: 'https://www.johnlewis.com/',
  },
  projects: [
    {
      name: 'basket',
      testDir: 'suites/basket',
    },
    {
      name: 'checkout',
      testDir: 'suites/checkout',
    },
    {
      name: 'payments',
      testDir: 'suites/payments',
    },
    {
      name: 'product',
      testDir: 'suites/product',
    },
  ],
  workers: process.env.CI ? 2 : 4,
  reporter: 'line',
};
export default config;
