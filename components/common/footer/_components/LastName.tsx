"use client";

import { serif } from "@/app/fonts";
import { profile } from "@/constant";
import { cn } from "@/lib/utils";

export const LastName = () => {
  return (
    <div className="w-full my-2">
      <svg
        className="w-full h-28 sm:h-44 md:h-64 lg:h-80 xl:h-96 overflow-visible select-none"
        width="100%"
        viewBox="0 0 1000 220"
        preserveAspectRatio="none"
      >
        <text
          x="0"
          y="180"
          textLength="1000"
          lengthAdjust="spacingAndGlyphs"
          className={cn(serif.className, "fill-foreground")}
          fontSize="220"
        >
          {profile.name.last}
        </text>
      </svg>
    </div>
  );
};
