import type { FC } from "react";

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * XSS-safe component for injecting Schema.org JSON-LD structured data.
 * Replaces '<' with unicode escape '\u003c' to prevent script tag breakouts.
 */
export const JsonLd: FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
};
