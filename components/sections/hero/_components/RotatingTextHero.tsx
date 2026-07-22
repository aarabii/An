import RotatingText from "@/components/RotatingText";
import React from "react";

export const RotatingTextHero = ({
  constant_word,
  rotating_words,
}: {
  constant_word: string;
  rotating_words: string[];
}) => {
  return (
    <div className="flex items-center font-mono text-base sm:text-xl md:text-2xl font-medium tracking-tight text-white/80">
      <div className="inline-flex items-center text-left">
        <span className="text-white/50 font-light mr-2 sm:mr-2.5 whitespace-nowrap">
          {constant_word}
        </span>
        <div className="text-left min-w-[14ch] inline-flex">
          <RotatingText
            texts={rotating_words}
            rotationInterval={2500}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            staggerDuration={0.02}
            splitBy="none"
            loop
            auto
            mainClassName="block whitespace-nowrap font-mono text-base sm:text-xl md:text-2xl font-bold text-white text-left"
            elementLevelClassName="inline-block"
          />
        </div>
      </div>
    </div>
  );
};
