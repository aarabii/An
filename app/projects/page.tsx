import type { Metadata } from "next";
import ProjectsClient from "./_components/ProjectsClient";
import { constructMetadata } from "@/lib/seo";
import { PAGE_SEO } from "@/constant/seo";

export const metadata: Metadata = constructMetadata(PAGE_SEO.projects);

export default function ProjectsPage() {
  return <ProjectsClient />;
}
