import { Page } from 'playwright';
import { User } from 'src/fixtures';

export abstract class BasePage {
  readonly page: Page;
  public user: User;
  readonly baseURL: string;
  readonly pathURL: string;

  /**
   * @description An object that represents the basepage.
   * @param {Page} page The test page object.
   * @param {string} pathURL The path URL for the page e.g. /basket.
   * @param {string} baseURL The baseURL for the page.
   */
  constructor(page: Page, pathURL: string, baseURL: string = 'https://www.johnlewis.com') {
    this.page = page;
    this.baseURL = baseURL;
    this.pathURL = pathURL;
  }

  async goto(): Promise<void> {
    await this.page.goto(this.pathURL, { waitUntil: 'load' });
  }

  async acceptCookies(): Promise<void> {
    await this.page.locator('[data-test="allow-all"]').click();
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
