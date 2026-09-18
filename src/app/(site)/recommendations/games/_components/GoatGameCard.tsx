"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, ExternalLink, Crown, ArrowRight } from "lucide-react";
import { FaSteam } from "react-icons/fa6";

import type { Game } from "@/types/game";
import { urlFor } from "@/sanity/lib/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GoatGameCardProps {
  game: Game;
  className?: string;
}

const truncateText = (text: string, maxChars: number = 180): string => {
  if (!text) return "";
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).trim() + "...";
};

export const GoatGameCard: React.FC<GoatGameCardProps> = ({ game, className }) => {
  const slug = typeof game.slug === "string" ? game.slug : game.slug?.current;
  const gameHref = slug ? `/recommendations/games/${slug}` : "#";

  const imageUrl =
    typeof game.imge_link === "string"
      ? game.imge_link
      : game.imge_link?.asset
        ? urlFor(game.imge_link).width(1200).height(675).quality(88).url()
        : null;

  const lqip =
    typeof game.imge_link === "object" && game.imge_link !== null
      ? game.imge_link.asset?.metadata?.lqip
      : null;

  const truncatedDesc = game.desc ? truncateText(game.desc, 180) : null;

  return (
    <Card
      className={cn(
        "group/goat relative flex w-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-150 hover:border-border/80 hover:shadow-md",
        className
      )}
    >
      {/* Background Clickable Overlay Link to that game's page */}
      <Link
        href={gameHref}
        className="absolute inset-0 z-10 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`View full details for ${game.name}`}
      >
        <span className="sr-only">{game.name}</span>
      </Link>

      {/* Top Cover Image Area */}
      <div className="p-4 sm:p-5">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted select-none">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={game.name}
              fill
              sizes="(min-width: 768px) 720px, 100vw"
              placeholder={lqip ? "blur" : "empty"}
              blurDataURL={lqip || undefined}
              className="object-cover object-center transition-opacity duration-150 group-hover/goat:opacity-95"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-xs text-muted-foreground">
              No cover image
            </div>
          )}

          {/* GOAT Pill Badge Overlay */}
          <div className="absolute top-3 left-3 z-10">
            <Badge
              variant="secondary"
              className="gap-1 border border-chart-1/30 bg-card/90 font-mono text-xs text-chart-1"
            >
              <Crown className="size-3 text-chart-1" />
              <span>GOAT</span>
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Area: Left side Title + Description, Right side Icon Buttons */}
      <div className="relative z-20 flex flex-col gap-4 px-5 pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          {/* Left Side: Title & Description */}
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <h3 className="font-heading text-lg sm:text-xl font-semibold tracking-tight text-foreground transition-colors duration-150 group-hover/goat:text-primary">
              <Link
                href={gameHref}
                className="hover:underline underline-offset-4"
              >
                {game.name}
              </Link>
            </h3>

            {(game.developer || game.publisher) && (
              <p className="font-mono text-xs text-muted-foreground">
                {[game.developer, game.publisher].filter(Boolean).join(" • ")}
              </p>
            )}

            {truncatedDesc && (
              <p className="font-para text-sm text-muted-foreground leading-relaxed">
                {truncatedDesc}
              </p>
            )}
          </div>

          {/* Right Side: Outbound Icon Buttons for Steam, Website, Other Links */}
          <div
            className="flex shrink-0 items-center gap-2 self-start sm:pl-4"
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
                <FaSteam className="size-4" />
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
                    aria-label={`${game.name} official website`}
                  />
                }
              >
                <Globe className="size-4" />
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
                    aria-label={`${game.name} external link`}
                  />
                }
              >
                <ExternalLink className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Footer: Genres Badges and Details prompt */}
      <div className="relative z-20 mt-auto flex items-center justify-between border-t border-border px-5 py-3">
        {/* Genres Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {game.genres && game.genres.length > 0 ? (
            game.genres.map((genre) => (
              <Badge
                key={genre}
                variant="outline"
                className="rounded-sm font-mono text-xs text-muted-foreground"
              >
                {genre}
              </Badge>
            ))
          ) : (
            <span className="font-mono text-xs text-muted-foreground">
              No genres tagged
            </span>
          )}
        </div>

        {/* Explore prompt */}
        <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors duration-150 group-hover/goat:text-foreground">
          <span>Explore</span>
          <ArrowRight className="size-3.5 shrink-0" />
        </span>
      </div>
    </Card>
  );
};

export default GoatGameCard;
