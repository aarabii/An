"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BookOpen, ExternalLink, Eye } from "lucide-react";

import type { ALL_BOOKS_QUERY_RESULT } from "@/sanity.types";

export type Book = ALL_BOOKS_QUERY_RESULT[number];
import { urlFor } from "@/sanity/lib/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: Book;
  className?: string;
}

export const BookCard: React.FC<BookCardProps> = ({ book, className }) => {
  const [open, setOpen] = useState(false);

  const imageUrl =
    typeof book.coverImage === "string"
      ? book.coverImage
      : book.coverImage?.asset
        ? urlFor(book.coverImage).width(600).height(900).quality(90).url()
        : null;

  const lqip =
    typeof book.coverImage === "object" && book.coverImage !== null
      ? (book.coverImage as any)?.asset?.metadata?.lqip
      : null;

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className={cn(
          "group/book relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-150 hover:border-border/80 hover:shadow-md",
          className,
        )}
      >
        <div className="flex flex-col gap-4">
          {/* Portrait Cover Image Container */}
          <div className="flex justify-center">
            <div className="relative aspect-2/3 w-36 sm:w-full max-h-56 overflow-hidden rounded-md border border-border bg-muted/30">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={book.coverImage?.alt || book.title}
                  fill
                  sizes="(min-width: 640px) 340px, 150px"
                  placeholder={lqip ? "blur" : "empty"}
                  blurDataURL={lqip || undefined}
                  className="object-cover object-center"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center font-mono text-xs text-muted-foreground">
                  <BookOpen className="size-6 stroke-[1.5]" />
                  <span>No cover image</span>
                </div>
              )}

              {/* Subtle hover overlay hint */}
              <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-xs transition-opacity duration-150 group-hover/book:opacity-100">
                <span className="flex items-center gap-1.5 rounded-sm border border-border bg-background px-2.5 py-1 font-mono text-xs text-foreground shadow-sm">
                  <Eye className="size-3.5" /> Preview
                </span>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="min-w-0">
            <h3 className="line-clamp-2 font-heading text-base font-semibold leading-snug tracking-tight text-foreground md:text-lg">
              {book.title}
            </h3>
          </div>

          {/* Brief preview */}
          {book.description && (
            <p className="line-clamp-2 font-para text-sm leading-relaxed text-muted-foreground">
              {book.description}
            </p>
          )}
        </div>

        {/* Footer: Read Book Link Button */}
        <div className="mt-6 border-t border-border pt-4">
          <Button
            nativeButton={false}
            variant="outline"
            size="sm"
            className="w-full justify-between"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            render={
              <a
                href={book.link || undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read ${book.title}`}
              />
            }
          >
            <span>Read this book</span>
            <ExternalLink className="size-4" />
          </Button>
        </div>
      </Card>

      {/* Floating Split Detail Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-h-[85vh] overflow-y-auto rounded-lg border border-border bg-popover p-6 text-popover-foreground shadow-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 items-start">
            {/* Left Column: Portrait Book Cover & Read CTA */}
            <div className="flex flex-col items-center gap-4 md:col-span-5 shrink-0">
              <div className="relative aspect-2/3 w-36 sm:w-44 md:w-full max-w-55 overflow-hidden rounded-md border border-border bg-muted/40 shadow-sm mx-auto">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={book.coverImage?.alt || book.title}
                    fill
                    sizes="(min-width: 768px) 240px, 160px"
                    placeholder={lqip ? "blur" : "empty"}
                    blurDataURL={lqip || undefined}
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-mono text-xs text-muted-foreground">
                    No cover image
                  </div>
                )}
              </div>

              <Button
                nativeButton={false}
                variant="default"
                size="default"
                className="w-full max-w-55 gap-2"
                render={
                  <a
                    href={book.link || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <span>Read / Purchase</span>
                <ExternalLink className="size-4" />
              </Button>
            </div>

            {/* Right Column: Title, Metadata, and Full Unclamped Description */}
            <div className="flex flex-col justify-between gap-5 md:col-span-7 min-w-0">
              <div className="flex flex-col gap-3">
                <DialogHeader className="gap-1.5 text-left p-0">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Book Recommendation
                  </span>
                  <DialogTitle className="font-heading text-xl md:text-2xl font-semibold leading-snug text-foreground">
                    {book.title}
                  </DialogTitle>
                </DialogHeader>

                {/* Full description without height clamp so all text is shown */}
                <div className="font-para text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                  {book.description}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4 font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="size-4" /> Recommended Reading
                </span>
                <a
                  href={book.link || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm hover:underline underline-offset-4 text-foreground/80 hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Visit Source &rarr;
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookCard;
