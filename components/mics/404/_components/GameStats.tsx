"use client";

import React from "react";
import { Gamepad2, Clock, CheckCircle2, RotateCcw } from "lucide-react";
import { formatTime } from "../utils";
import { Button } from "@/components/ui/button";
import { mono } from "@/app/fonts";
import { cn } from "@/lib/utils";

interface GameStatsProps {
  moves: number;
  timeSeconds: number;
  matchedPairsCount: number;
  onReset?: () => void;
}

export const GameStats: React.FC<GameStatsProps> = ({
  moves,
  timeSeconds,
  matchedPairsCount,
  onReset,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-card/60 backdrop-blur-md border border-border rounded-full shadow-lg px-4 py-2.5 sm:px-6 sm:py-3">
      <div className={cn(mono.className, "flex flex-row items-center justify-between sm:justify-around text-xs sm:text-sm font-medium w-full")}>
        
        {/* Moves */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
          <Gamepad2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="hidden xs:inline">Moves:</span>
          <span className="font-bold text-foreground">{moves}</span>
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-border shrink-0" />

        {/* Time */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
          <Clock className="w-4 h-4 text-accent shrink-0" />
          <span className="hidden xs:inline">Time:</span>
          <span className="font-bold text-foreground">{formatTime(timeSeconds)}</span>
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-border shrink-0" />

        {/* Pairs */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="hidden xs:inline">Pairs:</span>
          <span className="font-bold text-foreground">{matchedPairsCount} / 10</span>
        </div>

        {/* Reset */}
        {onReset && (
          <>
            {/* Divider */}
            <div className="h-4 w-px bg-border shrink-0" />

            <Button
              variant="ghost"
              size="xs"
              onClick={onReset}
              className="h-7 px-2 text-xs gap-1 text-muted-foreground hover:text-foreground font-mono"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};



