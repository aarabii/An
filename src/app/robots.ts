import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: "/api/",
      },
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: "/api/",
      },
      {
        userAgent: ["Applebot", "Bingbot"],
        allow: ["/"],
        disallow: "/api/",
      },
    ],
    sitemap: "https://aarab.vercel.app/sitemap.xml",
  };
}
