"use server";

import { prisma } from "@/db/prisma";

export async function createInvoice(formData: any) {
  const date = formData.date;
  const invoiceNo = formData.invoiceNumber;
  const customer = formData.customer;
  const gstNumber = formData.gstNumber;
  const billingAddress = formData.billingAddress;
  const shippingAddress = formData.shippingAddress;
  const items = formData.items;
  const cashDiscount = formData.cashDiscount;
  const subTotal = formData.subTotal;
  const grandTotal = formData.grandTotal;
}
