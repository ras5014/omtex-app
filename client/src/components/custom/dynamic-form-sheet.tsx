import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetFooter,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSchema } from "@/hooks/useSchema";
import CreateDynamicForm from "./create-dynamic-form";

export function DynamicFormSheet({ labelName }) {
  // Fetch Schema for respective labelName
  const { data: schema, isLoading } = useSchema(labelName);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full">Create {labelName}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create {labelName}</SheetTitle>
          <SheetDescription>
            Create a new {labelName} here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        {/* Render Forms for respective labelName */}
        <CreateDynamicForm schema={schema} labelName={labelName} />
      </SheetContent>
    </Sheet>
  );
}
