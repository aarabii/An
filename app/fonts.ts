import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

export const main = Geist({
  variable: "--font-mainFont",
  subsets: ["latin"],
});

export const mono = Geist_Mono({
  variable: "--font-monoFont",
  subsets: ["latin"],
});

export const heading = localFont({
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

export const signature = localFont({
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

export const respira = localFont({
  src: [
    {
      path: "../assets/fonts/respira-black.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-respiraFont",
  display: "swap",
});
