import type { Metadata } from "next";
import "./globals.css";

import { cn } from "@/lib/utils";

import { oxaniumHeading, manrope, jetBrainMono } from "./font";

export const metadata: Metadata = {
    title: "Aarab Nishchal",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={cn(
                "h-full",
                "antialiased",
                oxaniumHeading.variable,
                manrope.variable,
                jetBrainMono.variable,
                "font-sans",
            )}
        >
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}
