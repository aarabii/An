import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { cache } from "react";

export interface PostMeta {
  id: string;
  title: string;
  slug: string;
  description: string;
  keywords: string[];
  date: string;
  coverUrl: string | null;
}

export interface Post {
  meta: PostMeta;
  id: string;
}

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: "2022-06-28",
});

export const n2m = new NotionToMarkdown({ notionClient: notion });

/**
 * Format raw Notion page object into clean PostMeta
 */
export function formatPostMetaData(page: any): PostMeta {
  const props = page?.properties || {};
  const cover = page?.cover;

  let coverUrl: string | null = null;
  if (cover?.type === "external") {
    coverUrl = cover.external?.url || null;
  } else if (cover?.type === "file") {
    coverUrl = cover.file?.url || null;
  } else if (props.Cover?.files && Array.isArray(props.Cover.files) && props.Cover.files.length > 0) {
    const fileObj = props.Cover.files[0];
    if (fileObj?.type === "external") {
      coverUrl = fileObj.external?.url || null;
    } else if (fileObj?.type === "file") {
      coverUrl = fileObj.file?.url || null;
    }
  }

  const title =
    props.Title?.title?.[0]?.plain_text ||
    props.Name?.title?.[0]?.plain_text ||
    "Untitled";

  const slug = props.Slug?.rich_text?.[0]?.plain_text || "";

  const description = props.Description?.rich_text?.[0]?.plain_text || "";

  const keywords =
    props.Keywords?.multi_select?.map((k: { name: string }) => k.name) || [];

  const date = props.Date?.date?.start || page.created_time || new Date().toISOString();

  return {
    id: page.id,
    title,
    slug,
    description,
    keywords,
    date,
    coverUrl,
  };
}

/**
 * Fetch all published blog posts sorted by date descending
 */
export const getAllPosts = cache(async (): Promise<PostMeta[]> => {
  const dbId = process.env.NOTION_DATABASE_ID;
  if (!dbId || !process.env.NOTION_API_KEY) {
    console.warn("NOTION_DATABASE_ID or NOTION_API_KEY is not defined.");
    return [];
  }

  try {
    const response: any = await notion.request({
      path: `databases/${dbId}/query`,
      method: "post",
      body: {
        filter: {
          property: "Published",
          checkbox: { equals: true },
        },
        sorts: [{ property: "Date", direction: "descending" }],
      },
    });

    const results = response.results || [];
    return results.map(formatPostMetaData);
  } catch (error) {
    console.error("Error fetching Notion posts:", error);
    return [];
  }
});

/**
 * Fetch a single blog post metadata by Slug
 */
export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const dbId = process.env.NOTION_DATABASE_ID;
  if (!dbId || !process.env.NOTION_API_KEY || !slug) return null;

  try {
    const response: any = await notion.request({
      path: `databases/${dbId}/query`,
      method: "post",
      body: {
        filter: {
          and: [
            { property: "Slug", rich_text: { equals: slug } },
            { property: "Published", checkbox: { equals: true } },
          ],
        },
      },
    });

    const page = response.results?.[0];
    if (!page) return null;

    return {
      meta: formatPostMetaData(page),
      id: page.id,
    };
  } catch (error) {
    console.error(`Error fetching post by slug "${slug}":`, error);
    return null;
  }
});

/**
 * Fetch page blocks and convert to Markdown string
 */
export const getPostContent = cache(async (id: string): Promise<string> => {
  if (!id) return "";

  try {
    const mdblocks = await n2m.pageToMarkdown(id);
    const mdString = n2m.toMarkdownString(mdblocks);
    return mdString.parent || "";
  } catch (error) {
    console.error(`Error converting Notion page ${id} to markdown:`, error);
    return "";
  }
});
