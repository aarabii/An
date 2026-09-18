export interface PageSeoConfig {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  ogType?: "website" | "article" | "profile";
  ogImage?: string;
  ogImageAlt?: string;
  category?: string;
  absoluteTitle?: boolean;
}

export interface CreatePageMetadataOptions {
  title: string;
  description?: string;
  path: string;
  keywords?: string[];
  ogType?: "website" | "article" | "profile";
  ogImage?: string;
  ogImageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  category?: string;
  noIndex?: boolean;
  absoluteTitle?: boolean;
}
