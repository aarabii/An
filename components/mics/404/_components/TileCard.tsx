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
      className="group size-8 xs:size-10 sm:size-14 md:size-16 lg:size-20 cursor-pointer select-none"
      style={{ perspective: 1200 }}
      whileHover={
        !isFlipped && !isMatched
          ? {
              rotateX: -6,
              rotateY: 6,
              scale: 1.05,
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
          scale: isMatched ? [1, 1.08, 1] : 1,
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
            "absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl",
            "border border-white/10",
            "bg-linear-to-br from-neutral-800 via-neutral-900 to-black",
            // "shadow-[0_10px_30px_rgba(0,0,0,0.45)]",
            "transition-all duration-300",
            // "group-hover:border-white/20",
          )}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Glass highlight */}
          <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,.12),transparent_35%)]" />

          {/* Shimmer */}
          <motion.div
            className="absolute inset-y-0 -left-1/2 w-1/2 bg-linear-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ["-120%", "250%"],
            }}
            transition={{
              repeat: Infinity,
              repeatDelay: 2,
              duration: 1.6,
              ease: "easeInOut",
            }}
          />

          {/* <div className="relative flex h-full items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="size-2.5 rounded-full bg-white/20 shadow-[0_0_12px_rgba(255,255,255,0.2)]"
            />
          </div> */}
        </div>

        {/* BACK */}
        <div
          className={cn(
            "absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl",
            "flex items-center justify-center",
            "border",
            tile.iconData.bg,
            isMatched
              ? "border-emerald-400 ring-1 ring-emerald-400/40"
              : "border-white/15 bg-neutral-900",
          )}
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* soft glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,185,0,.08),transparent_70%)]" />

          <motion.div
            initial={false}
            animate={{
              scale: isFlipped || isMatched ? 1 : 0.6,
              rotate: isMatched ? 8 : 0,
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
                "size-4 xs:size-5 sm:size-7 md:size-8",
                tile.iconData.color,
              )}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
