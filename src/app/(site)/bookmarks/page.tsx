import type { Metadata } from "next";
import { FaBookmark, FaArrowUpRightFromSquare } from "react-icons/fa6";

import { Container, PageNav, Title } from "@/components/common";
import RepeatSeparator from "@/components/ui/repeat-separator";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllBookmarks } from "@/sanity/lib/queries";
import type { Bookmark } from "@/sanity/schemaTypes/bookmarkType";

export const metadata: Metadata = {
  title: "Bookmarks | Aarab Nishchal",
  description:
    "A collection of things I've found while wandering around the internet. Some were useful, some were interesting, and some just made me think, \"I'm definitely coming back to this.\"",
};

export default async function BookmarksPage() {
  const bookmarks = await getAllBookmarks();

  return (
    <div className="min-h-screen">
      {/* Top Breadcrumb Navigation */}
      <PageNav />

      {/* RepeatSeparator on top of Title */}
      <RepeatSeparator />

      {/* Main Content Container */}
      <Container id="bookmarks" className="py-6 sm:py-8">
        <Title heading="Things I didn't want to lose" />

        <div className="px-5 py-4 sm:px-8 sm:py-6">
          <p className="font-para text-xs/relaxed sm:text-sm text-muted-foreground">
            A collection of things I&apos;ve found while wandering around the
            internet. Some were useful, some were interesting, and some just
            made me think, &ldquo;I&apos;m definitely coming back to
            this.&rdquo;
          </p>
        </div>

        {bookmarks.length === 0 ? (
          <EmptyBookmarks />
        ) : (
          <div className="flex flex-col gap-3 px-5 pb-8 sm:gap-4 sm:px-8 sm:pb-12">
            {bookmarks.map((bookmark) => (
              <BookmarkCard key={bookmark._id} bookmark={bookmark} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

function EmptyBookmarks() {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center p-8 text-center sm:p-12">
      <h2 className="font-heading text-lg font-medium text-foreground">
        No bookmarks.
      </h2>
      <p className="mt-1 font-para text-xs text-muted-foreground">
        Either I&apos;ve found nothing interesting, or I&apos;ve forgotten to
        save it.
      </p>
    </div>
  );
}

function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  return (
    <Card className="group relative flex w-full flex-row items-start sm:items-center gap-4 rounded-lg border border-border bg-card/60 p-4 transition-all duration-200 hover:border-foreground/25 hover:bg-card/90 sm:p-5">
      {/* Clickable Overlay Link */}
      <a
        href={bookmark.link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10 rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={`Open ${bookmark.title} in a new tab`}
      >
        <span className="sr-only">{bookmark.title}</span>
      </a>

      {/* Bookmark Icon Box */}
      <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-secondary/50 transition-colors duration-200 group-hover:border-foreground/20 group-hover:bg-secondary">
        <FaBookmark className="size-4 text-muted-foreground transition-colors duration-200 group-hover:text-foreground" />
      </div>

      {/* Middle Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-1 sm:gap-1.5">
        <h3 className="font-heading text-sm font-medium tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-base">
          {bookmark.title}
        </h3>

        {bookmark.description && (
          <p className="line-clamp-2 font-para text-xs leading-relaxed text-muted-foreground">
            {bookmark.description}
          </p>
        )}

        {bookmark.tags && bookmark.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {bookmark.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="font-mono text-[0.625rem] text-muted-foreground transition-colors group-hover:text-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Right Side: External Arrow Icon */}
      <div className="shrink-0 self-center pl-1 sm:pl-2">
        <FaArrowUpRightFromSquare className="size-3.5 text-muted-foreground/50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
      </div>
    </Card>
  );
}
