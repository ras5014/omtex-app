"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SheetFooter, SheetClose } from "@/components/ui/sheet";
import { useEffect, useState } from "react";

// Schema Rules
import {
  customerFormSchemaRules,
  itemFormSchemaRules,
} from "@/config/constants";
import { createCustomer, createItem } from "@/server-actions/invoice-actions";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateDynamicForm({ schema, labelName }) {
  const form = useForm();
  const { handleSubmit, control } = form;

  // Inside the component:
  const [sortedFields, setSortedFields] = useState([]);

  useEffect(() => {
    /**
     * Filters and sorts the fields of a schema based on the provided tableName's rules.
     * It excludes fields listed in `tableName.excludeFields` and sorts the remaining
     * fields according to their order in `tableName.sortOder`. The sorted fields are
     * then set to the state `sortedFields`.
     *
     * @param tableName - An object containing `excludeFields` and `sortOder` arrays
     *                    which define the filtering and sorting rules.
     */

    const getSortedFields = (tableName) => {
      const filteredAndSorted = Object.entries(schema)
        .filter(([key]) => !tableName.excludeFields.includes(key))
        .sort(([keyA], [keyB]) => {
          const indexA = tableName.sortOder.indexOf(keyA);
          const indexB = tableName.sortOder.indexOf(keyB);
          return indexA === -1 ? 1 : indexB === -1 ? -1 : indexA - indexB;
        });
      setSortedFields(filteredAndSorted);
    };

    if (labelName === "Customer") getSortedFields(customerFormSchemaRules);
    if (labelName === "Item") getSortedFields(itemFormSchemaRules);
  }, [schema]);

  const queryClient = useQueryClient();

  const onSubmit = async (formData) => {
    if (labelName === "Customer") {
      const res = await createCustomer(formData);
      if (res.success) {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["customers"] }); // This trigger a refresh from parent component
      } else {
        toast.error(res.message);
      }
    } else if (labelName === "Item") {
      const res = await createItem(formData);
      if (res.success) {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["items"] }); // This trigger a refresh from parent component
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 mt-10 mb-10 max-h-[800px] overflow-y-auto">
          {sortedFields.map(([key, value]) => (
            <FormField
              control={control}
              name={key}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">{key}</FormLabel>
                  <FormControl>
                    {(() => {
                      switch ((value as { type: string }).type) {
                        case "string":
                        case "email":
                        case "biginteger":
                        case "decimal":
                          return (
                            <Input
                              className="bg-white h-[40px]"
                              {...field}
                              type={
                                (value as { type: string }).type === "email"
                                  ? "email"
                                  : (value as { type: string }).type ===
                                      "decimal" ||
                                    (value as { type: string }).type ===
                                      "biginteger"
                                  ? "number"
                                  : "text"
                              }
                              min={(value as { min?: number }).min}
                            />
                          );
                        case "text":
                          return (
                            <Textarea
                              {...field}
                              placeholder="Enter text"
                              className="bg-white h-[40px]"
                            />
                          );
                        case "number":
                          return (
                            <Input
                              {...field}
                              type="number"
                              placeholder="Enter number"
                              className="bg-white h-[40px]"
                            />
                          );
                        case "enumeration":
                          return (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={`Select ${key}`} />
                              </SelectTrigger>
                              <SelectContent>
                                {(value as { enum?: string[] }).enum?.map(
                                  (option) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          );

                        default:
                          return (
                            <Input
                              {...field}
                              placeholder="Enter text"
                              className="bg-white h-[40px]"
                            />
                          );
                      }
                    })()}
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </Form>
  );
}
