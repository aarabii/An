import type { Metadata } from "next";
import { Bookmark as BookmarkIcon, ExternalLink } from "lucide-react";

import { Container, PageNav, JsonLd, Title } from "@/components/common";

import RepeatSeparator from "@/components/ui/repeat-separator";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllBookmarks } from "@/sanity/lib/queries";
import type { ALL_BOOKMARKS_QUERY_RESULT } from "@/sanity.types";
import {
  PAGE_SEO,
  createPageMetadata,
  getCollectionPageJsonLd,
  getBreadcrumbJsonLd,
} from "@/constant";

type Bookmark = ALL_BOOKMARKS_QUERY_RESULT[number];

export const metadata: Metadata = createPageMetadata(PAGE_SEO.bookmarks);

export default async function BookmarksPage() {
  const bookmarks = await getAllBookmarks();

  const jsonLd = [
    getCollectionPageJsonLd(
      PAGE_SEO.bookmarks.title,
      PAGE_SEO.bookmarks.description,
      PAGE_SEO.bookmarks.path,
    ),
    getBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Bookmarks", url: "/bookmarks" },
    ]),
  ];

  return (
    <div className="min-h-screen">
      <JsonLd data={jsonLd} />
      {/* Top Breadcrumb Navigation */}
      <PageNav />

      {/* RepeatSeparator on top of Title */}
      <RepeatSeparator />

      {/* Main Content Container */}
      <Container id="bookmarks">
        <Title as="h1" heading="Things I didn't want to lose" />

        <div className="max-w-prose mb-8 md:mb-12">
          <p className="font-para text-sm text-muted-foreground leading-relaxed">
            A collection of things I&apos;ve found while wandering around the
            internet. Some were useful, some were interesting, and some just
            made me think, &ldquo;I&apos;m definitely coming back to
            this.&rdquo;
          </p>
        </div>

        {bookmarks.length === 0 ? (
          <EmptyBookmarks />
        ) : (
          <div className="flex flex-col gap-4">
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
      <p className="mt-1 font-para text-sm text-muted-foreground">
        Either I&apos;ve found nothing interesting, or I&apos;ve forgotten to
        save it.
      </p>
    </div>
  );
}

function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  return (
    <Card className="group relative flex w-full flex-row items-start sm:items-center gap-4 rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-150 hover:border-border/80 hover:shadow-md">
      {/* Clickable Overlay Link */}
      <a
        href={bookmark.link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Open ${bookmark.title} in a new tab`}
      >
        <span className="sr-only">{bookmark.title}</span>
      </a>

      {/* Bookmark Icon Box */}
      <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-muted">
        <BookmarkIcon className="size-5 text-muted-foreground transition-colors duration-150 group-hover:text-foreground" />
      </div>

      {/* Middle Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="font-heading text-base font-semibold tracking-tight text-foreground transition-colors duration-150 group-hover:text-primary sm:text-lg">
          {bookmark.title}
        </h3>

        {bookmark.description && (
          <p className="line-clamp-2 font-para text-sm leading-relaxed text-muted-foreground">
            {bookmark.description}
          </p>
        )}

        {bookmark.tags && bookmark.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {bookmark.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="font-mono text-xs text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Right Side: External Arrow Icon */}
      <div className="shrink-0 self-center pl-1 sm:pl-2">
        <ExternalLink className="size-4 text-muted-foreground transition-colors duration-150 group-hover:text-foreground" />
      </div>
    </Card>
  );
}
