import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentInvoiceItems extends Struct.ComponentSchema {
  collectionName: 'components_component_invoice_items';
  info: {
    description: '';
    displayName: 'InvoiceItems';
    icon: 'archive';
  };
  attributes: {
    cgstPercent: Schema.Attribute.Decimal;
    discountPercent: Schema.Attribute.Decimal;
    hsnSac: Schema.Attribute.String;
    igstPercent: Schema.Attribute.Decimal;
    itemName: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    price: Schema.Attribute.Decimal;
    qty: Schema.Attribute.Integer;
    sgstPercent: Schema.Attribute.Decimal;
    taxableValue: Schema.Attribute.Decimal;
    total: Schema.Attribute.Decimal;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'component.invoice-items': ComponentInvoiceItems;
    }
  }
}
