import Link from "next/link";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

export default function BookCard({
    id,
    title,
    genre,
    coverColor,
    coverUrl,
}: Book) {
    const isLoanedBook = false;

    return (
        <li className={cn(isLoanedBook && "xs:w-52 w-full")}>
            <Link href={`/books/${id}`} className={cn(isLoanedBook && "xs:w-52 w-full flex flex-col items-center")}>
                <BookCover
                    coverColor={coverColor}
                    coverUrl={coverUrl}
                />

                <div className={cn(!isLoanedBook && "xs:max-w-40 max-w-28", "mt-4")}>
                    <p className="book-title">{title}</p>
                    <p className="book-genre">{genre}</p>
                </div>

                {isLoanedBook && (
                    <div className="mt-3 w-full">
                        <div className="book-loaned">
                            <Image
                                src="/icons/book.svg"
                                alt="book"
                                width={20}
                                height={20}
                                className="object-contain"
                            />

                            <p className="text-light-100">
                                11 days left to return
                            </p>
                        </div>

                        <Button className="book-btn">
                            Download receipt
                        </Button>
                    </div>
                )}
            </Link>
        </li>
    )
}