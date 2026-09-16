"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, ExternalLink } from "lucide-react";
import { FaSteam, FaArrowRight } from "react-icons/fa6";

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
      return "border-amber-500/40 bg-amber-500/10 text-amber-400";
    case "Hall of Fame":
      return "border-purple-500/40 bg-purple-500/10 text-purple-300";
    case "Pretty Good":
      return "border-emerald-500/40 bg-emerald-500/10 text-emerald-300";
    case "Why Did I Play This":
      return "border-rose-500/40 bg-rose-500/10 text-rose-300";
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
        "group/grid-game relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card/60 transition-all duration-200 hover:border-foreground/25 hover:bg-card/90",
        className
      )}
    >
      {/* Background Clickable Overlay */}
      <Link
        href={gameHref}
        className="absolute inset-0 z-10 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
        aria-label={`View details for ${game.name}`}
      >
        <span className="sr-only">{game.name}</span>
      </Link>

      {/* Cover Image Container */}
      <div className="px-3 pt-3">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border/50 bg-muted/40">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={game.name}
              fill
              sizes="(min-width: 640px) 340px, 90vw"
              className="object-cover object-center transition-transform duration-300 ease-out group-hover/grid-game:scale-[1.03]"
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
                  "font-mono text-[0.625rem] backdrop-blur-md",
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
      <div className="flex flex-1 flex-col justify-between px-3 pt-3 pb-2">
        <div className="flex flex-col gap-1">
          <h4 className="font-heading text-base font-semibold tracking-tight text-foreground transition-colors group-hover/grid-game:text-primary">
            <Link
              href={gameHref}
              className="hover:underline underline-offset-4"
            >
              {game.name}
            </Link>
          </h4>

          {(game.developer || game.publisher) && (
            <p className="font-mono text-[0.625rem] text-muted-foreground/80">
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
          <div className="flex flex-wrap gap-1 pt-2">
            {game.genres.slice(0, 2).map((genre) => (
              <Badge
                key={genre}
                variant="outline"
                className="rounded-md font-mono text-[0.5625rem] text-muted-foreground"
              >
                {genre}
              </Badge>
            ))}
            {game.genres.length > 2 && (
              <span className="font-mono text-[0.5625rem] text-muted-foreground/60">
                +{game.genres.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="relative z-20 mt-auto flex items-center justify-between border-t border-border/40 px-3 py-2.5">
        <div
          className="flex items-center gap-1.5"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          {game.steam_link && (
            <Button
              nativeButton={false}
              variant="outline"
              size="icon-xs"
              className="rounded-md"
              render={
                <a
                  href={game.steam_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${game.name} on Steam`}
                />
              }
            >
              <FaSteam className="size-3" />
            </Button>
          )}

          {game.website && (
            <Button
              nativeButton={false}
              variant="outline"
              size="icon-xs"
              className="rounded-md"
              render={
                <a
                  href={game.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${game.name} website`}
                />
              }
            >
              <Globe className="size-3" />
            </Button>
          )}

          {game.other_links && game.other_links.length > 0 && (
            <Button
              nativeButton={false}
              variant="outline"
              size="icon-xs"
              className="rounded-md"
              render={
                <a
                  href={game.other_links[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${game.name} other link`}
                />
              }
            >
              <ExternalLink className="size-3" />
            </Button>
          )}
        </div>

        <span className="flex items-center gap-1 font-mono text-[0.6875rem] text-muted-foreground transition-colors group-hover/grid-game:text-foreground">
          <span>Details</span>
          <FaArrowRight className="size-2 transition-transform duration-200 group-hover/grid-game:translate-x-0.5" />
        </span>
      </div>
    </Card>
  );
};

export default GridGameCard;
