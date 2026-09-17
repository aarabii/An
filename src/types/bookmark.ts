import type {
  ALL_BOOKMARKS_QUERY_RESULT,
  Bookmark as SanityBookmark,
} from "../../sanity.types";

export type BookmarkItem = ALL_BOOKMARKS_QUERY_RESULT[number];

export type Bookmark = {
  _id: string;
  title: string;
  link: string;
  description?: string | null;
  tags?: string[] | null;
  _createdAt?: string;
};

export type { SanityBookmark };
