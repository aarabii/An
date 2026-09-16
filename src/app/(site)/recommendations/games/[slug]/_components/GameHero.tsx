import React from "react";
import Image from "next/image";
import { Globe, ExternalLink } from "lucide-react";
import { FaSteam, FaCrown } from "react-icons/fa6";

import type { Game } from "@/sanity/schemaTypes/gameType";
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

  const devPub = [game.developer, game.publisher].filter(Boolean).join(" / ");

  return (
    <div className="flex flex-col gap-6">
      {/* Title & Category Badge */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
          {game.name}
        </h1>

        {game.category && (
          <Badge
            variant="outline"
            className={cn(
              "w-fit font-mono text-xs px-2.5 py-1",
              getCategoryColor(game.category)
            )}
          >
            {game.category === "GOAT" && (
              <FaCrown className="mr-1.5 size-3 text-amber-400" />
            )}
            {game.category}
          </Badge>
        )}
      </div>

      {/* Cinematic Framed Cover Image */}
      {imageUrl && (
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card/60 p-2 sm:p-3 shadow-md">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted/40 shadow-inner">
            <Image
              src={imageUrl}
              alt={game.name}
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      )}

      {/* Developer / Publisher Single Line */}
      {devPub && (
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="text-foreground/60 uppercase tracking-wider text-[0.6875rem]">Credits:</span>
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
              className="rounded-md font-mono text-xs text-muted-foreground"
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
              className="gap-2 rounded-md font-mono text-xs"
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
              className="gap-2 rounded-md font-mono text-xs"
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
                className="gap-2 rounded-md font-mono text-xs"
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
