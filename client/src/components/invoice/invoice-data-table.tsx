import { columns, Payment } from "./columns";
import { DataTable } from "../ui/data-table";
import { getAllInvoice } from "@/server-actions/invoice-actions";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  const response = await getAllInvoice();
  return response?.data?.data;
}

export default async function InvoiceDataTable({ type }) {
  const data = await getData();

  return (
    <div className="container mx-auto p-5">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
