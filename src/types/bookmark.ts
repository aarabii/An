import type {
  Bookmark as SanityBookmark,
} from "../../sanity.types";

export type Bookmark = {
  _id: string;
  name?: string | null;
  title: string;
  url?: string | null;
  link: string;
  slug?: string | { current?: string } | null;
  description?: string | null;
  tags?: string[] | null;
  _createdAt?: string;
};

export type BookmarkItem = Bookmark;

export type { SanityBookmark };

