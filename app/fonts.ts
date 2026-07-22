import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";

export const main = Geist({
  variable: "--font-main",
  subsets: ["latin"],
});

export const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const mono = Geist_Mono({
  variable: "--font-mono",
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
  variable: "--font-heading",
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
  variable: "--font-signature",
  display: "swap",
});
