import { test, expect } from 'src/fixtures/test';

test.describe('test', () => {
  test('go to home page', async ({ page }) => {
    await page.goto('/');
  });
});
