import { Page } from 'playwright';
import { expect } from '@playwright/test';
import { User } from 'src/fixtures';
import * as data from './checkout.data';
import { BasePage } from 'src/pages/BasePage';
import { PageElementLocator } from 'src/pages/Basket/basketPage';
import { faker } from '@faker-js/faker';
import { userDetails } from './data/user.data';

export class Checkout extends BasePage {
  readonly page: Page;

  readonly deliveryMethod: PageElementLocator;
  readonly deliveryDetailsPage: PageElementLocator;
  readonly welcomeGuest: PageElementLocator;
  readonly signIn: PageElementLocator;
  readonly createAccount: PageElementLocator;
  readonly deliveryOptions: PageElementLocator;
  readonly checkOut: PageElementLocator;
  public fakerPostCodes: Record<string, string>;

  constructor(page: Page, baseURL: string, user: User) {
    super(page, '/checkout', baseURL);
    this.page = page;
    this.user = user;

    this.welcomeGuest = {
      email: page.locator(data.checkoutWelcomeGuest.guestEmail),
      continueToDelivery: page.locator(data.checkoutWelcomeGuest.continueToDelivery),
    };

    this.signIn = {
      signIn: page.locator(data.checkoutSignIn.signIn),
      emailAddress: page.locator(data.checkoutSignIn.emailAddress),
      password: page.locator(data.checkoutSignIn.password),
      continue: page.locator(data.checkoutSignIn.continue),
      authSignIn: page.locator(data.checkoutSignIn.authSignIn),
    };

    this.createAccount = {
      link: page.locator(data.createAcc.createAccountlink),
      firstName: page.locator(data.createAcc.firstName),
      lastName: page.locator(data.createAcc.lastName),
      email: page.locator(data.createAcc.email),
      password: page.locator(data.createAcc.password),
      termsAndCondition: page.locator(data.createAcc.termsAndCondition),
      createAccount: page.locator(data.createAcc.createAccount),
    };

    this.deliveryMethod = {
      homeDelivery: page.locator(data.deliveryMethodSelectors.homeDeliveryBtn),
      clickAndCollect: page.locator(data.deliveryMethodSelectors.clickAndCollectDeliveryBtn),
      firstNameText: page.locator(data.deliveryMethodSelectors.firstNameLabel),
      firstName: page.locator(data.deliveryMethodSelectors.firstNameInput),
      lastName: page.locator(data.deliveryMethodSelectors.lastNameInput),
      phoneNumber: page.locator(data.deliveryMethodSelectors.phoneNumberInput),
      enterManualAddress: page.locator(data.deliveryMethodSelectors.enterAddressManuallyButton),
      addressLine1: page.locator(data.deliveryMethodSelectors.addressLine1Input),
      addressLine1Text: page.locator(data.deliveryMethodSelectors.addressLine1Label),
      city: page.locator(data.deliveryMethodSelectors.cityInput),
      postcode: page.locator(data.deliveryMethodSelectors.postcodeInput),
      continue: page.locator(data.deliveryMethodSelectors.continueBtn),
      standardDeliveryOption: page.locator(data.deliveryMethodSelectors.standardDeliveryOptionRadio),
    };

    this.deliveryDetailsPage = {
      homeDeliveryBtn: page.locator(data.deliveryDetailsPage.homeDeliveryBtn),
      firstNameInput: page.locator(data.deliveryDetailsPage.firstNameInput),
      lastNameInput: page.locator(data.deliveryDetailsPage.lastNameInput),
      phoneNumberInput: page.locator(data.deliveryDetailsPage.phoneNumberInput),
      enterAddressManuallyButton: page.locator(data.deliveryDetailsPage.enterAddressManuallyButton),
      addressLine1Label: page.locator(data.deliveryDetailsPage.addressLine1Label),
      addressLine1Input: page.locator(data.deliveryDetailsPage.addressLine1Input),
      cityInput: page.locator(data.deliveryDetailsPage.cityInput),
      postcodeInput: page.locator(data.deliveryDetailsPage.postcodeInput),
      continueBtn: page.locator(data.deliveryDetailsPage.continueBtn),
    };

    this.deliveryOptions = {
      standardDeliveryOptionRadio: page.locator(data.deliveryOptions.standardDeliveryOptionRadio),
      continueToPayment: page.locator(data.deliveryOptions.continueToPymt),
      payPalRadiobtn: page.locator(data.deliveryOptions.payPalRadiobtn),
      paypalBtn: page.locator(data.deliveryOptions.paypalBtn),
    };

    this.checkOut = {
      submitButton: page.locator(data.checkOut.submitButton),
    };

    this.fakerPostCodes = {
      com: faker.address.zipCode('?## #??'),
      ie: faker.address.zipCode('?## ?#?#').replace(/o/gi, 'A'),
      nl: faker.address.zipCode('#### ??'),
      be: faker.address.zipCode('####'),
    };
  }

  async selectDeliveryMethod(method: 'Delivery' | 'Click and Collect'): Promise<void> {
    if (method === 'Delivery') {
      await this.deliveryMethod.homeDelivery.click();
    } else if (method === 'Click and Collect') {
      await this.deliveryMethod.clickAndCollect.click();
    }
  }

  async getClickCollectStoreName(): Promise<string> {
    const [, checkoutStoreName] = (await this.page.locator('.selected-store .name').innerText()).match(/^([\w\d\s]+)/);
    return checkoutStoreName;
  }

