import { defineQuery } from "next-sanity";
import { client } from "../client";

export const SITEMAP_DATA_QUERY = defineQuery(
  `*[_type in ["post", "project", "game"] && defined(slug.current)] {
    _type,
    "slug": slug.current,
    _updatedAt,
    _createdAt,
    date
  }`
);

export interface SitemapEntryItem {
  _type: "post" | "project" | "game";
  slug: string;
  _updatedAt?: string;
  _createdAt?: string;
  date?: string;
}

export async function getSitemapData(): Promise<SitemapEntryItem[]> {
  return await client.fetch<SitemapEntryItem[]>(
    SITEMAP_DATA_QUERY,
    {},
    {
      next: {
        revalidate: 3600,
        tags: ["post", "project", "game"],
      },
      stega: false,
    }
  );
}
