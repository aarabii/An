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
    description,
    _createdAt
  }`
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
