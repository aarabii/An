import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, PageNav } from "@/components/common";
import RepeatSeparator from "@/components/ui/repeat-separator";
import { CustomPortableText } from "@/components/portable-text";
import { getSecretBySlug, getAllSecretSlugs } from "@/sanity/lib/queries";
import { createPageMetadata } from "@/constant";

interface SecretPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const slugs = await getAllSecretSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: SecretPageProps): Promise<Metadata> {
  const { slug } = await params;
  const secret = await getSecretBySlug(slug);

  if (!secret) {
    return createPageMetadata({
      title: "Secret Not Found",
      description: "The requested secret could not be found.",
      path: `/s/${slug}`,
      noIndex: true,
    });
  }

  let title = slug;
  if (Array.isArray(secret.content)) {
    for (const block of secret.content) {
      if (block && typeof block === "object" && "children" in block) {
        const children = (block as { children?: Array<{ text?: string }> })
          .children;
        if (Array.isArray(children)) {
          const text = children
            .map((c) => c.text || "")
            .join("")
            .trim();
          if (text) {
            title = text;
            break;
          }
        }
      }
    }
  }

  return createPageMetadata({
    title: `${title} | Secret`,
    description: "Confidential document",
    path: `/s/${slug}`,
    noIndex: true,
  });
}

export default async function SecretPage({ params }: SecretPageProps) {
  const { slug } = await params;
  const secret = await getSecretBySlug(slug);

  if (!secret) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Top Breadcrumb Navigation */}
      <PageNav
        items={[
          { label: "Home", href: "/" },
          { label: "Secret", href: `/s/${slug}` },
        ]}
      />

      {/* RepeatSeparator on top of Content */}
      <RepeatSeparator />

      {/* Main Content Container with standard styling wrappers */}
      <Container id="secret" className="py-8 md:py-12">
        {secret.content && secret.content.length > 0 ? (
          <article className="prose prose-invert max-w-prose mx-auto font-para [&>*:first-child]:mt-0">
            <CustomPortableText value={secret.content} />
          </article>
        ) : (
          <div className="flex min-h-48 flex-col items-center justify-center p-8 text-center sm:p-12">
            <p className="font-para text-sm text-muted-foreground italic">
              This secret does not contain any content yet.
            </p>
          </div>
        )}
      </Container>

      {/* RepeatSeparator at bottom */}
      <RepeatSeparator />
    </div>
  );
}
