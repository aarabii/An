import { Metadata } from "next";
import { CreatePageMetadataOptions } from "./types";
import { SITE_CONFIG } from "./site_config";

/**
 * Reusable helper that produces an exhaustive Next.js Metadata object
 * adhering to Vercel standards and search engine best practices.
 */

export function createPageMetadata(
  options: CreatePageMetadataOptions,
): Metadata {
  const canonicalUrl = `${SITE_CONFIG.url}${options.path.startsWith("/") ? options.path : `/${options.path}`}`;
  const description = options.description || SITE_CONFIG.description;
  const ogImage =
    options.ogImage || `${SITE_CONFIG.url}${SITE_CONFIG.defaultOgImage}`;
  const ogImageAlt = options.ogImageAlt || options.title;
  const isArticle = options.ogType === "article";

  const allKeywords = Array.from(
    new Set([
      ...(options.keywords || []),
      SITE_CONFIG.name,
      "AI Engineer",
      "Full-Stack Developer",
      "Next.js",
      "TypeScript",
    ]),
  );

  return {
    title: options.absoluteTitle ? { absolute: options.title } : options.title,
    description,
    metadataBase: new URL(SITE_CONFIG.url),
    applicationName: SITE_CONFIG.name,
    authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
    generator: "Next.js",
    keywords: allKeywords,
    referrer: "origin-when-cross-origin",
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    category: options.category || "Technology",

    alternates: {
      canonical: canonicalUrl,
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
      title: options.title,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: options.ogType || "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
          type: "image/png",
        },
      ],
      ...(isArticle && {
        publishedTime: options.publishedTime,
        modifiedTime: options.modifiedTime,
        authors: options.authors || [SITE_CONFIG.name],
        tags: options.tags || options.keywords,
      }),
    },

    twitter: {
      card: "summary_large_image",
      title: options.title,
      description,
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterCreator,
      images: [ogImage],
    },

    robots: options.noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
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
}
