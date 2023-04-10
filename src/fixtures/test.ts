import { test as base } from '@playwright/test';

import {
  StorageState,
  BasketPage,
  Checkout,
  PaymentPage,
  User,
  HomePage,
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
  home: HomePage;
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

      await page.route(/.*analytics.*/, (route) => route.abort('aborted'));
      await page.route(/.*contentsquare.*/, (route) => route.abort('aborted'));

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
    { scope: 'test', timeout: 60_000 },
  ],
  basket: async ({ page, baseURL }, use) => {
    await use(new BasketPage(page, baseURL));
  },
  home: async ({ page, baseURL }, use) => {
    await use(new HomePage(page, baseURL));
  },
  checkout: async ({ page, baseURL }, use) => {
    await use(new Checkout(page, baseURL, fakeUser));
  },
  payment: async ({ page, baseURL }, use) => {
    await use(new PaymentPage(page, baseURL, fakeUser));
  },
});
export { expect } from '@playwright/test';
