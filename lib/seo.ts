import type { Metadata } from "next";
import {
  SITE_SEO,
  type ConstructMetadataOptions,
} from "@/constant/seo";

/**
 * Constructs a fully compliant Next.js Metadata object with centralized SEO fallbacks.
 */
export function constructMetadata({
  title,
  useTitleTemplate = false,
  description,
  keywords,
  image,
  path = "/",
  type = "website",
  publishedTime,
  authors,
  noIndex = false,
}: ConstructMetadataOptions = {}): Metadata {
  const metaTitle = title ? title : SITE_SEO.siteTitle;
  const metaDescription = description || SITE_SEO.defaultDescription;
  const metaKeywords = keywords?.length
    ? keywords
    : Array.from(SITE_SEO.defaultKeywords);
  const metaImage = image || SITE_SEO.defaultOgImage;
  const canonicalUrl = `${SITE_SEO.siteUrl}${path}`;

  return {
    title: useTitleTemplate
      ? {
          default: metaTitle,
          template: SITE_SEO.titleTemplate,
        }
      : metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    authors: authors || [{ name: SITE_SEO.author.name, url: SITE_SEO.author.url }],
    creator: SITE_SEO.creator,
    publisher: SITE_SEO.publisher,
    metadataBase: new URL(SITE_SEO.siteUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: SITE_SEO.siteName,
      locale: SITE_SEO.locale,
      type: type,
      ...(publishedTime && { publishedTime }),
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: metaImage ? "summary_large_image" : "summary",
      title: metaTitle,
      description: metaDescription,
      creator: SITE_SEO.twitterHandle,
      images: [metaImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : SITE_SEO.robotsDefault,
  };
}

/**
 * JSON-LD Schema Generator for Person / Profile
 */
export function generatePersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_SEO.author.name,
    url: SITE_SEO.siteUrl,
    email: SITE_SEO.author.email,
    jobTitle: "AI Engineer Intern & Full-Stack Developer",
    sameAs: Array.from(SITE_SEO.socialLinks),
  };
}

/**
 * JSON-LD Schema Generator for WebSite
 */
export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_SEO.siteName,
    url: SITE_SEO.siteUrl,
    description: SITE_SEO.defaultDescription,
    author: {
      "@type": "Person",
      name: SITE_SEO.author.name,
    },
    publisher: {
      "@type": "Person",
      name: SITE_SEO.author.name,
    },
    hasPart: [
      {
        "@type": "WebPage",
        name: "Projects & Selected Works",
        url: `${SITE_SEO.siteUrl}/projects`,
      },
      {
        "@type": "WebPage",
        name: "Blog & Technical Articles",
        url: `${SITE_SEO.siteUrl}/blogs`,
      },
      {
        "@type": "WebPage",
        name: "Resume & Curriculum Vitae",
        url: `${SITE_SEO.siteUrl}/resume`,
      },
      {
        "@type": "DigitalDocument",
        name: "Aarab Nishchal Resume PDF",
        fileFormat: "application/pdf",
        url: `${SITE_SEO.siteUrl}/direct-resume`,
      },
      {
        "@type": "WebPage",
        name: "License",
        url: `${SITE_SEO.siteUrl}/license`,
      },
    ],
  };
}

/**
 * JSON-LD Schema Generator for Site Navigation (Google Sitelinks)
 */
export function generateSiteNavigationJsonLd() {
  const baseUrl = SITE_SEO.siteUrl;

  const siteLinks = [
    {
      name: "Projects & Selected Works",
      description:
        "Explore full-stack web applications, AI tools, and open-source GitHub repositories created by Aarab Nishchal.",
      url: `${baseUrl}/projects`,
    },
    {
      name: "Blog & Technical Articles",
      description:
        "Read technical articles and insights on full-stack development, Next.js, and AI engineering.",
      url: `${baseUrl}/blogs`,
    },
    {
      name: "Resume & Curriculum Vitae",
      description:
        "Professional background, technical skills, education, and career experience of Aarab Nishchal.",
      url: `${baseUrl}/resume`,
    },
    {
      name: "Direct Resume PDF",
      description:
        "Direct view and download of the official resume PDF of Aarab Nishchal.",
      url: `${baseUrl}/direct-resume`,
    },
    {
      name: "License & Terms",
      description:
        "Software license, usage permissions, and copyright terms for portfolio source code.",
      url: `${baseUrl}/license`,
    },
  ];

  return siteLinks.map((item, index) => ({
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    position: index + 1,
    name: item.name,
    description: item.description,
    url: item.url,
  }));
}

/**
 * JSON-LD Schema Generator for Blog Articles
 */
export function generateArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  image,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  image?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    author: {
      "@type": "Person",
      name: SITE_SEO.author.name,
      url: SITE_SEO.siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: SITE_SEO.author.name,
    },
    ...(image && { image: [image] }),
  };
}
