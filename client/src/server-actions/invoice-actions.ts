"use server";

import { api } from "@/lib/axios";
import { handleStrapiRequest } from "@/lib/utils";
import { revalidatePath } from "next/cache";
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
  console.log("Customer query:", query);
  const { data: customerData } = await api.get(`/customers?${query}`);
  console.log("Customer data:", customerData);
  const customerDocumentId = customerData?.data[0]?.documentId || null;
  console.log("Customer documentId:", customerDocumentId);

  // Exclude billingAddress and shippingAddress from formData
  const { billingAddress, shippingAddress, gstNo, ...rest } = formData;

  // Create the invoice
  const invoiceData = {
    ...rest,
    type: "Sale",
    customer: customerDocumentId,
  };

  console.log(invoiceData);

  // Temp Logic, Later add zod schema to fix
  if (invoiceData.invoiceNo === "") {
    // Generate a unique invoice number if none provided
    const timestamp = Date.now();
    invoiceData.invoiceNo = `INV-${timestamp}`;
  }

  const result = await handleStrapiRequest(
    () => api.post("/invoices", { data: invoiceData }),
    "Invoice created successfully",
    "Invoice"
  );

  console.log("Invoice creation result:", result);

  revalidatePath("/invoice/sales");

  return result;
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

export async function getAllInvoice() {
  const query = qs.stringify({
    filters: {
      type: {
        $eq: "Sale",
      },
    },
    fields: ["id", "date", "invoiceNo", "grandTotal", "documentId"],
    populate: {
      customer: {
        fields: ["name"],
      },
    },
    sort: ["date:desc"],
  });

  console.log("Query string:", query);

  const result = await handleStrapiRequest(
    () => api.get(`/invoices?${query}`),
    "Invoices fetched successfully",
    "Invoice"
  );

  console.log("getAllInvoice result:", result);

  return result;
}
