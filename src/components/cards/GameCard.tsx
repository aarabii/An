import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Globe } from "lucide-react";
import { FaSteam, FaArrowRight } from "react-icons/fa6";

import type { Game } from "@/sanity/schemaTypes/gameType";
import { urlFor } from "@/sanity/lib/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GameCardProps {
  game: Game;
  variant?: "compact" | "featured" | "grid";
  className?: string;
}

const getCategoryColor = (category?: string) => {
  switch (category) {
    case "GOAT":
      return "border-amber-500/40 bg-amber-500/10 text-amber-400";
    case "Hall of Fame":
      return "border-purple-500/40 bg-purple-500/10 text-purple-400";
    case "Pretty Good":
      return "border-emerald-500/40 bg-emerald-500/10 text-emerald-400";
    default:
      return "border-border text-muted-foreground";
  }
};

export const GameCard: React.FC<GameCardProps> = ({
  game,
  variant = "grid",
  className,
}) => {
  const slug = typeof game.slug === "string" ? game.slug : game.slug?.current;
  const gameHref = slug ? `/recommendations/games/${slug}` : "#";

  const imageUrl =
    typeof game.imge_link === "string"
      ? game.imge_link
      : game.imge_link?.asset
        ? urlFor(game.imge_link).width(800).height(450).quality(85).url()
        : null;

  const isFeatured = variant === "featured";

  return (
    <Card
      className={cn(
        "group/game relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card/60 transition-all duration-200 hover:border-foreground/25 hover:bg-card/90",
        isFeatured && "sm:grid sm:grid-cols-12 sm:gap-4 sm:p-4",
        className
      )}
    >
      {/* Background/Base clickable link that covers the card */}
      <Link
        href={gameHref}
        className="absolute inset-0 z-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
        aria-label={`View details for ${game.name}`}
      >
        <span className="sr-only">{game.name}</span>
      </Link>

      {/* Landscape Image Container */}
      <div
        className={cn(
          "relative overflow-hidden",
          isFeatured ? "sm:col-span-5 px-3 pt-3 sm:p-0" : "px-3 pt-3"
        )}
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border/50 bg-muted/40">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={game.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-center transition-transform duration-300 ease-out group-hover/game:scale-[1.03]"
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
                  getCategoryColor(game.category)
                )}
              >
                {game.category}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Body & Actions */}
      <div
        className={cn(
          "flex flex-1 flex-col justify-between",
          isFeatured ? "sm:col-span-7 sm:py-1" : ""
        )}
      >
        <div>
          {/* Header */}
          <CardHeader className="gap-1.5 pt-3 sm:pt-4">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base font-semibold tracking-tight text-foreground transition-colors group-hover/game:text-primary sm:text-lg">
                <Link
                  href={gameHref}
                  className="relative z-10 hover:underline underline-offset-4"
                >
                  {game.name}
                </Link>
              </CardTitle>
            </div>

            {(game.developer || game.publisher) && (
              <p className="font-mono text-[0.6875rem] text-muted-foreground/80">
                {[game.developer, game.publisher].filter(Boolean).join(" / ")}
              </p>
            )}
          </CardHeader>

          {/* Description */}
          {game.desc && (
            <CardContent className="pt-1">
              <CardDescription className="line-clamp-3 text-xs/relaxed text-muted-foreground">
                {game.desc}
              </CardDescription>
            </CardContent>
          )}
        </div>

        {/* Footer: Genres & External Links */}
        <CardFooter className="relative z-10 mt-auto flex flex-col gap-3 border-t border-border/40 pt-3 pb-3">
          {game.genres && game.genres.length > 0 && (
            <div className="flex w-full flex-wrap gap-1">
              {game.genres.slice(0, 3).map((genre) => (
                <Badge
                  key={genre}
                  variant="outline"
                  className="rounded-md font-mono text-[0.625rem] text-muted-foreground"
                >
                  {genre}
                </Badge>
              ))}
              {game.genres.length > 3 && (
                <Badge
                  variant="outline"
                  className="rounded-md font-mono text-[0.625rem] text-muted-foreground/60"
                >
                  +{game.genres.length - 3}
                </Badge>
              )}
            </div>
          )}

          <div className="flex w-full items-center justify-between gap-2">
            {/* External Links Buttons */}
            <div className="flex items-center gap-1.5">
              {game.steam_link && (
                <Button
                  nativeButton={false}
                  variant="outline"
                  size="icon-xs"
                  className="rounded-md hover:text-foreground"
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
                  className="rounded-md hover:text-foreground"
                  render={
                    <a
                      href={game.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${game.name} official website`}
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
                  className="rounded-md hover:text-foreground"
                  render={
                    <a
                      href={game.other_links[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${game.name} additional link`}
                    />
                  }
                >
                  <ExternalLink className="size-3" />
                </Button>
              )}
            </div>

            {/* Read / Detail view CTA */}
            <Button
              nativeButton={false}
              variant="ghost"
              size="xs"
              className="gap-1 font-mono text-[0.6875rem] text-muted-foreground group-hover/game:text-foreground"
              render={<Link href={gameHref} />}
            >
              <span>Explore</span>
              <FaArrowRight className="size-2.5 transition-transform duration-200 group-hover/game:translate-x-0.5" />
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default GameCard;
