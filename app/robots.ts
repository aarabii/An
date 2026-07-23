import type { MetadataRoute } from "next";
import { SITE_SEO } from "@/constant/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE_SEO.siteUrl}/sitemap.xml`,
  };
}
