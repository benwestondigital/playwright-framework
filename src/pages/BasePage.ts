import { Page } from 'playwright';
import { User } from 'src/fixtures';

export abstract class BasePage {
  readonly page: Page;
  public user: User;
  public cid: string;
  public customerId: string;
  readonly baseURL: string;
  readonly pathURL: string;
  readonly env: string;
  readonly language: string;
  readonly domain: string;
  readonly currency: Currency;
  readonly HEADERS: HEADERS;

  /**
   * @description An object that represents the basepage.
   * @param {Page} page The test page object.
   * @param {string} pathURL The path URL for the page e.g. /basket.
   * @param {string} baseURL The baseURL for the page.
   */
  constructor(page: Page, pathURL: string, baseURL = 'https://www.amazon.co.uk') {
    this.page = page;
    this.baseURL = baseURL;
    this.pathURL = pathURL;

    this.HEADERS = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  async goto(): Promise<void> {
    await this.page.goto(this.pathURL, { waitUntil: 'load' });
  }


  async getCustomerId(): Promise<string> {
    const res = await this.page.request.get('/auth/session');
    if (!res.ok()) {
      throw new Error('Bad response from "/auth/session"');
    }
    const data = await res.json();
    this.customerId = data?.session?.digital_identity_id;
    return this.customerId;
  }

  async clearCookieByName(cookieClearedName: string): Promise<void> {
    const filteredCookies = (await this.page.context().cookies()).filter((cookie) => cookie.name !== cookieClearedName);

    await this.page.context().clearCookies();
    await this.page.context().addCookies(filteredCookies);
  }

  async getCookie(name: string): Promise<string> {
    const [cookie] = (await this.page.context().cookies()).filter((cookie) => cookie.name === name);
    return cookie?.value;
  }

}

type Currency = 'GBP';

type HEADERS = {
  Accept: 'application/json';
  'Content-Type': 'application/json';
};
