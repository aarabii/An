import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";

const manrope = localFont({
  src: "../assets/fonts/manrope.ttf",
});

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
  keywords: [
    "Aarab Nishchal",
    "Aarab",
    "Nishchal",
    "aarabii",
    "aarab",
    "portfolio",
    "developer",
    "web developer",
    "web",
    "developer",
    "web development",
    "web design",
    "design",
    "react",
    "next",
    "nextjs",
    "tailwind",
    "framer-motion",
  ],
  openGraph: {
    title: "Aarab Nishchal",
    description:
      "I'm a student developer who loves building web apps for fun. I enjoy experimenting with technologies to create free, useful tools that everyone can enjoy.",
    images: [{ url: "/thumbnail.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aarab Nishchal",
    description:
      "I'm a student developer who loves building web apps for fun. I enjoy experimenting with technologies to create free, useful tools that everyone can enjoy.",
    images: [{ url: "/thumbnail.png" }],
    creator: "@aarab_ii",
  },
  alternates: {
    canonical: "/",
  },
  icons: "/logo.svg",
  metadataBase: new URL("https://aarab.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} className={`scroll-smooth`}>
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
