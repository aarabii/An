import type { Metadata } from "next";
import ProjectsClient from "./_components/ProjectsClient";

export const metadata: Metadata = {
  title: "Projects & Works | Aarab Nishchal",
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
  authors: [
    {
      name: "Aarab Nishchal",
      url: "https://aarab.vercel.app",
    },
  ],
  creator: "Aarab Nishchal",
  publisher: "Aarab Nishchal",
  metadataBase: new URL("https://aarab.vercel.app"),
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects & Works | Aarab Nishchal",
    description:
      "Explore full-stack web applications, AI tools, CLI automation frameworks, and open-source GitHub repositories created by Aarab Nishchal.",
    url: "https://aarab.vercel.app/projects",
    siteName: "Aarab Nishchal Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Works | Aarab Nishchal",
    description:
      "Explore full-stack web applications, AI tools, CLI automation frameworks, and open-source GitHub repositories created by Aarab Nishchal.",
    creator: "@aarab_nishchal",
  },
  robots: {
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
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
