import type { Metadata } from "next";
import { getAllPosts } from "@/lib/notion";
import BlogsClient from "./_components/BlogsClient";
import {
  constructMetadata,
  generateBlogCollectionJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/seo";
import { PAGE_SEO } from "@/constant/seo";

export const revalidate = 86400; // Revalidate once a day (86400 seconds)

export const metadata: Metadata = constructMetadata(PAGE_SEO.blogs);

export default async function BlogsPage() {
  const posts = await getAllPosts();

  const collectionJsonLd = generateBlogCollectionJsonLd(
    posts.map((p) => ({
      title: p.title,
      slug: p.slug,
      description: p.description,
      date: p.date,
    }))
  );

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blogs" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([collectionJsonLd, breadcrumbJsonLd]),
        }}
      />
      <BlogsClient posts={posts} />
    </>
  );
}

