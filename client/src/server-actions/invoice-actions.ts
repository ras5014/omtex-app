"use server";

import { api } from "@/lib/axios";
import { handleStrapiRequest } from "@/lib/utils";
import qs from "qs";

export async function createSalesInvoice(formData) {
  console.log(formData);

  // Get the customer's documentId
  const query = qs.stringify({
    filters: {
      name: {
        $eq: formData["customer"],
      },
    },
    fields: ["documentId"],
  });
  const { data } = await api.get(`/customers?${query}`);
  const customerDocumentId = data?.data[0]?.documentId || null;

  // Exclude billingAddress and shippingAddress from formData
  const { billingAddress, shippingAddress, ...rest } = formData;

  // Create the invoice
  const invoiceData = {
    ...rest,
    type: "sales",
    customer: customerDocumentId,
  };

  console.log(invoiceData);

  return handleStrapiRequest(
    () => api.post("/invoices", { data: invoiceData }),
    "Invoice created successfully",
    "Invoice"
  );
}

export async function createCustomer(formData) {
  return handleStrapiRequest(
    () => api.post("/customers", { data: formData }),
    "Customer created successfully",
    "Customer"
  );
}

export async function createItem(formData) {
  return handleStrapiRequest(
    () => api.post("/item-inventories", { data: formData }),
    "Item created successfully",
    "Item"
  );
}
