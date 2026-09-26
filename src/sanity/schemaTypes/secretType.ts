import { defineArrayMember, defineField, defineType } from "sanity";
import { LockIcon } from "@sanity/icons/Lock";

export const secretType = defineType({
  name: "secret",
  title: "Secrets",
  type: "document",
  icon: LockIcon,
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL slug for this secret (accessible at /s/<slug>)",
      options: {
        maxLength: 96,
        source: (doc: Record<string, unknown>) => {
          const content = doc?.content;
          if (Array.isArray(content)) {
            for (const block of content) {
              if (block && typeof block === "object" && "children" in block) {
                const children = (
                  block as { children?: Array<{ text?: string }> }
                ).children;
                if (Array.isArray(children)) {
                  const text = children
                    .map((c) => c.text || "")
                    .join("")
                    .trim();
                  if (text) return text.slice(0, 96);
                }
              }
            }
          }
          return "";
        },
      },
      validation: (rule) => rule.required().error("A slug is required"),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (rule) =>
                      rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "code",
          title: "Code Block",
          options: {
            withFilename: true,
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
            }),
            defineField({
              name: "caption",
              type: "string",
              title: "Caption",
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().error("Content is required"),
    }),
  ],
  preview: {
    select: {
      slug: "slug.current",
    },
    prepare({ slug }) {
      return {
        title: slug ? `/s/${slug}` : "Untitled Secret",
      };
    },
  },
});
