"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaGamepad, FaArrowRight } from "react-icons/fa6";

import type { Game } from "@/sanity/schemaTypes/gameType";
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

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex flex-col gap-3 px-4 pb-4 sm:px-6 md:px-8">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 sm:-ml-4">
          {/* GOAT Game Slides */}
          {games.map((game) => (
            <CarouselItem
              key={game._id || (typeof game.slug === "string" ? game.slug : game.slug?.current)}
              className="pl-3 sm:pl-4 basis-full"
            >
              <GameCarouselCard game={game} />
            </CarouselItem>
          ))}

          {/* Last Card: "View all my played games" CTA slide */}
          <CarouselItem className="pl-3 sm:pl-4 basis-full">
            <Card className="group relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-card/40 p-6 text-center transition-all duration-300 hover:border-foreground/40 hover:bg-card/70">
              <div className="flex size-12 items-center justify-center rounded-full border border-border bg-secondary/50 transition-transform duration-300 group-hover:scale-110">
                <FaGamepad className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
              </div>

              <h4 className="mt-3 font-heading text-base font-semibold text-foreground sm:text-lg">
                Looking for more?
              </h4>

              <p className="mt-1 max-w-xs font-para text-xs text-muted-foreground">
                Browse through all played games across every tier, reviews, and PC specifications.
              </p>

              <div className="mt-4">
                <Button
                  nativeButton={false}
                  variant="default"
                  size="sm"
                  className="gap-2 rounded-md font-mono text-xs"
                  render={<Link href="/recommendations/games" />}
                >
                  <span>View all my played games</span>
                  <FaArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Button>
              </div>
            </Card>
          </CarouselItem>
        </CarouselContent>

        {/* Bottom Pagination & Navigation Controls */}
        <div className="mt-3 flex items-center justify-between px-1">
          <div className="font-mono text-[0.6875rem] text-muted-foreground">
            {count > 0 ? (
              <span>
                Slide <strong className="text-foreground">{current}</strong> of {count}
              </span>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <CarouselPrevious
              className="static translate-y-0 rounded-md border-border bg-card hover:bg-secondary size-7"
            />
            <CarouselNext
              className="static translate-y-0 rounded-md border-border bg-card hover:bg-secondary size-7"
            />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default GamesCarousel;
