import type { Metadata } from "next";
import { getAllPosts } from "@/lib/notion";
import BlogsClient from "./_components/BlogsClient";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: "Blog & Articles | Aarab Nishchal",
  description:
    "Explore technical articles, tutorials, and insights on full-stack development, Next.js, AI engineering, and software design by Aarab Nishchal.",
  keywords: [
    "Aarab Nishchal Blog",
    "Web Development Articles",
    "Next.js Tutorials",
    "React Blog",
    "AI Software Engineering",
    "Developer Blog",
  ],
  authors: [
    {
      name: "Aarab Nishchal",
      url: "https://aarab.vercel.app",
    },
  ],
  creator: "Aarab Nishchal",
  publisher: "Aarab Nishchal",
  metadataBase: new URL("https://aarab.vercel.app"),
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Blog & Articles | Aarab Nishchal",
    description:
      "Explore technical articles, tutorials, and insights on full-stack development, Next.js, AI engineering, and software design by Aarab Nishchal.",
    url: "https://aarab.vercel.app/blogs",
    siteName: "Aarab Nishchal Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Articles | Aarab Nishchal",
    description:
      "Explore technical articles, tutorials, and insights on full-stack development, Next.js, AI engineering, and software design by Aarab Nishchal.",
    creator: "@aarab_nishchal",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function BlogsPage() {
  const posts = await getAllPosts();
  return <BlogsClient posts={posts} />;
}
