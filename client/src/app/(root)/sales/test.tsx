"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { Plus, Trash2 } from 'lucide-react'
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { createInvoice } from "@/server-actions/sales/actions"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


type FormValues = {
    date: Date;
    invoiceNumber: string;
    customer: string;
    gstNumber: string;
    billingAddress: string;
    shippingAddress: string;
    items: Array<{
        id: string;
        itemName: string;
        hsnSac: string;
        quantity: number;
        price: number;
        discount: number;
        taxableValue: number;
        cgst: number;
        sgst: number;
        igst: number;
        total: number;
    }>;
    cashDiscount: number;
    subTotal: number;
    grandTotal: number;
};

export default function SalesInvoiceBillMaker() {
    const { register, control, handleSubmit, watch, setValue } = useForm<FormValues>({
        defaultValues: {
            date: new Date(),
            invoiceNumber: "",
            customer: "",
            gstNumber: "",
            billingAddress: "",
            shippingAddress: "",
            items: [{
                id: uuidv4(),
                itemName: "",
                hsnSac: "",
                quantity: 0,
                price: 0,
                discount: 0,
                taxableValue: 0,
                cgst: 0,
                sgst: 0,
                igst: 0,
                total: 0
            }],
            cashDiscount: 0,
            subTotal: 0,
            grandTotal: 0
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    })

    const onSubmit = (formData: FormValues) => {
        console.log(formData);
        createInvoice(formData);
    }

    const calculateItemValues = (index: number) => {
        const items = watch('items')
        const item = items[index]

        const taxableValue = item.quantity * item.price * (1 - item.discount / 100)
        const cgstValue = taxableValue * (item.cgst / 100)
        const sgstValue = taxableValue * (item.sgst / 100)
        const igstValue = taxableValue * (item.igst / 100)
        const total = taxableValue + cgstValue + sgstValue + igstValue

        setValue(`items.${index}.taxableValue`, taxableValue)
        setValue(`items.${index}.total`, total)
    }

    const calculateSubTotal = () => {
        const subTotal = watch('items').reduce((total, item) => total + (item.total || 0), 0);
        setValue('subTotal', subTotal); // Add this line
        return subTotal;
    }

    const calculateGrandTotal = () => {
        const grandTotal = calculateSubTotal() - (watch('cashDiscount') || 0);
        const roundedGrandTotal = Math.round(Math.abs(grandTotal));
        setValue('grandTotal', roundedGrandTotal); // Add this line
        return roundedGrandTotal;
    }

    return (
        <Card className="w-full dark:bg-inherit border-spacing-5 dark:border-gray-600 rounded-xl shadow-lg m-auto p-10">
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-4">
                            <Input type="date" {...register("date")} />
                            <div className="space-y-2 flex items-center">
                                <Label className="w-1/3">Invoice #</Label>
                                <Input {...register("invoiceNumber")} className="w-2/3" />
                            </div>
                            <div className="space-y-2 flex items-center">
                                <Label className="w-1/3">Customer</Label>
                                <Input {...register("customer")} className="w-2/3" />
                            </div>
                            <div className="space-y-2 flex items-center">
                                <Label className="w-1/3">GST #</Label>
                                <Input {...register("gstNumber")} className="w-2/3" />
                            </div>
                        </div>

                        <div className="space-y-2 p-8">
                            <Label>Billing Address</Label>
                            <Textarea {...register("billingAddress")} />
                        </div>
                        <div className="space-y-2 p-8">
                            <Label>Shipping Address</Label>
                            <Textarea {...register("shippingAddress")} />
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted dark:bg-gray-700">
                                <TableHead className="text-foreground dark:text-gray-200">#</TableHead>
                                <TableHead className="text-foreground dark:text-gray-200">Item Name</TableHead>
                                <TableHead className="text-foreground dark:text-gray-200">HSN/SAC</TableHead>
                                <TableHead className="text-foreground dark:text-gray-200">Qty</TableHead>
                                <TableHead className="text-foreground dark:text-gray-200">Price</TableHead>
                                <TableHead className="text-foreground dark:text-gray-200">Discount %</TableHead>
                                <TableHead className="text-foreground dark:text-gray-200">Taxable Value</TableHead>
                                <TableHead className="text-foreground dark:text-gray-200">CGST %</TableHead>
                                <TableHead className="text-foreground dark:text-gray-200">SGST %</TableHead>
                                <TableHead className="text-foreground dark:text-gray-200">IGST %</TableHead>
                                <TableHead className="text-foreground dark:text-gray-200">Total</TableHead>
                                <TableHead className="text-foreground dark:text-gray-200">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {fields.map((field, index) => (
                                <TableRow key={field.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <Input {...register(`items.${index}.itemName`)} />
                                    </TableCell>
                                    <TableCell>
                                        <Input {...register(`items.${index}.hsnSac`)} />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            {...register(`items.${index}.quantity`)}
                                            onChange={(e) => {
                                                register(`items.${index}.quantity`, { valueAsNumber: true }).onChange(e)
                                                calculateItemValues(index)
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            {...register(`items.${index}.price`, { valueAsNumber: true })}
                                            onChange={(e) => {
                                                register(`items.${index}.price`).onChange(e)
                                                calculateItemValues(index)
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            {...register(`items.${index}.discount`, { valueAsNumber: true })}
                                            onChange={(e) => {
                                                register(`items.${index}.discount`).onChange(e)
                                                calculateItemValues(index)
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            value={watch(`items.${index}.taxableValue`)}
                                            readOnly
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            {...register(`items.${index}.cgst`)}
                                            onChange={(e) => {
                                                register(`items.${index}.cgst`).onChange(e)
                                                calculateItemValues(index)
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            {...register(`items.${index}.sgst`)}
                                            onChange={(e) => {
                                                register(`items.${index}.sgst`).onChange(e)
                                                calculateItemValues(index)
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            {...register(`items.${index}.igst`)}
                                            onChange={(e) => {
                                                register(`items.${index}.igst`).onChange(e)
                                                calculateItemValues(index)
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            value={watch(`items.${index}.total`)}
                                            readOnly
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button type="button" onClick={() => remove(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Button
                        type="button"
                        onClick={() => append({
                            id: uuidv4(),
                            itemName: "",
                            hsnSac: "",
                            quantity: 0,
                            price: 0,
                            discount: 0,
                            taxableValue: 0,
                            cgst: 0,
                            sgst: 0,
                            igst: 0,
                            total: 0
                        })}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Row
                    </Button>

                    <div className="space-y-4 flex flex-col w-1/3 ml-auto">
                        <div className="flex justify-between items-center">
                            <Label>Sub Total</Label>
                            <Input type="number" value={calculateSubTotal()} {...register("subTotal")} readOnly />
                        </div>
                        <div className="flex justify-between items-center">
                            <Label>Cash Discount</Label>
                            <Input {...register("cashDiscount", { valueAsNumber: true })} type="number" />
                        </div>
                        <div className="flex justify-between items-center">
                            <Label>Grand Total</Label>
                            <Input type="number" value={calculateGrandTotal()} {...register("grandTotal")} readOnly />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button type="submit" className="w-1/3 p-10 text-xl font-semibold">
                        SUBMIT
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
