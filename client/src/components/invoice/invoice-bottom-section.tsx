"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function InvoiceBottomSection({
  control,
  watch,
  calculateTotals,
}) {
  return (
    <div className="flex justify-end">
      <Card className="w-1/3 px-6 py-3">
        <CardContent className="flex flex-col space-y-4">
          <FormField
            control={control}
            name="subTotal"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between space-x-4">
                <FormLabel className="w-1/3 font-bold">Sub Total</FormLabel>
                <FormControl className="w-2/3">
                  <Input
                    type="number"
                    {...field}
                    className="bg-white"
                    readOnly
                    value={watch("subTotal")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            control={control}
            name="cashDiscount"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between space-x-4">
                <FormLabel className="w-1/3 font-bold">Cash Discount</FormLabel>
                <FormControl className="w-2/3">
                  <Input
                    type="number"
                    {...field}
                    className="bg-white"
                    value={watch("cashDiscount")}
                    onChange={(e) => {
                      field.onChange(e);
                      calculateTotals();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            control={control}
            name="grandTotal"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between space-x-4">
                <FormLabel className="w-1/3 font-bold">Grand Total</FormLabel>
                <FormControl className="w-2/3">
                  <Input
                    type="number"
                    {...field}
                    className="bg-slate-200 font-bold text-green-900"
                    readOnly
                    value={watch("grandTotal")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
