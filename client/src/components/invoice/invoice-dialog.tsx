import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";

export function InvoiceDialog({ type }: { type: "sales" | "purchases" }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-bold">Create Invoice</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[85%] h-[95%] max-h-[100vh] overflow-y-auto">
        {type === "sales" && <div>Sales Invoice</div>}
        {type === "purchases" && <div>Purchase Invoice</div>}
      </DialogContent>
    </Dialog>
  );
}
