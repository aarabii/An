import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";

import type { BlogPost } from "@/types/blog";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/date";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
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
                "group/card flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card/60 transition-all duration-200 hover:border-foreground/25 hover:bg-card/90",
                className
            )}
        >
            {/* Blog Cover Image Preview */}
            <div className="px-4">
                <Link
                    href={`/blogs/${blog.slug}`}
                    className="block overflow-hidden rounded-md"
                >
                    <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border/50 bg-muted/40">
                        {coverImageUrl ? (
                            <Image
                                src={coverImageUrl}
                                alt={blog.coverImage?.alt || blog.title}
                                fill
                                sizes="(min-width: 768px) 50vw, 100vw"
                                className="object-cover object-center transition-transform duration-300 ease-out group-hover/card:scale-[1.03]"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center font-mono text-xs text-muted-foreground">
                                No cover image
                            </div>
                        )}
                    </div>
                </Link>
            </div>

            {/* Header: Title */}
            <CardHeader className="gap-2">
                <CardTitle className="text-base font-semibold tracking-tight text-foreground transition-colors group-hover/card:text-primary">
                    <Link
                        href={`/blogs/${blog.slug}`}
                        className="hover:underline underline-offset-4"
                    >
                        {blog.title}
                    </Link>
                </CardTitle>
            </CardHeader>

            {/* Content: Description and Tags */}
            <CardContent className="flex flex-1 flex-col justify-between gap-3">
                <CardDescription className="line-clamp-2 min-h-10 text-xs/relaxed text-muted-foreground">
                    {blog.description}
                </CardDescription>

                <div className="flex flex-wrap gap-1.5">
                    {blog.tags?.slice(0, 4).map((tag) => (
                        <Badge
                            key={tag}
                            variant="outline"
                            className="rounded-md font-mono text-[0.625rem] text-muted-foreground"
                        >
                            {tag}
                        </Badge>
                    ))}
                    {blog.tags && blog.tags.length > 4 && (
                        <Badge
                            variant="outline"
                            className="rounded-md font-mono text-[0.625rem] text-muted-foreground/60"
                        >
                            +{blog.tags.length - 4}
                        </Badge>
                    )}
                </div>
            </CardContent>

            {/* Footer: Date on Left, Read Button on Right */}
            <CardFooter className="mt-auto border-t pt-3">
                <div className="flex w-full items-center justify-between gap-2">
                    <time
                        dateTime={blog.date}
                        className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground"
                    >
                        <Calendar className="size-3.5 text-muted-foreground/80" />
                        <span>{formattedDate}</span>
                    </time>

                    <Button
                        nativeButton={false}
                        variant="outline"
                        size="sm"
                        className="gap-1.5 px-3 group-hover/card:border-foreground/30"
                        render={<Link href={`/blogs/${blog.slug}`} />}
                    >
                        <span>Read</span>
                        <ArrowRight
                            data-icon="inline-end"
                            className="size-3.5 transition-transform duration-200 group-hover/card:translate-x-0.5"
                        />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default BlogCard;
