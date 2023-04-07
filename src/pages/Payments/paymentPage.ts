import { Page } from 'playwright';
import { User } from 'src/fixtures';
import { Checkout } from 'src/pages/Checkout/checkoutPage';
import { PageElementLocator } from 'src/pages/Basket/basketPage';

export class PaymentPage extends Checkout {
  readonly page: Page;
  readonly card: PageElementLocator;

  constructor(page: Page, baseURL: string, user: User) {
    super(page, baseURL, user);
    this.page = page;
  }

  async payNowCheckoutBtn(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.click('input#STANDARD_DELIVERY');
    // await this.paypal.checkoutPayNow.click();
  }

  async handle3DSScreen(): Promise<void> {
    await this.page.fill('input#username', 'user');
    await this.page.fill('input#password', 'password');
    await Promise.all([this.page.waitForURL('/checkout/confirmation'), this.page.click('input[type="submit"]')]);
  }

  //CARD
  async clickOnCardPaymentRadio(): Promise<void> {
    await this.card.cardRadio.click();
    await this.card.submitPaymentBtn.scrollIntoViewIfNeeded();
  }

  async clickOnCardPaymentRadioV5(): Promise<void> {
    /* await Promise.all([this.page.waitForResponse(/initialise/), this.cardV5.cardRadio.click()]);
    if ((await this.card.submitPaymentBtn.count()) > 0) {
      await this.card.submitPaymentBtn.scrollIntoViewIfNeeded();
    } */
  }
}
