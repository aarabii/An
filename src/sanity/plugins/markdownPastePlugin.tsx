import { BehaviorPlugin } from "@portabletext/editor/plugins";
import { defineBehavior, raise } from "@portabletext/editor/behaviors";
import { markdownToPortableText } from "@portabletext/markdown";

export const markdownPasteBehavior = defineBehavior({
  on: "deserialize.data",
  guard: ({ snapshot, event }) => {
    if (event.mimeType !== "text/plain") return false;
    const text = event.data;
    if (!text || typeof text !== "string") return false;

    // Check if the text looks like markdown syntax
    const hasMarkdownSyntax =
      /^#{1,6}\s+/m.test(text) || // Headings # ... ######
      /^\s*[-*+]\s+/m.test(text) || // Bullet lists
      /^\s*\d+\.\s+/m.test(text) || // Numbered lists
      /```[\s\S]*?```/.test(text) || // Code blocks
      /\*\*.*?\*\*/.test(text) || // Bold
      /(^|[^\*])\*[^\*\n]+\*([^\*]|$)/.test(text) || // Italic
      /~~.*?~~/.test(text) || // Strikethrough
      /\[.*?\]\(.*?\)/.test(text) || // Links
      /^\s*>\s+/m.test(text); // Blockquotes

    if (!hasMarkdownSyntax) return false;

    try {
      const blocks = markdownToPortableText(text, {
        schema: snapshot.context.schema,
        keyGenerator: snapshot.context.keyGenerator,
      });

      if (!blocks || blocks.length === 0) return false;

      return {
        type: "deserialization.success" as const,
        mimeType: "text/plain" as const,
        data: blocks,
      };
    } catch (e) {
      console.error("Markdown paste parsing error:", e);
      return false;
    }
  },
  actions: [
    ({ event: originEvent }, deserializeEvent) => [
      raise({
        ...deserializeEvent,
        originEvent: originEvent.originEvent,
      }),
    ],
  ],
});

import type { PortableTextPluginsProps } from "sanity";

export function MarkdownPastePlugin(props: PortableTextPluginsProps) {
  return (
    <>
      {props.renderDefault(props)}
      <BehaviorPlugin behaviors={[markdownPasteBehavior]} />
    </>
  );
}
