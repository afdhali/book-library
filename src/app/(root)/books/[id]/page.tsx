import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants/datadummy";
import { db } from "@/db";
import { books } from "@/db/schema";
import { authOptions } from "@/lib/auth.config";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  // const [bookDetails] = sampleBooks.filter((book) => book.id === Number(id));
  const session = await getServerSession(authOptions);
  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);
  if (!bookDetails) redirect("/404");
  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />

      <div className="book0details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>
            <div className="space-y-5 text-xl text-light-100">
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Page;
