import type {
  ALL_BLOGS_QUERY_RESULT,
  BLOG_BY_SLUG_QUERY_RESULT,
  Post,
} from "../../sanity.types";

export type BlogItem = ALL_BLOGS_QUERY_RESULT[number];
export type BlogDetail = NonNullable<BLOG_BY_SLUG_QUERY_RESULT>;

// Normalized BlogPost type accepting both null and undefined for optional fields (GROQ compatibility)
export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  description?: string | null;
  coverImage?: BlogDetail["coverImage"] | null;
  date: string;
  featured?: boolean | null;
  tags?: string[] | null;
  content?: BlogDetail["content"] | null;
};

// Re-export SanityImage helper type for backward compatibility
export type SanityImage = NonNullable<BlogPost["coverImage"]>;

export type { Post };
