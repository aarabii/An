import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constant";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/studio/"],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
