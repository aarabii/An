"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { FaHouse } from "react-icons/fa6";
import { CardTile } from "./types";
import { ICON_POOL } from "./constants";
import { GoBackButton } from "./_components/GoBackButton";
import { GameHeader } from "./_components/GameHeader";
import { GameStats } from "./_components/GameStats";
import { TileGrid } from "./_components/TileGrid";
import { VictoryModal } from "./_components/VictoryModal";

export const NotFoundGame: React.FC = () => {
  const router = useRouter();

  // Game state
  const [tiles, setTiles] = useState<CardTile[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedIndices, setMatchedIndices] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState<number>(0);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [timeSeconds, setTimeSeconds] = useState<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Initialize or reset game
  const initializeGame = useCallback(() => {
    const cards: CardTile[] = [];
    ICON_POOL.forEach((iconData) => {
      cards.push({
        instanceId: `${iconData.id}-1-${Math.random()}`,
        pairId: iconData.id,
        iconData,
      });
      cards.push({
        instanceId: `${iconData.id}-2-${Math.random()}`,
        pairId: iconData.id,
        iconData,
      });
    });

    // Fisher-Yates shuffle
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    setTiles(cards);
    setFlippedIndices([]);
    setMatchedIndices(new Set());
    setMoves(0);
    setTimeSeconds(0);
    setIsChecking(false);
    setIsGameActive(false);
    setIsCompleted(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

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
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center relative overflow-x-hidden p-4 sm:p-6 md:p-8">
      {/* Top Left Go Back Button */}
      <GoBackButton />

      {/* Top Right Stats Bar */}
      <GameStats
        moves={moves}
        timeSeconds={timeSeconds}
        matchedPairsCount={matchedIndices.size / 2}
      />

      {/* Main Content Area */}
      <main className="flex flex-col items-center justify-center text-center my-auto py-12 max-w-4xl w-full">
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

        {/* Bottom Home Page Button (matching screenshot style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
        >
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Home page</span>
            <FaHouse className="size-3.5" />
          </button>
        </motion.div>
      </main>

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
