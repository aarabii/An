"use client";

import { FaArrowUp } from "react-icons/fa6";
import { serif } from "@/app/fonts";
import { profile } from "@/constant";
import { cn } from "@/lib/utils";

export const FirstName = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Scroll to Top icon in the top-left corner */}
      <div className="flex justify-start pt-1">
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="p-2.5 rounded-lg border border-border/70 hover:border-primary/80 text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer bg-card/40 hover:bg-card/80"
        >
          <FaArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SVG First Name */}
      <svg
        className="w-full h-20 sm:h-28 md:h-40 lg:h-48 overflow-visible select-none -mb-1"
        width="100%"
        viewBox="0 0 400 130"
        preserveAspectRatio="none"
      >
        <text
          x="0"
          y="110"
          textLength="400"
          lengthAdjust="spacingAndGlyphs"
          className={cn(serif.className, "fill-foreground")}
          fontSize="130"
        >
          {profile.name.first}
        </text>
      </svg>
    </div>
  );
};
