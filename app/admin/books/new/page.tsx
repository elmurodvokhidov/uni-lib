import { Button } from "@/components/ui/button";
import Link from "next/link";
import BookForm from "../../forms/BookForm";

export default function page() {
    return (
        <>
            <Button className="back-btn" asChild>
                <Link href="/admin/books">
                    Go Back
                </Link>
            </Button>

            <section className="w-full max-w-2xl">
                <BookForm />
            </section>
        </>
    )
}