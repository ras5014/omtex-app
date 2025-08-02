"use client";

import { useForm, useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import InvoiceRightSection from "./invoice-right-section";
import InvoiceTableSection from "./invoice-table-section";
import InvoiceLeftSection from "./invoice-left-section";
import InvoiceBottomSection from "./invoice-bottom-section";
import toast from "react-hot-toast";

export default function SalesInvoiceBillMaker() {
  // Inside Parent form component child form components are there, so If We submit them then parent form will also get submitted.
  const [isSubmitting, setIsSubmitting] = useState(false); // If this value is true only then parent invoice form will get submitted.

  // React-Hook-Form Setup
  const form = useForm({
    defaultValues: {
      date: "",
      invoiceNo: "",
      customer: "",
      gstNo: "",
      billingAddress: "",
      shippingAddress: "",
      items: [
        {
          itemName: "",
          hsnSac: "",
          qty: 0,
          price: 0,
          discountPercent: 0,
          taxableValue: 0,
          cgstPercent: 0,
          sgstPercent: 0,
          igstPercent: 0,
          total: 0,
        },
      ],
      subTotal: 0,
      cashDiscount: 0,
      grandTotal: 0,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = async (formData) => {
    if (isSubmitting === false) return;
    console.log("FormData: ", formData);
    toast.success("Invoice created successfully!");
    // createInvoice(formData);
    setIsSubmitting(false);
  };

  const calculateTotals = () => {
    const items = watch("items");
    const subTotal = items.reduce(
      (total, item) => total + (Number(item.total) || 0),
      0
    );
    setValue("subTotal", subTotal);

    const grandTotal = subTotal - (Number(watch("cashDiscount")) || 0);
    setValue("grandTotal", Math.round(grandTotal));
  };

  return (
    <div className="p-5">
      <h1 className="headline">SALES INVOICE FORM</h1>
      <Separator className="my-6" />

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <InvoiceLeftSection control={form.control} setValue={setValue} />
            {/* Right Column */}
            <InvoiceRightSection control={form.control} />
          </div>

          <Separator />

          {/* Items Table */}
          <InvoiceTableSection
            control={form.control}
            fields={fields}
            remove={remove}
            append={append}
            watch={watch}
            setValue={setValue}
            calculateTotals={calculateTotals}
          />

          {/* Subtotal, Cash Discount, Grand Total */}
          <InvoiceBottomSection
            control={form.control}
            watch={watch}
            calculateTotals={calculateTotals}
          />

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => reset()}
              className="transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-200 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-200"
            >
              Reset
            </Button>
            <Button
              className="font-bold transition duration-150 ease-in-out hover:bg-green-600 hover:text-white active:bg-green-700 focus:outline-none focus:ring focus:ring-green-200 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-green-200"
              type="submit"
              onClick={() => setIsSubmitting(true)}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
