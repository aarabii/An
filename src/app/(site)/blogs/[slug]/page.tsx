import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";

import { Container, PageNav } from "@/components/common";
import RepeatSeparator from "@/components/ui/repeat-separator";
import { Badge } from "@/components/ui/badge";
import { CustomPortableText } from "@/components/portable-text";
import { getBlogBySlug, getAllBlogSlugs } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/date";

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
    return {
      title: "Blog Not Found | Aarab Nishchal",
    };
  }

  const ogImage = blog.coverImage
    ? urlFor(blog.coverImage).width(1200).height(630).quality(85).url()
    : "/images/social_card.png";

  return {
    title: `${blog.title} | Blogs`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      publishedTime: blog.date,
      authors: ["Aarab Nishchal"],
      tags: blog.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blog.coverImage?.alt || blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [ogImage],
    },
  };
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

  const formattedDate = formatDate(blog.date);

  return (
    <div className="min-h-screen px-4">
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
      <Container
        id="overview"
        className="flex flex-col gap-8 px-6 sm:px-10 py-8 sm:py-12"
      >
        {/* Header Information: Title, Date, Description */}
        <div className="flex flex-col gap-4">
          <h1 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            {blog.title}
          </h1>

          {/* Metadata: Date and initial tags */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
            <time dateTime={blog.date} className="flex items-center gap-1.5">
              <Calendar className="size-3.5 text-muted-foreground/80" />
              <span>{formattedDate}</span>
            </time>
            {blog.tags && blog.tags.length > 0 && (
              <span className="text-border">•</span>
            )}
            {blog.tags?.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="font-mono text-[0.625rem] text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-para">
            {blog.description}
          </p>
        </div>

        {/* Framed Cover Image */}
        {coverImageUrl && (
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-2 sm:p-3 shadow-md">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted/40">
              <Image
                src={coverImageUrl}
                alt={blog.coverImage?.alt || blog.title}
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        )}

        {/* Tags & Topics Area */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-col gap-3 rounded-2xl border border-border/50 bg-card/40 p-5 sm:p-7 shadow-xs">
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Tags & Topics
            </span>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="font-mono text-xs px-2.5 py-1 text-foreground/90"
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
          <Container
            id="article-content"
            className="px-8 sm:px-10 py-8 sm:py-12"
          >
            <article className="prose prose-invert max-w-none font-para">
              <CustomPortableText value={blog.content} />
            </article>
          </Container>
          <RepeatSeparator />
        </>
      )}
    </div>
  );
}
