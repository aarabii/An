"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BookOpen, ExternalLink, Eye } from "lucide-react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import type { Book } from "@/sanity/schemaTypes/bookType";
import { urlFor } from "@/sanity/lib/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className={cn(
          "group/book relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-xl border border-border bg-card/60 transition-all duration-200 hover:border-foreground/25 hover:bg-card/90",
          className
        )}
      >
        {/* Portrait Cover Image Container (compact on mobile, fills column on sm/desktop) */}
        <div className="px-4 pt-4 flex justify-center sm:block">
          <div className="relative aspect-[2/3] w-36 sm:w-full max-h-52 sm:max-h-none overflow-hidden rounded-lg border border-border/50 bg-muted/30 shadow-xs">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={book.coverImage?.alt || book.title}
                fill
                sizes="(min-width: 640px) 340px, 150px"
                className="object-cover object-center transition-transform duration-300 ease-out group-hover/book:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center font-mono text-xs text-muted-foreground">
                <BookOpen className="size-6 stroke-[1.5]" />
                <span>No cover image</span>
              </div>
            )}

            {/* Subtle hover overlay hint */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover/book:opacity-100">
              <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-background/80 px-2.5 py-1 font-mono text-[0.625rem] text-foreground shadow-md backdrop-blur-sm">
                <Eye className="size-3" /> Preview
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <CardHeader className="gap-1 px-4 pt-3 pb-2 text-center sm:text-left">
          <CardTitle className="line-clamp-2 text-sm font-semibold tracking-tight text-foreground transition-colors group-hover/book:text-primary sm:text-base">
            {book.title}
          </CardTitle>
        </CardHeader>

        {/* Brief preview */}
        {book.description && (
          <CardContent className="px-4 pb-3">
            <CardDescription className="line-clamp-2 text-xs/relaxed text-muted-foreground text-center sm:text-left">
              {book.description}
            </CardDescription>
          </CardContent>
        )}

        {/* Footer: Read Book Link Button */}
        <CardFooter className="mt-auto border-t border-border/40 px-4 py-3">
          <div className="flex w-full items-center justify-between gap-2">
            <Button
              nativeButton={false}
              variant="outline"
              size="sm"
              className="w-full justify-between rounded-md group-hover/book:border-foreground/30 font-mono text-xs"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              render={
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read ${book.title}`}
                />
              }
            >
              <span>Read this book</span>
              <FaArrowUpRightFromSquare
                data-icon="inline-end"
                className="size-3 text-muted-foreground transition-transform duration-200 group-hover/book:translate-x-0.5 group-hover/book:-translate-y-0.5 group-hover/book:text-foreground"
              />
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Floating Spacious Split Detail Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[calc(100%-2.5rem)] sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[85vh] overflow-y-auto border-border/80 bg-card/95 p-5 sm:p-7 md:p-8 backdrop-blur-2xl shadow-2xl rounded-2xl ring-1 ring-white/10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 items-start">
            {/* Left Column: Portrait Book Cover & Read CTA */}
            <div className="flex flex-col items-center gap-4 md:col-span-5 shrink-0">
              <div className="relative aspect-[2/3] w-36 sm:w-44 md:w-full max-w-[220px] overflow-hidden rounded-xl border border-border/60 bg-muted/40 shadow-xl mx-auto">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={book.coverImage?.alt || book.title}
                    fill
                    sizes="(min-width: 768px) 240px, 160px"
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
                className="w-full max-w-[220px] gap-2 rounded-md font-mono text-xs"
                render={
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <span>Read / Purchase</span>
                <ExternalLink className="size-3.5" />
              </Button>
            </div>

            {/* Right Column: Title, Metadata, and Full Unclamped Description */}
            <div className="flex flex-col justify-between gap-5 md:col-span-7 min-w-0">
              <div className="flex flex-col gap-3">
                <DialogHeader className="gap-1.5 text-left">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
                    Book Recommendation
                  </span>
                  <DialogTitle className="font-heading text-lg font-bold sm:text-2xl leading-snug text-foreground">
                    {book.title}
                  </DialogTitle>
                </DialogHeader>

                {/* Full description without height clamp so all text is shown */}
                <div className="font-para text-xs/relaxed sm:text-sm/relaxed text-muted-foreground whitespace-pre-line leading-relaxed">
                  {book.description}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border/40 pt-4 font-mono text-[0.6875rem] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="size-3.5" /> Recommended Reading
                </span>
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4 text-foreground/80 hover:text-foreground"
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
