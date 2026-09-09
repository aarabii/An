import type { Metadata } from "next";
import LicenseClient from "./_components/LicenseClient";
import { constructMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";
import { PAGE_SEO, SITE_SEO } from "@/constant/seo";

export const metadata: Metadata = constructMetadata(PAGE_SEO.license);

export default function LicensePage() {
  const licenseJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: PAGE_SEO.license.title,
    description: PAGE_SEO.license.description,
    url: `${SITE_SEO.siteUrl}/license`,
    author: {
      "@type": "Person",
      name: SITE_SEO.author.name,
      url: SITE_SEO.siteUrl,
    },
  };

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "License", url: "/license" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([licenseJsonLd, breadcrumbJsonLd]),
        }}
      />
      <LicenseClient />
    </>
  );
}

