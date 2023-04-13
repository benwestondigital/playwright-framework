import { test, expect } from 'src/fixtures/test';

test.describe('guest', () => {
  test.beforeAll(async ({}) => {});

  test.beforeEach(async ({ page, basket }) => {
    await page.goto('/');
    await page.getByTestId('nav-electricals').getByRole('link', { name: 'Electricals' }).hover();
    await Promise.all([page.waitForURL(/televisions/), page.getByTestId('nav-televisions').click()]);
    await page.getByRole('link', { name: /inch/ }).first().click();
    await page.getByTestId('basket:add').click();
    await basket.goToBasket();
  });

  test.describe('checks', () => {
    /* 
  - increment basket quantity
  -  */
    test('2 - Add and remove from Save for later', async ({ basket }) => {
      /*       await basket.addSaveForLater(productOne);
      await basket.removeSaveForLater(); */
    });

    test('3 - Add to Save for later and re-add', async ({ basket }) => {
      /*   await basket.addSaveForLater(productOne);
      await basket.addToBasketFromSaveForLater(productOne); */
    });

    test('8 - Product attributes appear on page', async ({ basket }) => {
      await basket.checkProductAttributes();
    });
  });
});

test.afterEach(async ({ basket }, testInfo) => {
  const expectedStatus = testInfo.status === testInfo.expectedStatus;

  if (!expectedStatus) {
    basket.logErrorInfo(testInfo);
  }
});

test.afterAll(async ({}) => {});
