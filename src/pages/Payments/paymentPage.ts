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
}
