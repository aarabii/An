"use client";

import React, { useState, useMemo } from "react";
import type { Game, GameCategory } from "@/sanity/schemaTypes/gameType";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import GoatGameCard from "./GoatGameCard";
import GridGameCard from "./GridGameCard";

interface GamesCatalogProps {
  games: Game[];
}

const CATEGORIES: Array<"All" | GameCategory> = [
  "All",
  "GOAT",
  "Hall of Fame",
  "Pretty Good",
  "Why Did I Play This",
];

export const GamesCatalog: React.FC<GamesCatalogProps> = ({ games }) => {
  const [activeCategory, setActiveCategory] = useState<"All" | GameCategory>("All");

  // Separate games by categories
  const { goatGames, otherGames, filteredGames } = useMemo(() => {
    const goats = games.filter((g) => g.category === "GOAT");
    const others = games.filter((g) => g.category !== "GOAT");

    const filtered =
      activeCategory === "All"
        ? games
        : games.filter((g) => g.category === activeCategory);

    return {
      goatGames: goats,
      otherGames: others,
      filteredGames: filtered,
    };
  }, [games, activeCategory]);

  return (
    <div className="flex flex-col gap-6 px-4 pb-12 sm:px-6 md:px-8 lg:px-10 sm:pb-16">
      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-border/50 pb-4">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          const count =
            category === "All"
              ? games.length
              : games.filter((g) => g.category === category).length;

          return (
            <Button
              key={category}
              variant={isActive ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="gap-1.5 font-mono text-xs rounded-md"
            >
              <span>{category}</span>
              <Badge
                variant="outline"
                className="ml-0.5 border-border/60 text-[0.625rem] px-1 py-0 h-4"
              >
                {count}
              </Badge>
            </Button>
          );
        })}
      </div>

      {/* Main Catalog View */}
      {filteredGames.length === 0 ? (
        <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center sm:p-12">
          <p className="font-heading text-base font-medium text-foreground">
            No games found in &ldquo;{activeCategory}&rdquo;.
          </p>
          <p className="mt-1 font-para text-xs text-muted-foreground">
            Try choosing a different category or check back later.
          </p>
        </div>
      ) : activeCategory === "All" ? (
        <div className="flex flex-col gap-10">
          {/* Section A: GOAT Games (Full Width Landscape Cards) */}
          {goatGames.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <h3 className="font-heading text-sm font-semibold tracking-tight uppercase text-muted-foreground sm:text-base">
                  GOAT Tier — All-Time Favorites ({goatGames.length})
                </h3>
              </div>

              <div className="flex flex-col gap-5">
                {goatGames.map((game) => (
                  <GoatGameCard
                    key={game._id || (typeof game.slug === "string" ? game.slug : game.slug?.current)}
                    game={game}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Section B: Other Played Games (2-Column Landscape Grid) */}
          {otherGames.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <h3 className="font-heading text-sm font-semibold tracking-tight uppercase text-muted-foreground sm:text-base">
                  Played Archive & Other Tiers ({otherGames.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                {otherGames.map((game) => (
                  <GridGameCard
                    key={game._id || (typeof game.slug === "string" ? game.slug : game.slug?.current)}
                    game={game}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : activeCategory === "GOAT" ? (
        <div className="flex flex-col gap-5">
          {filteredGames.map((game) => (
            <GoatGameCard
              key={game._id || (typeof game.slug === "string" ? game.slug : game.slug?.current)}
              game={game}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {filteredGames.map((game) => (
            <GridGameCard
              key={game._id || (typeof game.slug === "string" ? game.slug : game.slug?.current)}
              game={game}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GamesCatalog;
