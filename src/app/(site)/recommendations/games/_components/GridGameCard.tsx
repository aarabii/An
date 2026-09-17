"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, ExternalLink, ArrowRight } from "lucide-react";
import { FaSteam } from "react-icons/fa6";

import type { Game } from "@/sanity/schemaTypes/gameType";
import { urlFor } from "@/sanity/lib/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GridGameCardProps {
  game: Game;
  className?: string;
}

const getCategoryBadgeClass = (category?: string) => {
  switch (category) {
    case "GOAT":
      return "border-chart-1/30 bg-chart-1/10 text-chart-1";
    case "Hall of Fame":
      return "border-border bg-secondary text-secondary-foreground";
    case "Pretty Good":
      return "border-border bg-muted text-muted-foreground";
    case "Why Did I Play This":
      return "border-destructive/30 bg-destructive/10 text-destructive";
    default:
      return "border-border text-muted-foreground";
  }
};

export const GridGameCard: React.FC<GridGameCardProps> = ({ game, className }) => {
  const slug = typeof game.slug === "string" ? game.slug : game.slug?.current;
  const gameHref = slug ? `/recommendations/games/${slug}` : "#";

  const imageUrl =
    typeof game.imge_link === "string"
      ? game.imge_link
      : game.imge_link?.asset
        ? urlFor(game.imge_link).width(800).height(450).quality(85).url()
        : null;

  return (
    <Card
      className={cn(
        "group/grid-game relative flex flex-col justify-between overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-150 hover:border-border/80 hover:shadow-md",
        className
      )}
    >
      {/* Background Clickable Overlay */}
      <Link
        href={gameHref}
        className="absolute inset-0 z-10 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`View details for ${game.name}`}
      >
        <span className="sr-only">{game.name}</span>
      </Link>

      {/* Cover Image Container */}
      <div className="p-4 pb-0">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted select-none">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={game.name}
              fill
              sizes="(min-width: 640px) 340px, 90vw"
              className="object-cover object-center transition-opacity duration-150 group-hover/grid-game:opacity-95"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-xs text-muted-foreground">
              No cover art
            </div>
          )}

          {game.category && (
            <div className="absolute top-2.5 left-2.5 z-10">
              <Badge
                variant="outline"
                className={cn(
                  "font-mono text-xs",
                  getCategoryBadgeClass(game.category)
                )}
              >
                {game.category}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="flex flex-col gap-1">
          <h4 className="font-heading text-base font-semibold tracking-tight text-foreground transition-colors duration-150 group-hover/grid-game:text-primary">
            <Link
              href={gameHref}
              className="hover:underline underline-offset-4"
            >
              {game.name}
            </Link>
          </h4>

          {(game.developer || game.publisher) && (
            <p className="font-mono text-xs text-muted-foreground">
              {[game.developer, game.publisher].filter(Boolean).join(" • ")}
            </p>
          )}

          {game.desc && (
            <p className="line-clamp-2 mt-1 font-para text-xs leading-relaxed text-muted-foreground">
              {game.desc}
            </p>
          )}
        </div>

        {/* Genres */}
        {game.genres && game.genres.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-3">
            {game.genres.slice(0, 2).map((genre) => (
              <Badge
                key={genre}
                variant="outline"
                className="rounded-sm font-mono text-xs text-muted-foreground"
              >
                {genre}
              </Badge>
            ))}
            {game.genres.length > 2 && (
              <span className="font-mono text-xs text-muted-foreground">
                +{game.genres.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="relative z-20 mt-auto flex items-center justify-between border-t border-border px-4 py-3">
        <div
          className="flex items-center gap-1.5"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          {game.steam_link && (
            <Button
              nativeButton={false}
              variant="outline"
              size="icon-sm"
              className="rounded-md border-border bg-card hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
              render={
                <a
                  href={game.steam_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${game.name} on Steam`}
                />
              }
            >
              <FaSteam className="size-3.5" />
            </Button>
          )}

          {game.website && (
            <Button
              nativeButton={false}
              variant="outline"
              size="icon-sm"
              className="rounded-md border-border bg-card hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
              render={
                <a
                  href={game.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${game.name} website`}
                />
              }
            >
              <Globe className="size-3.5" />
            </Button>
          )}

          {game.other_links && game.other_links.length > 0 && (
            <Button
              nativeButton={false}
              variant="outline"
              size="icon-sm"
              className="rounded-md border-border bg-card hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
              render={
                <a
                  href={game.other_links[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${game.name} other link`}
                />
              }
            >
              <ExternalLink className="size-3.5" />
            </Button>
          )}
        </div>

        <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors duration-150 group-hover/grid-game:text-foreground">
          <span>Details</span>
          <ArrowRight className="size-3 shrink-0" />
        </span>
      </div>
    </Card>
  );
};

export default GridGameCard;
