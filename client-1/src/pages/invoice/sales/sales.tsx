import { columns } from '@/pages/invoice/sales/columns'
import type { Invoice } from '@/pages/invoice/sales/columns'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { useQuery } from '@tanstack/react-query'

import * as Invoices from '@/services/invoice/sales'
import { useState } from 'react'

export default function Sales() {

    const [page, setPage] = useState<number>(1);

    const { data: invoices, isPending, isError } = useQuery<Invoice[]>({
        queryKey: ['salesInvoices', { page }],
        queryFn: () => Invoices.fetchSalesInvoices(page),
        staleTime: Infinity,
        retry: 2
    })


    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex rounded-xl bg-muted/50 p-6 justify-between h-20 items-center">
                <div>
                    <h1 className="headline">SALES INVOICE</h1>
                </div>
                <div className="flex gap-10 justify-center">
                    <Button className="font-bold flex-1">Generate Report</Button>
                    <Button className="font-bold flex-1">One Click GST Submission</Button>
                    <Button className="font-bold flex-1">Create Estimate</Button>
                    <div className="flex-1">
                        {/* <InvoiceDialog type="sales" /> */}
                    </div>
                </div>
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <div className='p-10'>
                    <DataTable data={invoices ?? []} columns={columns} />
                </div>
            </div>
        </div>
    )
}
