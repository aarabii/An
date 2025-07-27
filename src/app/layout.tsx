import "./globals.css";
import type { Metadata } from "next";

import { inter } from "./fonts";

import { keywords } from "@/constant/keywords";

export const metadata: Metadata = {
  title: "Aarab Nishchal",
  description:
    "Aarab Nishchal is a student developer passionate about building modern web apps with Next.js, React, and open-source tools. Explore his projects, experiments, and developer portfolio.",
  authors: [
    {
      name: "Aarab Nishchal",
      url: "https://aarab.vercel.app",
    },
  ],
  creator: "Aarab Nishchal",
  referrer: "origin-when-cross-origin",
  keywords: keywords,
  metadataBase: new URL("https://aarab.vercel.app"),

  // SEO Enhancements
  alternates: {
    canonical: "https://aarab.vercel.app",
  },
  icons: {
    icon: "/images/logo.svg",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // Open Graph for rich embeds (e.g., Discord, Facebook)
  openGraph: {
    title: "Aarab Nishchal",
    description:
      "Explore Aarab Nishchal’s portfolio featuring projects in React, Next.js, AI, and developer tools. Discover a world of creative web applications and open-source experiments.",
    url: "https://aarab.vercel.app",
    siteName: "Aarab Nishchal",
    images: [
      {
        url: "/images/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Aarab Nishchal Portfolio Thumbnail",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Aarab Nishchal",
    description:
      "Check out Aarab Nishchal’s personal portfolio and dev projects using Next.js, React, Tailwind, and modern web tech.",
    images: ["/images/thumbnail.png"],
    creator: "@aarab_ii",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
