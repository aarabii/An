import type { Metadata } from "next";
import { getAllPosts } from "@/lib/notion";
import BlogsClient from "./_components/BlogsClient";
import { constructMetadata } from "@/lib/seo";
import { PAGE_SEO } from "@/constant/seo";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = constructMetadata(PAGE_SEO.blogs);

export default async function BlogsPage() {
  const posts = await getAllPosts();
  return <BlogsClient posts={posts} />;
}
