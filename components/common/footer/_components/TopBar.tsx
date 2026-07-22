"use client";

import { FaArrowUp } from "react-icons/fa6";

export const TopBar = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex justify-end mb-6">
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="p-3 rounded-lg border border-border/70 hover:border-primary/80 text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer bg-card/40 hover:bg-card/80"
      >
        <FaArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
};
