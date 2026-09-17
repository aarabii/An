import { defineQuery } from "next-sanity";
import { client } from "../client";
import type { BlogPost } from "@/types/blog";

export const FEATURED_BLOGS_QUERY = defineQuery(
    `*[_type == "post" && defined(slug.current) && featured == true] | order(date desc) {
        _id,
        title,
        "slug": slug.current,
        description,
        coverImage {
            asset->{
                _id,
                url,
                metadata {
                    lqip,
                    dimensions {
                        width,
                        height,
                        aspectRatio
                    }
                }
            },
            alt,
            hotspot,
            crop
        },
        date,
        featured,
        tags
    }`
);

export const ALL_BLOGS_QUERY = defineQuery(
    `*[_type == "post" && defined(slug.current)] | order(date desc) {
        _id,
        title,
        "slug": slug.current,
        description,
        coverImage {
            asset->{
                _id,
                url,
                metadata {
                    lqip,
                    dimensions {
                        width,
                        height,
                        aspectRatio
                    }
                }
            },
            alt,
            hotspot,
            crop
        },
        date,
        featured,
        tags
    }`
);

export const BLOG_BY_SLUG_QUERY = defineQuery(
    `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        description,
        coverImage {
            asset->{
                _id,
                url,
                metadata {
                    lqip,
                    dimensions {
                        width,
                        height,
                        aspectRatio
                    }
                }
            },
            alt,
            hotspot,
            crop
        },
        date,
        featured,
        tags,
        content
    }`
);

export const BLOG_SLUGS_QUERY = defineQuery(
    `*[_type == "post" && defined(slug.current)] | order(date desc) [0...20] {
        "slug": slug.current
    }`
);

export async function getFeaturedBlogs(): Promise<BlogPost[]> {
    return await client.fetch(
        FEATURED_BLOGS_QUERY,
        {},
        {
            next: {
                revalidate: 60,
                tags: ["post"],
            },
        }
    );
}

export async function getAllBlogs(): Promise<BlogPost[]> {
    return await client.fetch(
        ALL_BLOGS_QUERY,
        {},
        {
            next: {
                revalidate: 60,
                tags: ["post"],
            },
        }
    );
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
    return await client.fetch(
        BLOG_BY_SLUG_QUERY,
        { slug },
        {
            next: {
                revalidate: 60,
                tags: ["post", `post:${slug}`],
            },
        }
    );
}

export async function getAllBlogSlugs(): Promise<string[]> {
    const results = await client.fetch<{ slug: string }[]>(
        BLOG_SLUGS_QUERY,
        {},
        {
            next: {
                revalidate: 3600,
                tags: ["post"],
            },
        }
    );
    return results.map((r) => r.slug).filter(Boolean);
}
