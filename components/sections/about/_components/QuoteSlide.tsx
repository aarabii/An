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
      className="flex flex-col justify-center gap-2 py-2"
    >
      <blockquote className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground italic">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <span className="font-serif italic self-end text-md font-semibold text-secondary">
        -- {profile.name.full}
      </span>
    </motion.div>
  );
};
