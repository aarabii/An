import type { MetadataRoute } from "next";
import { SITE_SEO } from "@/constant/seo";
import { getAllPosts } from "@/lib/notion";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_SEO.siteUrl;
  const lastModified = new Date();

  // Static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/direct-resume`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs/aarab_nishchal_resume.pdf`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/license`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/llm.txt`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Dynamic blog post routes from Notion
  try {
    const posts = await getAllPosts();
    const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...routes, ...blogRoutes];
  } catch (error) {
    console.error("Error generating blog routes for sitemap:", error);
    return routes;
  }
}
