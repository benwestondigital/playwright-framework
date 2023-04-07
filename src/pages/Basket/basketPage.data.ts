export const homepageUrl = '/';

export const basketButtons = {
  basketHeaderIconLocator: '[data-menuitem-type="basket"] >> visible=true',
  checkoutCTA: '.basket__sidebar .button--checkout',
  paypalUK: '.paypal-link >>nth =0',
  removeItem: '[data-test=remove] >> nth=0',
  addVoucherCode: '[data-test=voucher-codes] >> nth=0',
  voucherField: '[data-test=voucher-field]',
  voucherApplied: '[data-test=price-savings-item] >> visible=true',
  voucherRedeem: '[data-test="voucher-codes"] .submit button[role="button"] >> nth=0',
  subscribeCheckbox: 'input[type=radio][id*="recurring"]',
  subDropdown: '[data-test="select"]',
  subOptions: '[data-test="select"] option',
  oneTimeDelivery: 'input[type=radio][id*="single"]',
  activeSubscription: '[data-test=active-subscriptions]',
  editSubButton: '.modify__button img[alt="Modify"]',
};

export const basketProducts = {
  prices: '[data-test=price]',
  images: '[data-test=image]',
  names: '[data-test=title]',
  quantitySelectors: '[data-test=quantity]',
};

export const plp = {
  plpAddToBasket1: '[data-test="quick-add"] >> nth=0',
  plpAddToBasket2: '[data-test="quick-add"] >> nth=2',
};

export const payPal = {
  email: '#email',
  nextButton: '#btnNext',
  password: '#password',
  loginButton: '#btnLogin',
  submitButton: '#payment-submit-btn',
};

export const UKbasketJson = {
  currency: 'GBP',
  locale: 'en-GB',
  siteId: '10',
  incrementQty: false,
  items: [
    {
      skuId: '048776',
      quantity: 1,
    },
  ],
};

export const basketCC = {
  collectionAvailability: '.click-collect__container',
  postcode: 'input#location-lookup',
  selectStore: '[data-test*= "store-"] >> nth=1',
  subTotal: '[data-test="price-subtotal"] .price-label__price.price-label--grey',
  savings: '[data-test="price-savings"] .price-label__price.price-label--red',
  rfldisplay: 'span.points',
};
