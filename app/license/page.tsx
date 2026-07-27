import type { Metadata } from "next";
import LicenseClient from "./_components/LicenseClient";
import { constructMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";
import { PAGE_SEO } from "@/constant/seo";

export const metadata: Metadata = constructMetadata(PAGE_SEO.license);

export default function LicensePage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "License", url: "/license" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd]),
        }}
      />
      <LicenseClient />
    </>
  );
}

