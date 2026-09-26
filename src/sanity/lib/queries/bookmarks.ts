import { defineQuery } from "next-sanity";
import { client } from "../client";
import type { Bookmark } from "@/types";

export const ALL_BOOKMARKS_QUERY = defineQuery(
  `*[_type == "bookmark"] | order(_createdAt desc) {
    _id,
    "name": coalesce(name, title),
    "title": coalesce(title, name),
    "url": coalesce(url, link),
    "link": coalesce(link, url),
    "slug": slug.current,
    description,
    _createdAt
  }`
);

export const BOOKMARK_BY_SLUG_QUERY = defineQuery(
  `*[_type == "bookmark" && (slug.current == $slug || slug.current == lower($slug))][0] {
    _id,
    "name": coalesce(name, title),
    "title": coalesce(title, name),
    "url": coalesce(url, link),
    "link": coalesce(link, url),
    "slug": slug.current,
    description,
    _createdAt
  }`
);

export const ALL_BOOKMARK_SLUGS_QUERY = defineQuery(
  `*[_type == "bookmark" && defined(slug.current)].slug.current`
);

export async function getAllBookmarks(): Promise<Bookmark[]> {
  return await client.fetch(
    ALL_BOOKMARKS_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["bookmark"],
      },
    }
  );
}

export async function getBookmarkBySlug(
  slug: string
): Promise<Bookmark | null> {
  const bookmark = await client.fetch(
    BOOKMARK_BY_SLUG_QUERY,
    { slug },
    {
      next: {
        revalidate: 60,
        tags: ["bookmark", `bookmark:${slug}`],
      },
    }
  );

  if (bookmark) return bookmark;

  // Fallback for common alias variations
  const aliases: Record<string, string> = {
    "radio-garden": "radio",
    "neal-fun": "neal",
    aceternity: "ui-aceternity",
    "aceternity-ui": "ui-aceternity",
    "excalidraw-libraries": "libraries-excalidraw",
    "the-useless-web": "theuselessweb",
  };

  const aliasSlug = aliases[slug.toLowerCase()];
  if (aliasSlug) {
    return await client.fetch(
      BOOKMARK_BY_SLUG_QUERY,
      { slug: aliasSlug },
      {
        next: {
          revalidate: 60,
          tags: ["bookmark", `bookmark:${aliasSlug}`],
        },
      }
    );
  }

  return null;
}

export async function getAllBookmarkSlugs(): Promise<string[]> {
  return await client.fetch(
    ALL_BOOKMARK_SLUGS_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["bookmark"],
      },
    }
  );
}

