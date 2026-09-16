import type { Metadata } from "next";

import { Container, PageNav, Title } from "@/components/common";
import RepeatSeparator from "@/components/ui/repeat-separator";
import { getAllBooks } from "@/sanity/lib/queries";
import { BookCard } from "@/components/cards";

export const metadata: Metadata = {
  title: "Bookshelf | Aarab Nishchal",
  description:
    "Curated collection of books, essays, and written works that shaped my thinking across software engineering, architecture, design, and philosophy.",
};

export default async function BooksPage() {
  const books = await getAllBooks();

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs Navigation */}
      <PageNav
        items={[
          { label: "Home", href: "/" },
          { label: "Recommendations", href: "/recommendations" },
          { label: "Books" },
        ]}
      />

      <RepeatSeparator />

      {/* Main Container */}
      <Container id="books-archive" className="py-4 sm:py-6">
        <Title heading="Bookshelf" />

        <div className="px-5 py-4 sm:px-8 md:px-10 sm:py-6">
          <p className="font-para text-xs/relaxed sm:text-sm text-muted-foreground">
            A personal library of influential reading. Click any book card to inspect
            a full synopsis, chapter takeaways, and source links.
          </p>
        </div>

        {/* Books 2x Grid */}
        {books.length === 0 ? (
          <div className="mx-5 my-4 flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center sm:mx-8 md:mx-10 sm:p-12">
            <p className="font-heading text-base font-medium text-foreground">
              No books cataloged yet.
            </p>
            <p className="mt-1 font-para text-xs text-muted-foreground">
              Books are currently being curated and will appear here shortly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 px-5 pb-12 sm:grid-cols-2 sm:gap-6 sm:px-8 md:px-10 sm:pb-16">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
