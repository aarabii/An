import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, PageNav } from "@/components/common";
import RepeatSeparator from "@/components/ui/repeat-separator";
import CustomPortableText from "@/components/portable-text/PortableText";
import { getSecretBySlug } from "@/sanity/lib/queries";

interface SecretPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = true;

export async function generateMetadata(): Promise<Metadata> {
  return {
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "none",
        "max-snippet": -1,
      },
    },
  };
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
        <h1 className="sr-only">Document</h1>
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
