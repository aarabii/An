"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  Trophy,
  Star,
  Download,
  Award,
  RotateCcw,
  Home,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatTime, downloadSVGTrophy, downloadPNGFromSVG } from "../utils";
import { serif, mono } from "@/app/fonts";
import { cn } from "@/lib/utils";

interface VictoryModalProps {
  isOpen: boolean;
  moves: number;
  timeSeconds: number;
  onPlayAgain: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  moves,
  timeSeconds,
  onPlayAgain,
}) => {
  const router = useRouter();
  const [playerName, setPlayerName] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState<"svg" | "png" | null>(null);

  const handleDownloadSVG = () => {
    setIsDownloading("svg");
    downloadSVGTrophy(moves, timeSeconds, playerName);
    setTimeout(() => setIsDownloading(null), 500);
  };

  const handleDownloadPNG = () => {
    setIsDownloading("png");
    downloadPNGFromSVG(moves, timeSeconds, playerName, () => {
      setIsDownloading(null);
    });
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent showCloseButton={false} className="sm:max-w-md bg-card/95 backdrop-blur-xl border-border text-foreground rounded-3xl p-6 sm:p-8">
        <DialogHeader className="text-center items-center">
          {/* Victory Trophy Icon Art Animated with motion/react */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative mx-auto size-20 sm:size-24 rounded-full bg-amber-500/10 border border-amber-400/30 flex items-center justify-center mb-3"
          >
            <Trophy className="size-10 sm:size-12 text-amber-400" />
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.2, 0.9] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-2 right-2"
            >
              <Star className="size-4 text-amber-300" />
            </motion.div>
          </motion.div>

          <DialogTitle className={cn(serif.className, "text-2xl sm:text-3xl text-foreground font-normal tracking-tight")}>
            Victory Unlocked! 🎉
          </DialogTitle>

          <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
            You matched all 20 tiles in the 404 grid! Customize and download your trophy below.
          </DialogDescription>
        </DialogHeader>

        {/* Stats Summary Box */}
        <div className={cn(mono.className, "grid grid-cols-2 gap-3 bg-muted/40 border border-border rounded-2xl p-3 my-2 text-center")}>
          <div className="border-r border-border pr-2">
            <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Total Moves</div>
            <div className="text-2xl font-bold text-amber-400 mt-0.5">{moves}</div>
          </div>
          <div className="pl-2">
            <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Time Taken</div>
            <div className="text-2xl font-bold text-accent mt-0.5">{formatTime(timeSeconds)}</div>
          </div>
        </div>

        {/* Player Name Input Field */}
        <div className="space-y-1.5 text-left">
          <label className={cn(mono.className, "block text-[11px] font-medium text-muted-foreground uppercase tracking-wider ml-1")}>
            Player Name (Optional)
          </label>
          <div className="relative flex items-center">
            <User className="absolute left-3 size-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter Name for Trophy"
              maxLength={30}
              className={cn(mono.className, "pl-9 bg-background/50 border-border text-foreground text-xs sm:text-sm rounded-xl h-10")}
            />
          </div>
        </div>

        {/* Trophy & Card Download Buttons */}
        <div className="space-y-2 pt-2">
          <Button
            onClick={handleDownloadSVG}
            disabled={isDownloading !== null}
            className="w-full gap-2 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloading === "svg" ? "Generating SVG..." : "Download SVG Trophy"}</span>
          </Button>

          <Button
            variant="outline"
            onClick={handleDownloadPNG}
            disabled={isDownloading !== null}
            className="w-full gap-2 rounded-xl border-border bg-background/40 hover:bg-muted text-foreground font-medium"
          >
            <Award className="w-4 h-4 text-emerald-400" />
            <span>{isDownloading === "png" ? "Converting to PNG..." : "Download PNG Trophy"}</span>
          </Button>
        </div>

        {/* Action Buttons: Play Again & Go Home */}
        <DialogFooter className="flex flex-row gap-2 sm:justify-stretch pt-2">
          <Button
            variant="secondary"
            onClick={onPlayAgain}
            className={cn(mono.className, "flex-1 gap-2 rounded-xl text-xs h-10")}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Play Again</span>
          </Button>
          <Button
            onClick={() => router.push("/")}
            className={cn(mono.className, "flex-1 gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs h-10")}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Go Home</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

