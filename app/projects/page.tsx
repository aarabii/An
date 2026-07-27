import type { Metadata } from "next";
import ProjectsClient from "./_components/ProjectsClient";
import {
  constructMetadata,
  generateProjectsItemListJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/seo";
import { PAGE_SEO } from "@/constant/seo";

export const metadata: Metadata = constructMetadata(PAGE_SEO.projects);

export default function ProjectsPage() {
  const projectsJsonLd = generateProjectsItemListJsonLd();
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([projectsJsonLd, breadcrumbJsonLd]),
        }}
      />
      <ProjectsClient />
    </>
  );
}

