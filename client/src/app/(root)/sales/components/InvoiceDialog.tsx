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
import SalesInvoiceBillMaker from "./SalesInvoiceBillMaker"


/**
 * A dialog for creating a new invoice. It contains a form component which
 * handles all the business logic of creating a new invoice. The form component
 * is called SalesInvoiceBillMaker and is defined in the same directory as this
 * component.
 *
 * @returns A dialog component which contains a form for creating a new invoice.
 */
export function InvoiceDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="font-bold">Create Invoice</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[80%] h-[95%] bg-muted/100 max-h-[100vh] overflow-y-auto bg-slate-200">
                <SalesInvoiceBillMaker />
            </DialogContent>
        </Dialog>
    );
}
