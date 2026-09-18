import type { Metadata } from "next";

import { PageNav, JsonLd } from "@/components/common";

import RepeatSeparator from "@/components/ui/repeat-separator";
import { getAllBlogs } from "@/sanity/lib/queries";
import { AllBlogs } from "./_components";
import {
  PAGE_SEO,
  createPageMetadata,
  getCollectionPageJsonLd,
  getBreadcrumbJsonLd,
} from "@/constant";

export const metadata: Metadata = createPageMetadata(PAGE_SEO.blogs);

export default async function BlogsPage() {
  const blogs = await getAllBlogs();

  const jsonLd = [
    getCollectionPageJsonLd(
      PAGE_SEO.blogs.title,
      PAGE_SEO.blogs.description,
      PAGE_SEO.blogs.path,
    ),
    getBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Blogs", url: "/blogs" },
    ]),
  ];

  return (
    <div className="min-h-screen">
      <JsonLd data={jsonLd} />
      {/* Breadcrumb Path Navigation */}
      <PageNav />
      <RepeatSeparator />

      {/* All Blogs */}
      <AllBlogs blogs={blogs} />
    </div>
  );
}
