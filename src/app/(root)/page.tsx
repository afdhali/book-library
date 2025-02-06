import BookLists from "@/components/BookLists";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants/datadummy";
import { db } from "@/db";
import { books } from "@/db/schema";
import { authOptions } from "@/lib/auth.config";
import { desc } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];
  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />
      <BookLists
        title="Latest Book"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
}
