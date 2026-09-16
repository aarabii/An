import { defineQuery } from "next-sanity";
import { client } from "../client";
import type { Game } from "../../schemaTypes/gameType";
import type { Book } from "../../schemaTypes/bookType";

// ---------------------- Game Queries ----------------------

export const ALL_GAMES_QUERY = defineQuery(
  `*[_type == "game"] | order(select(category == "GOAT" => 0, category == "Hall of Fame" => 1, category == "Pretty Good" => 2, 3) asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    desc,
    customeCmt,
    category,
    imge_link,
    steam_link,
    website,
    other_links,
    pc_req,
    developer,
    publisher,
    genres
  }`
);

export const GOAT_GAMES_QUERY = defineQuery(
  `*[_type == "game" && category == "GOAT"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    desc,
    customeCmt,
    category,
    imge_link,
    steam_link,
    website,
    other_links,
    pc_req,
    developer,
    publisher,
    genres
  }`
);

export const GAME_BY_SLUG_QUERY = defineQuery(
  `*[_type == "game" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    desc,
    customeCmt,
    category,
    imge_link,
    steam_link,
    website,
    other_links,
    pc_req,
    developer,
    publisher,
    genres
  }`
);

export const GAME_SLUGS_QUERY = defineQuery(
  `*[_type == "game" && defined(slug.current)] {
    "slug": slug.current
  }`
);

export async function getAllGames(): Promise<Game[]> {
  return await client.fetch<Game[]>(
    ALL_GAMES_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["game"],
      },
    }
  );
}

export async function getGoatGames(): Promise<Game[]> {
  return await client.fetch<Game[]>(
    GOAT_GAMES_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["game"],
      },
    }
  );
}

export async function getGameBySlug(slug: string): Promise<Game | null> {
  return await client.fetch<Game | null>(
    GAME_BY_SLUG_QUERY,
    { slug },
    {
      next: {
        revalidate: 60,
        tags: ["game", `game:${slug}`],
      },
    }
  );
}

export async function getAllGameSlugs(): Promise<string[]> {
  const results = await client.fetch<{ slug: string }[]>(
    GAME_SLUGS_QUERY,
    {},
    {
      next: {
        revalidate: 3600,
        tags: ["game"],
      },
    }
  );
  return results.map((r) => r.slug).filter(Boolean);
}

// ---------------------- Book Queries ----------------------

export const ALL_BOOKS_QUERY = defineQuery(
  `*[_type == "book"] | order(_createdAt desc) {
    _id,
    title,
    coverImage,
    description,
    link,
    _createdAt
  }`
);

export async function getAllBooks(): Promise<Book[]> {
  return await client.fetch<Book[]>(
    ALL_BOOKS_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["book"],
      },
    }
  );
}
