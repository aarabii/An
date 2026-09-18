import type { Metadata } from "next";

import { Container, PageNav, JsonLd } from "@/components/common";

import RepeatSeparator from "@/components/ui/repeat-separator";
import { getGoatGames, getAllBooks } from "@/sanity/lib/queries";
import { GamesSection, BooksSection } from "./_components";
import {
  PAGE_SEO,
  createPageMetadata,
  getCollectionPageJsonLd,
  getBreadcrumbJsonLd,
} from "@/constant";

export const metadata: Metadata = createPageMetadata(PAGE_SEO.recommendations);

export default async function RecommendationsPage() {
  // Parallel server-side data fetching to eliminate waterfalls
  const [goatGames, books] = await Promise.all([getGoatGames(), getAllBooks()]);

  const jsonLd = [
    getCollectionPageJsonLd(
      PAGE_SEO.recommendations.title,
      PAGE_SEO.recommendations.description,
      PAGE_SEO.recommendations.path,
    ),
    getBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Recommendations", url: "/recommendations" },
    ]),
  ];

  return (
    <div className="min-h-screen">
      <JsonLd data={jsonLd} />
      {/* Top Breadcrumb Navigation */}
      <PageNav
        items={[{ label: "Home", href: "/" }, { label: "Recommendations" }]}
      />

      {/* Repeating separator line */}
      <RepeatSeparator />

      {/* Section 1: Curated Games (GOAT Tier Carousel) */}
      <Container id="games-recommendations">
        <GamesSection games={goatGames} />
      </Container>

      {/* Divider Separator */}
      <RepeatSeparator />

      {/* Section 2: Recommended Books (Portrait Bento Grid) */}
      <Container id="books-recommendations">
        <BooksSection books={books} />
      </Container>
    </div>
  );
}
