import { auth } from "@/auth";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
    const session = await auth();

    if (!session) {
        redirect("/sign-in");
    }

    return (
        <main className="root-container">
            <div className="mx-auto max-w-7xl">
                <Header session={session} />

                <div className="mt-20 pb-20">
                    {children}
                </div>
            </div>
        </main>
    )
}