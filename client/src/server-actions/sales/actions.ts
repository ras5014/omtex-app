"use server";

import prisma from "@/db/prisma";

export async function createInvoice(formData: FormData) {
  const date = formData.date;
  const invoiceNumber = formData.invoiceNumber;
  const customer = formData.customer;
  const gstNumber = formData.gstNumber;
  const billingAddress = formData.billingAddress;
  const shippingAddress = formData.shippingAddress;
  const items = formData.items;
  const cashDiscount = formData.cashDiscount;
  const subTotal = formData.subTotal;
  const grandTotal = formData.grandTotal;
  
  // Create invoice in the database
  await prisma.SalesInvoice.create({
    data: {
      date,
      invoiceNumber,
      customer,
      gstNumber,
      billingAddress,
      shippingAddress,
      items,
      cashDiscount,
      subTotal,
      grandTotal
    }
  });
}
