"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { bookSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props extends Partial<Book> {
    type?: "create" | "update";
}

export default function BookForm({ type, ...book }: Props) {
    const form = useForm<z.infer<typeof bookSchema>>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: book.title || "",
            author: book.author || "",
            genre: book.genre || "",
            rating: book.rating || 1,
            totalCopies: book.totalCopies || 1,
            coverUrl: book.coverUrl || "",
            coverColor: book.coverColor || "#012B48",
            description: book.description || "",
            videoUrl: book.videoUrl || "",
            summary: book.summary || "",
        },
    });

    async function onSubmit(values: z.infer<typeof bookSchema>) { }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Book Title
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter the book title"
                                    {...field}
                                    className="book-form_input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Author
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter the author name"
                                    {...field}
                                    className="book-form_input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Genre
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter the genre of the book"
                                    {...field}
                                    className="book-form_input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-8 lg:flex-row">
                    <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                            <FormItem className="flex flex-1 flex-col gap-1">
                                <FormLabel className="text-base font-normal text-dark-500">
                                    Rating
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter the rating of the book"
                                        {...field}
                                        className="book-form_input"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="totalCopies"
                        render={({ field }) => (
                            <FormItem className="flex flex-1 flex-col gap-1">
                                <FormLabel className="text-base font-normal text-dark-500">
                                    Total number of books
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter the total number of books"
                                        {...field}
                                        className="book-form_input"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="coverUrl"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Book Image
                            </FormLabel>
                            <FormControl>
                                FileUpload
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="coverColor"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Book Primary Color
                            </FormLabel>
                            <FormControl>
                                ColorPicker
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Book Description
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Write a brief description of the book"
                                    {...field}
                                    rows={10}
                                    className="book-form_input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="videoUrl"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Book Video
                            </FormLabel>
                            <FormControl>
                                FileUpload
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Book Summary
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Write a brief summary of the book"
                                    {...field}
                                    rows={10}
                                    className="book-form_input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="book-form_btn">
                    {type === "create" ? "Add Book" : "Update Book"}
                </Button>
            </form>
        </Form>
    )
}