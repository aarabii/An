"use client";

import { motion } from "motion/react";
import RotatingText from "@/components/RotatingText";
import { CornerFrame } from "./CornerFrame";

interface HeroRoleProps {
  constantWord: string;
  rotatingWords: string[];
}

export const HeroRole = ({ constantWord, rotatingWords }: HeroRoleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="mt-7"
    >
      <div className="inline-flex items-center gap-3">
        <span className="block whitespace-nowrap font-mono text-lg font-bold text-foreground sm:text-2xl md:text-3xl">
          {constantWord}
        </span>

        <CornerFrame>
          <div className="h-8 overflow-hidden">
            <RotatingText
              texts={rotatingWords}
              rotationInterval={2500}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              staggerDuration={0.02}
              splitBy="none"
              loop
              auto
              mainClassName="block whitespace-nowrap font-mono text-lg font-bold text-foreground sm:text-2xl md:text-3xl"
              elementLevelClassName="inline-block"
            />
          </div>
        </CornerFrame>
      </div>
    </motion.div>
  );
};
