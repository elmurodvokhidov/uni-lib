"use client";

import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validations";

export default function page() {
    return <AuthForm
        type='SIGN_UP'
        schema={signUpSchema}
        defaultValues={{
            email: "",
            password: "",
            fullName: "",
            universityId: "",
            universityCard: "",
        }}
        onSubmit={signUp}
    />
}