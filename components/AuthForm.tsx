"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultValues, FieldValues, SubmitHandler, useForm, UseFormReturn } from "react-hook-form"
import { z, ZodType } from "zod"

interface Props<T extends FieldValues> {
    schema: ZodType<T>;
    defaultValues: T;
    onSubmit: (data: T) => Promise<{ success: boolean, error?: string }>;
    type: 'SIGN_IN' | 'SIGN_UP';
}

export default function AuthForm<T extends FieldValues>({
    type,
    schema,
    defaultValues,
    onSubmit,
}: Props<T>) {
    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>,
    })

    const handleSubmit: SubmitHandler<T> = async (data) => {
        console.log(data);
    }

    return (
        <div>AuthForm -- {type}</div>
    )
}