import type {
  ALL_PROJECTS_QUERY_RESULT,
  PROJECT_BY_SLUG_QUERY_RESULT,
  Project,
} from "../../sanity.types";

export type ProjectItem = ALL_PROJECTS_QUERY_RESULT[number];
export type ProjectDetail = NonNullable<PROJECT_BY_SLUG_QUERY_RESULT>;

export type ProjectStatus = "live" | "building" | "completed" | "archived";
export type ProjectType = "website" | "app" | "library" | "other";

export type SanityProject = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image?: ProjectItem["image"] | string | null;
  github?: string | null;
  demo?: string | null;
  type?: ProjectType | null;
  status?: ProjectStatus | null;
  technologies?: string[] | null;
  featured?: boolean | null;
  content?: ProjectDetail["content"] | string | null;
};

export type { Project };
