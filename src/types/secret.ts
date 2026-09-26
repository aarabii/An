import type {
  SECRET_BY_SLUG_QUERY_RESULT,
  Secret as SanitySecret,
} from "../../sanity.types";

export type SecretDetail = NonNullable<SECRET_BY_SLUG_QUERY_RESULT>;

export type Secret = {
  _id: string;
  slug: string;
  content?: SecretDetail["content"] | null;
  _createdAt?: string;
  _updatedAt?: string;
};

export type { SanitySecret };
