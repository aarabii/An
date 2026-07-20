import type { Metadata } from "next";
import "./globals.css";

import { cn } from "@/lib/utils";

import { mainFont, headingFont, signatureFont, cursiveFont } from "@/app/fonts";

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
        mainFont.variable,
        headingFont.variable,
        signatureFont.variable,
        cursiveFont.variable,
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
