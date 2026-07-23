"use client";

import React from "react";
import { FaGamepad, FaClock, FaCheck } from "react-icons/fa6";
import { formatTime } from "../utils";

interface GameStatsProps {
  moves: number;
  timeSeconds: number;
  matchedPairsCount: number;
}

export const GameStats: React.FC<GameStatsProps> = ({
  moves,
  timeSeconds,
  matchedPairsCount,
}) => {
  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-40 flex items-center gap-3">
      <div className="inline-flex items-center gap-4 px-4 py-2 rounded-full bg-neutral-900 border border-white/10 text-xs sm:text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <FaGamepad className="size-3.5 text-amber-400" />
          <span>Moves:</span>
          <span className="font-bold text-foreground">{moves}</span>
        </div>
        <div className="h-3.5 w-px bg-white/10" />
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <FaClock className="size-3.5 text-emerald-400" />
          <span>Time:</span>
          <span className="font-bold text-foreground">{formatTime(timeSeconds)}</span>
        </div>
        <div className="h-3.5 w-px bg-white/10" />
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <FaCheck className="size-3.5 text-cyan-400" />
          <span>Pairs:</span>
          <span className="font-bold text-foreground">{matchedPairsCount} / 10</span>
        </div>
      </div>
    </div>
  );
};
