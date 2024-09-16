import localFont from "next/font/local";

import { Manrope, Ballet, Red_Hat_Mono } from "next/font/google";

export const nasalization = localFont({
  src: "../assets/fonts/nasalization.otf",
  weight: "100",
  style: "normal",
  preload: true,
  fallback: ["arial", "Helvetica", "sans-serif"],
});

export const quentin = localFont({
  src: "../assets/fonts/quentin.otf",
  weight: "400",
  style: "normal",
  preload: true,
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const Manropes = Manrope({
  subsets: ["latin"],
  style: "normal",
  fallback: ["system-ui", "arial", "sans-serif"],
  preload: true,
});

export const redHat = Red_Hat_Mono({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  fallback: ["cursive", "sans-serif"],
  preload: true,
});
