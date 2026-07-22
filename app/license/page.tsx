import type { Metadata } from "next";
import LicenseClient from "./_components/LicenseClient";

export const metadata: Metadata = {
  title: "License & Usage Terms | Aarab Nishchal",
  description:
    "Official software license, usage permissions, restrictions, and copyright terms for Aarab Nishchal's portfolio source code and design system.",
  keywords: [
    "Aarab Nishchal",
    "Portfolio License",
    "Software License",
    "Open Source License",
    "Usage Rights",
    "Code Copyright",
    "Terms of Use",
    "Developer Portfolio License",
    "Next.js Portfolio Template License",
  ],
  authors: [
    {
      name: "Aarab Nishchal",
      url: "https://aarab.vercel.app",
    },
  ],
  creator: "Aarab Nishchal",
  publisher: "Aarab Nishchal",
  metadataBase: new URL("https://aarab.vercel.app"),
  alternates: {
    canonical: "/license",
  },
  openGraph: {
    title: "License & Usage Terms | Aarab Nishchal",
    description:
      "Official software license, usage permissions, restrictions, and copyright terms for Aarab Nishchal's portfolio source code and design system.",
    url: "https://aarab.vercel.app/license",
    siteName: "Aarab Nishchal Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "License & Usage Terms | Aarab Nishchal",
    description:
      "Official software license, usage permissions, restrictions, and copyright terms for Aarab Nishchal's portfolio source code and design system.",
    creator: "@aarab_nishchal",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function LicensePage() {
  return <LicenseClient />;
}
