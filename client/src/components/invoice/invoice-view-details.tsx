import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import InvoicePdfPreview from "./invoice-pdf-preview";

export function InvoiceViewDetails({ id }) {
  return (
    <Dialog>
      <DialogTitle></DialogTitle>
      <DialogTrigger asChild>
        <p>View Details</p>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[60%] h-[95%] max-h-[100vh] overflow-y-auto bg-transparent border-none"
        showCloseButton={false}
      >
        <InvoicePdfPreview />
      </DialogContent>
    </Dialog>
  );
}
