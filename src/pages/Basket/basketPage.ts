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

    this.CTA = {
      basketHeaderIcon: page.locator(data.basketButtons.basketHeaderIconLocator),
      proceedToCheckout: page.locator(data.basketButtons.checkoutCTA),
      paypalUK: page.locator(data.basketButtons.paypalUK),
      removeItem: page.locator(data.basketButtons.removeItem),
      addVoucherCode: page.locator(data.basketButtons.addVoucherCode),
      voucherField: page.locator(data.basketButtons.voucherField),
      voucherApplied: page.locator(data.basketButtons.voucherApplied),
      voucherRedeem: page.locator(data.basketButtons.voucherRedeem),
      subscribeCheckbox: page.locator(data.basketButtons.subscribeCheckbox),
      subDropdown: page.locator(data.basketButtons.subDropdown),
      subOptions: page.locator(data.basketButtons.subOptions),
      oneTimeDelivery: page.locator(data.basketButtons.oneTimeDelivery),
      activeSubscription: page.locator(data.basketButtons.activeSubscription),
      editSubButton: page.locator(data.basketButtons.editSubButton),
    };
    this.plp = {
      plpAddToBasket1: page.locator(data.plp.plpAddToBasket1),
      plpAddToBasket2: page.locator(data.plp.plpAddToBasket2),
    };
    this.basketProducts = {
      prices: page.locator(data.basketProducts.prices),
      images: page.locator(data.basketProducts.images),
      names: page.locator(data.basketProducts.names),
      quantitySelectors: page.locator(data.basketProducts.quantitySelectors),
    };
    this.payPal = {
      email: page.locator(data.payPal.email),
      nextButton: page.locator(data.payPal.nextButton),
      password: page.locator(data.payPal.password),
      loginButton: page.locator(data.payPal.loginButton),
      submitButton: page.locator(data.payPal.submitButton),
    };

    this.basketCC = {
      collectionAvailability: page.locator(data.basketCC.collectionAvailability),
      postcode: page.locator(data.basketCC.postcode),
      selectStore: page.locator(data.basketCC.selectStore),
      subTotal: page.locator(data.basketCC.subTotal),
      savings: page.locator(data.basketCC.savings),
      rfldisplay: page.locator(data.basketCC.rfldisplay),
    };
  }

  //*                       Agnostic Methods
  //*  ===============================================================

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

  async addVoucherCode(code: string): Promise<void> {
    await this.CTA.addVoucherCode.click();
    await this.page.fill(data.basketButtons.voucherField, code);

    await Promise.all([
      this.page.waitForResponse(async (res) => {
        if (res.status() === 200 && res.url().includes('/api/basket/voucher')) {
          const {
            responseStatus: {
              result: { status },
            },
          } = await res.json();
          return status === 'Applied';
        }
      }),
      this.CTA.voucherRedeem.click(),
    ]);
    await expect(this.CTA.voucherApplied).toBeVisible();
  }

  async removeVoucher(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse(async (res) => {
        if (res.status() === 200 && res.url().includes('/api/basket/voucher')) {
          const {
            responseStatus: {
              result: { status },
            },
          } = await res.json();
          return status === 'Removed';
        }
      }),
      this.page.click('[data-test="price-savings-item"] .price button.button--darkRed'),
    ]);
  }

  async selectSubscriptionCheckbox(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse(async (res) => {
        if (res.status() === 200 && res.url().includes('/api/basket?basic=false')) {
          const {
            basket: { hasSubscription },
          } = await res.json();
          return hasSubscription === true;
        }
      }),
      this.CTA.subscribeCheckbox.check(),
    ]);
  }

  async checkChangeSubFrequency(): Promise<void> {
    let subFrequency: number;
    await this.CTA.editSubButton.click();
    const allSelectOptions = await this.CTA.subOptions.allTextContents();
    const filteredOptions = allSelectOptions.filter((select) => !select.includes('recommended'));
    const subOptionValue = await this.page.locator(`option:has-text('${filteredOptions[0]}')`).getAttribute('value');
    await Promise.all([
      this.page.waitForResponse(async (res) => {
        if (res.status() === 200 && res.url().includes('/api/basket?basic=false')) {
          const { basket } = await res.json();
          subFrequency = basket.items[0].frequency;
          return true;
        }
      }),
      this.CTA.subDropdown.selectOption(subOptionValue),
    ]);
    await expect(this.page.locator('.modify__label').first()).toContainText(
      `This subscription will be delivered automatically every ${subFrequency} month`,
    );
    await expect(this.CTA.activeSubscription).toBeVisible();
  }

  async selectOneTimeDelivery(): Promise<void> {
    await this.CTA.editSubButton.click();
    await Promise.all([
      this.page.waitForResponse((res) => res.status() === 200 && res.url().includes('/api/basket?basic=false')),
      this.CTA.oneTimeDelivery.check(),
    ]);
    await expect(this.CTA.activeSubscription).toBeHidden();
    await expect(this.page.locator('text=This subscription will be delivered automatically every')).toBeHidden();
  }

  async checkPayPalDisabledForSubOrders(): Promise<void> {
    if ((await this.CTA.editSubButton.count()) === 0) {
      await this.selectSubscriptionCheckbox();
    }
    await expect(this.CTA.paypalUK).toBeHidden();
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

  // Checkout

  async clickCheckoutButton(): Promise<void> {
    await Promise.all([this.page.waitForURL(/.*\/checkout/), this.CTA.proceedToCheckout.click()]);
  }

  async clickCheckoutButtonSignedIn(): Promise<void> {
    await Promise.all([this.page.waitForURL(/.*\/checkout\/delivery/), this.CTA.proceedToCheckout.click()]);
  }

  async clickCheckoutButtonWithGuestSubscription(): Promise<void> {
    await Promise.all([this.page.waitForURL('/checkout/guest-subscription'), this.CTA.proceedToCheckout.click()]);
  }

  async clickPaypalButton(): Promise<void> {
    await Promise.all([this.page.waitForURL(/paypal.com/), this.CTA.paypalUK.click()]);
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
