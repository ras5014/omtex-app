import { InvoiceDialog } from "@/components/invoice/invoice-dialog";
import { Button } from "@/components/ui/button";
import React from "react";

const Sales = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex rounded-xl bg-muted/50 p-6 justify-between h-20 items-center">
        <div>
          <h1 className="headline">Sales Invoices</h1>
        </div>
        <div className="flex gap-10">
          <Button className="font-bold">Create Estimate</Button>
          <InvoiceDialog type="sales" />
        </div>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
    </div>
  );
};

export default Sales;
