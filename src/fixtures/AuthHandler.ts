import { Page } from 'playwright';
import { User } from '.';

export class AuthHandler {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async loginSCV(email: string, password: string) {
    await this.page.goto('/auth/login');
    await this.page.locator('#username').type(email);
    await this.page.locator('#password').type(password);
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      this.page.locator('button[type=submit]').click(),
    ]);
  }

  async getSCVSession(): Promise<SCVSession> {
    const data = await (await this.page.request.get('/auth/session')).json();
    return data.session;
  }

  async logoutSCV() {
    await this.page.request.get('/auth/logout');
  }

  async createAccountSCV(user: User) {
    await this.page.goto('/auth/signup');

    await this.page.locator('#firstName').fill(user.firstName);
    await this.page.locator('#lastName').fill(user.lastName);
    await this.page.locator('#email').fill(user.email);
    await this.page.locator('#password').focus();
    await this.page.locator('#password').fill(user.password);
    await this.page.locator('#confirmPassword').focus();
    await this.page.locator('#confirmPassword').fill(user.password);
    await this.page.locator('text=i agree >> [type=checkbox]').click();

    await Promise.all([
      this.page.locator('[class*=ThankYou_thank_you_container]').waitFor(),
      this.page.locator('[type=submit]:has-text("create")').click(),
    ]);
  }
}

type SCVSession = {
  digital_identity_id: string;
  email: string;
  loginStatus: boolean;
  name: string;
  firstName: string;
  lastName: string;
  och_id: string;
  atg_id: string;
};
