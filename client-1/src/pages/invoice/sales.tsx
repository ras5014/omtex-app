import { columns } from '@/pages/invoice/columns'
import type { Invoice } from '@/pages/invoice/columns'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'



export default function Sales() {

    const data: Invoice[] = [
        {
            id: '1',
            documentId: 'doc-1',
            date: '2023-10-01',
            invoiceNo: 'INV-001',
            customer: { name: 'Customer A' },
            grandTotal: 1000,
        },
        {
            id: '2',
            documentId: 'doc-2',
            date: '2023-10-02',
            invoiceNo: 'INV-002',
            customer: { name: 'Customer B' },
            grandTotal: 2000,
        },
    ];
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
                    <DataTable data={data} columns={columns} />
                </div>
            </div>
        </div>
    )
}
