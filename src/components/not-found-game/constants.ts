import {
  GiTigerHead,
  GiFox,
  GiCat,
  GiSittingDog,
  GiElephant,
  GiBullyMinion,
  GiCrownedSkull,
  GiHumanTarget,
  GiJellyfish,
  GiKoala,
} from "react-icons/gi";
import type { IconItem, GridDigitPattern } from "./types";

export const GAME_ICONS: readonly IconItem[] = [
  {
    name: "Tiger",
    icon: GiTigerHead,
  },
  {
    name: "Fox",
    icon: GiFox,
  },
  {
    name: "Cat",
    icon: GiCat,
  },
  {
    name: "Dog",
    icon: GiSittingDog,
  },
  {
    name: "Elephant",
    icon: GiElephant,
  },
  {
    name: "Minion",
    icon: GiBullyMinion,
  },
  {
    name: "Skull",
    icon: GiCrownedSkull,
  },
  {
    name: "Target",
    icon: GiHumanTarget,
  },
  {
    name: "Jellyfish",
    icon: GiJellyfish,
  },
  {
    name: "Koala",
    icon: GiKoala,
  },
] as const;

export const TOTAL_PAIRS = 10;
export const TOTAL_TILES = 20;

export const DIGIT_4_PATTERN: GridDigitPattern = [
  [1, 0, 1],
  [1, 1, 1],
  [0, 0, 1],
];

export const DIGIT_0_PATTERN: GridDigitPattern = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

export const STORAGE_KEY = "portfolio_404_high_score";
export const TURN_TIMEOUT_MS = 3000;
export const MISMATCH_DELAY_MS = 450;

/**
 * Format total seconds to MM:SS display format.
 */
export const formatTime = (totalSeconds: number | null | undefined): string => {
  if (totalSeconds === null || totalSeconds === undefined) return "--:--";
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};
