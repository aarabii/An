import type {
  ALL_BOOKS_QUERY_RESULT,
  Book as SanityBook,
} from "../../sanity.types";

export type BookItem = ALL_BOOKS_QUERY_RESULT[number];

export type Book = {
  _id: string;
  title: string;
  coverImage?: BookItem["coverImage"] | string | null;
  description: string;
  link?: string | null;
  _createdAt?: string;
};

export type { SanityBook };
