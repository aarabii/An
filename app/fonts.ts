import { Geist } from "next/font/google";
import localFont from "next/font/local";

export const mainFont = Geist({
  variable: "--font-mainFont",
  subsets: ["latin"],
});

export const headingFont = localFont({
  src: [
    {
      path: "../assets/fonts/nasalization.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-headingFont",
  display: "swap",
});

export const signatureFont = localFont({
  src: [
    {
      path: "../assets/fonts/bastliga-one.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-signatureFont",
  display: "swap",
});

export const cursiveFont = localFont({
  src: [
    { path: "../assets/fonts/quentin.otf", weight: "400", style: "normal" },
  ],
  variable: "--font-cursiveFont",
  display: "swap",
});
