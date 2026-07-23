import type { Metadata } from "next";
import LicenseClient from "./_components/LicenseClient";
import { constructMetadata } from "@/lib/seo";
import { PAGE_SEO } from "@/constant/seo";

export const metadata: Metadata = constructMetadata(PAGE_SEO.license);

export default function LicensePage() {
  return <LicenseClient />;
}
