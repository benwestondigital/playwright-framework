type DeliveryMethod = {
    id: string;
    cutOffTime: number;
    dateMessage: string;
    leadTime: number;
    shortDescription: string;
    standardDescription: string;
  };
  
  type DeliveryOption = {
    deliveryMethods: DeliveryMethod[];
    isAvailable: boolean;
    name: string;
    title: string;
  };
  
  type OptionalService = {
    type: string;
    id: string;
    title: string;
    description: string;
  };
  
  type CommerceItem = {
    id: string;
    price: number;
    productCode: string;
    productId: string;
    quantity: number;
    skuId: string;
    type: string;
    name: string;
    message: string;
    promotionalMessages: string[];
    imageUrl: string;
    pdpUrl: string;
    deliveryOptions: DeliveryOption[];
    stockLevel: number;
    availabilityStatus: string;
    uom: string;
    childItems: any[];
    information: any[];
    optionalServices: OptionalService[];
  };

  type DeliveryQualifications = {
    basketId: string;
    freeDelivery: {
        available: boolean;
        additionalSpendRequired: number;
        qualificationMessage: string;
    },
    freeClickAndCollect: {
        available: boolean;
    },
    moreDeliveryOptions: {
        available: boolean;
        message: string;
    }
  }
  
  type Basket = {
    orderId: string;
    subtotal: number;
    currency: string;
    commerceItems: CommerceItem[];
    deliveryQualifications: DeliveryQualifications;
  };
  
  export type OrderBasketResponse = {
    errors: any[];
    basket: Basket;
  };
  