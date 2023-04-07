export const cardV3Locators = {
  cardRadioLocator: 'input[id=card]',
  cardNumberInputIframeLocator: 'iframe[title="Iframe for secured card data input field"] >> nth=0',
  cardNumberInput: 'input[id=encryptedCardNumber]',
  expiryDateInputIframeLocator: 'iframe[title="Iframe for secured card data input field"] >> nth=1',
  expiryDateInput: 'input[id=encryptedExpiryDate]',
  securityCodeInputIframeLocator: 'iframe[title="Iframe for secured card data input field"] >> nth=2',
  securityCodeInput: 'input[id=encryptedSecurityCode]',
  cardHolderNameInput: 'input.adyen-checkout__card__holderName__input',
  payBtn: 'button.adyen-checkout__button--pay',
};

export const card3DSV3Locators = {
  username: 'input#username',
  password: 'input#password',
  iFrame: 'iframe[title="components iframe"]',
  input: 'form input[type="password"]',
  submit: '#buttonContainer button[type="submit"]',
};

export const card3DSV5Locators = {
  topIframe: 'iframe[name="threeDSIframe"]',
  iFrame: 'iframe[name="acsFrame"]',
  password: 'form input[type="password"]',
  submit: '#buttonContainer button[type="submit"]',
};

export const cardV5Locators = {
  cardRadioLocator: 'button#card-simple-v5-accordion-head',
  cardNumberInputIframeLocator: `iframe[title="Iframe for secured card number"]`,
  cardNumberInputIframeLocatorNL: 'iframe[title="Iframe voor beveiligd kaartnummer"]',
  expiryDateInputIframeLocator: 'iframe[title="Iframe for secured card expiry date"]',
  expiryDateInputIframeLocatorNL: 'iframe[title="Iframe voor vervaldatum beveiligde kaart"]',
  securityCodeInputIframeLocator: 'iframe[title="Iframe for secured card security code"]',
  securityCodeInputIframeLocatorNL: 'iframe[title="Iframe voor beveiligingscode beveiligde kaart"]',
  cardNumberInput: 'input[data-fieldtype="encryptedCardNumber"]',
  expiryDateInput: 'input[data-fieldtype="encryptedExpiryDate"]',
  securityCodeInput: 'input[data-fieldtype="encryptedSecurityCode"]',
};

export const idealLocators = {
  idealRadioLocator: 'div#payment-wrapper-idl',
  idealDropdownLocator: '[title="Selecteer uw bank"]',
  thirdBank: '[data-value="1152"]',
  fourthBank: '[data-value="1153"]',
  fifthBank: '[data-value="1154"]',
  pendingState: '[data-value="1161"]',
  cancelledState: '[data-value="1162"]',
  refusedState: '[data-value="1160"]',
  idealPayBtn: 'button.adyen-checkout__button--pay',
  idealPortalContinueBtnLocator: 'input[value="Continue"]',
};

export const paypalLocators = {
  paypalRadioLocator: 'div#payment-wrapper-paypal',
  paypalRadioLocatorV5: 'div#payment-wrapper-paypal-simple-v5',
  paypalIframe: 'iframe[title="PayPal"] >> nth=1',
  paypalPayBtn: 'div.paypal-button-label-container',
  paypalAcceptCookies: 'button#acceptAllButton',
  paypalEmailInput: 'input#email',
  paypalNextBtn: 'button#btnNext',
  paypalPasswordInput: 'input#password',
  paypalLoginBtn: 'button#btnLogin',
  paypalPortalPayBtn: 'button#payment-submit-btn',
  checkoutPayNowBtn: 'button[type="submit"]',
};

export const gpayLocators = {
  gpayRadioLocator: 'div#payment-wrapper-paywithgoogle',
  gpayPayBtn: 'span.adyen-checkout__paywithgoogle',
  gpayEmailInput: 'input[type="email"]',
  gpayEmailNextBtn: 'div#identifierNext',
  gpayPasswordInput: 'input[type="password"]',
  gpayPasswordNextBtn: 'div#passwordNext',
  gpayPortalIframe: 'iframe[name="sM432dIframe"]',
  gpayPortalPayBtn: 'div[role="button"]:has-text("Pay")',
  gpayPortalMerchantText: 'text=Pay Unverified Merchant',
  usernameInput3DsPortal: 'input#username',
  passwordInput3DsPortal: 'input#password',
  submitBtn3DsPortal: 'input.button',
};

export const alipayLocators = {
  alipayRadioLocator: 'div#payment-wrapper-alipay',
  alipayPayBtn: '#alipay-simple-v5-container > button > span > span',
  alipayEmailInput: 'input[id="J_tLoginId"]',
  alipayPasswordInput: 'input[id="payPasswd_rsainput"]',
  alipayLoginBtn: '[id="J_newBtn"]',
  alipayPayNowBtn: '[id="J_authSubmit"]',
  alipayChooseOtherPaymentBtn: '[id="J_GoBack_nobodyknows"]',
};

export const bancontactMobileLocators = {
  radio: 'div#payment-wrapper-bancontact-mobile-v5',
  button: '#bancontact-mobile-v5-container button.adyen-checkout__button',
};

export const bancontactCardLocators = {
  radio: 'div#payment-wrapper-bancontact-card-v5',
  button: 'div#bancontact-card-v5-container button.adyen-checkout__button--pay',
  cardNumberIFrame: 'iframe[title="Iframe voor beveiligd kaartnummer"]',
  cardNumberInput: 'input[data-fieldtype="encryptedCardNumber"]',
  expiryIFrame: 'iframe[title="Iframe voor vervaldatum beveiligde kaart"]',
  expiryInput: 'input[data-fieldtype="encryptedExpiryDate"]',
};
