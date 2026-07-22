"use client";

import { type ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import { BentoCard } from "./BentoCard";
import { StatementSlide } from "./StatementSlide";
import { EducationSlide } from "./EducationSlide";
import { CodingStatsSlide } from "./CodingStatsSlide";
import { QuoteSlide } from "./QuoteSlide";
import { profile } from "@/constant";
import { cn } from "@/lib/utils";

export type SlideItem = string | ReactNode;

interface StatementCardProps {
  slides?: SlideItem[];
  activeIndex: number;
  onSelectIndex?: (index: number) => void;
  index?: number;
}

const DEFAULT_SLIDES: SlideItem[] = [
  profile.about[0],
  <EducationSlide key="edu" />,
  <CodingStatsSlide key="stats" />,
  <QuoteSlide key="quote" quote={profile.quote} />,
];

export const StatementCard = ({
  slides = DEFAULT_SLIDES,
  activeIndex,
  onSelectIndex,
  index = 0,
}: StatementCardProps) => {
  const currentSlide = slides[activeIndex] ?? slides[0];
  const totalSlides = slides.length;

  return (
    <BentoCard
      className="sm:col-span-2 md:col-span-2 flex flex-col justify-center min-h-65 sm:min-h-70 relative pr-12 overflow-hidden"
      index={index}
    >
      <div className="relative pl-4 sm:pl-6 py-2 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <div key={activeIndex} className="w-full">
            {typeof currentSlide === "string" ? (
              <StatementSlide text={currentSlide} />
            ) : (
              currentSlide
            )}
          </div>
        </AnimatePresence>
      </div>

      {/* Right side vertically centered line indicators */}
      {totalSlides > 1 && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => onSelectIndex?.(i)}
              className={cn(
                "w-1 rounded-full transition-all duration-300 focus:outline-none",
                i === activeIndex
                  ? "h-6 bg-foreground"
                  : "h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60 cursor-pointer",
              )}
              title={`Slide ${i + 1} of ${totalSlides}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </BentoCard>
  );
};
