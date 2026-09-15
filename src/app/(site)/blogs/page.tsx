import type { Metadata } from "next";

import { PageNav } from "@/components/common";
import RepeatSeparator from "@/components/ui/repeat-separator";
import { getAllBlogs } from "@/sanity/lib/queries";
import { AllBlogs } from "./_components";

export const metadata: Metadata = {
  title: "Blogs | Aarab Nishchal",
  description:
    "Thoughts, deep dives, and articles on full-stack development, software craftsmanship, and technology.",
};

export default async function BlogsPage() {
  const blogs = await getAllBlogs();

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Path Navigation */}
      <PageNav />
      <RepeatSeparator />

      {/* All Blogs */}
      <AllBlogs blogs={blogs} />
    </div>
  );
}