  async fillCAndCPersonalDetails(): Promise<void> {
    await this.page.fill('input#firstName', this.user.firstName);
    await this.page.fill('input#lastName', this.user.lastName);
    await this.page.fill('input#phoneNumber', this.user.phoneNumber);
  }

  async selectClickCollect(): Promise<void> {
    await this.page.click('[data-testid="collection"]');
  }

  async selectClickCollectStore(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse(
        (res) => res.status() === 200 && res.url().includes('api.woosmap.com/localities/autocomplete'),
      ),
      this.page.fill('input#location-lookup', 'L23'),
    ]);

    await this.page.click('[id*=listbox] [id*=-option-0]');
    await this.page.locator('.store-container button.button').first().click();
  }

  async enterDeliveryCredentials(): Promise<void> {
    await this.deliveryMethod.firstNameText.waitFor();
    await this.deliveryMethod.firstName.fill(this.user.firstName);
    await this.deliveryMethod.lastName.fill(this.user.lastName);
    await this.deliveryMethod.phoneNumber.fill(this.user.phoneNumber);
    await this.deliveryMethod.enterManualAddress.click();
    await this.deliveryMethod.addressLine1Text.waitFor();
    await this.deliveryMethod.addressLine1.fill(this.user.address.line1);
    await this.deliveryMethod.city.fill(this.user.address.city);
    // await this.deliveryMethod.postcode.fill(this.fakerPostCodes[this.domain]);
  }

  async deliveryDetails(): Promise<void> {
    await this.deliveryDetailsPage.homeDeliveryBtn.click(), { delay: 500 };
    await this.deliveryDetailsPage.firstNameInput.fill(this.user.firstName);
    await this.deliveryDetailsPage.lastNameInput.fill(this.user.lastName);
    await this.deliveryDetailsPage.phoneNumberInput.fill(this.user.phoneNumber);
    await this.deliveryDetailsPage.enterAddressManuallyButton.click();
    await this.deliveryDetailsPage.addressLine1Label.click();
    await this.deliveryDetailsPage.addressLine1Input.fill(this.user.address.line1);
    await this.deliveryDetailsPage.cityInput.fill(this.user.address.city);
    // await this.deliveryDetailsPage.postcodeInput.fill(this.fakerPostCodes[this.domain]);

    await Promise.all([
      this.page.waitForURL(/\/checkout\/delivery\/options/),
      this.deliveryDetailsPage.continueBtn.click(),
    ]);
  }

  async continueToDeliveryOptions(): Promise<void> {
    await Promise.all([this.page.waitForNavigation(), this.deliveryMethod.continue.click()]);
  }

  async continueToPayment(): Promise<void> {
    await Promise.all([this.page.waitForNavigation({ waitUntil: 'load' }), this.deliveryMethod.continue.click()]);
  }

  async checkoutSignIn(): Promise<void> {
    await Promise.all([
      this.page.waitForURL(/.*\/\/auth(?:-ie|-nl|-be)?\.hollandandbarrett.*/),
      this.signIn.signIn.click(),
    ]);
    // await this.signIn.emailAddress.fill(userDetails.username);
    await this.signIn.password.fill(userDetails.password);
    await Promise.all([this.page.waitForNavigation(), this.signIn.authSignIn.click()]);
    await expect(this.page).toHaveURL(/.*\/checkout\/delivery/);
  }

  async selectStandardDeliveryAndContinue(): Promise<void> {
    await this.deliveryOptions.standardDeliveryOptionRadio.check();
    await Promise.all([this.page.waitForURL(/.*\/checkout\/payment/), this.deliveryOptions.continueToPayment.click()]);
  }

  async guestCheckout(): Promise<void> {
    await this.welcomeGuest.email.fill(this.user.fakeEmail);
    await Promise.all([this.page.waitForNavigation(), this.welcomeGuest.continueToDelivery.click()]);
    await expect(this.page).toHaveURL(/.*\/checkout\/delivery/);
  }

  async fillGuestEmail(): Promise<void> {
    await this.page.fill('input#email', this.user.fakeEmail);
    await Promise.all([this.page.waitForURL('checkout/delivery'), this.page.click('button[type="submit"]')]);
  }

  async submitExpressOrder(): Promise<void> {
    await Promise.all([this.page.waitForURL('/checkout/confirmation'), this.page.click('button.primary')]);
  }

  async submitOrder(): Promise<void> {
    await Promise.all([this.page.waitForURL('/checkout/confirmation'), this.page.click('button[value="Pay"]')]);
  }

  // Payment Page
  async fillCCAddressDetails(user) {
    await this.page.click('form button.edit-address-manually');
    await this.deliveryDetailsPage.addressLine1Input.fill(this.user.address.line1);
    await this.deliveryDetailsPage.cityInput.fill(this.user.address.city);
    await this.deliveryDetailsPage.postcodeInput.fill(user.postcode);
    await this.page.click('button[data-testid="submit-billing-form"]');
  }

  async fillCCAddressDetailsV5(user) {
    await Promise.all([
      this.page.waitForResponse('/payments/address/search'),
      this.page.fill('input[name="billing-address-search"]', user.realPostCode),
    ]);
    const resultCount = await this.page.locator('.search-item').count();
    const randomNum = Math.floor(Math.random() * resultCount);

    await this.page.click(`.search-button >> nth = ${randomNum}`);
  }
}
