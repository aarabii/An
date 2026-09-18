import type { Metadata } from "next";

import { PageNav, JsonLd } from "@/components/common";

import RepeatSeparator from "@/components/ui/repeat-separator";
import { getAllProjects } from "@/sanity/lib/queries";
import { AllProjects, GitHubRepos } from "./_components";
import {
  PAGE_SEO,
  createPageMetadata,
  getCollectionPageJsonLd,
  getBreadcrumbJsonLd,
} from "@/constant";

export const metadata: Metadata = createPageMetadata(PAGE_SEO.projects);

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  const jsonLd = [
    getCollectionPageJsonLd(
      PAGE_SEO.projects.title,
      PAGE_SEO.projects.description,
      PAGE_SEO.projects.path,
    ),
    getBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Projects", url: "/projects" },
    ]),
  ];

  return (
    <div className="min-h-screen">
      <JsonLd data={jsonLd} />
      {/* Breadcrumb Path Navigation */}
      <PageNav />
      <RepeatSeparator />

      {/* All Curated Projects (Featured & Other) */}
      <AllProjects projects={projects} />
      <RepeatSeparator />

      {/* GitHub Repositories (Search + Horizontal Cards + Infinite Scroll) */}
      <GitHubRepos />
      <RepeatSeparator />
    </div>
  );
}
