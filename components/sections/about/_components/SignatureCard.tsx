"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface SignatureCardProps {
  name: string;
  index?: number;
}

export const SignatureCard = ({ name, index = 0 }: SignatureCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="mt-6 flex items-center justify-center py-6"
    >
      <div className="flex w-full items-center gap-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" />
        <span className="whitespace-nowrap font-signature text-2xl text-muted-foreground/30 sm:text-3xl">
          {name}
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border" />
      </div>
    </motion.div>
  );
};
