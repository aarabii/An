import { defineQuery } from "next-sanity";
import { client } from "./client";
import type { BlogPost } from "@/types/blog";
import type { SanityProject } from "@/types/project";

export const FEATURED_BLOGS_QUERY = defineQuery(
    `*[_type == "post" && defined(slug.current) && featured == true] | order(date desc) {
        _id,
        title,
        "slug": slug.current,
        description,
        coverImage,
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
        coverImage,
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
        coverImage,
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
    return await client.fetch<BlogPost[]>(
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
    return await client.fetch<BlogPost[]>(
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
    return await client.fetch<BlogPost | null>(
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

// ---------------------- Project Queries ----------------------

export const FEATURED_PROJECTS_QUERY = defineQuery(
    `*[_type == "project" && defined(slug.current) && featured == true] | order(_createdAt asc) {
        _id,
        title,
        "slug": slug.current,
        description,
        image,
        github,
        demo,
        type,
        status,
        technologies,
        featured
    }`
);

export const ALL_PROJECTS_QUERY = defineQuery(
    `*[_type == "project" && defined(slug.current)] | order(_createdAt asc) {
        _id,
        title,
        "slug": slug.current,
        description,
        image,
        github,
        demo,
        type,
        status,
        technologies,
        featured
    }`
);

export const PROJECT_BY_SLUG_QUERY = defineQuery(
    `*[_type == "project" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        description,
        image,
        github,
        demo,
        type,
        status,
        technologies,
        featured,
        content
    }`
);

export const PROJECT_SLUGS_QUERY = defineQuery(
    `*[_type == "project" && defined(slug.current)] | order(_createdAt asc) [0...20] {
        "slug": slug.current
    }`
);

export async function getFeaturedProjects(): Promise<SanityProject[]> {
    return await client.fetch<SanityProject[]>(
        FEATURED_PROJECTS_QUERY,
        {},
        {
            next: {
                revalidate: 60,
                tags: ["project"],
            },
        }
    );
}

export async function getAllProjects(): Promise<SanityProject[]> {
    return await client.fetch<SanityProject[]>(
        ALL_PROJECTS_QUERY,
        {},
        {
            next: {
                revalidate: 60,
                tags: ["project"],
            },
        }
    );
}

export async function getProjectBySlug(slug: string): Promise<SanityProject | null> {
    return await client.fetch<SanityProject | null>(
        PROJECT_BY_SLUG_QUERY,
        { slug },
        {
            next: {
                revalidate: 60,
                tags: ["project", `project:${slug}`],
            },
        }
    );
}

export async function getAllProjectSlugs(): Promise<string[]> {
    const results = await client.fetch<{ slug: string }[]>(
        PROJECT_SLUGS_QUERY,
        {},
        {
            next: {
                revalidate: 3600,
                tags: ["project"],
            },
        }
    );
    return results.map((r) => r.slug).filter(Boolean);
}

// ---------------------- Bookmark Queries ----------------------
export * from "./queries/bookmarks";
