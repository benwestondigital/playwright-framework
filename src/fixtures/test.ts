import { test as base } from '@playwright/test';

import {
  StorageState,
  BasketPage,
  Checkout,
  PaymentPage,
  User,
  generateRandomUser,
  generateSemiRandomUser,
} from 'src/fixtures/index';
import { AuthHandler } from './AuthHandler';

export type FixtureOptions = {
  Account: {
    randomUser?: boolean;
    useLogin: boolean;
    loginOverride: {
      enabled: boolean;
      email?: string;
      password?: string;
    };
  };
};

type CustomFixtures = {
  user: User;
  basket: BasketPage;
  checkout: Checkout;
  payment: PaymentPage;
};

// used for checkout/payment flow fake data
const fakeUser = generateRandomUser();

/**
 * Extends Playwright's test fixture.
 */

export const test = base.extend<FixtureOptions & CustomFixtures>({
  Account: [
    {
      randomUser: false,
      useLogin: false,
      loginOverride: {
        enabled: false,
        email: '',
        password: '',
      },
    },
    { scope: 'test', option: true },
  ],
  user: async ({ Account }, use) => {
    let account = Account.randomUser ? generateRandomUser() : generateSemiRandomUser();
    const user = (() => {
      if (Account.loginOverride.enabled) {
        account = { ...account, email: Account.loginOverride.email, password: Account.loginOverride.password };
      }
      return account;
    })();
    await use(user);
  },
  page: [
    async ({ browser, baseURL, Account, user }, use) => {
      const state = new StorageState(baseURL);
      const context = await browser.newContext({ storageState: state.getState });
      const page = await context.newPage();
      const authHandler = new AuthHandler(page);

      await page.route('https://www.google-analytics.com/**', (route) => route.abort('aborted'));
      await page.route('https://cdn.optimizely.com/**', (route) => route.abort('aborted'));
      await page.route('https://w.usabilla.com/**', (route) => route.abort('aborted'));
      await page.route(/.*contentsquare.*/, (route) => route.abort('aborted'));
      await page.route(`${baseURL}/api/geo-ip`, (route) => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: '{"status":"success","continent":"Europe","country":"United Kingdom","country_code":"GB","county":"Greater Manchester","city":"Manchester","post_code":"M4","latitude":"53.4808","longitude":"2.2426"}',
        });
      });
      await page.route(`${baseURL}/geoip`, (route) => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: '{"ip":"2a01:4c8:1423:1181:a183:e8d4:a779:9195","country_code":"GB","country_name":"United Kingdom","region_code":"SCT","region_name":"Scotland","city":"Glasgow","zip_code":"G41","time_zone":"Europe/London","latitude":55.8393,"longitude":-4.2892,"metro_code":0}',
        });
      });
      await page.route(`${baseURL}/geolocation`, (route) => {
        route.fulfill({
          status: 200,
          contentType: 'text/html',
          body: '{"city":"LONDON","continent":"EU","country_code":"GB","region":"EN","postal_code":"N/A"}',
        });
      });

      if (Account.useLogin) {
        await authHandler.loginSCV(user.email, user.password);
      }

      await use(page);

      // Teardown page fixture
      if (Account.useLogin) {
        await authHandler.logoutSCV();
      }
      await page.close();
      await context.close();
    },
    { scope: 'test', timeout: 30000 },
  ],
  basket: async ({ page, baseURL }, use) => {
    await use(new BasketPage(page, baseURL));
  },
  checkout: async ({ page, baseURL }, use) => {
    await use(new Checkout(page, baseURL, fakeUser));
  },
  payment: async ({ page, baseURL }, use) => {
    await use(new PaymentPage(page, baseURL, fakeUser));
  },
});
export { expect } from '@playwright/test';
