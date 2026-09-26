import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  getBookmarkBySlug,
  getAllBookmarkSlugs,
} from "@/sanity/lib/queries";
import { createPageMetadata } from "@/constant";

interface BookmarkRedirectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const slugs = await getAllBookmarkSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: BookmarkRedirectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const bookmark = await getBookmarkBySlug(slug);

  if (!bookmark) {
    return createPageMetadata({
      title: "Bookmark Not Found",
      description: "The requested bookmark could not be found.",
      path: `/bookmarks/${slug}`,
      noIndex: true,
    });
  }

  const title = bookmark.name || bookmark.title || "Bookmark";

  return createPageMetadata({
    title: `${title} | Bookmarks`,
    description:
      bookmark.description || `Redirecting to ${title} (${bookmark.url || bookmark.link})`,
    path: `/bookmarks/${slug}`,
  });
}

export default async function BookmarkRedirectPage({
  params,
}: BookmarkRedirectPageProps) {
  const { slug } = await params;
  const bookmark = await getBookmarkBySlug(slug);

  const destination = bookmark?.url || bookmark?.link;

  if (!destination) {
    notFound();
  }

  redirect(destination);
}
