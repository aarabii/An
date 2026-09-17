"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";
import { PageNav } from "@/components/common";
import { Button } from "@/components/ui/button";
import { useMemoryGame } from "./useMemoryGame";
import { GameStatusBar } from "./GameStatusBar";
import { GameGrid } from "./GameGrid";
import { VictoryDialog } from "./VictoryDialog";

export const NotFoundGame: React.FC = () => {
  const pathname = usePathname();
  const [exactPath, setExactPath] = useState<string>(pathname || "");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const full = window.location.pathname + window.location.search;
      if (full) {
        setExactPath(full);
      }
    }
  }, [pathname]);

  const {
    tiles,
    handleTileClick,
    firstSelected,
    isChecking,
    moves,
    matchedCount,
    totalPairs,
    timerSeconds,
    isTimerActive,
    turnTimeRemainingMs,
    bestTime,
    isNewBest,
    isVictoryOpen,
    setIsVictoryOpen,
    resetGame,
  } = useMemoryGame();

  const navItems = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: exactPath ? `404 (${exactPath})` : "404" },
    ],
    [exactPath]
  );

  return (
    <main className="relative z-10 flex flex-1 flex-col min-h-[calc(100vh-4rem)] w-full">
      {/* 1. Page Breadcrumbs Navigation */}
      <div className="w-full border-b border-border/30">
        <PageNav items={navItems} className="py-2.5" />
      </div>

      {/* 2. Center Content Area (Header, Status Bar, Grid, Home Button) */}
      <div className="mx-auto my-auto flex w-full max-w-3xl flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-10">
        {/* Header Title & Subtext */}
        <div className="mb-4 sm:mb-6 flex flex-col items-center gap-2 text-center max-w-md sm:max-w-lg">
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            404 — Page Not Found
          </h1>
          <p className="font-para text-xs sm:text-sm text-muted-foreground">
            The requested coordinate is missing from orbit. Match all 10 tile pairs within 3 seconds per turn to clear the grid.
          </p>

          <div className="mt-3 w-full">
            <GameStatusBar
              bestTime={bestTime}
              timerSeconds={timerSeconds}
              matchedCount={matchedCount}
              totalPairs={totalPairs}
              turnTimeRemainingMs={turnTimeRemainingMs}
              isTimerActive={isTimerActive}
            />
          </div>
        </div>

        {/* Center Game Grid & Home Button */}
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 w-full">
          <GameGrid
            tiles={tiles}
            firstSelected={firstSelected}
            disabled={isChecking}
            onTileClick={handleTileClick}
            onReset={resetGame}
          />

          {/* Home Button positioned directly below the game grid */}
          <Button
            variant="outline"
            size="default"
            className="gap-2 font-para text-sm px-6 cursor-pointer"
            render={<Link href="/" />}
          >
            <LuArrowLeft className="size-4" />
            <span>Home</span>
          </Button>
        </div>
      </div>

      {/* 3. Victory Celebration Popup */}
      <VictoryDialog
        open={isVictoryOpen}
        onOpenChange={setIsVictoryOpen}
        finalTimeSeconds={timerSeconds}
        bestTimeSeconds={bestTime}
        moves={moves}
        isNewBest={isNewBest}
        onPlayAgain={resetGame}
      />
    </main>
  );
};
