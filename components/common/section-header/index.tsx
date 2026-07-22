"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  number: string;
  title: string;
  align?: "left" | "right";
}

export const SectionHeader = ({
  number,
  title,
  align = "left",
}: SectionHeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isRight = align === "right";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative mb-16"
    >
      <span
        className={cn(
          "pointer-events-none absolute -top-15 select-none font-heading",
          "text-[120px] font-black leading-none text-white/10 italic drop-shadow-sms",
          "sm:text-[160px] md:text-[200px]",
          isRight ? "right-0" : "left-0",
        )}
      >
        {number}
      </span>

      <div
        className={cn(
          "relative flex items-center gap-6",
          isRight && "flex-row-reverse",
        )}
      >
        <h2 className="font-heading text-lg uppercase tracking-[0.2em] text-white/90 font-semibold sm:text-xl md:text-2xl">
          {title}
        </h2>
        {/* <div
          className={cn(
            "h-px flex-1",
            isRight
              ? "bg-linear-to-l from-fuchsia-500/50 to-transparent"
              : "bg-linear-to-r from-fuchsia-500/50 to-transparent",
          )}
        /> */}
      </div>
    </motion.div>
  );
};
