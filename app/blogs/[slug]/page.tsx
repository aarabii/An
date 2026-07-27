import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getPostContent } from "@/lib/notion";
import BlogPostClient from "./_components/BlogPostClient";
import { constructMetadata, generateArticleJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import { SITE_SEO } from "@/constant/seo";

export const revalidate = 86400; // Revalidate post content once a day (86400 seconds)

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return constructMetadata({
      title: "Post Not Found",
      noIndex: true,
    });
  }

  const { title, description, keywords, coverUrl, date } = post.meta;

  return constructMetadata({
    title,
    description: description || `Read ${title} by Aarab Nishchal`,
    keywords: keywords.length > 0 ? keywords : ["Aarab Nishchal", "Blog"],
    image: coverUrl,
    path: `/blogs/${slug}`,
    type: "article",
    publishedTime: date,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const markdownContent = await getPostContent(post.id);

  const articleJsonLd = generateArticleJsonLd({
    title: post.meta.title,
    description:
      post.meta.description || `Read ${post.meta.title} by Aarab Nishchal`,
    url: `${SITE_SEO.siteUrl}/blogs/${slug}`,
    datePublished: post.meta.date,
    image: post.meta.coverUrl,
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blogs" },
    { name: post.meta.title, url: `/blogs/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd]),
        }}
      />
      <BlogPostClient post={post} markdownContent={markdownContent} />
    </>
  );
}
