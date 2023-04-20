import { test, expect } from 'src/fixtures/test';
import { AuthHandler } from 'src/fixtures/AuthHandler';
import { userDetails } from 'src/pages/Checkout/data/user.data';

test.describe.skip('signed-in', () => {
  test.use({
    Account: {
      email: userDetails.email,
      password: userDetails.password,
    },
  });

  test.beforeAll(async ({}) => {
    if (!userDetails.email || !userDetails.password) {
      throw new Error('Add EMAIL and PASSWORD to .env file to allow signed-in tests to run.');
    }
  });

  test.beforeEach(async ({ basket }, testInfo) => {
    await basket.goToBasket();
  });

  test('2 - Basket is emptied on logout and cookie removed', async ({ page, basket, baseURL }) => {
    test.skip(!baseURL.includes('preprod'), 'triggering CAPTCHA on prod');

    await basket.checkProductAttributes();
    await basket.logout('Ben');
    await expect(page.locator('.basket__container')).toHaveCount(0);
  });
});

test.afterEach(async ({ basket }, testInfo) => {
  const expectedStatus = testInfo.status === testInfo.expectedStatus;

  if (!expectedStatus) {
    basket.logErrorInfo(testInfo);
  }
});

test.afterAll(async ({}) => {});
