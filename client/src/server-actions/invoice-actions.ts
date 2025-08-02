"use server";

import { api } from "@/lib/axios";

export async function createInvoice(formData) {
  console.log(formData);

  // Customer Details
  const customerData = {
    name: formData.get("customer"),
    gstNo: formData.get("gstNo"),
    billingAddress: formData.get("billingAddress"),
    shippingAddress: formData.get("shippingAddress"),
  };
}

export async function createCustomer(formData) {
  try {
    // Call the API to create a customer
    const res = await api.post("/customers", {
      data: formData,
    });

    if (res.status === 201) {
      return { success: true, message: "Customer created successfully" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create customer" };
  }
}

export async function createItem(formData) {
  try {
    const res = await api.post("/item-inventories", {
      data: formData,
    });

    if (res.status === 201) {
      return { success: true, message: "Item created successfully" };
    }
  } catch (error) {
    return { success: false, message: "Failed to create item" };
  }
}
