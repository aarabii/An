import { SOCIALS } from "@/constant";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const contentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.sanity-cdn.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://cdn.sanity.io https://*.sanity.io https://avatars.githubusercontent.com;
  font-src 'self' data: https://fonts.gstatic.com;
  connect-src 'self' https://*.sanity.io https://*.apicdn.sanity.io wss://*.sanity.io https://vitals.vercel-insights.com;
  worker-src 'self' blob:;
  media-src 'self' https://cdn.sanity.io https://*.sanity-cdn.com data: blob:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self' https://*.sanity.io;
  ${isDev ? "" : "upgrade-insecure-requests;"}
`
  .replace(/\s{2,}/g, " ")
  .trim();

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
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
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
      },
      {
        source: "/blog",
        destination: "/blogs",
      },
      {
        source: "/security.txt",
        destination: "/.well-known/security.txt",
      },
      {
        source: "/direct-resume",
        destination: "/resume/aarab_nishchal_resume.pdf",
      },
      {
        source: "/email",
        destination: "mailto:hello@aarab.me",
      },
      ...SOCIALS.map((social) => ({
        source: `/${social.name.toLowerCase()}`,
        destination: social.url,
      })),
    ];
  },
};

export default nextConfig;
