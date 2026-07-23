import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getPostContent } from "@/lib/notion";
import BlogPostClient from "./_components/BlogPostClient";

export const revalidate = 60; // Revalidate post content every 60 seconds

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Aarab Nishchal",
    };
  }

  const { title, description, keywords, coverUrl, date } = post.meta;

  return {
    title: `${title} | Aarab Nishchal`,
    description: description || `Read ${title} by Aarab Nishchal`,
    keywords: keywords.length > 0 ? keywords : ["Aarab Nishchal", "Blog"],
    authors: [{ name: "Aarab Nishchal", url: "https://aarab.vercel.app" }],
    metadataBase: new URL("https://aarab.vercel.app"),
    alternates: {
      canonical: `/blogs/${slug}`,
    },
    openGraph: {
      title,
      description: description || `Read ${title} by Aarab Nishchal`,
      type: "article",
      publishedTime: date,
      url: `https://aarab.vercel.app/blogs/${slug}`,
      siteName: "Aarab Nishchal Portfolio",
      images: coverUrl ? [{ url: coverUrl }] : [],
    },
    twitter: {
      card: coverUrl ? "summary_large_image" : "summary",
      title,
      description: description || `Read ${title} by Aarab Nishchal`,
      creator: "@aarab_nishchal",
      images: coverUrl ? [coverUrl] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const markdownContent = await getPostContent(post.id);

  return <BlogPostClient post={post} markdownContent={markdownContent} />;
}
