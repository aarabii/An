import { defineQuery } from "next-sanity";
import { client } from "../client";
import type { ALL_BOOKMARKS_QUERY_RESULT } from "../../../../sanity.types";

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

export async function getAllBookmarks(): Promise<ALL_BOOKMARKS_QUERY_RESULT> {
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
