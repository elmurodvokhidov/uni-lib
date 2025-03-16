"use client";

import AuthForm from "@/components/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validations";

export default function page() {
    return <AuthForm
        type='SIGN_IN'
        schema={signInSchema}
        defaultValues={{
            email: "",
            password: "",
        }}
        onSubmit={signInWithCredentials}
    />
}