"use client";

import React from "react";
import { motion } from "motion/react";
import { CardTile } from "../types";
import { cn } from "@/lib/utils";

interface TileCardProps {
  tile: CardTile;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export const TileCard: React.FC<TileCardProps> = ({
  tile,
  isFlipped,
  isMatched,
  onClick,
}) => {
  const Icon = tile.iconData.icon;

  return (
    <motion.div
      onClick={onClick}
      className="group size-6.5 xs:size-8 sm:size-12 md:size-14 lg:size-16 cursor-pointer select-none"
      style={{ perspective: 1200 }}
      whileHover={
        !isFlipped && !isMatched
          ? {
              scale: 1.04,
            }
          : {}
      }
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 24,
      }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        initial={false}
        animate={{
          rotateY: isFlipped || isMatched ? 180 : 0,
          scale: isMatched ? [1, 1.05, 1] : 1,
        }}
        transition={{
          rotateY: {
            type: "spring",
            stiffness: 220,
            damping: 20,
          },
          scale: {
            duration: 0.35,
          },
        }}
      >
        {/* FRONT */}
        <div
          className={cn(
            "absolute inset-0 overflow-hidden rounded-lg sm:rounded-xl",
            "border border-border bg-card",
            "transition-colors duration-200"
          )}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        />

        {/* BACK */}
        <div
          className={cn(
            "absolute inset-0 overflow-hidden rounded-lg sm:rounded-xl",
            "flex items-center justify-center",
            "border",
            tile.iconData.bg,
            isMatched
              ? "border-accent bg-accent/10"
              : "border-border bg-card"
          )}
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <motion.div
            initial={false}
            animate={{
              scale: isFlipped || isMatched ? 1 : 0.6,
              rotate: isMatched ? 6 : 0,
            }}
            transition={{
              rotate: {
                type: "spring",
                stiffness: 500,
                damping: 10,
              },
            }}
          >
            <Icon
              className={cn(
                "size-3.5 xs:size-4 sm:size-6 md:size-7",
                tile.iconData.color
              )}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};


