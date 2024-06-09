import type { Metadata } from "next";
import "./globals.css";
import data from "@/constants/details.json";

import localFont from "next/font/local";

const manrope = localFont({
  src: "../assets/fonts/manrope.ttf",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Aarab Nishchal",
    default: "Aarab Nishchal",
  },
  description: data.desc,
  icons: [
    {
      rel: "icon",
      href: "/logo.svg",
      sizes: "any",
      url: "https://aarab.vercel.app/logo.svg",
    },
  ],
  referrer: "origin-when-cross-origin",
  metadataBase: new URL("https://aarab.vercel.app"),
  keywords: [
    "Aarab",
    "Nishchal",
    "aarab nishchal",
    "react",
    "reactJs",
    "react portfolio",
    "portfolio",
    "portfolio website",
    "losier",
    "twexy",
    "caya",
  ],
  openGraph: {
    title: data.name,
    description: data.desc,
    url: "https://aarab.vercel.app",
    type: "website",
    images: [
      {
        url: "https://aarab.vercel.app/logo.svg",
        width: 800,
        height: 600,
        alt: `${data.name}'s Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: data.socials.links.twitter,
    title: data.name,
    description: data.desc,
    images: ["https://aarab.vercel.app/logo.svg"],
  },
  alternates: {
    canonical: "https://aarab.vercel.app",
  },
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
