import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import InvoiceForm from "./invoice-form";

export function InvoiceDialog({ type }) {
  return (
    <Dialog>
      <DialogTitle></DialogTitle>
      <DialogTrigger asChild>
        <Button className="font-bold">Create Invoice</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[85%] h-[95%] max-h-[100vh] overflow-y-auto">
        {type === "sales" && <InvoiceForm />}
        {type === "purchases" && <div>Purchase Invoice</div>}
      </DialogContent>
    </Dialog>
  );
}
