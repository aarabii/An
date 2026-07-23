"use client";

import React, { useMemo } from "react";
import { motion } from "motion/react";
import { FaRotateRight } from "react-icons/fa6";
import { CardTile, ActiveTileMapping } from "../types";
import { DIGIT_4, DIGIT_0 } from "../constants";
import { TileCard } from "./TileCard";

interface TileGridProps {
  tiles: CardTile[];
  flippedIndices: number[];
  matchedIndices: Set<number>;
  onTileClick: (index: number) => void;
  onReset: () => void;
}

export const TileGrid: React.FC<TileGridProps> = ({
  tiles,
  flippedIndices,
  matchedIndices,
  onTileClick,
  onReset,
}) => {
  // Map indices to 404 digit matrices
  const activeTileMap = useMemo(() => {
    const map: ActiveTileMapping[] = [];
    let tileIndexCount = 0;

    const digits = [DIGIT_4, DIGIT_0, DIGIT_4];
    digits.forEach((digitMatrix, digitIdx) => {
      digitMatrix.forEach((row, rowIdx) => {
        row.forEach((cell, colIdx) => {
          if (cell === 1) {
            map.push({
              digit: digitIdx,
              row: rowIdx,
              col: colIdx,
              tileIndex: tileIndexCount++,
            });
          }
        });
      });
    });
    return map;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative bg-neutral-950/80 border border-white/10 rounded-3xl p-4 xs:p-6 sm:p-8 my-4"
    >
      {/* 404 Grid Layout: 3 Digit Blocks side by side */}
      <div className="flex items-center justify-center gap-2 xs:gap-3 sm:gap-6 md:gap-8 select-none">
        {[DIGIT_4, DIGIT_0, DIGIT_4].map((digitMatrix, digitIdx) => (
          <div
            key={`digit-${digitIdx}`}
            className="grid grid-cols-3 gap-1.5 xs:gap-2 sm:gap-3"
          >
            {digitMatrix.map((row, rowIdx) =>
              row.map((cell, colIdx) => {
                if (cell === 0) {
                  // Empty position in the digit pattern
                  return (
                    <div
                      key={`empty-${digitIdx}-${rowIdx}-${colIdx}`}
                      className="size-8 xs:size-10 sm:size-14 md:size-16 lg:size-20 opacity-0 pointer-events-none"
                    />
                  );
                }

                const mapping = activeTileMap.find(
                  (m) => m.digit === digitIdx && m.row === rowIdx && m.col === colIdx
                );
                if (!mapping) return null;

                const tileIdx = mapping.tileIndex;
                const tile = tiles[tileIdx];
                if (!tile) return null;

                const isFlipped = flippedIndices.includes(tileIdx);
                const isMatched = matchedIndices.has(tileIdx);

                return (
                  <TileCard
                    key={`tile-${tileIdx}`}
                    tile={tile}
                    isFlipped={isFlipped}
                    isMatched={isMatched}
                    onClick={() => onTileClick(tileIdx)}
                  />
                );
              })
            )}
          </div>
        ))}
      </div>

      {/* Quick Reset Game Controls */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-muted-foreground hover:text-foreground transition-all cursor-pointer"
        >
          <FaRotateRight className="size-3" />
          <span>Shuffle & Reset</span>
        </button>
      </div>
    </motion.div>
  );
};
