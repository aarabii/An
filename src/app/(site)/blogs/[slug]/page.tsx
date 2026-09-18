import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";

import { Container, PageNav, JsonLd } from "@/components/common";

import RepeatSeparator from "@/components/ui/repeat-separator";
import { Badge } from "@/components/ui/badge";
import { CustomPortableText } from "@/components/portable-text";
import { getBlogBySlug, getAllBlogSlugs } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/date";
import {
  SITE_CONFIG,
  createPageMetadata,
  getArticleJsonLd,
  getBreadcrumbJsonLd,
} from "@/constant";

interface BlogArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return createPageMetadata({
      title: "Blog Not Found",
      description: "The requested blog article could not be found.",
      path: `/blogs/${slug}`,
      noIndex: true,
    });
  }

  const ogImageUrl = blog.coverImage
    ? urlFor(blog.coverImage).width(1200).height(630).quality(85).url()
    : `${SITE_CONFIG.url}${SITE_CONFIG.defaultOgImage}`;

  return createPageMetadata({
    title: `${blog.title} | Blogs`,
    description:
      blog.description ||
      `Read ${blog.title} by Aarab Nishchal — technical insights on AI systems, full-stack architecture, and software craftsmanship.`,
    path: `/blogs/${slug}`,
    ogType: "article",
    ogImage: ogImageUrl,
    ogImageAlt: blog.coverImage?.alt || blog.title,
    publishedTime: blog.date,
    authors: [SITE_CONFIG.name],
    tags: blog.tags || [],
    keywords: [
      blog.title,
      ...(blog.tags || []),
      "AI Engineering",
      "Next.js",
      "Software Craftsmanship",
    ],
    category: "Technology",
  });
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const coverImageUrl = blog.coverImage
    ? urlFor(blog.coverImage).width(1200).height(675).quality(90).url()
    : null;

  const lqip =
    typeof blog.coverImage === "object"
      ? blog.coverImage?.asset?.metadata?.lqip
      : null;

  const formattedDate = formatDate(blog.date);

  const jsonLd = [
    getArticleJsonLd({
      title: blog.title,
      description: blog.description,
      slug,
      date: blog.date,
      tags: blog.tags,
      coverImage: coverImageUrl,
    }),
    getBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Blogs", url: "/blogs" },
      { name: blog.title, url: `/blogs/${slug}` },
    ]),
  ];

  return (
    <div className="min-h-screen">
      <JsonLd data={jsonLd} />
      {/* Breadcrumb Navigation */}
      <PageNav
        items={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: blog.title },
        ]}
      />
      <RepeatSeparator />

      {/* Article Overview */}
      <Container id="overview" className="flex flex-col gap-8">
        {/* Header Information: Title, Date, Description */}
        <div className="flex flex-col gap-4">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {blog.title}
          </h1>

          {/* Metadata: Date and initial tags */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
            <time dateTime={blog.date} className="flex items-center gap-1.5">
              <Calendar className="size-3.5 text-muted-foreground" />
              <span>{formattedDate}</span>
            </time>
            {blog.tags && blog.tags.length > 0 && (
              <span className="text-border">•</span>
            )}
            {blog.tags?.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="font-mono text-xs text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground font-para max-w-prose">
            {blog.description}
          </p>
        </div>

        {/* Framed Cover Image */}
        {coverImageUrl && (
          <div className="overflow-hidden rounded-xl border border-border bg-card p-2 sm:p-3 shadow-md">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted select-none">
              <Image
                src={coverImageUrl}
                alt={blog.coverImage?.alt || blog.title}
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                placeholder={lqip ? "blur" : "empty"}
                blurDataURL={lqip || undefined}
                className="object-cover object-center"
              />
            </div>
          </div>
        )}

        {/* Tags & Topics Area */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-6 shadow-sm">
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Tags & Topics
            </span>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="font-mono text-xs px-2.5 py-1 text-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Container>

      <RepeatSeparator />

      {/* Rendered PortableText Content */}
      {blog.content && blog.content.length > 0 && (
        <>
          <Container id="article-content">
            <article className="prose prose-invert max-w-prose font-para mx-auto">
              <CustomPortableText value={blog.content} />
            </article>
          </Container>
          <RepeatSeparator />
        </>
      )}
    </div>
  );
}
