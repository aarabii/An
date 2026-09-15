import type { PortableTextBlock } from "next-sanity";

export interface SanityImage {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
    alt?: string;
    caption?: string;
}

export interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    description: string;
    coverImage?: SanityImage;
    date: string;
    featured?: boolean;
    tags?: string[];
    content?: PortableTextBlock[];
}
