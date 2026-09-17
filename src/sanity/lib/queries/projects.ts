import { defineQuery } from "next-sanity";
import { client } from "../client";
import type { SanityProject } from "@/types/project";

export const FEATURED_PROJECTS_QUERY = defineQuery(
    `*[_type == "project" && defined(slug.current) && featured == true] | order(_createdAt asc) {
        _id,
        title,
        "slug": slug.current,
        description,
        image {
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
        image {
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
        image {
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
    return await client.fetch(
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
    return await client.fetch(
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
    return await client.fetch(
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
