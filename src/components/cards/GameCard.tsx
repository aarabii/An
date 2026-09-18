import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Globe, ArrowRight } from "lucide-react";
import { FaSteam } from "react-icons/fa6";

import type { Game } from "@/types/game";
import { urlFor } from "@/sanity/lib/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GameCardProps {
  game: Game;
  variant?: "compact" | "featured" | "grid";
  className?: string;
}

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

  const lqip =
    typeof game.imge_link === "object" && game.imge_link !== null
      ? game.imge_link.asset?.metadata?.lqip
      : null;

  const isFeatured = variant === "featured";

  return (
    <Card
      className={cn(
        "group/game flex flex-col justify-between overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-150 hover:border-border/80 hover:shadow-md",
        isFeatured && "md:grid md:grid-cols-12 md:gap-6",
        className
      )}
    >
      <div className={cn("flex flex-col gap-4", isFeatured && "md:col-span-12")}>
        {/* Landscape Image Container */}
        <Link
          href={gameHref}
          className="block overflow-hidden rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border bg-muted/40">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={game.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                placeholder={lqip ? "blur" : "empty"}
                blurDataURL={lqip || undefined}
                className="object-cover object-center"
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
                  className="rounded-sm bg-background/80 font-mono text-xs backdrop-blur-xs"
                >
                  {game.category}
                </Badge>
              </div>
            )}
          </div>
        </Link>

        {/* Title and Developer */}
        <div className="flex flex-col gap-1 min-w-0">
          <h3 className="font-heading text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
            <Link
              href={gameHref}
              className="rounded-sm transition-colors duration-150 hover:underline underline-offset-4 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {game.name}
            </Link>
          </h3>

          {(game.developer || game.publisher) && (
            <p className="font-mono text-xs text-muted-foreground">
              {[game.developer, game.publisher].filter(Boolean).join(" / ")}
            </p>
          )}
        </div>

        {/* Description */}
        {game.desc && (
          <p className="line-clamp-2 font-para text-sm leading-relaxed text-muted-foreground">
            {game.desc}
          </p>
        )}
      </div>

      {/* Footer: Genres & External Links */}
      <div className="mt-6 flex flex-col gap-4 border-t border-border pt-4">
        {game.genres && game.genres.length > 0 && (
          <div className="flex w-full flex-wrap gap-1.5">
            {game.genres.slice(0, 3).map((genre) => (
              <Badge
                key={genre}
                variant="outline"
                className="rounded-sm font-mono text-xs text-muted-foreground"
              >
                {genre}
              </Badge>
            ))}
            {game.genres.length > 3 && (
              <Badge
                variant="outline"
                className="rounded-sm font-mono text-xs text-muted-foreground"
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
                size="sm"
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
                <FaSteam className="size-4" />
              </Button>
            )}

            {game.website && (
              <Button
                nativeButton={false}
                variant="outline"
                size="sm"
                className="rounded-md"
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
                size="sm"
                className="rounded-md"
                render={
                  <a
                    href={game.other_links[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${game.name} additional link`}
                  />
                }
              >
                <ExternalLink className="size-4" />
              </Button>
            )}
          </div>

          {/* Read / Detail view CTA */}
          <Button
            nativeButton={false}
            variant="ghost"
            size="sm"
            className="gap-1.5 font-para text-sm text-muted-foreground hover:text-foreground"
            render={<Link href={gameHref} />}
          >
            <span>Explore</span>
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GameCard;
