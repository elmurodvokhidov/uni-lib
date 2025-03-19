import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import "@/styles/admin.css";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

export default async function layout({ children }: { children: ReactNode }) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/sign-in");
    }

    return (
        <main className="flex min-h-screen w-full flex-row">
            <Sidebar session={session} />

            <div className="admin-container">
                <Header session={session} />
                {children}
            </div>
        </main>
    )
}