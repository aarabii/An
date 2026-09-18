import type { Metadata, Viewport } from "next";
import "@/app/globals.css";

import { cn } from "@/lib/utils";
import { oxaniumHeading, manrope, jetBrainMono, lora } from "@/app/font";
import {
  SITE_CONFIG,
  PAGE_SEO,
  getPersonJsonLd,
  getWebSiteJsonLd,
} from "@/constant";
import { JsonLd } from "@/components/common";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: SITE_CONFIG.themeColor },
    { media: "(prefers-color-scheme: dark)", color: SITE_CONFIG.themeColor },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: SITE_CONFIG.titleTemplate,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  generator: "Next.js",
  keywords: PAGE_SEO.home.keywords,
  referrer: "origin-when-cross-origin",
  category: "Technology",

  alternates: {
    canonical: SITE_CONFIG.url,
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  icons: {
    icon: [
      { url: SITE_CONFIG.mainIcon, type: "image/svg+xml" },
      { url: SITE_CONFIG.favicon, sizes: "any" },
    ],
    apple: [
      { url: SITE_CONFIG.appleIcon, sizes: "180x180", type: "image/png" },
    ],
    shortcut: [SITE_CONFIG.favicon],
  },

  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    type: "website",
    images: [
      {
        url: `${SITE_CONFIG.url}${SITE_CONFIG.defaultOgImage}`,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.defaultOgImageAlt,
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    site: SITE_CONFIG.twitterHandle,
    creator: SITE_CONFIG.twitterCreator,
    images: [`${SITE_CONFIG.url}${SITE_CONFIG.defaultOgImage}`],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalJsonLd = [getPersonJsonLd(), getWebSiteJsonLd()];

  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        oxaniumHeading.variable,
        manrope.variable,
        jetBrainMono.variable,
        lora.variable,
      )}
    >
      <head>
        <JsonLd data={globalJsonLd} />
      </head>
      {children}
    </html>
  );
}
