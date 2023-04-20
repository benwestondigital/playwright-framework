import { expect, TestInfo, Locator } from '@playwright/test';
import { Page } from 'playwright';
import * as data from './basket.data';
import { Product } from './basket.data';
import { BasePage } from '../BasePage';
import { OrderBasketResponse } from './basket.types';

export class BasketPage extends BasePage {
  readonly page: Page;
  public basket_id: string;
  public product: Product;
  public errors: any;

  readonly CTA: PageElementLocator;
  readonly plp: PageElementLocator;
  readonly basketProducts: PageElementLocator;
  readonly payPal: PageElementLocator;
  readonly basketCC: PageElementLocator;

  constructor(page: Page, baseURL: string) {
    super(page, '/basket', baseURL);
    this.page = page;

    [this.product] = data.products;
  }

  async loadBasket(): Promise<void> {
    const payLoad = { quantity: 1, skuId: this.product.skuId, variantId: this.product.variantId };
    const res = await this.page.request.post(
      `https://api.johnlewis.com/basket-ui/basket/items/${this.product.variantId}`,
      {
        data: payLoad,
        headers: {
          'x-api-client-id': 'standard_pdp_ui',
        },
      },
    );

    if (!res.ok()) {
      throw new Error(`Bad response from basket - ${res.status()} - ${res.statusText()}.`);
    }

    const data: OrderBasketResponse = await res.json();
    const { errors, basket } = data;
    this.basket_id = basket?.deliveryQualifications?.basketId;
    this.errors = errors;
  }

  logErrorInfo(testInfo: TestInfo): void {
    const retry = testInfo.retry ? ` retry ${testInfo.retry}` : '';
    const errors = this.errors ? `errors: ${this.errors}` : '';
    console.log(`
    Test ${testInfo.title}${retry} failed. Info:
    basket_id: ${this.basket_id}
    ${errors}
    
    `);
  }

  async goToBasket(): Promise<void> {
    await this.goto();
  }

  async checkProductAttributes(): Promise<void> {
    const productCount = await this.basketProducts.prices.count();
    for (let i = 0; i < productCount; i++) {
      await expect.soft(this.basketProducts.prices.nth(i)).toBeVisible();
      await expect.soft(this.basketProducts.images.nth(i)).toBeVisible();
      await expect.soft(this.basketProducts.names.nth(i)).toBeVisible();
      await expect.soft(this.basketProducts.quantitySelectors.nth(i)).toBeVisible();
    }
  }

  async removeProduct(): Promise<void> {
    const productCount = await this.basketProducts.prices.count();
    await Promise.all([
      this.page.waitForResponse(async (res) => {
        if (res.status() === 200 && res.url().includes('/api/basket?basic=false')) {
          const {
            status: [{ status }],
          } = await res.json();
          return status === 'DELETED';
        }
      }),
      this.CTA.removeItem.click(),
    ]);
    await expect(this.basketProducts.prices).toHaveCount(productCount - 1);
  }

  async logout(accountFirstName: string): Promise<void> {
    // Change name if change account
    await this.page.waitForSelector(`[data-menuitem-type="account"]:has-text("${accountFirstName}")`);

    await this.page.hover('[data-menuitem-type="account"]');
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.click(
        'div[class*="MenuItem-module--dropdownLinks"] li:last-child [class*=DropdownLink-module--dropdownLink]',
      ),
    ]);
  }

  async clickCheckoutButton(): Promise<void> {
    await Promise.all([this.page.waitForURL(/.*\/checkout/), this.CTA.proceedToCheckout.click()]);
  }

  async getProductInfo(data): Promise<Product[]> {
    return data.basket.commerceItems.map(({ skuId, productId, variantId }) => {
      return { skuId, productId, variantId };
    });
  }
}

export type PageElementLocator = Record<string, Locator>;
