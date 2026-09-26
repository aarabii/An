import { defineQuery } from "next-sanity";
import { client } from "../client";
import type { Secret } from "@/types";

export const SECRET_BY_SLUG_QUERY = defineQuery(
  `*[_type in ["secret", "secrets"] && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    content,
    _createdAt,
    _updatedAt
  }`
);

export const ALL_SECRET_SLUGS_QUERY = defineQuery(
  `*[_type in ["secret", "secrets"] && defined(slug.current)].slug.current`
);

export async function getSecretBySlug(
  slug: string
): Promise<Secret | null> {
  return await client.fetch(
    SECRET_BY_SLUG_QUERY,
    { slug },
    {
      next: {
        revalidate: 60,
        tags: ["secret", `secret:${slug}`],
      },
    }
  );
}

export async function getAllSecretSlugs(): Promise<string[]> {
  const slugs = await client.fetch<string[]>(
    ALL_SECRET_SLUGS_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["secret"],
      },
    }
  );
  return slugs || [];
}
