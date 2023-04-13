import { expect, TestInfo, Locator } from '@playwright/test';
import { Page } from 'playwright';
import * as data from './basketPage.data';
import { BasePage } from '../BasePage';

export class BasketPage extends BasePage {
  readonly page: Page;
  public bid: string;

  readonly CTA: PageElementLocator;
  readonly plp: PageElementLocator;
  readonly basketProducts: PageElementLocator;
  readonly payPal: PageElementLocator;
  readonly basketCC: PageElementLocator;

  constructor(page: Page, baseURL: string) {
    super(page, '/basket', baseURL);
    this.page = page;
  }

  //*                       Agnostic Methods
  //*  ===============================================================

  async loadBasket() {
    const payLoad = {};
    const res = await this.page.request.post(`https://api.johnlewis.com/basket-ui/basket/items/${data.variantIds[0]}`, {
      data: payLoad,
    });
  }

  // General

  logErrorInfo(testInfo: TestInfo): void {
    const retry = testInfo.retry ? ` retry ${testInfo.retry}` : '';
    console.log(`
    Test ${testInfo.title}${retry} failed. Info:
    bid: ${this.bid}
    
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
}

export type FetchedProduct = {
  skuId: string;
  available: boolean;
  subscribable: boolean;
  price: number;
  stock?: number;
  name?: string;
};

export type PageElementLocator = Record<string, Locator>;
