import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCrown } from "react-icons/fa6";

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
        "group relative aspect-video w-full overflow-hidden rounded-xl border border-border/80 bg-black/60 shadow-md transition-all duration-300 hover:border-foreground/40 hover:shadow-xl",
        className
      )}
    >
      {/* Clickable Overlay Link */}
      <Link
        href={gameHref}
        className="absolute inset-0 z-20 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
        aria-label={`Open details for ${game.name}`}
      >
        <span className="sr-only">{game.name}</span>
      </Link>

      {/* Cover Image with reduced brightness and zoom */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={game.name}
          fill
          priority
          sizes="(min-width: 768px) 700px, 90vw"
          className="object-cover object-center brightness-75 transition-all duration-500 ease-out group-hover:scale-[1.04] group-hover:brightness-60"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-mono text-xs text-muted-foreground">
          No cover image
        </div>
      )}

      {/* Dark Vignette & Gradient for maximum readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/45 to-transparent transition-opacity duration-300" />

      {/* Top Right GOAT Badge */}
      <div className="absolute top-3.5 right-3.5 z-10">
        <Badge
          variant="secondary"
          className="gap-1.5 border border-amber-500/30 bg-black/60 font-mono text-[0.625rem] text-amber-300 backdrop-blur-md"
        >
          <FaCrown className="size-2.5 text-amber-400" />
          <span>GOAT</span>
        </Badge>
      </div>

      {/* Bottom-Left Overlay Content */}
      <div className="absolute bottom-0 left-0 z-10 flex w-full flex-col gap-1.5 p-4 sm:p-5">
        {(game.developer || game.publisher) && (
          <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-white/70 drop-shadow-xs">
            {[game.developer, game.publisher].filter(Boolean).join(" • ")}
          </span>
        )}

        <h3 className="font-heading text-lg font-bold tracking-tight text-white transition-colors group-hover:text-primary sm:text-2xl drop-shadow-sm">
          {game.name}
        </h3>

        {/* Genres Badges */}
        {game.genres && game.genres.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {game.genres.slice(0, 3).map((genre) => (
              <Badge
                key={genre}
                variant="outline"
                className="border-white/20 bg-black/40 font-mono text-[0.625rem] text-white/90 backdrop-blur-sm"
              >
                {genre}
              </Badge>
            ))}
            {game.genres.length > 3 && (
              <span className="font-mono text-[0.625rem] text-white/60">
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
