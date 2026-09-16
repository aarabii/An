import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import type { Game } from "@/sanity/schemaTypes/gameType";
import { Title } from "@/components/common";
import { Button } from "@/components/ui/button";
import GamesCarousel from "./GamesCarousel";

interface GamesSectionProps {
  games: Game[];
}

export const GamesSection: React.FC<GamesSectionProps> = ({ games }) => {
  return (
    <div className="flex flex-col gap-4 py-4 sm:py-6">
      {/* Title Header with Top Action Button */}
      <Title heading="Games">
        <Button
          nativeButton={false}
          variant="outline"
          size="sm"
          className="gap-1.5 font-mono text-xs rounded-md"
          render={<Link href="/recommendations/games" />}
        >
          <span>View all games</span>
          <FaArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
      </Title>

      {/* Intro Description */}
      <div className="px-5 py-2 sm:px-8 md:px-10">
        <p className="font-para text-xs/relaxed sm:text-sm text-muted-foreground">
          Interactive stories, world-building, and digital experiences that left
          a lasting impression. Here is a curated selection of my all-time
          greatest favorites (GOAT tier) that shaped how I think about design,
          mechanics, and narrative immersion.
        </p>
      </div>

      {/* Carousel or Empty State */}
      {games.length === 0 ? (
        <div className="mx-5 my-4 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center sm:mx-8">
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
            className="mt-4 font-mono text-xs"
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
