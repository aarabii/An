import type { Metadata } from "next";

import { Container, PageNav, JsonLd, Title } from "@/components/common";

import RepeatSeparator from "@/components/ui/repeat-separator";
import { getAllBooks } from "@/sanity/lib/queries";
import { BookCard } from "@/components/cards";
import {
  PAGE_SEO,
  createPageMetadata,
  getCollectionPageJsonLd,
  getBreadcrumbJsonLd,
} from "@/constant";

export const metadata: Metadata = createPageMetadata(
  PAGE_SEO.recommendationsBooks,
);

export default async function BooksPage() {
  const books = await getAllBooks();

  const jsonLd = [
    getCollectionPageJsonLd(
      PAGE_SEO.recommendationsBooks.title,
      PAGE_SEO.recommendationsBooks.description,
      PAGE_SEO.recommendationsBooks.path,
    ),
    getBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Recommendations", url: "/recommendations" },
      { name: "Books", url: "/recommendations/books" },
    ]),
  ];

  return (
    <div className="min-h-screen">
      <JsonLd data={jsonLd} />
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
      <Container id="books-archive">
        <Title as="h1" heading="Bookshelf" />

        <div className="max-w-prose mb-8 md:mb-12">
          <p className="font-para text-sm text-muted-foreground leading-relaxed">
            A personal library of influential reading. Click any book card to
            inspect a full synopsis, chapter takeaways, and source links.
          </p>
        </div>

        {/* Books 2x Grid */}
        {books.length === 0 ? (
          <div className="flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed border-border p-8 text-center sm:p-12">
            <p className="font-heading text-base font-medium text-foreground">
              No books cataloged yet.
            </p>
            <p className="mt-1 font-para text-sm text-muted-foreground">
              Books are currently being curated and will appear here shortly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
