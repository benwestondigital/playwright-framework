import { test, expect } from 'src/fixtures/test';

test.describe('guest', () => {
  test.beforeAll(async ({}) => {});

  test.beforeEach(async ({ basket, baseURL }, testInfo) => {
    await basket.goToBasket();
  });

  test.describe('checks', () => {
    /* 
  - increment basket quantity
  -  */
    test('1 - Basket with subscription item(s)', async ({ basket, baseURL, page }) => {
      await expect(page.locator('.incentive')).toContainText('Get these benefits from your second order onwards:');
      await expect(page.locator('.incentive')).toContainText('The best price from the last 90 days');
      await expect(page.locator('.incentive')).toContainText('Free delivery on orders over £10');
      await basket.selectSubscriptionCheckbox();
      await basket.checkChangeSubFrequency();
      await basket.selectOneTimeDelivery();
      await basket.checkPayPalDisabledForSubOrders();
    });

    test('2 - Add and remove from Save for later', async ({ basket }) => {
      /*       await basket.addSaveForLater(productOne);
      await basket.removeSaveForLater(); */
    });

    test('3 - Add to Save for later and re-add', async ({ basket }) => {
      /*   await basket.addSaveForLater(productOne);
      await basket.addToBasketFromSaveForLater(productOne); */
    });

    test('5 - Basket - Click & Collect', async ({ basket, baseURL }) => {
      await basket.checkProductAttributes();
      // await basket.basketClickandCollect();
      await basket.clickCheckoutButton();
    });

    test('6 - Verify Checkout Welcome Page', async ({ basket, checkout }) => {
      await basket.checkProductAttributes();
      await basket.clickCheckoutButton();
      await checkout.guestCheckout();
    });

    test('7 - Checkout Welcome Page - Sign In at Checkout', async ({ basket, checkout, baseURL }) => {
      await basket.checkProductAttributes();
      await basket.clickCheckoutButton();
      await checkout.checkoutSignIn();
    });

    test('8 - Product attribute check', async ({ basket }) => {
      await basket.checkProductAttributes();
    });
  });
});

test.describe('add to basket', () => {
  test('9 - Add to basket from product page', async ({ page, basket, baseURL }) => {
    // const productURL = await basket.getProductURL(productOne.name);
    // await page.goto(`/${productURL}`);
    const [res] = await Promise.all([
      page.waitForResponse((res) => res.status() === 200 && res.url().includes('/api/pdp/addtobasket')),
      page.click('[data-test="add-to-basket"]'),
    ]);
    if (!res.ok()) {
      throw Error(`Bad response from API. Status: ${res.status()} - ${res.statusText()}`);
    }
    const response = await res.json();
    expect(response.status).toBe('ADDED');
  });

  test('10 - Add to basket from product listing page', async ({ page, basket }) => {
    // await page.goto(localisation[basket.domain].plpUrl);
    // await page.waitForURL(localisation[basket.domain].plpUrl);
    const productTitle = await page.locator('[data-test="product-title"] >> nth=0').innerText();
    const [res] = await Promise.all([
      page.waitForResponse(
        (res) =>
          res.status() === 200 &&
          res.url().includes('/basket/api/graphql') &&
          res.body().then((b) => {
            return b.includes('updateItem');
          }),
      ),
      page.click('[data-test="quick-add"] >> nth=0'),
    ]);

    if (!res.ok()) {
      throw Error(`Bad response from API. Status: ${res.status()} - ${res.statusText()}`);
    }

    const {
      data: { updateItem },
    } = await res.json();

    expect(updateItem.itemErrors).toHaveLength(0);
    expect(updateItem.basket.items).not.toHaveLength(0);
    expect(updateItem.basket.items[0].name).toBe(productTitle);
  });

  test('11 - Add to basket from search results page', async ({ page, basket }) => {
    // await page.goto('/search/?isSearch=true&query=' + localisation[basket.domain].srpSearchTerm);
    const productTitle = await page.locator('[data-test="product-title"] >> nth=0').innerText();
    const [res] = await Promise.all([
      page.waitForResponse(
        (res) =>
          res.status() === 200 &&
          res.url().includes('/basket/api/graphql') &&
          res.body().then((b) => {
            return b.includes('updateItem');
          }),
      ),
      page.click('[data-test="quick-add"] >> nth=0'),
    ]);

    if (!res.ok()) {
      throw Error(`Bad response from API. Status: ${res.status()} - ${res.statusText()}`);
    }

    const response = await res.json();
    expect(response.data.updateItem.itemErrors).toHaveLength(0);
    expect(response.data.updateItem.basket.items).not.toHaveLength(0);
    expect(response.data.updateItem.basket.items[0].name).toBe(productTitle);
  });
});

test.afterEach(async ({ basket }, testInfo) => {
  const expectedStatus = testInfo.status === testInfo.expectedStatus;

  if (!expectedStatus) {
    basket.logErrorInfo(testInfo);
  }
});

test.afterAll(async ({}) => {});
