"use client"

import { useState } from "react"
import { Plus, Trash2 } from 'lucide-react'
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface InvoiceItem {
  id: string
  itemName: string
  quantity: number
  price: number
  discount: number
  taxableValue: number
  gst: number
  gstValue: number
  total: number
}

export default function SalesInvoiceBillMaker() {
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: uuidv4(), itemName: "", quantity: 0, price: 0, discount: 0, taxableValue: 0, gst: 0, gstValue: 0, total: 0 },
  ])

  const addRow = () => {
    setItems([...items, { id: uuidv4(), itemName: "", quantity: 0, price: 0, discount: 0, taxableValue: 0, gst: 0, gstValue: 0, total: 0 }])
  }

  const removeRow = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: field === "itemName" ? value : Number(value) }
          updatedItem.taxableValue = updatedItem.quantity * updatedItem.price * (1 - updatedItem.discount / 100)
          updatedItem.gstValue = updatedItem.taxableValue * (updatedItem.gst / 100)
          updatedItem.total = updatedItem.taxableValue + updatedItem.gstValue
          return updatedItem
        }
        return item
      })
    )
  }

  const calculateSubTotal = () => {
    return items.reduce((total, item) => total + item.total, 0)
  }

  const [cashDiscount, setCashDiscount] = useState(0)
  const [amountPaid, setAmountPaid] = useState(0)

  const calculateGrandTotal = () => {
    return calculateSubTotal() - cashDiscount
  }

  return (
    <Card className="w-full dark:bg-inherit border-spacing-5 dark:border-gray-600 rounded-xl shadow-lg m-auto p-10  max-h-[90vh] overflow-y-auto">
      <CardContent className="space-y-6">
        <form className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-4">
              <div className="space-y-2 flex items-center">
                <Label htmlFor="invoice_no" className="text-foreground dark:text-gray-200 w-1/3">Invoice #</Label>
                <Input type="text" placeholder="Enter Invoice Number" className="bg-background dark:bg-gray-700 dark:text-gray-100 p-5 rounded-xl w-2/3" />
              </div>
              <div className="space-y-2 flex items-center">
                <Label htmlFor="invoice_no" className="text-foreground dark:text-gray-200 w-1/3">Customer</Label>
                <Input type="text" placeholder="Enter Invoice Number" className="bg-background dark:bg-gray-700 dark:text-gray-100 p-5 rounded-xl w-2/3" />
              </div>
              <div className="space-y-2 flex items-center">
                <Label htmlFor="invoice_no" className="text-foreground dark:text-gray-200 w-1/3">GST #</Label>
                <Input type="text" placeholder="Enter Invoice Number" className="bg-background dark:bg-gray-700 dark:text-gray-100 p-5 rounded-xl w-2/3" />
              </div>
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="salesman" className="text-foreground dark:text-gray-200">Salesman Name</Label>
              <Input type="text" id="salesman" name="salesman" placeholder="Enter Salesman Name" className="bg-background dark:bg-gray-700 dark:text-gray-100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date" className="text-foreground dark:text-gray-200">Date</Label>
              <Input type="date" id="date" name="date" className="bg-background dark:bg-gray-700 dark:text-gray-100" />
            </div> */}


            <div className="space-y-2">
              <Label htmlFor="billing_address" className="text-foreground dark:text-gray-200">Billing Address</Label>
              <Textarea id="billing_address" name="billing_address" placeholder="Enter Billing Address" className="rounded-xl p-5 bg-background dark:bg-gray-700 dark:text-gray-100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shipping_address" className="text-foreground dark:text-gray-200">Shipping Address</Label>
              <Textarea id="shipping_address" name="shipping_address" placeholder="Enter Shipping Address" className="rounded-xl p-5 bg-background dark:bg-gray-700 dark:text-gray-100" />
            </div>
          </div>



          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted dark:bg-gray-700">
                  <TableHead className="text-foreground dark:text-gray-200">#</TableHead>
                  <TableHead className="text-foreground dark:text-gray-200">Item Name</TableHead>
                  <TableHead className="text-foreground dark:text-gray-200">Qty</TableHead>
                  <TableHead className="text-foreground dark:text-gray-200">Price</TableHead>
                  <TableHead className="text-foreground dark:text-gray-200">Discount %</TableHead>
                  <TableHead className="text-foreground dark:text-gray-200">Taxable Value</TableHead>
                  <TableHead className="text-foreground dark:text-gray-200">GST %</TableHead>
                  <TableHead className="text-foreground dark:text-gray-200">GST Value</TableHead>
                  <TableHead className="text-foreground dark:text-gray-200">Total</TableHead>
                  <TableHead className="text-foreground dark:text-gray-200">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={item.id} className="border-b dark:border-gray-700">
                    <TableCell className="text-foreground dark:text-gray-300">{index + 1}</TableCell>
                    <TableCell><Input type="text" value={item.itemName} onChange={(e) => updateItem(item.id, "itemName", e.target.value)} className="bg-background dark:bg-gray-700 dark:text-gray-100" /></TableCell>
                    <TableCell><Input type="number" value={item.quantity} onChange={(e) => updateItem(item.id, "quantity", e.target.value)} className="bg-background dark:bg-gray-700 dark:text-gray-100" /></TableCell>
                    <TableCell><Input type="number" value={item.price} onChange={(e) => updateItem(item.id, "price", e.target.value)} className="bg-background dark:bg-gray-700 dark:text-gray-100" /></TableCell>
                    <TableCell><Input type="number" value={item.discount} onChange={(e) => updateItem(item.id, "discount", e.target.value)} className="bg-background dark:bg-gray-700 dark:text-gray-100" /></TableCell>
                    <TableCell><Input type="number" value={item.taxableValue.toFixed(2)} readOnly className="bg-muted dark:bg-gray-600 dark:text-gray-300" /></TableCell>
                    <TableCell><Input type="number" value={item.gst} onChange={(e) => updateItem(item.id, "gst", e.target.value)} className="bg-background dark:bg-gray-700 dark:text-gray-100" /></TableCell>
                    <TableCell><Input type="number" value={item.gstValue.toFixed(2)} readOnly className="bg-muted dark:bg-gray-600 dark:text-gray-300" /></TableCell>
                    <TableCell><Input type="number" value={item.total.toFixed(2)} readOnly className="bg-muted dark:bg-gray-600 dark:text-gray-300" /></TableCell>
                    <TableCell>
                      <Button variant="destructive" size="icon" onClick={() => removeRow(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex gap-2">
            <Button type="button" onClick={addRow} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" /> Add Row
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-foreground dark:text-gray-200 font-medium">Sub Total</Label>
              <Input type="number" value={calculateSubTotal().toFixed(2)} readOnly className="w-1/3 bg-muted dark:bg-gray-600 dark:text-gray-300" />
            </div>
            <div className="flex justify-between items-center">
              <Label className="text-foreground dark:text-gray-200 font-medium">Cash Discount</Label>
              <Input type="number" value={cashDiscount} onChange={(e) => setCashDiscount(Number(e.target.value))} className="w-1/3 bg-background dark:bg-gray-700 dark:text-gray-100" />
            </div>
            <div className="flex justify-between items-center">
              <Label className="text-foreground dark:text-gray-200 font-medium">Grand Total</Label>
              <Input type="number" value={calculateGrandTotal().toFixed(2)} readOnly className="w-1/3 bg-muted dark:bg-gray-600 dark:text-gray-300" />
            </div>
            <div className="flex justify-between items-center">
              <Label className="text-foreground dark:text-gray-200 font-medium">Amount Paid</Label>
              <Input type="number" value={amountPaid} onChange={(e) => setAmountPaid(Number(e.target.value))} className="w-1/3 bg-background dark:bg-gray-700 dark:text-gray-100" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Submit Data to Database</Button>
      </CardFooter>
    </Card>
  )
}

