"use client";

import React, { memo } from "react";
import { cn } from "@/lib/utils";
import type { TileData } from "./types";
import { GAME_ICONS } from "./constants";

interface MemoryTileProps {
  tile: TileData;
  index: number;
  isSelected: boolean;
  disabled: boolean;
  onClick: (index: number) => void;
}

export const MemoryTile = memo<MemoryTileProps>(({
  tile,
  index,
  isSelected,
  disabled,
  onClick,
}) => {
  const iconItem = GAME_ICONS[tile.iconIndex] || GAME_ICONS[0];
  const Icon = iconItem.icon;
  const isRevealed = tile.isFlipped || tile.isMatched;

  const handleClick = () => {
    if (!disabled && !tile.isFlipped && !tile.isMatched) {
      onClick(index);
    }
  };

  const ariaLabel = tile.isMatched
    ? `Tile ${index + 1}, matched ${iconItem.name}`
    : tile.isFlipped
    ? `Tile ${index + 1}, ${iconItem.name}`
    : `Tile ${index + 1}, hidden`;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || tile.isMatched}
      aria-label={ariaLabel}
      aria-pressed={isRevealed}
      className={cn(
        "group relative aspect-square size-7 xs:size-8.5 sm:size-11 md:size-12 lg:size-13 shrink-0 select-none rounded-md xs:rounded-lg sm:rounded-xl",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "[perspective:1000px]",
        tile.isMatched ? "cursor-default" : !disabled ? "cursor-pointer" : "cursor-default"
      )}
    >
      <div
        className={cn(
          "relative h-full w-full rounded-md xs:rounded-lg sm:rounded-xl transition-transform duration-300 [transform-style:preserve-3d]",
          isRevealed && "[transform:rotateY(180deg)]"
        )}
      >
        {/* Closed / Hidden Face */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-md xs:rounded-lg sm:rounded-xl border border-border/70 bg-secondary/35 backdrop-blur-xs",
            "transition-colors duration-150 group-hover:border-border group-hover:bg-secondary/50",
            "[backface-visibility:hidden]"
          )}
        >
          <div className="size-1 rounded-full bg-muted-foreground/30 transition-colors duration-150 group-hover:bg-muted-foreground/60" />
        </div>

        {/* Revealed Face (Icon) */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-md xs:rounded-lg sm:rounded-xl border shadow-xs",
            "[transform:rotateY(180deg)] [backface-visibility:hidden]",
            tile.isMatched
              ? "border-chart-1/40 bg-card text-chart-1 shadow-sm"
              : isSelected
              ? "border-primary/60 bg-card text-foreground ring-1 ring-primary/30"
              : "border-border bg-card text-foreground"
          )}
        >
          <Icon className="size-3.5 xs:size-4.5 sm:size-5.5 md:size-6 lg:size-6.5 transition-transform duration-200" />
        </div>
      </div>
    </button>
  );
});

MemoryTile.displayName = "MemoryTile";
