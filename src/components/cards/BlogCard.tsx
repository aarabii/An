import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";

import type { BlogPost } from "@/types/blog";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/date";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  blog: BlogPost;
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, className }) => {
  const coverImageUrl = blog.coverImage
    ? urlFor(blog.coverImage).width(720).height(405).quality(85).url()
    : null;

  const formattedDate = formatDate(blog.date);

  return (
    <Card
      className={cn(
        "group/card flex flex-col justify-between overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-150 hover:border-border/80 hover:shadow-md",
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        {/* Blog Cover Image Preview */}
        <Link
          href={`/blogs/${blog.slug}`}
          className="block overflow-hidden rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border bg-muted/40">
            {coverImageUrl ? (
              <Image
                src={coverImageUrl}
                alt={blog.coverImage?.alt || blog.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-center"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-mono text-xs text-muted-foreground">
                No cover image
              </div>
            )}
          </div>
        </Link>

        {/* Header: Title */}
        <div className="min-w-0">
          <h3 className="font-heading text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
            <Link
              href={`/blogs/${blog.slug}`}
              className="rounded-sm transition-colors duration-150 hover:underline underline-offset-4 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {blog.title}
            </Link>
          </h3>
        </div>

        {/* Content: Description and Tags */}
        <div className="flex flex-col gap-3 min-w-0">
          <p className="line-clamp-2 font-para text-sm leading-relaxed text-muted-foreground">
            {blog.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {blog.tags?.slice(0, 4).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="rounded-sm font-mono text-xs text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
            {blog.tags && blog.tags.length > 4 && (
              <Badge
                variant="outline"
                className="rounded-sm font-mono text-xs text-muted-foreground"
              >
                +{blog.tags.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Footer: Date on Left, Read Button on Right */}
      <div className="mt-6 flex w-full items-center justify-between gap-2 border-t border-border pt-4">
        <time
          dateTime={blog.date}
          className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground"
        >
          <Calendar className="size-4 text-muted-foreground" />
          <span>{formattedDate}</span>
        </time>

        <Button
          nativeButton={false}
          variant="outline"
          size="sm"
          render={<Link href={`/blogs/${blog.slug}`} />}
        >
          <span>Read</span>
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </Card>
  );
};

export default BlogCard;
