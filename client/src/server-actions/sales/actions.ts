"use server";

import { prisma } from "@/db/prisma";

export async function createInvoice(formData: any) {
  // const date = formData.date;
  const invoiceNo = formData.invoiceNumber;
  const customer = formData.customer;
  const gstNumber = formData.gstNumber;
  const billingAddress = formData.billingAddress;
  const shippingAddress = formData.shippingAddress;
  const items = formData.items;
  const cashDiscount = formData.cashDiscount;
  const subTotal = formData.subTotal;
  const grandTotal = formData.grandTotal;

  await prisma.salesInvoice.create({
    data: {
      invoiceNo,
      // date,
      subTotal,
      cashDiscount,
      grandTotal,
      Customer: {
        connectOrCreate: {
          where: { name: customer },
          create: {
            name: customer,
            gstNumber,
            billingAddress,
            shippingAddress,
          },
        },
      },
      SalesInvoiceDetails: {
        create: items.map((item: any) => ({
          invoiceNo,
          itemName: item.itemName,
          hsnSac: item.hsnSac,
          quantity: item.quantity,
          price: item.price,
          discountPercent: item.discount,
          taxableValue: item.taxableValue,
          cgstPercent: item.cgst,
          sgstPercent: item.sgst,
          igstPercent: item.igst,
          total: item.total,
        })),
      },
    },
  });
}
