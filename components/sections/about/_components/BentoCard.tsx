"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  className?: string;
  children: ReactNode;
  index?: number;
}

export const BentoCard = ({
  className,
  children,
  index = 0,
}: BentoCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "relative rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl p-6",
        "transition-[border-color,transform] duration-300",
        "hover:border-accent/20 hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};
