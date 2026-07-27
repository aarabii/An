"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionGradiendBg } from "../../../mics/bg/SectionGradiendBg";

interface BentoCardProps {
  className?: string;
  children: ReactNode;
  index?: number;
  gradientColors?: string[];
}

export const BentoCard = ({
  className,
  children,
  index = 0,
  gradientColors,
}: BentoCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileHover={{ y: -4, scale: 1.005 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[28px] border border-border bg-card p-6 shadow-2xl text-foreground transition-colors duration-300 hover:border-card-border-hover hover:shadow-accent/5",
        className,
      )}
    >
      {/* Top Gradient Background Accent if provided */}
      {gradientColors && (
        <div className="absolute top-0 left-0 right-0 h-32 w-full overflow-hidden opacity-30 pointer-events-none group-hover:opacity-40 transition-opacity">
          <SectionGradiendBg colors={gradientColors} shape="wave" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-card/80 to-card" />
        </div>
      )}

      <div className="relative z-10 flex flex-1 flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
};
