import { defineField, defineType, defineArrayMember } from "sanity";
import { LinkIcon } from "@sanity/icons";

export interface Bookmark {
  _id: string;
  title: string;
  link: string;
  description?: string;
  tags?: string[];
  _createdAt?: string;
}

export const bookmarkType = defineType({
  name: "bookmark",
  title: "Bookmarks",
  type: "document",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) =>
        rule.required().error("A resource title is required"),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "A brief description of this resource or tool",
    }),
    defineField({
      name: "link",
      title: "Link",
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
      title: "title",
      subtitle: "link",
    },
  },
});
