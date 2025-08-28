export const fetchCache = "force-no-store";

import { columns, Invoice } from "./columns";
import { DataTable } from "../ui/data-table";
import { getAllInvoice } from "@/server-actions/invoice-actions";

async function getData() {
  // Fetch data from your API here.
  const response = await getAllInvoice();

  console.log("getData response:", response);

  // Check if the response indicates success
  if (response?.success === false) {
    return { data: [], error: response.message };
  }

  // Return the data if successful
  const data = response?.data?.data || [];
  console.log("Extracted data:", data);

  return { data, error: null };
}

export default async function InvoiceDataTable({ type }) {
  const { data, error } = await getData();

  // Display error message if there was an error fetching data
  if (error) {
    return (
      <div className="container mx-auto p-5">
        <div className="rounded-lg border border-red-500/50 bg-red-50 p-4 text-red-500">
          <h3 className="font-medium">Error fetching invoices</h3>
          <p className="mt-1 text-sm">
            {error}. Please check your connection and try again.
          </p>
        </div>
      </div>
    );
  }

  // Debug: Log the data being received
  console.log("Invoice data received:", data);
  console.log("Data length:", data?.length);
  console.log("Data structure:", JSON.stringify(data, null, 2));

  return (
    <div className="container mx-auto p-5">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
