import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Game } from "@/sanity/schemaTypes/gameType";
import { Title } from "@/components/common";
import { Button } from "@/components/ui/button";
import GamesCarousel from "./GamesCarousel";

interface GamesSectionProps {
  games: Game[];
}

export const GamesSection: React.FC<GamesSectionProps> = ({ games }) => {
  return (
    <div className="flex flex-col gap-6 py-8 md:py-12">
      {/* Title Header with Top Action Button */}
      <Title heading="Games" className="mb-2">
        <Button
          nativeButton={false}
          variant="outline"
          size="sm"
          render={<Link className="flex items-center gap-1.5" href="/recommendations/games" />}
        >
          <span>View all games</span>
          <ArrowRight className="size-3.5 shrink-0" />
        </Button>
      </Title>

      {/* Intro Description */}
      <div className="max-w-prose">
        <p className="font-para text-sm text-muted-foreground leading-relaxed">
          Interactive stories, world-building, and digital experiences that left
          a lasting impression. Here is a curated selection of my all-time
          greatest favorites (GOAT tier) that shaped how I think about design,
          mechanics, and narrative immersion.
        </p>
      </div>

      {/* Carousel or Empty State */}
      {games.length === 0 ? (
        <div className="flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed border-border p-8 text-center">
          <p className="font-heading text-sm font-medium text-foreground">
            No GOAT games added yet.
          </p>
          <p className="mt-1 font-para text-xs text-muted-foreground">
            Check back soon or explore the full games archive.
          </p>
          <Button
            nativeButton={false}
            variant="outline"
            size="sm"
            className="mt-4"
            render={<Link href="/recommendations/games" />}
          >
            Go to Games Catalog
          </Button>
        </div>
      ) : (
        <GamesCarousel games={games} />
      )}
    </div>
  );
};

export default GamesSection;
