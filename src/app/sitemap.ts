import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constant";
import { getSitemapData } from "@/sanity/lib/queries";

const BASE_URL = SITE_CONFIG.url;

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/bookmarks`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/recommendations`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/recommendations/games`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/recommendations/books`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  try {
    const dynamicItems = await getSitemapData();

    const dynamicRoutes: MetadataRoute.Sitemap = dynamicItems
      .filter((item) => Boolean(item.slug))
      .map((item): MetadataRoute.Sitemap[number] | null => {
        const slug = item.slug.trim().replace(/^\/+/, "");
        const lastModified = item._updatedAt
          ? new Date(item._updatedAt)
          : item.date
            ? new Date(item.date)
            : item._createdAt
              ? new Date(item._createdAt)
              : new Date();

        switch (item._type) {
          case "post":
            return {
              url: `${BASE_URL}/blogs/${slug}`,
              lastModified,
              changeFrequency: "weekly" as const,
              priority: 0.7,
            };
          case "project":
            return {
              url: `${BASE_URL}/projects/${slug}`,
              lastModified,
              changeFrequency: "monthly" as const,
              priority: 0.7,
            };
          case "game":
            return {
              url: `${BASE_URL}/recommendations/games/${slug}`,
              lastModified,
              changeFrequency: "yearly" as const,
              priority: 0.5,
            };
          default:
            return null;
        }
      })
      .filter(
        (entry): entry is MetadataRoute.Sitemap[number] => entry !== null,
      );

    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    console.error("Error generating dynamic sitemap from Sanity:", error);
    return staticRoutes;
  }
}
