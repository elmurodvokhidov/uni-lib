import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  const lastestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      <BookOverview
        {...lastestBooks[0]}
        userId={session?.user?.id as string}
      />

      <BookList
        title="Latest Books"
        books={lastestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
}