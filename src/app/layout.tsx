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
                <div className="relative mx-auto min-h-screen w-full max-w-178 border-x border-border">
                    <Navbar />
                    <main className="relative z-10 flex-1">{children}</main>
                    {/* <Footer /> */}
                </div>
            </body>
        </html>
    );
}
