import type { Metadata } from "next";
import ResumeClient from "./_components/ResumeClient";
import {
  constructMetadata,
  generateProfilePageJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/seo";
import { PAGE_SEO } from "@/constant/seo";

export const metadata: Metadata = constructMetadata(PAGE_SEO.resume);

export default function ResumePage() {
  const profileJsonLd = generateProfilePageJsonLd();
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Resume", url: "/resume" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([profileJsonLd, breadcrumbJsonLd]),
        }}
      />
      <ResumeClient />
    </>
  );
}

