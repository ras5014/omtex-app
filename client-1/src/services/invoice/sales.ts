import { api } from "@/lib/axios";
import { z } from "zod";
import qs from "qs";

export const SalesInvoiceSchema = z.object({
  id: z.string(),
  documentId: z.string(),
  date: z.string().transform((date) => new Date(date)),
  invoiceNo: z.string(),
  customer: z.object({
    name: z.string(),
  }),
  grandTotal: z.number(),
});

export type SalesInvoice = z.infer<typeof SalesInvoiceSchema>;

export async function fetchSalesInvoices(
  page: number
): Promise<SalesInvoice[]> {
  const query = qs.stringify({
    filters: {
      type: {
        $eq: "Sale",
      },
    },
    fields: ["date", "invoiceNo", "grandTotal"],
    populate: {
      customer: {
        fields: ["name"],
      },
    },
    sort: ["date:desc"],
  });
  const res = await api.get(`/invoices?${query}`);
  return res.data as SalesInvoice[];
}
