import { test, expect } from 'src/fixtures/test';

test.beforeAll(async ({}) => {});

test.describe('guest', () => {
  test.beforeEach(async ({ basket }) => {
    await basket.goToBasket();
    // journey to payment page
  });

  // Payment methods load with no errors in console
  test(`1: Card`, async ({ basket, page, payment }) => {
    await payment.clickOnCardPaymentRadioV5();
    /*   await payment.enterCardCredentialsV5(adyenCards[card]);
          await payment.submitCardPayment(); */

    /*           if (!page.url().includes('/checkout/confirmation')) {
            await page.waitForURL('/checkout/confirmation');
          } */

    /*           await expect(page.locator(localisation[basket.domain].confirmation.thanks)).toBeVisible();
          await expect(page.locator(localisation[basket.domain].confirmation.orderNumber)).toBeVisible();
          await expect(page.locator(localisation[basket.domain].confirmation.email)).toBeVisible(); */
  });

  test('2: Paypal', async ({ page, payment, basket }) => {
    // await payment.clickOnPaypalPaymentRadioV5();
    // await payment.handlePaypalPayment();
  });
});

test.describe('Basket', () => {
  test.beforeEach(async ({ basket }) => {
    await basket.goToBasket();
  });

  test('3: Paypal Express', async ({ page, basket, checkout }) => {
    await basket.clickPaypalButton();
    // await basket.handlePayPalExpressPayment();

    await checkout.submitExpressOrder();
    /* 
    await expect(page.locator(localisation[basket.domain].confirmation.thanks)).toBeVisible();
    await expect(page.locator(localisation[basket.domain].confirmation.orderNumber)).toBeVisible();
    await expect(page.locator(localisation[basket.domain].confirmation.email)).toBeVisible();
    await expect(page.locator('img[alt="Paypal Checkout" i]')).toBeVisible(); */
  });
});

test.afterEach(async ({ basket }, testInfo) => {
  const expectedStatus = testInfo.status === testInfo.expectedStatus;

  if (!expectedStatus) {
    basket.logErrorInfo(testInfo);
  }
});

test.afterAll(async ({}) => {});
