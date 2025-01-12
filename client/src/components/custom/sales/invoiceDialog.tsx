import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import SalesInvoiceBillMaker from "./saleInvoiceBillMaker"


export function InvoiceDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="font-bold">Create Invoice</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[95%] h-[95%] bg-muted/100 max-h-[100vh] overflow-y-auto">
                <DialogHeader className="flex items-center justify-center">
                    <DialogTitle className="max-w-[50%] text-2xl font-bold text-center border dark:border-gray-600 rounded-xl px-10 py-4">CREATE SALES INVOICE</DialogTitle>
                </DialogHeader>
                <SalesInvoiceBillMaker />
            </DialogContent>
        </Dialog>
    );
}
