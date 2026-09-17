import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Crown } from "lucide-react";

import type { Game } from "@/sanity/schemaTypes/gameType";
import { urlFor } from "@/sanity/lib/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GameCarouselCardProps {
  game: Game;
  className?: string;
}

export const GameCarouselCard: React.FC<GameCarouselCardProps> = ({
  game,
  className,
}) => {
  const slug = typeof game.slug === "string" ? game.slug : game.slug?.current;
  const gameHref = slug ? `/recommendations/games/${slug}` : "#";

  const imageUrl =
    typeof game.imge_link === "string"
      ? game.imge_link
      : game.imge_link?.asset
        ? urlFor(game.imge_link).width(1200).height(675).quality(90).url()
        : null;

  return (
    <Card
      className={cn(
        "group relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-150 hover:border-border/80 hover:shadow-md",
        className
      )}
    >
      {/* Clickable Overlay Link */}
      <Link
        href={gameHref}
        className="absolute inset-0 z-20 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Open details for ${game.name}`}
      >
        <span className="sr-only">{game.name}</span>
      </Link>

      {/* Cover Image */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={game.name}
          fill
          priority
          sizes="(min-width: 768px) 700px, 90vw"
          className="object-cover object-center brightness-75 transition-all duration-150 group-hover:brightness-90"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-mono text-xs text-muted-foreground">
          No cover image
        </div>
      )}

      {/* Dark Vignette for readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />

      {/* Top Right GOAT Badge */}
      <div className="absolute top-3.5 right-3.5 z-10">
        <Badge
          variant="secondary"
          className="gap-1.5 border border-chart-1/30 bg-card/90 font-mono text-xs text-chart-1"
        >
          <Crown className="size-3 text-chart-1" />
          <span>GOAT</span>
        </Badge>
      </div>

      {/* Bottom-Left Overlay Content */}
      <div className="absolute bottom-0 left-0 z-10 flex w-full flex-col gap-1.5 p-5 sm:p-6">
        {(game.developer || game.publisher) && (
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {[game.developer, game.publisher].filter(Boolean).join(" • ")}
          </span>
        )}

        <h3 className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-foreground transition-colors duration-150 group-hover:text-primary">
          {game.name}
        </h3>

        {/* Genres Badges */}
        {game.genres && game.genres.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {game.genres.slice(0, 3).map((genre) => (
              <Badge
                key={genre}
                variant="outline"
                className="border-border bg-card/80 font-mono text-xs text-foreground"
              >
                {genre}
              </Badge>
            ))}
            {game.genres.length > 3 && (
              <span className="font-mono text-xs text-muted-foreground">
                +{game.genres.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default GameCarouselCard;
