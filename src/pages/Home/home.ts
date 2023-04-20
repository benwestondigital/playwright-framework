import { Page } from 'playwright';
import { BasePage } from '../BasePage';
import { User } from 'src/fixtures';
import { PageElementLocator } from 'src/pages/Basket/basket';

export class HomePage extends BasePage {
  readonly page: Page;

  constructor(page: Page, baseURL: string) {
    super(page, '/', baseURL);
    this.page = page;
  }
}
