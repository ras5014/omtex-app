"use server";

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
