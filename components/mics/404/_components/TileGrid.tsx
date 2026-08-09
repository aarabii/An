"use client";

import React, { useMemo } from "react";
import { motion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { CardTile, ActiveTileMapping } from "../types";
import { DIGIT_4, DIGIT_0 } from "../constants";
import { TileCard } from "./TileCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mono } from "@/app/fonts";
import { cn } from "@/lib/utils";

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
      className="w-full flex justify-center"
    >
      <Card className="w-full max-w-3xl bg-card/60 backdrop-blur-md border-border rounded-3xl p-3 xs:p-5 sm:p-8 my-4 shadow-xl overflow-hidden">
        <CardContent className="p-0 flex flex-col items-center justify-center">
          {/* 404 Grid Layout: 3 Digit Blocks side by side */}
          <div className="flex items-center justify-center gap-1.5 xs:gap-2.5 sm:gap-5 md:gap-8 select-none w-full">
            {[DIGIT_4, DIGIT_0, DIGIT_4].map((digitMatrix, digitIdx) => (
              <div
                key={`digit-${digitIdx}`}
                className="grid grid-cols-3 gap-1 xs:gap-1.5 sm:gap-3"
              >
                {digitMatrix.map((row, rowIdx) =>
                  row.map((cell, colIdx) => {
                    if (cell === 0) {
                      // Empty position in the digit pattern
                      return (
                        <div
                          key={`empty-${digitIdx}-${rowIdx}-${colIdx}`}
                          className="size-6.5 xs:size-8 sm:size-12 md:size-14 lg:size-16 opacity-0 pointer-events-none"
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

          {/* Quick Reset Game Control */}
          <div className="mt-5 sm:mt-7 flex items-center justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className={cn(
                mono.className,
                "gap-2 rounded-full text-xs font-medium border-border bg-background/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
              )}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Shuffle & Reset</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

