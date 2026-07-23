import type { Metadata } from "next";
import ResumeClient from "./_components/ResumeClient";
import { constructMetadata } from "@/lib/seo";
import { PAGE_SEO } from "@/constant/seo";

export const metadata: Metadata = constructMetadata(PAGE_SEO.resume);

export default function ResumePage() {
  return <ResumeClient />;
}
