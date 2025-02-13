import BookCard from "./BookCard";

interface Props {
    title: string;
    books: Book[];
    isBorrowed?: boolean;
    containerClassName?: string;
    showSorts?: boolean;
    showNoResultBtn?: boolean;
}

export default function BookList({
    title,
    books,
    isBorrowed,
    containerClassName,
    showSorts = false,
    showNoResultBtn = false,
}: Props) {
    return (
        <section className={containerClassName}>
            <h2 className="font-bebas-neue text-4xl text-light-100">
                {title}
            </h2>

            <ul className="book-list">
                {books.map((book, index) => (
                    <BookCard key={index} {...book} />
                ))}
            </ul>
        </section>
    )
}