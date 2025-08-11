"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/custom/combobox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useItems } from "@/hooks/useItems";

export default function InvoiceTableSection({
  control,
  fields,
  remove,
  append,
  watch,
  setValue,
  calculateTotals,
}) {
  // Fetch Items from the API
  const { data: items, isLoading } = useItems();
  // Calculate Total Amount for each item
  const calculateItemValues = (index) => {
    const items = watch("items");
    const item = items[index];

    const taxableValue =
      item.qty * item.price * (1 - item.discountPercent / 100);
    const cgstAmount = (taxableValue * item.cgstPercent) / 100;
    const sgstAmount = (taxableValue * item.sgstPercent) / 100;
    const igstAmount = (taxableValue * item.igstPercent) / 100;
    const total = taxableValue + cgstAmount + sgstAmount + igstAmount;

    setValue(`items.${index}.taxableValue`, taxableValue.toFixed(2));
    setValue(`items.${index}.total`, total.toFixed(2));
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader className="bg-gradient-to-r from-blue-600 to-purple-600 hidden md:table-header-group">
          <TableRow className="font-bold">
            <TableHead className="text-foreground font-bold text-white">
              #
            </TableHead>
            <TableHead className="text-foreground font-bold text-white">
              Item
            </TableHead>
            <TableHead className="text-foreground font-bold text-white">
              HSN
            </TableHead>
            <TableHead className="text-foreground font-bold text-white">
              Qty
            </TableHead>
            <TableHead className="text-foreground font-bold text-white">
              Price
            </TableHead>
            <TableHead className="text-foreground font-bold text-white">
              Discount %
            </TableHead>
            <TableHead className="text-foreground font-bold text-white">
              Taxable Value
            </TableHead>
            <TableHead className="text-foreground font-bold text-white">
              CGST %
            </TableHead>
            <TableHead className="text-foreground font-bold text-white">
              SGST %
            </TableHead>
            <TableHead className="text-foreground font-bold text-white">
              IGST %
            </TableHead>
            <TableHead className="text-foreground font-bold text-white">
              Total
            </TableHead>
            <TableHead className="text-foreground font-bold text-white">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={index} className="block md:table-row mb-4 md:mb-0">
              <TableCell className="block md:table-cell">
                <span className="md:hidden font-bold">#</span>
                {index + 1}
              </TableCell>

              {/* itemName */}
              <TableCell className="block md:table-cell">
                <span className="md:hidden font-bold">Item</span>
                <FormField
                  control={control}
                  name={`items.${index}.itemName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Combobox
                          value={field.value}
                          frameworks={items}
                          isLoading={isLoading}
                          labelName="Item"
                          onChange={(selectedItem) => {
                            const item = items.find(
                              (i) => i.name === selectedItem
                            );
                            if (item) {
                              field.onChange(selectedItem);
                              setValue(`items.${index}.hsnSac`, item.hsnSac);
                              setValue(`items.${index}.price`, item.price);
                              setValue(
                                `items.${index}.cgstPercent`,
                                item.cgstPercent
                              );
                              setValue(
                                `items.${index}.sgstPercent`,
                                item.sgstPercent
                              );
                              setValue(
                                `items.${index}.igstPercent`,
                                item.igstPercent
                              );
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>

              {/* hsnSac */}
              <TableCell className="block md:table-cell">
                <span className="md:hidden font-bold">HSN</span>
                <FormField
                  control={control}
                  name={`items.${index}.hsnSac`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>

              {/* qty */}
              <TableCell className="block md:table-cell">
                <span className="md:hidden font-bold">Qty</span>
                <FormField
                  control={control}
                  name={`items.${index}.qty`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="bg-white"
                          onChange={(e) => {
                            field.onChange(e);
                            calculateItemValues(index);
                            calculateTotals();
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>

              {/* Price */}
              <TableCell className="block md:table-cell">
                <span className="md:hidden font-bold">Price</span>
                <FormField
                  control={control}
                  name={`items.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="bg-white"
                          onChange={(e) => {
                            field.onChange(e);
                            calculateItemValues(index);
                            calculateTotals();
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>

              {/* discountPercent */}
              <TableCell className="block md:table-cell">
                <span className="md:hidden font-bold">Discount %</span>
                <FormField
                  control={control}
                  name={`items.${index}.discountPercent`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="bg-white"
                          onChange={(e) => {
                            field.onChange(e);
                            calculateItemValues(index);
                            calculateTotals();
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>

              {/* taxableValue */}
              <TableCell className="block md:table-cell">
                <span className="md:hidden font-bold">Taxable Value</span>
                <FormField
                  control={control}
                  name={`items.${index}.taxableValue`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="bg-white"
                          readOnly
                          value={watch(`items.${index}.taxableValue`)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>

              {/* cgstPercent */}
              <TableCell className="block md:table-cell">
                <span className="md:hidden font-bold">CGST %</span>
                <FormField
                  control={control}
                  name={`items.${index}.cgstPercent`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="bg-white"
                          onChange={(e) => {
                            field.onChange(e);
                            calculateItemValues(index);
                            calculateTotals();
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>

              {/* sgstPercent */}
              <TableCell className="block md:table-cell">
                <span className="md:hidden font-bold">SGST %</span>
                <FormField
                  control={control}
                  name={`items.${index}.sgstPercent`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="bg-white"
                          onChange={(e) => {
                            field.onChange(e);
                            calculateItemValues(index);
                            calculateTotals();
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>

              {/* igstPercent */}
              <TableCell className="block md:table-cell">
                <span className="md:hidden font-bold">IGST %</span>
                <FormField
                  control={control}
                  name={`items.${index}.igstPercent`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="bg-white"
                          onChange={(e) => {
                            field.onChange(e);
                            calculateItemValues(index);
                            calculateTotals();
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>

              {/* total */}
              <TableCell className="block md:table-cell">
                <span className="md:hidden font-bold">Total</span>
                <FormField
                  control={control}
                  name={`items.${index}.total`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="bg-white"
                          readOnly
                          value={watch(`items.${index}.total`)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>

              {/* actions */}
              <TableCell className="block md:table-cell">
                <span className="md:hidden font-bold">Actions</span>
                <Button
                  className="bg-red-500 hover:bg-red-700"
                  type="button"
                  onClick={() => {
                    remove(index);
                    calculateTotals();
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Row  */}
      <Button
        className="ml-8 mt-2"
        type="button"
        onClick={() =>
          append({
            itemName: "",
            hsnSac: "",
            qty: 0,
            price: 0,
            discountPercent: 0,
            taxableValue: 0,
            cgstPercent: 0,
            sgstPercent: 0,
            igstPercent: 0,
            total: 0,
          })
        }
      >
        <Plus className="mr-2 h-4 w-4" /> Add Row
      </Button>
    </div>
  );
}
