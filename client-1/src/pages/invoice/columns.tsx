import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InvoiceViewDetails } from "@/components/pdf-view/invoice-view-details";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Invoice = {
    id: string;
    documentId: string;
    date: string;
    invoiceNo: string;
    customer: {
        name: string;
    };
    grandTotal: number;
};

export const columns: ColumnDef<Invoice>[] = [
    {
        accessorKey: "date",
        header: () => <div className="text-bold">Date</div>,
    },
    {
        accessorKey: "invoiceNo",
        header: () => <div className="text-bold">Invoice No</div>,
    },

    {
        accessorKey: "customer.name",
        header: () => <div className="text-bold">Customer</div>,
    },

    {
        accessorKey: "grandTotal",
        header: () => <div className="text-right text-bold">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("grandTotal"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "INR",
            }).format(amount);

            return (
                <div className="text-right text-green-500 font-medium">{formatted}</div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const invoice = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <InvoiceViewDetails id={invoice.documentId} />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => console.log("Edit clicked")}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                console.log("Delete clicked");
                            }}
                            className="text-red-500"
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
