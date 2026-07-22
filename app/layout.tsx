import type { Metadata } from "next";
import "./globals.css";

import { cn } from "@/lib/utils";

import { main, heading, signature, mono, serif } from "@/app/fonts";
import { Background, PreLoader } from "@/components/mics";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Aarab Nishchal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        main.variable,
        heading.variable,
        signature.variable,
        mono.variable,
        serif.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <PreLoader />
        <div id="app-content" className="min-h-full flex flex-col flex-1">
          {children}
        </div>
        <Background />
        <Toaster />
      </body>
    </html>
  );
}
