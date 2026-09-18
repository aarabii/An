import React from "react";
import Image from "next/image";
import { Globe, ExternalLink, Crown } from "lucide-react";
import { FaSteam } from "react-icons/fa6";

import type { Game } from "@/types/game";
import { urlFor } from "@/sanity/lib/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GameHeroProps {
  game: Game;
}

const getCategoryColor = (category?: string) => {
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

const getDomainName = (url: string): string => {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace("www.", "");
  } catch {
    return "External Link";
  }
};

export const GameHero: React.FC<GameHeroProps> = ({ game }) => {
  const imageUrl =
    typeof game.imge_link === "string"
      ? game.imge_link
      : game.imge_link?.asset
        ? urlFor(game.imge_link).width(1200).height(675).quality(92).url()
        : null;

  const lqip =
    typeof game.imge_link === "object" && game.imge_link !== null
      ? game.imge_link.asset?.metadata?.lqip
      : null;

  const devPub = [game.developer, game.publisher].filter(Boolean).join(" / ");

  return (
    <div className="flex flex-col gap-6">
      {/* Title & Category Badge */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {game.name}
        </h1>

        {game.category && (
          <Badge
            variant="outline"
            className={cn(
              "w-fit font-mono text-xs px-2.5 py-1 gap-1.5",
              getCategoryColor(game.category)
            )}
          >
            {game.category === "GOAT" && (
              <Crown className="size-3 text-chart-1" />
            )}
            {game.category}
          </Badge>
        )}
      </div>

      {/* Cinematic Framed Cover Image */}
      {imageUrl && (
        <div className="overflow-hidden rounded-xl border border-border bg-card p-2 sm:p-3 shadow-md">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted select-none">
            <Image
              src={imageUrl}
              alt={game.name}
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              placeholder={lqip ? "blur" : "empty"}
              blurDataURL={lqip || undefined}
              className="object-cover object-center"
            />
          </div>
        </div>
      )}

      {/* Developer / Publisher Single Line */}
      {devPub && (
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="text-muted-foreground uppercase tracking-wider text-[0.6875rem]">Credits:</span>
          <span className="text-foreground font-medium">{devPub}</span>
        </div>
      )}

      {/* All Genres */}
      {game.genres && game.genres.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-xs text-muted-foreground mr-1">Genres:</span>
          {game.genres.map((genre) => (
            <Badge
              key={genre}
              variant="outline"
              className="rounded-sm font-mono text-xs text-muted-foreground"
            >
              {genre}
            </Badge>
          ))}
        </div>
      )}

      {/* Links Buttons Cluster */}
      {(game.website || game.steam_link || (game.other_links && game.other_links.length > 0)) && (
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {game.website && (
            <Button
              nativeButton={false}
              variant="outline"
              size="sm"
              className="gap-2 font-para text-xs"
              render={
                <a
                  href={game.website}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <Globe className="size-3.5 text-muted-foreground" />
              <span>Official Website</span>
              <ExternalLink className="size-3 opacity-60" />
            </Button>
          )}

          {game.steam_link && (
            <Button
              nativeButton={false}
              variant="outline"
              size="sm"
              className="gap-2 font-para text-xs"
              render={
                <a
                  href={game.steam_link}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <FaSteam className="size-3.5 text-muted-foreground" />
              <span>Steam Store</span>
              <ExternalLink className="size-3 opacity-60" />
            </Button>
          )}

          {game.other_links &&
            game.other_links.map((link, idx) => (
              <Button
                key={idx}
                nativeButton={false}
                variant="outline"
                size="sm"
                className="gap-2 font-para text-xs"
                render={
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <ExternalLink className="size-3.5 text-muted-foreground" />
                <span>{getDomainName(link)}</span>
              </Button>
            ))}
        </div>
      )}
    </div>
  );
};

export default GameHero;
