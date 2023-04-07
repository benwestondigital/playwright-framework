import { test, expect } from 'src/fixtures/test';
import { AuthHandler } from 'src/fixtures/AuthHandler';
import { userDetails } from 'src/pages/Checkout/data/user.data';

test.describe('signed-in', () => {
  test.use({
    Account: {
      useLogin: true,
      loginOverride: {
        enabled: true,
        email: userDetails.email,
        password: userDetails.password,
      },
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

  test('1 - Merge basket respects item quantity limit', async ({ basket, page, baseURL }) => {
    test.skip(!baseURL.includes('preprod'), 'triggering CAPTCHA on prod');

    const authHandler = new AuthHandler(page);
    const quantitySelector = page.locator('input[name="quantity"]');

    // await quantitySelector.fill(localisation[basket.domain].quantityLimit.toString());
    await Promise.all([page.waitForResponse(/api\/basket/), page.click('h1.basket-title')]);
    await authHandler.logoutSCV();

    // await page.goto(`/basket?items=${productOne.skuId},${localisation[basket.domain].quantityLimit}`);
    await authHandler.loginSCV('hbiqeauto+bentesting@gmail.com', 'Qwerty@123');
    await page.goto('/basket');
    // expect(await quantitySelector.inputValue()).toBe(localisation[basket.domain].quantityLimit.toString());
  });

  test('2 - Basket is emptied on logout', async ({ page, basket, baseURL }) => {
    test.skip(!baseURL.includes('preprod'), 'triggering CAPTCHA on prod');

    await basket.checkProductAttributes();
    // expect(!!bid).toBeTruthy();

    await basket.logout('Ben');
    // const bidPostLogout = await basket.getBid();
    // expect(bid).not.toEqual(bidPostLogout);

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
