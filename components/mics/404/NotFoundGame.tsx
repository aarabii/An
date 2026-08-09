"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Home } from "lucide-react";
import { CardTile } from "./types";
import { ICON_POOL } from "./constants";
import { GameHeader } from "./_components/GameHeader";
import { GameStats } from "./_components/GameStats";
import { TileGrid } from "./_components/TileGrid";
import { VictoryModal } from "./_components/VictoryModal";
import { Navbar, Footer } from "@/components/common";
import { Button } from "@/components/ui/button";
import { mono } from "@/app/fonts";
import { cn } from "@/lib/utils";

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const NotFoundGame: React.FC = () => {
  const router = useRouter();

  const createShuffledTiles = useCallback((seed?: number): CardTile[] => {
    const cards: CardTile[] = [];
    const rng = seed !== undefined ? mulberry32(seed) : Math.random;

    ICON_POOL.forEach((iconData) => {
      cards.push({
        instanceId: `${iconData.id}-1`,
        pairId: iconData.id,
        iconData,
      });
      cards.push({
        instanceId: `${iconData.id}-2`,
        pairId: iconData.id,
        iconData,
      });
    });

    // Fisher-Yates shuffle
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    return cards;
  }, []);

  // Game state (deterministic initial state for SSR/hydration)
  const [tiles, setTiles] = useState<CardTile[]>(() =>
    createShuffledTiles(404),
  );
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedIndices, setMatchedIndices] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState<number>(0);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [timeSeconds, setTimeSeconds] = useState<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Initialize or reset game
  const initializeGame = useCallback(() => {
    setTiles(createShuffledTiles());
    setFlippedIndices([]);
    setMatchedIndices(new Set());
    setMoves(0);
    setTimeSeconds(0);
    setIsChecking(false);
    setIsGameActive(false);
    setIsCompleted(false);
  }, [createShuffledTiles]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isGameActive && !isCompleted) {
      interval = setInterval(() => {
        setTimeSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGameActive, isCompleted]);

  // Tile click handler
  const handleTileClick = (index: number) => {
    if (isChecking || isCompleted) return;
    if (matchedIndices.has(index) || flippedIndices.includes(index)) return;

    if (!isGameActive) {
      setIsGameActive(true);
    }

    if (flippedIndices.length === 0) {
      setFlippedIndices([index]);
    } else if (flippedIndices.length === 1) {
      const firstIndex = flippedIndices[0];
      const secondIndex = index;
      setFlippedIndices([firstIndex, secondIndex]);
      setMoves((prev) => prev + 1);
      setIsChecking(true);

      const firstCard = tiles[firstIndex];
      const secondCard = tiles[secondIndex];

      if (firstCard.pairId === secondCard.pairId) {
        // Match found!
        setTimeout(() => {
          setMatchedIndices((prev) => {
            const next = new Set(prev);
            next.add(firstIndex);
            next.add(secondIndex);
            if (next.size === 20) {
              setIsCompleted(true);
              setIsGameActive(false);
            }
            return next;
          });
          setFlippedIndices([]);
          setIsChecking(false);
        }, 350);
      } else {
        // No match: flip back after delay
        setTimeout(() => {
          setFlippedIndices([]);
          setIsChecking(false);
        }, 800);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative text-foreground select-none">
      <Navbar />

      <div className="relative z-10 bg-black/40 backdrop-blur-md flex-1 flex flex-col w-full">
        <main className="flex-1 pt-24 sm:pt-28 pb-16 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto w-full flex flex-col items-center justify-center">
          {/* Extended Horizontal Game Stats Bar */}
          <div className="w-full max-w-3xl mb-6 sm:mb-8">
            <GameStats
              moves={moves}
              timeSeconds={timeSeconds}
              matchedPairsCount={matchedIndices.size / 2}
              onReset={initializeGame}
            />
          </div>

          {/* Header Text */}
          <GameHeader />

          {/* 404 Tile Grid Mini Game Container */}
          <TileGrid
            tiles={tiles}
            flippedIndices={flippedIndices}
            matchedIndices={matchedIndices}
            onTileClick={handleTileClick}
            onReset={initializeGame}
          />

          {/* Bottom Home Page Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 sm:mt-8"
          >
            <Button
              onClick={() => router.push("/")}
              className={cn(
                mono.className,
                "gap-2 px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer",
              )}
            >
              <span>Return Home</span>
              <Home className="w-4 h-4" />
            </Button>
          </motion.div>
        </main>

        <Footer />
      </div>

      {/* VICTORY MODAL & TROPHY DOWNLOAD DIALOG */}
      <VictoryModal
        isOpen={isCompleted}
        moves={moves}
        timeSeconds={timeSeconds}
        onPlayAgain={initializeGame}
      />
    </div>
  );
};
