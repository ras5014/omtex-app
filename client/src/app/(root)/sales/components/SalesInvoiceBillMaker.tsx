"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/custom/combobox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InvoiceLeftSection from "./InvoiceLeftSection";
import InvoiceRightSection from "./InvoiceRightSection";

export default function SalesInvoiceBillMaker() {

  // React-Hook-Form Setup
  const form = useForm({
    defaultValues: { date: "", invoiceNo: "", customer: "", gstNo: "", billingAddress: "", shippingAddress: "" },
  });
  const { register, handleSubmit, formState: { errors }, reset } = form;

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4 text-green-700 text-center">Sales Invoice Bill Maker</h1>
      <Separator className="my-4" />

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Left Column */}
            <InvoiceLeftSection control={form.control} />

            {/* Right Column */}
            <InvoiceRightSection control={form.control} />
          </div>

          <Separator />


          {/* Items Table */}
          <Table>
            <TableHeader className="bg-green-700">
              <TableRow className="font-bold">
                <TableHead className="text-foreground font-bold text-white">#</TableHead>
                <TableHead className="text-foreground font-bold text-white">Item</TableHead>
                <TableHead className="text-foreground font-bold text-white">HSN</TableHead>
                <TableHead className="text-foreground font-bold text-white">Qty</TableHead>
                <TableHead className="text-foreground font-bold text-white">Price</TableHead>
                <TableHead className="text-foreground font-bold text-white">Discount %</TableHead>
                <TableHead className="text-foreground font-bold text-white">Taxable Value</TableHead>
                <TableHead className="text-foreground font-bold text-white">CGST %</TableHead>
                <TableHead className="text-foreground font-bold text-white">SGST %</TableHead>
                <TableHead className="text-foreground font-bold text-white">IGST %</TableHead>
                <TableHead className="text-foreground font-bold text-white">Total</TableHead>
                <TableHead className="text-foreground font-bold text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
          </Table>


          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="secondary" onClick={() => reset()}>
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>

    </div>
  );
}
