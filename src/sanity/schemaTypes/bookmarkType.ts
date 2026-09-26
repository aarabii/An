import { defineField, defineType } from "sanity";
import { LinkIcon } from '@sanity/icons/Link'

/**
 * Strips protocol, www., path, query, and domain extensions/TLDs
 * to generate a clean bookmark slug from a website URL.
 */
export function slugifyBookmarkUrl(input?: string): string {
  if (!input) return "";
  let raw = input.trim().toLowerCase();
  // Strip protocol
  raw = raw.replace(/^https?:\/\//i, "");
  // Strip path, query params, hash
  raw = raw.split("/")[0].split("?")[0].split("#")[0];
  // Strip www. prefix
  raw = raw.replace(/^www\./i, "");
  // Strip domain extension/TLD (e.g., .com, .so, .io, .dev, .co, .design, etc.)
  raw = raw.replace(/\.(co\.[a-z]{2,}|[a-z]{2,})$/i, "");
  // Replace remaining dots and non-alphanumeric characters with hyphens
  return raw
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

export const bookmarkType = defineType({
  name: "bookmark",
  title: "Bookmarks",
  type: "document",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) =>
        rule.required().error("A bookmark name is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Auto-generated from the website URL by stripping www. and domain parts",
      options: {
        source: (doc: Record<string, unknown>) =>
          (typeof doc?.url === "string" && doc.url) ||
          (typeof doc?.link === "string" && doc.link) ||
          (typeof doc?.name === "string" && doc.name) ||
          "",
        slugify: slugifyBookmarkUrl,
        maxLength: 96,
      },
      validation: (rule) => rule.required().error("A slug is required"),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "A brief description of this resource or tool (optional)",
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      description:
        "Web address for the resource (must start with http:// or https://)",
      validation: (rule) =>
        rule
          .required()
          .uri({ scheme: ["http", "https"] })
          .error("A valid web URL (http or https) is required"),
    }),
  ],
  preview: {
    select: {
      name: "name",
      title: "title",
      url: "url",
      link: "link",
    },
    prepare({ name, title, url, link }) {
      return {
        title: name || title || "Untitled Bookmark",
        subtitle: url || link || "",
      };
    },
  },
});

