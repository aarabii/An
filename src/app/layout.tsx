import type { Metadata } from "next";
import "./globals.css";

import { cn } from "@/lib/utils";

import { oxaniumHeading, manrope, jetBrainMono } from "./font";
import Navbar from "@/components/common/Navbar";

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
            <body className="min-h-full flex flex-col">
                <div className="relative min-h-screen">
                    <div className="pointer-events-none absolute top-0 bottom-0 -left-2 z-0 w-2 border-r border-primary md:-left-6 md:w-6" />
                    <div className="pointer-events-none absolute top-0 -right-2 bottom-0 z-0 w-2 border-l border-primary md:-right-6 md:w-6" />
                    <Navbar />

                    <div className="relative z-10">
                        {children}
                        {/*Footer*/}
                    </div>
                </div>
            </body>
        </html>
    );
}
