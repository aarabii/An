import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons/Link";

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
    // Hidden legacy fields to prevent "Unknown fields found" warnings in Sanity Studio for existing documents
    defineField({
      name: "title",
      title: "Title (Legacy)",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "link",
      title: "Link (Legacy)",
      type: "url",
      hidden: true,
    }),
    defineField({
      name: "slug",
      title: "Slug (Legacy)",
      type: "slug",
      hidden: true,
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
