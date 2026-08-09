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
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";

  return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
}

export const SITE_SEO = {
  siteName: "Aarab Nishchal",
  siteTitle: "Aarab Nishchal - AI Engineer & Full-Stack Developer",
  siteUrl: resolveSiteUrl(),
  titleTemplate: "%s | Aarab Nishchal",
  defaultDescription:
    "Personal portfolio, articles, full-stack projects, and CV of Aarab Nishchal — AI Engineer Intern & Full-Stack Developer specializing in Next.js, React, Node.js, and LLM integrations.",
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
  defaultOgImage: "/images/thumbnail.png",
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
    title: "Aarab Nishchal - AI Engineer & Full-Stack Developer",
    description:
      "Welcome to the official portfolio of Aarab Nishchal. Discover full-stack web applications, AI engineering projects, technical articles, and experience.",
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
    title: "Projects & Works",
    description:
      "Explore full-stack web applications, AI tools, CLI automation frameworks, and open-source GitHub repositories created by Aarab Nishchal.",
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
    title: "Blog & Technical Articles",
    description:
      "Explore technical articles, tutorials, and insights on full-stack development, Next.js, AI engineering, and software design by Aarab Nishchal.",
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
    title: "Resume & CV",
    description:
      "Curriculum vitae and professional experience of Aarab Nishchal - AI Engineer Intern & Full-Stack Developer specializing in Next.js, React, Node.js, and LLM integrations.",
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
    title: "License & Terms of Usage",
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
