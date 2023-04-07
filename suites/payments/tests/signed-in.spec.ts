import { test, expect } from 'src/fixtures/test';

test.describe('signed-in', () => {
  test.use({
    Account: {
      useLogin: true,
      loginOverride: {
        enabled: true,
        email: 'hbiqeauto+bensavedcardtesting@gmail.com',
        password: 'Qwerty@123',
      },
    },
  });

  test.beforeAll(async ({ basket }) => {
    // beforeAll
  });

  test.beforeEach(async ({ basket }) => {
    // beforeEach
  });

  test.describe('Saved Card', () => {
    test(`1: Card`, async ({ basket, checkout, page, payment }) => {
      // await page.goto(`/basket?items=${product.skuId},1`);
      await basket.clickCheckoutButtonSignedIn();

      // cid = await checkout.getCid();
      await checkout.selectDeliveryMethod('Delivery');
      await checkout.continueToDeliveryOptions();
      await Promise.all([page.waitForResponse(/setup/), checkout.continueToPayment()]);

      await payment.clickOnCardPaymentRadioV5();
    });
  });
});

test.afterEach(async ({ payment, basket }, testInfo) => {
  const expectedStatus = testInfo.status === testInfo.expectedStatus;

  if (!expectedStatus) {
    basket.logErrorInfo(testInfo);
  }
});

test.afterAll(async ({}) => {
  // afterAll
});
