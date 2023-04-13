import { test, expect } from 'src/fixtures/test';
import { userDetails } from 'src/pages/Checkout/data/user.data';

test.describe('signed-in', () => {
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

  test.beforeEach(async ({}) => {});

  test.describe('Saved Card', () => {
    test(`1: Card`, async ({ basket, checkout, page, payment }) => {});
  });
});

test.afterEach(async ({ basket }, testInfo) => {
  const expectedStatus = testInfo.status === testInfo.expectedStatus;

  if (!expectedStatus) {
    basket.logErrorInfo(testInfo);
  }
});

test.afterAll(async ({}) => {});
