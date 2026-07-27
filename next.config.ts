import type { NextConfig } from "next";
import { socials } from "./constant";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.notion.so",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/docs/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Disposition",
            value: "inline",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/email",
        destination: "mailto:aarab.nishchal@gmail.com",
        permanent: true,
      },
      {
        source: "/direct-resume",
        destination: "/docs/aarab_nishchal_resume.pdf",
        permanent: true,
      },
      ...socials.map((social) => ({
        source: `/${social.name.toLowerCase()}`,
        destination: social.url,
        permanent: true,
      })),
    ];
  },
};
export default nextConfig;
