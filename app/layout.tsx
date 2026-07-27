import type { Metadata } from "next";
import "./globals.css";

import { cn } from "@/lib/utils";

import { main, heading, signature, mono, serif } from "@/app/fonts";
import { Background, PreLoader } from "@/components/mics";
import { SmoothScrollProvider } from "@/components/common";
import { Toaster } from "@/components/ui/sonner";
import {
  constructMetadata,
  generatePersonJsonLd,
  generateWebSiteJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  useTitleTemplate: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = generatePersonJsonLd();
  const websiteJsonLd = generateWebSiteJsonLd();

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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personJsonLd, websiteJsonLd]),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>
          <PreLoader />
          <div id="app-content" className="min-h-full flex flex-col flex-1">
            {children}
          </div>
          <Background />
          <Toaster />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
