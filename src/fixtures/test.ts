import { test as base } from '@playwright/test';

import {
  StorageState,
  BasketPage,
  Checkout,
  PaymentPage,
  User,
  HomePage,
  generateRandomUser,
} from 'src/fixtures/index';
import { AuthHandler } from './AuthHandler';

export type FixtureOptions = {
  Account: {
    randomUser?: boolean;
    email?: string;
    password?: string;
  };
};

type CustomFixtures = {
  user: User;
  basket: BasketPage;
  checkout: Checkout;
  payment: PaymentPage;
  home: HomePage;
};

/**
 * Extends Playwright's test fixture.
 */

let account = generateRandomUser();

export const test = base.extend<FixtureOptions & CustomFixtures>({
  Account: [
    {
      randomUser: false,
      email: '',
      password: '',
    },
    { scope: 'test', option: true },
  ],
  user: async ({ Account }, use) => {
    const user = (() => {
      if (Account.email) {
        account = { ...account, email: Account.email, password: Account.password };
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

      await page.route(/.*analytics.*/, (route) => route.abort('aborted'));
      await page.route(/.*contentsquare.*/, (route) => route.abort('aborted'));

      if (Account.email) {
        await authHandler.login(user.email, user.password);
      }

      await use(page);

      // Teardown page fixture
      if (Account.email) {
        await authHandler.logout();
      }
      await page.close();
      await context.close();
    },
    { scope: 'test', timeout: 30_000 },
  ],
  basket: async ({ page, baseURL }, use) => {
    await use(new BasketPage(page, baseURL));
  },
  home: async ({ page, baseURL }, use) => {
    await use(new HomePage(page, baseURL));
  },
  checkout: async ({ page, baseURL }, use) => {
    await use(new Checkout(page, baseURL, account));
  },
  payment: async ({ page, baseURL }, use) => {
    await use(new PaymentPage(page, baseURL, account));
  },
});
export { expect } from '@playwright/test';
