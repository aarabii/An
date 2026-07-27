"use client";

import { profile } from "@/constant";
import { motion } from "motion/react";

interface QuoteSlideProps {
  quote: string;
}

export const QuoteSlide = ({ quote }: QuoteSlideProps) => {
  return (
    <motion.div
      key="slide-3"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col justify-center gap-3 py-2"
    >
      <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
        // Core Philosophy
      </span>
      <blockquote className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white italic leading-tight">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <span className="font-mono text-xs text-neutral-400 self-end font-medium">
        — {profile.name.full}
      </span>
    </motion.div>
  );
};
