import { Oxanium, Manrope, JetBrains_Mono } from "next/font/google";

export const oxaniumHeading = Oxanium({
    subsets: ["latin"],
    variable: "--font-heading",
});

export const manrope = Manrope({ subsets: ["latin"], variable: "--font-para" });

export const jetBrainMono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
});
