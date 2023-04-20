import { test, expect } from 'src/fixtures/test';

test.describe.skip('guest', () => {
  test.beforeAll(async ({}) => {});

  test.beforeEach(async ({ basket }) => {
    await basket.loadBasket();
  });

  test.describe('checks', () => {
    test('2 - Add and remove from Save for later', async ({ basket, page }) => {
      await basket.goto();
      await page.waitForTimeout(10000);
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
