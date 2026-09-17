"use client";

import React, { memo } from "react";
import Link from "next/link";
import { LuTrophy, LuRotateCcw, LuHouse, LuSparkles } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatTime } from "./constants";

interface VictoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  finalTimeSeconds: number;
  bestTimeSeconds: number | null;
  moves: number;
  isNewBest: boolean;
  onPlayAgain: () => void;
}

export const VictoryDialog = memo<VictoryDialogProps>(({
  open,
  onOpenChange,
  finalTimeSeconds,
  bestTimeSeconds,
  moves,
  isNewBest,
  onPlayAgain,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-3rem)] max-w-sm sm:max-w-md border-border bg-popover p-6 sm:p-8 text-popover-foreground rounded-2xl shadow-xl">
        <DialogHeader className="flex flex-col items-center text-center gap-3">
          <div className="flex size-14 items-center justify-center rounded-full border border-border/80 bg-card shadow-sm">
            <LuTrophy className="size-7 text-chart-1" />
          </div>

          <div className="flex flex-col items-center gap-1.5">
            {isNewBest && (
              <Badge
                variant="outline"
                className="mb-1 border-chart-1/40 bg-chart-1/10 font-mono text-xs text-chart-1"
              >
                <LuSparkles className="mr-1 size-3" /> New Personal Best!
              </Badge>
            )}
            <DialogTitle className="font-heading text-2xl sm:text-3xl text-foreground">
              404 Grid Solved!
            </DialogTitle>
            <DialogDescription className="text-muted-foreground font-para text-sm">
              You cracked the 404 maze and matched all 10 pairs!
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* Stats Summary Panel */}
        <div className="my-2 grid grid-cols-2 gap-3 rounded-lg border border-border/80 bg-card/60 p-4">
          <div className="flex flex-col items-center justify-center border-r border-border/60 pr-2">
            <span className="font-mono text-xs text-muted-foreground">
              Final Time
            </span>
            <span className="font-heading text-2xl font-bold text-foreground">
              {formatTime(finalTimeSeconds)}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center pl-2">
            <span className="font-mono text-xs text-muted-foreground">
              Total Moves
            </span>
            <span className="font-heading text-2xl font-bold text-foreground">
              {moves}
            </span>
          </div>
        </div>

        {bestTimeSeconds !== null && (
          <div className="text-center font-mono text-xs text-muted-foreground">
            All-time record:{" "}
            <span className="text-foreground font-medium">
              {formatTime(bestTimeSeconds)}
            </span>
          </div>
        )}

        <DialogFooter className="mt-4 flex flex-col-reverse sm:flex-row gap-2">
          <Button
            variant="outline"
            className="w-full sm:w-auto flex-1 font-para"
            render={<Link href="/" />}
          >
            <LuHouse className="mr-2 size-4" />
            Back to Home
          </Button>

          <Button
            variant="default"
            onClick={onPlayAgain}
            className="w-full sm:w-auto flex-1 font-para"
          >
            <LuRotateCcw className="mr-2 size-4" />
            Play Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

VictoryDialog.displayName = "VictoryDialog";
