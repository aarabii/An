"use client";

import { motion } from "motion/react";
import { mono } from "@/app/fonts";

interface HeroQuoteProps {
  quote?: string;
}

export const HeroQuote = ({ quote }: HeroQuoteProps) => {
  if (!quote) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.22 }}
      className="relative mt-7 w-full max-w-3xl"
    >
      <blockquote className="relative py-2 text-sm leading-relaxed font-medium italic text-muted-foreground sm:text-base">
        <span aria-hidden="true" className="mr-2 text-xl text-primary/50">
          “
        </span>

        <span className={mono.className}>{quote}</span>

        <span aria-hidden="true" className="ml-1 text-xl text-primary/50">
          ”
        </span>
      </blockquote>
    </motion.div>
  );
};
