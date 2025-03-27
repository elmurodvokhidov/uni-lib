"use client";

import { useRouter } from 'next/navigation';
import { Button } from './ui/button'
import Image from 'next/image'
import { useState } from 'react';
import { toast } from 'sonner';
import { borrowBook } from '@/lib/actions/book';

interface Props {
    userId: string;
    bookId: string;
    borrowingEligibility: {
        isEligible: boolean;
        message: string;
    };
}

export default function BorrowBook({
    userId,
    bookId,
    borrowingEligibility: {
        isEligible,
        message,
    }, }: Props) {
    const router = useRouter();
    const [borrowing, setBorrowing] = useState(false);

    const handleBorrow = async () => {
        if (!isEligible) {
            toast.error(message);
        }

        setBorrowing(true);

        try {
            const res = await borrowBook({ bookId, userId });
            if (res.success) {
                toast.success("Book borrowed successfully");
                router.push("/");
            } else {
                toast.error(res.error);
            }
        } catch (error) {
            toast.error("An error occurred while borrowing the book");
        } finally {
            setBorrowing(false);
        }
    }
    return (
        <Button className="book-overview_btn" onClick={handleBorrow} disabled={borrowing}>
            <Image
                src="/icons/book.svg"
                alt="book"
                width={20}
                height={20}
            />

            <p className="font-bebas-neue text-xl text-dark-100">
                {borrowing ? "Borrowing..." : "Borrow Book Request"}
            </p>
        </Button>
    )
}