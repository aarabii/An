import {
  FaDog,
  FaCat,
  FaFrog,
  FaHippo,
  FaOtter,
  FaFishFins,
  FaDragon,
  FaGhost,
  FaSpider,
  FaRocket,
} from "react-icons/fa6";
import { IconDefinition } from "./types";

// 10 unique icons with clean matte color themes (NO glow)
export const ICON_POOL: IconDefinition[] = [
  { id: "dog", name: "Loyal Dog", icon: FaDog, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
  { id: "cat", name: "Curious Cat", icon: FaCat, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/30" },
  { id: "frog", name: "Hop Frog", icon: FaFrog, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30" },
  { id: "hippo", name: "Mighty Hippo", icon: FaHippo, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30" },
  { id: "otter", name: "Playful Otter", icon: FaOtter, color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/30" },
  { id: "fish", name: "Neon Fish", icon: FaFishFins, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" },
  { id: "dragon", name: "Fire Dragon", icon: FaDragon, color: "text-red-400", bg: "bg-red-500/10 border-red-500/30" },
  { id: "ghost", name: "Pixel Ghost", icon: FaGhost, color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/30" },
  { id: "spider", name: "Web Spider", icon: FaSpider, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/30" },
  { id: "rocket", name: "Space Rocket", icon: FaRocket, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/30" },
];

// 3x3 Matrices defining the "4", "0", "4" digit tile placements
// 1 = active tile, 0 = empty space
export const DIGIT_4 = [
  [1, 0, 1],
  [1, 1, 1],
  [0, 0, 1],
]; // 6 tiles

export const DIGIT_0 = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
]; // 8 tiles
