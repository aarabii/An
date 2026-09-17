"use client";

import React, { memo } from "react";
import { LuRotateCcw } from "react-icons/lu";
import { cn } from "@/lib/utils";
import type { TileData, GridDigitPattern } from "./types";
import { MemoryTile } from "./MemoryTile";
import { DIGIT_4_PATTERN, DIGIT_0_PATTERN } from "./constants";

interface GameGridProps {
  tiles: TileData[];
  firstSelected: number | null;
  disabled: boolean;
  onTileClick: (index: number) => void;
  onReset: () => void;
}

export const GameGrid = memo<GameGridProps>(({
  tiles,
  firstSelected,
  disabled,
  onTileClick,
  onReset,
}) => {
  const renderDigit = (
    pattern: GridDigitPattern,
    digitKey: string,
    startOffset: number
  ) => {
    let offset = startOffset;

    return (
      <div
        key={digitKey}
        className="grid grid-cols-3 gap-1 xs:gap-1.5 sm:gap-2 md:gap-2.5 shrink-0"
      >
        {pattern.map((row, rIdx) =>
          row.map((cell, cIdx) => {
            const cellKey = `${digitKey}-${rIdx}-${cIdx}`;
            if (cell === 1) {
              const currentTileIndex = offset++;
              const tile = tiles[currentTileIndex];

              if (!tile) return null;

              return (
                <MemoryTile
                  key={cellKey}
                  tile={tile}
                  index={currentTileIndex}
                  isSelected={firstSelected === currentTileIndex}
                  disabled={disabled}
                  onClick={onTileClick}
                />
              );
            }

            return (
              <div
                key={cellKey}
                aria-hidden="true"
                className="aspect-square size-7 xs:size-8.5 sm:size-11 md:size-12 lg:size-13 shrink-0 pointer-events-none opacity-0 select-none"
              />
            );
          })
        )}
      </div>
    );
  };

  return (
    <div className="relative mx-auto w-full max-w-xl sm:max-w-2xl overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-card/65 p-3.5 xs:p-5 sm:p-7 md:p-8 shadow-sm backdrop-blur-md">
      {/* Corner Ambient Glows matching reference aesthetic */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 size-52 sm:size-64 rounded-full bg-cyan-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 size-52 sm:size-64 rounded-full bg-cyan-500/10 blur-3xl"
      />

      <div className="relative z-10 flex flex-col items-center gap-5 sm:gap-7">
        {/* "4 0 4" Formation Grid */}
        <div className="flex items-center justify-center gap-2 xs:gap-3 sm:gap-5 md:gap-6 w-full shrink-0">
          {renderDigit(DIGIT_4_PATTERN, "first-4", 0)}
          {renderDigit(DIGIT_0_PATTERN, "zero", 6)}
          {renderDigit(DIGIT_4_PATTERN, "second-4", 14)}
        </div>

        {/* Shuffle & Reset Button */}
        <button
          type="button"
          onClick={onReset}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-full border border-border/80 bg-secondary/35 px-5 py-2.5",
            "font-mono text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 hover:border-border",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "transition-colors duration-150 cursor-pointer shadow-xs active:bg-secondary/80"
          )}
        >
          <LuRotateCcw className="size-3.5 sm:size-4 transition-transform duration-200 group-hover:rotate-45" />
          <span>Shuffle & Reset</span>
        </button>
      </div>
    </div>
  );
});

GameGrid.displayName = "GameGrid";
