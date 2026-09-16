"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, ExternalLink } from "lucide-react";
import { FaSteam, FaCrown, FaArrowRight } from "react-icons/fa6";

import type { Game } from "@/sanity/schemaTypes/gameType";
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

  const truncatedDesc = game.desc ? truncateText(game.desc, 180) : null;

  return (
    <Card
      className={cn(
        "group/goat relative flex w-full flex-col overflow-hidden rounded-xl border border-border/80 bg-card/60 transition-all duration-200 hover:border-foreground/30 hover:bg-card/90",
        className
      )}
    >
      {/* Background Clickable Overlay Link to that game's page */}
      <Link
        href={gameHref}
        className="absolute inset-0 z-10 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
        aria-label={`View full details for ${game.name}`}
      >
        <span className="sr-only">{game.name}</span>
      </Link>

      {/* Top Cover Image Area */}
      <div className="p-3 sm:p-4">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border/50 bg-muted/30 shadow-xs">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={game.name}
              fill
              sizes="(min-width: 768px) 720px, 100vw"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover/goat:scale-[1.02]"
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
              className="gap-1 border border-amber-500/40 bg-black/70 font-mono text-[0.625rem] text-amber-300 backdrop-blur-md"
            >
              <FaCrown className="size-2.5 text-amber-400" />
              <span>GOAT</span>
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Area: Left side Title + Description, Right side Icon Buttons */}
      <div className="relative z-20 flex flex-col gap-4 px-4 pb-3 sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          {/* Left Side: Title & Description */}
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <h3 className="font-heading text-lg font-bold tracking-tight text-foreground transition-colors group-hover/goat:text-primary sm:text-xl">
              <Link
                href={gameHref}
                className="hover:underline underline-offset-4"
              >
                {game.name}
              </Link>
            </h3>

            {(game.developer || game.publisher) && (
              <p className="font-mono text-[0.6875rem] text-muted-foreground/80">
                {[game.developer, game.publisher].filter(Boolean).join(" • ")}
              </p>
            )}

            {truncatedDesc && (
              <p className="font-para text-xs/relaxed leading-relaxed text-muted-foreground sm:text-sm/relaxed">
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
                className="rounded-md border-border/80 bg-secondary/40 hover:border-foreground/30 hover:bg-secondary"
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
                className="rounded-md border-border/80 bg-secondary/40 hover:border-foreground/30 hover:bg-secondary"
                render={
                  <a
                    href={game.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${game.name} official website`}
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
                className="rounded-md border-border/80 bg-secondary/40 hover:border-foreground/30 hover:bg-secondary"
                render={
                  <a
                    href={game.other_links[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${game.name} external link`}
                  />
                }
              >
                <ExternalLink className="size-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Footer: Genres Badges and Details prompt */}
      <div className="relative z-20 mt-auto flex items-center justify-between border-t border-border/40 px-4 py-3 sm:px-5">
        {/* Genres Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {game.genres && game.genres.length > 0 ? (
            game.genres.map((genre) => (
              <Badge
                key={genre}
                variant="outline"
                className="rounded-md font-mono text-[0.625rem] text-muted-foreground"
              >
                {genre}
              </Badge>
            ))
          ) : (
            <span className="font-mono text-[0.625rem] text-muted-foreground/60">
              No genres tagged
            </span>
          )}
        </div>

        {/* Explore prompt */}
        <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors group-hover/goat:text-foreground">
          <span>Explore</span>
          <FaArrowRight className="size-2.5 transition-transform duration-200 group-hover/goat:translate-x-0.5" />
        </span>
      </div>
    </Card>
  );
};

export default GoatGameCard;
