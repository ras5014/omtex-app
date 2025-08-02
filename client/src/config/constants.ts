export const getContentTypeSchemaMapping = {
  Customer: "api::customer.customer",
  Item: "api::item-inventory.item-inventory",
};

export const customerFormSchemaRules = {
  sortOder: [
    "name",
    "gstNo",
    "billingAddress",
    "shippingAddress",
    "email",
    "phone",
  ],
  excludeFields: ["outStandingBalance"],
};

export const itemFormSchemaRules = {
  sortOder: [
    "name",
    "type",
    "hsnSac",
    "unit",
    "availableStock",
    "costPrice",
    "price",
    "discountPercent",
    "cgstPercent",
    "sgstPercent",
    "igstPercent",
  ],
  excludeFields: ["images"],
};
