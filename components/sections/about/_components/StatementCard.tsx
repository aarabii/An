"use client";

import { AnimatePresence } from "motion/react";
import { BentoCard } from "./BentoCard";
import { StatementSlide } from "./StatementSlide";
import { EducationSlide } from "./EducationSlide";
import { CodingStatsSlide } from "./CodingStatsSlide";
import { QuoteSlide } from "./QuoteSlide";
import { profile } from "@/constant";
import { cn } from "@/lib/utils";

interface StatementCardProps {
  statements: string[];
  activeIndex: number;
  onSelectIndex?: (index: number) => void;
  index?: number;
}

export const StatementCard = ({
  statements,
  activeIndex,
  onSelectIndex,
  index = 0,
}: StatementCardProps) => {
  const totalSlides = statements.length;

  return (
    <BentoCard
      className="sm:col-span-2 md:col-span-2 flex flex-col justify-center min-h-[260px] sm:min-h-[280px] relative pr-12 overflow-hidden"
      index={index}
    >
      <div className="relative pl-4 sm:pl-6 py-2 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {activeIndex === 0 && (
            <StatementSlide text={statements[0]} />
          )}
          {activeIndex === 1 && <EducationSlide />}
          {activeIndex === 2 && <CodingStatsSlide />}
          {activeIndex === 3 && (
            <QuoteSlide quote={profile.quote} />
          )}
        </AnimatePresence>
      </div>

      {/* Right side vertically centered line indicators */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 z-10">
        {[...Array(totalSlides)].map((_, i) => (
          <button
            key={i}
            onClick={() => onSelectIndex?.(i)}
            className={cn(
              "w-1 rounded-full transition-all duration-300 focus:outline-none",
              i === activeIndex
                ? "h-6 bg-foreground"
                : "h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60 cursor-pointer"
            )}
            title={`Slide ${i + 1} of ${totalSlides}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </BentoCard>
  );
};




