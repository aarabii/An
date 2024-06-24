import { Manrope, Moon_Dance, Nova_Square, Square_Peg } from "next/font/google";

export const Manropes = Manrope({
  subsets: ["latin"],
  style: "normal",
  fallback: ["system-ui", "arial", "sans-serif"],
  preload: true,
});

export const MoonDance = Moon_Dance({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  fallback: ["cursive", "sans-serif"],
  preload: true,
});

export const NovaSquare = Nova_Square({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  fallback: ["cursive", "sans-serif"],
  preload: true,
});

export const SquarePeg = Square_Peg({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  fallback: ["cursive", "sans-serif"],
  preload: true,
});
