"use client";

import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export default function InvoiceRightSection({ control }) {
    return (

        // <div className="space-y-4">

        <>
            <FormField
                control={control}
                name="billingAddress"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="font-bold">Billing Address</FormLabel>
                        <FormControl>
                            <Textarea {...field} placeholder="Enter billing address" className="h-[138px] bg-white" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="shippingAddress"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="font-bold">Shipping Address</FormLabel>
                        <FormControl>
                            <Textarea {...field} placeholder="Enter shipping address" className="h-[138px] bg-white" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
        // </div>
    );
}
