import type { PageSeoConfig } from "./types";

/**
 * Page SEO Configurations
 * Click-worthy titles, 150-160 character meta descriptions, targeted keywords, and canonical paths.
 */

export const PAGE_SEO: Record<string, PageSeoConfig> = {
  home: {
    title: "Aarab Nishchal - AI Engineer & Full-Stack Developer",
    absoluteTitle: true,
    description:
      "AI Engineer and full-stack developer architecting autonomous AI agents, LLM systems, and high-performance apps with Next.js and TypeScript.",
    path: "/",
    keywords: [
      "Aarab Nishchal",
      "Aarab",
      "aarabii",
      "AI Engineer",
      "Full-Stack Developer",
      "AI Engineer Portfolio",
      "Next.js Developer",
      "AI Agent Engineer",
      "LangChain Developer",
      "TypeScript Engineer",
      "Ascend HSI AI Engineer",
      "Software Engineer Portfolio",
      "Best Portfolio",
      "Best AI Engineer",
    ],
    ogType: "profile",
    category: "Portfolio",
  },
  projects: {
    title: "Projects & AI Systems",
    description:
      "Production AI agents, workflow orchestrators, and full-stack tools built by Aarab Nishchal, including Koda-Arc and NextFlow.",
    path: "/projects",
    keywords: [
      "Aarab Nishchal Projects",
      "AI Agent Projects",
      "Koda-Arc",
      "NextFlow",
      "TestIQ",
      "Ideascribe",
      "Next.js Projects",
      "Full-Stack Developer Portfolio",
      "Open Source Developer Tools",
      "LangChain Projects",
    ],
    category: "Software Development",
  },
  blogs: {
    title: "Engineering Articles & Insights",
    description:
      "In-depth articles on AI agents, Next.js internals, TypeScript, and software craftsmanship.",
    path: "/blogs",
    keywords: [
      "Aarab Nishchal Blog",
      "AI Engineering Articles",
      "Next.js Tutorials",
      "Full-Stack Architecture",
      "Software Engineering Insights",
      "AI Agents Guide",
      "TypeScript Deep Dives",
      "Developer Blog",
    ],
    category: "Technology",
  },
  contact: {
    title: "Contact & Collaboration",
    description:
      "Get in touch with Aarab Nishchal for AI engineering contracts, full-stack consulting, or engineering leadership roles.",
    path: "/contact",
    keywords: [
      "Contact Aarab Nishchal",
      "Hire AI Engineer",
      "Hire Full-Stack Developer",
      "AI Consultant",
      "Next.js Developer Freelance",
      "Technical Advisory",
      "Software Engineer Contact",
    ],
    category: "Contact",
  },
  resume: {
    title: "Resume & Professional Background",
    description:
      "Resume of Aarab Nishchal, AI Engineer Intern at Ascend HSI and CS graduate from KIIT. Experience, skills, projects, and certifications.",
    path: "/resume",
    keywords: [
      "Aarab Nishchal Resume",
      "Aarab Nishchal CV",
      "AI Engineer Resume",
      "Full Stack Developer CV",
      "Ascend HSI AI Engineer",
      "KIIT Computer Science",
      "Software Engineer Resume",
    ],
    ogType: "profile",
    category: "Resume",
  },
  bookmarks: {
    title: "Curated Web Bookmarks & Resources",
    description:
      "A curated list of developer tools, AI research papers, UI inspiration, and engineering essays, picked out by Aarab Nishchal.",
    path: "/bookmarks",
    keywords: [
      "Aarab Nishchal Bookmarks",
      "Developer Resources",
      "AI Tools Directory",
      "Engineering Bookmarks",
      "Tech Articles Reading List",
      "Curated Web Finds",
    ],
    category: "Resources",
  },
  recommendations: {
    title: "Recommendations - Games & Books",
    description:
      "Handpicked video games and books that shaped Aarab Nishchal as a developer and a thinker.",
    path: "/recommendations",
    keywords: [
      "Aarab Nishchal Recommendations",
      "Best Developer Books",
      "Best Games For Programmers",
      "Curated Reading List",
      "GOAT Video Games",
    ],
    category: "Entertainment & Literature",
  },
  recommendationsGames: {
    title: "Video Game Archive & Critical Rankings",
    description:
      "Personal archive and tier-ranked analysis of influential video games, narrative masterpieces, PC system benchmarks, and gameplay design notes by Aarab Nishchal.",
    path: "/recommendations/games",
    keywords: [
      "Game Recommendations",
      "GOAT Games List",
      "PC Gaming Specs",
      "Narrative Games Archive",
      "Game Design Reviews",
      "Favorite Video Games",
    ],
    category: "Video Games",
  },
  recommendationsBooks: {
    title: "Bookshelf & Reading Archive",
    description:
      "Essential books, literature, and architectural treatises on software craftsmanship, design systems, mental models, and philosophy curated by Aarab Nishchal.",
    path: "/recommendations/books",
    keywords: [
      "Software Engineering Books",
      "Reading List",
      "Books for Developers",
      "Computer Science Bookshelf",
      "Recommended Reading",
      "Philosophy Books",
    ],
    category: "Books",
  },
  license: {
    title: "Open Source License (MIT)",
    description:
      "MIT License terms and open-source software copyright permissions for repositories and software packages published by Aarab Nishchal.",
    path: "/license",
    keywords: [
      "MIT License",
      "Open Source Software License",
      "Aarab Nishchal GitHub License",
      "Software Copyright",
    ],
    category: "Legal",
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "Privacy policy covering data minimization, zero telemetry, and third-party infrastructure use across Aarab Nishchal projects.",
    path: "/privacy",
    keywords: [
      "Privacy Policy",
      "Data Protection",
      "Aarab Nishchal Privacy",
      "Data Minimization",
    ],
    category: "Legal",
  },
  terms: {
    title: "Terms of Service",
    description:
      "Terms of Service governing the use of hosted web projects, software demos, and experimental tools created and maintained by Aarab Nishchal.",
    path: "/terms",
    keywords: [
      "Terms of Service",
      "Legal Terms",
      "Software Terms of Use",
      "Aarab Nishchal Terms",
    ],
    category: "Legal",
  },
};
