import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";

export default function Home() {
  return (
    <>
      <BookOverview />
      <BookList />
    </>
  );
}