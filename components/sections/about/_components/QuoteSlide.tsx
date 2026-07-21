"use client";

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
      <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
        Quote
      </span>
      <blockquote className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground italic">
        &ldquo;{quote}&rdquo;
      </blockquote>
    </motion.div>
  );
};
