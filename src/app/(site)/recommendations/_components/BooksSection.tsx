import React from "react";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

import type { ALL_BOOKS_QUERY_RESULT } from "@/sanity.types";

type Book = ALL_BOOKS_QUERY_RESULT[number];
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
    <div className="flex flex-col gap-6 py-8 md:py-12">
      {/* Title Header with Action Button */}
      <Title heading="Books" className="mb-2">
        <Button
          nativeButton={false}
          variant="outline"
          size="sm"
          render={
            <Link
              className="flex items-center gap-1.5"
              href="/recommendations/books"
            />
          }
        >
          <span>View all books</span>
          <ArrowRight className="size-3.5 shrink-0" />
        </Button>
      </Title>

      {/* Intro Description */}
      <div className="max-w-prose">
        <p className="font-para text-sm text-muted-foreground leading-relaxed">
          Ideas, philosophies, and masterclasses captured in writing. These are
          books that reshaped how I approach software architecture, creative
          thinking, systems design, and personal development.
        </p>
      </div>

      {/* Books Grid */}
      {books.length === 0 ? (
        <div className="flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed border-border p-8 text-center">
          <p className="font-heading text-sm font-medium text-foreground">
            No books found.
          </p>
          <p className="mt-1 font-para text-xs text-muted-foreground">
            Currently updating my bookshelf recommendations.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {displayedBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}

          {/* Last Card: "View All Books" CTA Card matching the grid */}
          <Card className="group relative flex min-h-75 flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-card p-6 text-center shadow-sm transition-all duration-150 hover:border-border/80 hover:shadow-md">
            <div className="flex size-12 items-center justify-center rounded-full border border-border bg-muted">
              <BookOpen className="size-5 text-muted-foreground transition-colors duration-150 group-hover:text-foreground" />
            </div>

            <h4 className="mt-4 font-heading text-base font-semibold text-foreground">
              Explore the Bookshelf
            </h4>

            <p className="mt-1.5 max-w-xs font-para text-sm text-muted-foreground">
              Browse the complete collection of reading recommendations and
              takeaways.
            </p>

            <div className="mt-5">
              <Button
                nativeButton={false}
                variant="default"
                size="sm"
                render={
                  <Link
                    className="flex items-center gap-1.5"
                    href="/recommendations/books"
                  />
                }
              >
                <span>View all books</span>
                <ArrowRight className="size-3.5 shrink-0" />
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BooksSection;
