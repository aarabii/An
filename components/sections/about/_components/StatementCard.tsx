"use client";

import { type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
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

const SLIDE_LABELS = ["01 BRIEF", "02 EDU", "03 STATS", "04 QUOTE"];
const GRADIENT_PALETTE = [
  "hsl(271, 81%, 56%)",
  "hsl(239, 84%, 67%)",
  "hsl(258, 90%, 66%)",
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
      gradientColors={GRADIENT_PALETTE}
      className="sm:col-span-2 md:col-span-2 flex flex-col justify-between min-h-72 sm:min-h-80 relative overflow-hidden p-6 sm:p-8"
      index={index}
    >
      {/* Header Tab Badge */}
      <div className="flex items-center justify-end pb-4 border-b border-neutral-800/80 mb-4">
        <span className="font-mono text-xs text-neutral-500 font-semibold">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(totalSlides).padStart(2, "0")}
        </span>
      </div>

      {/* Main Slide Content Area */}
      <div className="relative py-2 flex-1 flex flex-col justify-center min-h-35">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {typeof currentSlide === "string" ? (
              <StatementSlide text={currentSlide} />
            ) : (
              currentSlide
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Monospace Interactive Slide Switcher Pills */}
      {totalSlides > 1 && (
        <div className="pt-4 border-t border-neutral-800/80 mt-4 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectIndex?.(i)}
                className={cn(
                  "font-mono text-[11px] font-semibold px-3 py-1 rounded-lg border transition-all duration-200 cursor-pointer",
                  i === activeIndex
                    ? "border-accent/40 bg-accent/15 text-accent shadow-sm"
                    : "border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200",
                )}
              >
                {SLIDE_LABELS[i] || `SLIDE ${i + 1}`}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </BentoCard>
  );
};
