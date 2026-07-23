import type { MetadataRoute } from "next";
import { SITE_SEO } from "@/constant/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_SEO.siteTitle,
    short_name: SITE_SEO.siteName,
    description: SITE_SEO.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: SITE_SEO.themeColor,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
