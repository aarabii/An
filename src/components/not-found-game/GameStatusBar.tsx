"use client";

import React, { memo } from "react";
import { LuTrophy, LuTimer, LuSparkles } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { TURN_TIMEOUT_MS, formatTime } from "./constants";

interface GameStatusBarProps {
  bestTime: number | null;
  timerSeconds: number;
  matchedCount: number;
  totalPairs: number;
  turnTimeRemainingMs: number;
  isTimerActive: boolean;
}

export const GameStatusBar = memo<GameStatusBarProps>(({
  bestTime,
  timerSeconds,
  matchedCount,
  totalPairs,
  turnTimeRemainingMs,
  isTimerActive,
}) => {
  const turnProgressPercent =
    turnTimeRemainingMs > 0
      ? (turnTimeRemainingMs / TURN_TIMEOUT_MS) * 100
      : 0;

  return (
    <div className="relative mx-auto w-full max-w-xl sm:max-w-2xl overflow-hidden rounded-lg border border-border/80 bg-card/60 px-4 py-2.5 backdrop-blur-xs font-mono text-xs sm:text-sm">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Best Recorded Time */}
        <div className="flex items-center gap-1.5 min-w-0">
          <LuTrophy
            className={cn(
              "size-3.5 sm:size-4 shrink-0",
              bestTime !== null ? "text-chart-1" : "text-muted-foreground"
            )}
          />
          <span className="text-muted-foreground hidden xs:inline">Best:</span>
          <span
            className={cn(
              "font-medium",
              bestTime !== null ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {formatTime(bestTime)}
          </span>
        </div>

        {/* Live Elapsed Time */}
        <div className="flex items-center gap-1.5 min-w-0">
          <LuTimer
            className={cn(
              "size-3.5 sm:size-4 shrink-0 text-muted-foreground",
              isTimerActive && "text-foreground animate-pulse"
            )}
          />
          <span className="text-muted-foreground hidden xs:inline">Time:</span>
          <span className="font-semibold text-foreground tracking-wider">
            {formatTime(timerSeconds)}
          </span>
        </div>

        {/* Matched Pairs Progress */}
        <div className="flex items-center gap-1.5 min-w-0">
          <LuSparkles className="size-3.5 sm:size-4 shrink-0 text-muted-foreground" />
          <span className="text-muted-foreground hidden xs:inline">Pairs:</span>
          <span className="font-medium text-foreground">
            {matchedCount}/{totalPairs}
          </span>
        </div>
      </div>

      {/* 3-Second Turn Linear Progress Indicator */}
      {turnTimeRemainingMs > 0 && (
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-primary/70 transition-all duration-100 ease-linear"
          style={{ width: `${turnProgressPercent}%` }}
        />
      )}
    </div>
  );
});

GameStatusBar.displayName = "GameStatusBar";
