import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import type { Metadata } from "next";
import "./globals.css";

import { Manropes } from "./fonts";
import keywords from "./keywords";

export const metadata: Metadata = {
  title: "Aarab Nishchal",
  description:
    "I'm a student developer who loves building web apps for fun. I enjoy experimenting with technologies to create free, useful tools that everyone can enjoy.",
  authors: [
    {
      name: "Aarab Nishchal",
      url: "https://aarab.vercel.app",
    },
  ],
  creator: "Aarab Nishchal",
  referrer: "origin-when-cross-origin",
  keywords: keywords,
  openGraph: {
    title: "Aarab Nishchal",
    description:
      "I'm a student developer who loves building web apps for fun. I enjoy experimenting with technologies to create free, useful tools that everyone can enjoy.",
    images: [{ url: "/images/thumbnail.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aarab Nishchal",
    description:
      "I'm a student developer who loves building web apps for fun. I enjoy experimenting with technologies to create free, useful tools that everyone can enjoy.",
    images: [{ url: "/images/thumbnail.png" }],
    creator: "@aarab_ii",
  },
  alternates: {
    canonical: "/",
  },
  icons: "/images/logo.svg",
  metadataBase: new URL("https://aarab.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Manropes.className}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
