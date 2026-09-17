import type { IconType } from "react-icons";

export interface TileData {
  id: number;
  iconIndex: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface IconItem {
  name: string;
  icon: IconType;
}

export type GridDigitPattern = number[][];
