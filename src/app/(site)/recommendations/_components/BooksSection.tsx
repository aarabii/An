import React from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { FaArrowRight } from "react-icons/fa6";

import type { Book } from "@/sanity/schemaTypes/bookType";
import { Title } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookCard } from "@/components/cards";

interface BooksSectionProps {
  books: Book[];
}

export const BooksSection: React.FC<BooksSectionProps> = ({ books }) => {
  // Show at most 5 books on the recommendations overview page
  const displayedBooks = books.slice(0, 5);

  return (
    <div className="flex flex-col gap-4 py-4 sm:py-6">
      {/* Title Header with Action Button */}
      <Title heading="Books">
        <Button
          nativeButton={false}
          variant="outline"
          size="sm"
          className="gap-1.5 font-mono text-xs rounded-md"
          render={<Link href="/recommendations/books" />}
        >
          <span>View all books</span>
          <FaArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
      </Title>

      {/* Intro Description */}
      <div className="px-5 py-2 sm:px-8 md:px-10">
        <p className="font-para text-xs/relaxed sm:text-sm text-muted-foreground">
          Ideas, philosophies, and masterclasses captured in writing. These are books
          that reshaped how I approach software architecture, creative thinking,
          systems design, and personal development.
        </p>
      </div>

      {/* Books Grid */}
      {books.length === 0 ? (
        <div className="mx-5 my-4 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center sm:mx-8 md:mx-10">
          <p className="font-heading text-sm font-medium text-foreground">
            No books found.
          </p>
          <p className="mt-1 font-para text-xs text-muted-foreground">
            Currently updating my bookshelf recommendations.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 px-5 pb-8 sm:grid-cols-2 sm:gap-6 sm:px-8 md:px-10 sm:pb-12">
          {displayedBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}

          {/* Last Card: "View All Books" CTA Card matching the grid */}
          <Card className="group relative flex min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-card/40 p-6 text-center transition-all duration-300 hover:border-foreground/40 hover:bg-card/70">
            <div className="flex size-12 items-center justify-center rounded-full border border-border bg-secondary/50 transition-transform duration-300 group-hover:scale-110">
              <BookOpen className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
            </div>

            <h4 className="mt-3 font-heading text-base font-semibold text-foreground sm:text-lg">
              Explore the Bookshelf
            </h4>

            <p className="mt-1 max-w-xs font-para text-xs text-muted-foreground">
              Browse the complete collection of reading recommendations and takeaways.
            </p>

            <div className="mt-4">
              <Button
                nativeButton={false}
                variant="default"
                size="sm"
                className="gap-2 rounded-md font-mono text-xs"
                render={<Link href="/recommendations/books" />}
              >
                <span>View all books</span>
                <FaArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BooksSection;
