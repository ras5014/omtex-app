"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/custom/combobox";
import { useCustomers } from "@/hooks/useCustomer";
import { DatePicker } from "../custom/date-picker";

export default function InvoiceLeftSection({ control, setValue }) {
  // Fetch customers from the API
  const { data: customers, isLoading } = useCustomers();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Date</FormLabel>
              <FormControl>
                <DatePicker />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="invoiceNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Invoice #</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter invoice number"
                  className="bg-white h-[40px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="customer"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Customer</FormLabel>
              <FormControl>
                <Combobox
                  onChange={(selectedCustomer) => {
                    const customer = customers.find(
                      (c) => c.name === selectedCustomer
                    );
                    if (customer) {
                      field.onChange(selectedCustomer);
                      setValue("gstNo", customer.gstNo);
                      setValue("billingAddress", customer.billingAddress);
                      setValue("shippingAddress", customer.shippingAddress);
                    }
                  }}
                  value={field.value}
                  frameworks={customers}
                  isLoading={isLoading}
                  labelName="Customer"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="gstNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">GST No</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter GST number"
                  className="bg-white h-[40px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
