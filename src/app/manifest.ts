import type { MetadataRoute } from "next";
import { SITE_CONFIG, PERSONAL_INFO } from "@/constant";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.name,
    short_name: PERSONAL_INFO.firstName,
    description: SITE_CONFIG.description,

    id: "/",
    start_url: "/",
    scope: "/",

    display: "standalone",
    orientation: "portrait-primary",

    background_color: SITE_CONFIG.backgroundColor,
    theme_color: SITE_CONFIG.themeColor,

    lang: "en",
    dir: "ltr",

    categories: SITE_CONFIG.categories,

    icons: [
      {
        src: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
