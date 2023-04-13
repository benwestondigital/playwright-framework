import { Page } from 'playwright';
import { User } from '.';

export class AuthHandler {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(email: string, password: string) {
    await this.page.goto('/sign-in');
    await this.page.locator('#username').type(email);
    await this.page.locator('#password').type(password);
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      this.page.locator('button[type=submit]').click(),
    ]);
  }

  async logout() {
    await this.page.request.delete('/customer-identity/single-sign-on/session?keepBasketAlive=false');
  }
}
