import type {
  ALL_GAMES_QUERY_RESULT,
  GAME_BY_SLUG_QUERY_RESULT,
  Game as SanityGame,
} from "../../sanity.types";

export type GameItem = ALL_GAMES_QUERY_RESULT[number];
export type GameDetail = NonNullable<GAME_BY_SLUG_QUERY_RESULT>;

export type GameCategory =
  | "GOAT"
  | "Hall of Fame"
  | "Pretty Good"
  | "Why Did I Play This";

export type GameRequirementItem = {
  key?: string;
  value?: string;
  _type?: "requirementItem";
  _key?: string;
};

export type GameRequirement = {
  title?: string | null;
  requirements?: Record<string, string> | GameRequirementItem[] | null;
  notes?: string[] | null;
};

export type PCRequirements = {
  min?: GameRequirement | null;
  rec?: GameRequirement | null;
};

export type Game = {
  _id?: string;
  name: string;
  slug: { current: string } | string;
  desc?: string | null;
  customeCmt?: string | null;
  category?: GameCategory | null;
  imge_link: GameItem["imge_link"] | string;
  steam_link?: string | null;
  website?: string | null;
  other_links?: string[] | null;
  pc_req?: PCRequirements | null;
  developer?: string | null;
  publisher?: string | null;
  genres?: string[] | null;
};

export type { SanityGame };
