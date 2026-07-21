"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { respira } from "@/app/fonts";

interface HeroNameProps {
  firstName: string;
  lastName: string;
}

export const HeroName = ({ firstName, lastName }: HeroNameProps) => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        respira.className,
        "text-6xl leading-[1.05] font-black tracking-widest text-foreground flex flex-col items-start w-full",
        "sm:text-8xl md:text-9xl lg:text-10xl",
      )}
    >
      <span>{firstName}</span>
      <div className="w-full max-w-[80vw] sm:max-w-[75vw] md:max-w-[70vw] lg:max-w-170 overflow-visible">
        <svg className="w-full h-auto overflow-visible" viewBox="0 0 800 120">
          <text
            x="0"
            y="120"
            textLength="680"
            lengthAdjust="spacingAndGlyphs"
            className="fill-current font-black"
            fontSize="120"
          >
            {lastName}
          </text>
        </svg>
      </div>
    </motion.h1>
  );
};
