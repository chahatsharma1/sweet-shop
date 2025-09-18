import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { AlertCircle } from 'lucide-react';

const formSchema = z.object({
    name: z.string()
        .min(2, { message: "Name must be at least 2 characters." })
        .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces." }),
    category: z.string()
        .min(2, { message: "Category must be at least 2 characters." })
        .regex(/^[a-zA-Z\s]+$/, { message: "Category can only contain letters and spaces." }),
    price: z.coerce.number().positive({ message: "Price must be greater than zero." }),
    quantity: z.coerce.number().int().min(0, { message: "Quantity must be a positive integer." }),
});

export const SweetForm = ({ initialData, onSubmit }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            category: "",
            price: 0,
            quantity: 0,
        },
    });

    const { formState: { errors } } = form;
    const errorList = Object.values(errors);

    useEffect(() => {
        form.reset(initialData || { name: "", category: "", price: 0, quantity: 0 });
    }, [initialData, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sweet Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Kaju Katli" {...field} required />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Barfi" {...field} required />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price (₹)</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" {...field} required />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} required />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {errorList.length > 0 && (
                    <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md space-y-1">
                        {errorList.map((error) => (
                            <div key={error.message} className="flex items-center gap-2 font-medium">
                                <AlertCircle className="h-4 w-4" />
                                <p>{error.message}</p>
                            </div>
                        ))}
                    </div>
                )}

                <Button type="submit" className="w-full">
                    {initialData ? 'Update Sweet' : 'Add Sweet'}
                </Button>
            </form>
        </Form>
    );
};