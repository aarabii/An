import { Oxanium, Manrope, JetBrains_Mono, Lora } from "next/font/google";

export const oxaniumHeading = Oxanium({
    subsets: ["latin"],
    variable: "--font-heading",
});

export const manrope = Manrope({ subsets: ["latin"], variable: "--font-para" });

export const jetBrainMono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
});

export const lora = Lora({
    subsets: ["latin"],
    variable: "--font-serif",
    style: ["normal", "italic"],
});
