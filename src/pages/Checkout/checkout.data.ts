export const deliveryMethodSelectors = {
  homeDeliveryBtn: '[data-testid=delivery]',
  clickAndCollectDeliveryBtn: '[data-testid=collection]',

  //Username and Number Selectors
  firstNameLabel: 'label[for="firstName"]',
  firstNameInput: 'input#firstName',
  lastNameInput: 'input#lastName',
  phoneNumberInput: 'input#phoneNumber',

  //btn
  enterAddressManuallyButton: 'button.edit-address-manually',

  //address details selectors
  addressLine1Label: 'label[for="addressLine1"]',
  addressLine1Input: 'input#addressLine1',
  cityInput: 'input#city',
  postcodeInput: 'input#postalCode',
  continueBtn: '.formSubmitContainer button.primary',

  standardDeliveryOptionRadio: 'input[id=STANDARD_DELIVERY]',
};

export const checkoutWelcomeGuest = {
  guestEmail: 'input[name="email"]',
  continueToDelivery: '.formSubmitContainer button.primary',
};

export const checkoutSignIn = {
  signIn: 'label[for="account_type_user"]',
  emailAddress: '//input[@id="username"]|//input[@name="email"]',
  password: 'input[name="password"]',
  continue: 'text=Continue',
  authSignIn: 'button[type=submit]',
};

export const createAcc = {
  createAccountlink: '.create-account-link',
  firstName: '#firstname',
  lastName: '#lastname',
  email: '#email',
  password: '#password',
  termsAndCondition: '#terms_and_conditions',
  createAccount: 'form button.primary',
};

export const deliveryDetailsPage = {
  homeDeliveryBtn: '[data-testid=delivery]',
  firstNameInput: 'input#firstName',
  lastNameInput: 'input#lastName',
  phoneNumberInput: 'input#phoneNumber',
  enterAddressManuallyButton: 'button.edit-address-manually',
  addressLine1Label: 'label[for="addressLine1"]',
  addressLine1Input: 'input#addressLine1',
  cityInput: 'input#city',
  postcodeInput: 'input#postalCode',
  continueBtn: 'button[type="submit"]',
};

export const deliveryOptions = {
  standardDeliveryOptionRadio: 'input[id=STANDARD_DELIVERY]',
  continueToPymt: '[data-testid="delivery-options-form"] button.primary',
  payPalRadiobtn: 'div#payment-wrapper-paypal',
  paypalBtn: '.paypal-button-container',
};

export const checkOut = {
  submitButton: '[data-testid="delivery-options-form"] .formSubmitContainer button.primary',
};
