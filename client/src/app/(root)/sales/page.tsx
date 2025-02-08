import { Button } from "@/components/ui/button";
import { InvoiceDialog } from "./components/InvoiceDialog";

export default function page() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex rounded-xl bg-muted/50 p-6 justify-end gap-10">
                <InvoiceDialog />
                <Button className="font-bold">Create Estimate</Button>
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
        </div>
    )
}
