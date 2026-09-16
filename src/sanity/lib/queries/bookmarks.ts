import { defineQuery } from "next-sanity";
import { client } from "../client";
import type { Bookmark } from "../../schemaTypes/bookmarkType";

export const ALL_BOOKMARKS_QUERY = defineQuery(
  `*[_type == "bookmark"] | order(_createdAt desc) {
    _id,
    title,
    link,
    description,
    tags,
    _createdAt
  }`
);

export async function getAllBookmarks(): Promise<Bookmark[]> {
  return await client.fetch<Bookmark[]>(
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
