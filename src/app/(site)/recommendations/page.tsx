import type { Metadata } from "next";

import { Container, PageNav } from "@/components/common";
import RepeatSeparator from "@/components/ui/repeat-separator";
import { getGoatGames, getAllBooks } from "@/sanity/lib/queries";
import { GamesSection, BooksSection } from "./_components";

export const metadata: Metadata = {
  title: "Recommendations | Aarab Nishchal",
  description:
    "A curated log of games that shaped my appreciation for interactive art and books that broadened my perspective on engineering, craft, and life.",
};

export default async function RecommendationsPage() {
  // Parallel server-side data fetching to eliminate waterfalls
  const [goatGames, books] = await Promise.all([getGoatGames(), getAllBooks()]);

  return (
    <div className="min-h-screen">
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
