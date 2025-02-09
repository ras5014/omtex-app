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

export default function InvoiceLeftSection({ control }) {
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
                <Input type="date" {...field} className="bg-white h-[40px]" />
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
                <Combobox value={field.value} onChange={field.onChange} />
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
