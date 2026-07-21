"use client";

import { motion } from "motion/react";

interface StatementSlideProps {
  text: string;
}

export const StatementSlide = ({ text }: StatementSlideProps) => {
  return (
    <motion.div
      key="slide-0"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight leading-relaxed text-foreground">
        {text}
      </h2>
    </motion.div>
  );
};
