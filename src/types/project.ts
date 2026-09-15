import type { PortableTextBlock } from "next-sanity";
import type { SanityImage } from "./blog";

export type ProjectStatus = "live" | "building" | "completed" | "archived";
export type ProjectType = "website" | "app" | "library" | "other";

export interface SanityProject {
    _id: string;
    title: string;
    slug: string;
    description: string;
    image?: SanityImage | string;
    github?: string;
    demo?: string;
    type?: ProjectType;
    status?: ProjectStatus;
    technologies: string[];
    featured?: boolean;
    content?: PortableTextBlock[] | string;
}

// Alias for backward compatibility if imported elsewhere
export type ProjectItem = SanityProject;
