import { test, expect } from 'src/fixtures/test';

test.beforeAll(async ({}) => {});

test.describe('guest', () => {
  test.beforeEach(async ({ basket }) => {
    await basket.goToBasket();
    // journey to payment page
  });

  // Payment methods load with no errors in console
  test(`1: Card`, async ({ basket, page, payment }) => {
  });

  test('2: Paypal', async ({ page, payment, basket }) => {
  });
});

test.describe('Basket', () => {
  test.beforeEach(async ({ basket }) => {
    await basket.goToBasket();
  });

  test('3: Paypal Express', async ({ page, basket, checkout }) => {
  
  });
});

test.afterEach(async ({ basket }, testInfo) => {
  const expectedStatus = testInfo.status === testInfo.expectedStatus;

  if (!expectedStatus) {
    basket.logErrorInfo(testInfo);
  }
});

test.afterAll(async ({}) => {});
