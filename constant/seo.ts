import { socials } from "./social";

export interface PageSeoConfig {
  title: string;
  description: string;
  keywords: string[];
  path: string;
  ogImage?: string;
  type?: "website" | "article" | "profile";
}

export interface ConstructMetadataOptions {
  title?: string;
  useTitleTemplate?: boolean;
  description?: string;
  keywords?: string[];
  image?: string | null;
  path?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  authors?: { name: string; url?: string }[];
  noIndex?: boolean;
}

const xSocial = socials.find((s) => s.name === "X");
const githubSocial = socials.find((s) => s.name === "GitHub");

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";

  return "https://aarab.me";
}

export const SITE_SEO = {
  siteName: "Aarab Nishchal",
  siteTitle: "Aarab Nishchal | AI Engineer & Next.js Full-Stack Developer",
  siteUrl: resolveSiteUrl(),
  titleTemplate: "%s | Aarab Nishchal",
  defaultDescription:
    "Personal portfolio, articles, full-stack builds, and engineering CV of Aarab Nishchal — AI Engineer specializing in Next.js, LLM integrations, and intelligent systems.",
  defaultKeywords: [
    "Aarab Nishchal",
    "Aarab Nishchal Portfolio",
    "AI Engineer",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Software Engineer Portfolio",
    "KIIT Student Developer",
    "Web Developer India",
  ],
  author: {
    name: "Aarab Nishchal",
    url: resolveSiteUrl(),
    email: "aarab.nishchal@gmail.com",
    handle: `@${githubSocial?.handle || "aarabii"}`,
  },
  creator: "Aarab Nishchal",
  publisher: "Aarab Nishchal",
  defaultOgImage: "/images/social_card.png",
  twitterHandle: `@${xSocial?.handle || "aarab_ii"}`,
  socialLinks: socials.map((s) => s.url),
  locale: "en_US",
  themeColor: "#000000",
  robotsDefault: {
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
} as const;

export const PAGE_SEO: Record<
  "home" | "projects" | "blogs" | "resume" | "license",
  PageSeoConfig
> = {
  home: {
    title: "Aarab Nishchal | AI Engineer & Next.js Full-Stack Developer",
    description:
      "Portfolio and selected works of Aarab Nishchal. Discover production AI agents, Next.js applications, automation workflows, and technical writing.",
    keywords: [
      "Aarab Nishchal",
      "Aarab Nishchal Portfolio",
      "AI Engineer",
      "Full Stack Developer",
      "Next.js Portfolio",
      "React Engineer",
    ],
    path: "/",
    type: "website",
  },
  projects: {
    title: "AI & Full-Stack Projects, Open Source Apps",
    description:
      "Explore production-ready AI tools, CLI automation frameworks, visual workflow builders, and open-source GitHub repositories by Aarab Nishchal.",
    keywords: [
      "Aarab Nishchal Projects",
      "Full Stack Applications",
      "AI Tools",
      "Open Source GitHub Repositories",
      "Next.js Projects",
      "React Projects",
      "Developer Portfolio",
    ],
    path: "/projects",
    type: "website",
  },
  blogs: {
    title: "Technical Blog: Next.js, AI Agents & LLMs",
    description:
      "In-depth tutorials, system architecture breakdowns, and engineering insights on Next.js 16, LLM integrations, AI agents, and full-stack performance.",
    keywords: [
      "Aarab Nishchal Blog",
      "Web Development Articles",
      "Next.js Tutorials",
      "React Blog",
      "AI Software Engineering",
      "Developer Blog",
    ],
    path: "/blogs",
    type: "website",
  },
  resume: {
    title: "Aarab Nishchal Resume | AI Engineer & Full-Stack Developer",
    description:
      "Curriculum vitae and professional experience of Aarab Nishchal — AI Engineer Intern & Full-Stack Developer with experience at Ascend HSI and Unstop.",
    keywords: [
      "Aarab Nishchal Resume",
      "Aarab Nishchal CV",
      "AI Engineer Resume",
      "Software Developer Resume",
      "Full Stack Developer CV",
      "Next.js Developer Resume",
      "React Engineer",
    ],
    path: "/resume",
    type: "profile",
  },
  license: {
    title: "Software License & Open Source Terms",
    description:
      "Official software license, usage permissions, restrictions, and copyright terms for Aarab Nishchal's portfolio source code and design system.",
    keywords: [
      "Aarab Nishchal",
      "Portfolio License",
      "Software License",
      "Open Source License",
      "Usage Rights",
      "Code Copyright",
      "Terms of Use",
    ],
    path: "/license",
    type: "website",
  },
};
