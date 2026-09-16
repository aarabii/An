import type { Metadata } from "next";

import { Container, PageNav, Title } from "@/components/common";
import RepeatSeparator from "@/components/ui/repeat-separator";
import { getAllGames } from "@/sanity/lib/queries";
import GamesCatalog from "./_components/GamesCatalog";

export const metadata: Metadata = {
  title: "Games Archive | Aarab Nishchal",
  description:
    "Explore my complete archive of played games, personal rankings from GOAT to experimental, developer notes, and PC specifications.",
};

export default async function GamesPage() {
  const games = await getAllGames();

  return (
    <div className="min-h-screen">
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
      <Container id="games-archive" className="py-4 sm:py-6">
        <Title heading="Games Archive" />

        <div className="px-5 py-4 sm:px-8 md:px-10 sm:py-6">
          <p className="font-para text-xs/relaxed sm:text-sm text-muted-foreground">
            A comprehensive catalog of games I&apos;ve experienced over the years.
            Ranked and organized into tiers ranging from all-time GOAT titles to
            noteworthy achievements in game design, narrative storytelling, and artistic execution.
          </p>
        </div>

        {/* Interactive Catalog Component */}
        <GamesCatalog games={games} />
      </Container>
    </div>
  );
}
