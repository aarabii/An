"use client";

import { motion } from "motion/react";
import { useCodingStats } from "@/hooks/useCodingStats";

export const CodingStatsSlide = () => {
  const { github, loading } = useCodingStats();

  return (
    <motion.div
      key="slide-2"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
          GitHub Stats
        </span>
        <span className="text-xs text-muted-foreground font-mono">
          @{github?.handle || "aarabii"}
        </span>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={`stat-skeleton-${i}`}
              className="h-16 rounded-lg bg-muted/40 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="flex flex-col p-2.5 rounded-lg border border-border bg-card/60">
            <span className="text-xl sm:text-2xl font-bold text-foreground">
              {github?.repos ?? 0}
            </span>
            <span className="text-[11px] text-muted-foreground mt-0.5">
              Repositories
            </span>
          </div>
          <div className="flex flex-col p-2.5 rounded-lg border border-border bg-card/60">
            <span className="text-xl sm:text-2xl font-bold text-foreground">
              {github?.followers ?? 0}
            </span>
            <span className="text-[11px] text-muted-foreground mt-0.5">
              Followers
            </span>
          </div>
          <div className="flex flex-col p-2.5 rounded-lg border border-border bg-card/60">
            <span className="text-xl sm:text-2xl font-bold text-foreground">
              {github?.following ?? 0}
            </span>
            <span className="text-[11px] text-muted-foreground mt-0.5">
              Following
            </span>
          </div>
          <div className="flex flex-col p-2.5 rounded-lg border border-border bg-card/60">
            <span className="text-xl sm:text-2xl font-bold text-foreground">
              {github?.gists ?? 0}
            </span>
            <span className="text-[11px] text-muted-foreground mt-0.5">
              Gists
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};
