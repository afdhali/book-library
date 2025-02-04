import BookLists from "@/components/BookLists";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants/datadummy";

export default function Home() {
  return (
    <>
      <BookOverview {...(sampleBooks[0] as unknown as Book)} />
      <BookLists
        title="Latest Book"
        books={sampleBooks.slice(1) as unknown as Book[]}
        containerClassName="mt-28"
      />
    </>
  );
}
