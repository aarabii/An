import type { Metadata } from "next";
import "./globals.css";

import { cn } from "@/lib/utils";

import { main, heading, signature, mono, respira } from "@/app/fonts";
import { Background } from "@/components/mics";

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
        respira.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Background />
      </body>
    </html>
  );
}
