import type { Metadata } from "next";

import { Container, PageNav, JsonLd, Title } from "@/components/common";

import RepeatSeparator from "@/components/ui/repeat-separator";
import { getAllGames } from "@/sanity/lib/queries";
import GamesCatalog from "./_components/GamesCatalog";
import {
  PAGE_SEO,
  createPageMetadata,
  getCollectionPageJsonLd,
  getBreadcrumbJsonLd,
} from "@/constant";

export const metadata: Metadata = createPageMetadata(
  PAGE_SEO.recommendationsGames,
);

export default async function GamesPage() {
  const games = await getAllGames();

  const jsonLd = [
    getCollectionPageJsonLd(
      PAGE_SEO.recommendationsGames.title,
      PAGE_SEO.recommendationsGames.description,
      PAGE_SEO.recommendationsGames.path,
    ),
    getBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Recommendations", url: "/recommendations" },
      { name: "Games", url: "/recommendations/games" },
    ]),
  ];

  return (
    <div className="min-h-screen">
      <JsonLd data={jsonLd} />
      {/* Breadcrumb Navigation */}
      <PageNav
        items={[
          { label: "Home", href: "/" },
          { label: "Recommendations", href: "/recommendations" },
          { label: "Games" },
        ]}
      />

      <RepeatSeparator />

      {/* Main Container */}
      <Container id="games-archive">
        <Title heading="Games Archive" />

        <div className="max-w-prose mb-8 md:mb-12">
          <p className="font-para text-sm text-muted-foreground leading-relaxed">
            A comprehensive catalog of games I&apos;ve experienced over the
            years. Ranked and organized into tiers ranging from all-time GOAT
            titles to noteworthy achievements in game design, narrative
            storytelling, and artistic execution.
          </p>
        </div>

        {/* Interactive Catalog Component */}
        <GamesCatalog games={games} />
      </Container>
    </div>
  );
}
