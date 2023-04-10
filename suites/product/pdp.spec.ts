import { test, expect } from 'src/fixtures/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('nav-electricals').getByRole('link', { name: 'Electricals' }).hover();
  await Promise.all([page.waitForURL(/televisions/), page.getByTestId('nav-televisions').click()]);
  await page.getByRole('link', { name: /inch/ }).first().click();
});

test('should add product to basket', async ({ page }) => {
  const [addToBasket] = await Promise.all([
    page.waitForResponse(async (res) => res.url().match(/basket/) && res.ok() && res.request().method() === 'POST'),
    page.getByTestId('basket:add').click(),
  ]);

  if (!addToBasket.ok()) {
    throw new Error('Bad response when adding to basket');
  }

  expect(page.getByTestId('basket:confirmation')).toBeVisible();

  const { errors, basket } = await addToBasket.json();

  expect(errors).toHaveLength(0);
  expect(basket.commerceItems).toHaveLength(1);
  expect(basket.commerceItems[0].stockLevel).toBeGreaterThan(0);
  expect(basket.commerceItems[0].availabilityStatus).toBe('INSTOCK');
  expect(+(await page.getByTestId('basket-amount').innerText())).toBe(1);
});

test('should show in-store stock', async ({ page }) => {
  await Promise.all([
    page.waitForResponse((res) => res.url().match(/store-data/) && res.ok() && res.request().method() === 'GET'),
    page.getByRole('button', { name: 'Check in-store stock' }).click(),
  ]);

  expect(page.locator('ul[class*="StoreStock_store-stock-popup-shops-list"]')).toBeVisible();
});
