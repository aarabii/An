"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Gamepad2, ArrowRight } from "lucide-react";

import type { Game } from "@/types/game";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import GameCarouselCard from "./GameCarouselCard";

interface GamesCarouselProps {
  games: Game[];
}

export const GamesCarousel: React.FC<GamesCarouselProps> = ({ games }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    };

    onSelect(); // initial sync
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="flex flex-col gap-4">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {/* GOAT Game Slides */}
          {games.map((game) => (
            <CarouselItem
              key={
                game._id ||
                (typeof game.slug === "string" ? game.slug : game.slug?.current)
              }
              className="pl-4 basis-full"
            >
              <GameCarouselCard game={game} />
            </CarouselItem>
          ))}

          {/* Last Card: "View all my played games" CTA slide */}
          <CarouselItem className="pl-4 basis-full">
            <Card className="group relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-card p-6 text-center shadow-sm transition-all duration-150 hover:border-border/80 hover:shadow-md">
              <div className="flex size-12 items-center justify-center rounded-full border border-border bg-muted">
                <Gamepad2 className="size-5 text-muted-foreground transition-colors duration-150 group-hover:text-foreground" />
              </div>

              <h4 className="mt-4 font-heading text-base font-semibold text-foreground">
                Looking for more?
              </h4>

              <p className="mt-1.5 max-w-xs font-para text-sm text-muted-foreground">
                Browse through all played games across every tier, reviews, and
                PC specifications.
              </p>

              <div className="mt-5">
                <Button
                  nativeButton={false}
                  variant="default"
                  size="sm"
                  render={
                    <Link
                      className="flex items-center gap-1.5"
                      href="/recommendations/games"
                    />
                  }
                >
                  <span>View all my played games</span>
                  <ArrowRight className="size-3.5 shrink-0" />
                </Button>
              </div>
            </Card>
          </CarouselItem>
        </CarouselContent>

        {/* Bottom Pagination & Navigation Controls */}
        <div className="mt-4 flex items-center justify-between px-1">
          <div className="font-mono text-xs text-muted-foreground">
            {count > 0 ? (
              <span>
                Slide <strong className="text-foreground">{current}</strong> of{" "}
                {count}
              </span>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <CarouselPrevious className="static translate-y-0 rounded-md border-border bg-card hover:bg-accent size-9 sm:size-10 focus-visible:ring-2 focus-visible:ring-ring" />
            <CarouselNext className="static translate-y-0 rounded-md border-border bg-card hover:bg-accent size-9 sm:size-10 focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default GamesCarousel;
