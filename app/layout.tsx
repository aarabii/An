import type { Metadata } from "next";
import "./globals.css";

import { cn } from "@/lib/utils";

import { main, heading, signature, mono, serif } from "@/app/fonts";
import { Background } from "@/components/mics";
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
        {children}
        <Background />
        <Toaster />
      </body>
    </html>
  );
}
