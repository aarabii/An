import type { Metadata } from "next";
import ResumeClient from "./_components/ResumeClient";

export const metadata: Metadata = {
  title: "Resume & CV | Aarab Nishchal",
  description:
    "Curriculum vitae and professional experience of Aarab Nishchal — AI Engineer Intern & Full-Stack Developer specializing in Next.js, React, Node.js, and LLM integrations.",
  keywords: [
    "Aarab Nishchal Resume",
    "Aarab Nishchal CV",
    "AI Engineer Resume",
    "Software Developer Resume",
    "Full Stack Developer CV",
    "Next.js Developer Resume",
    "React Engineer",
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
    canonical: "/resume",
  },
  openGraph: {
    title: "Resume & CV | Aarab Nishchal",
    description:
      "Curriculum vitae and professional experience of Aarab Nishchal — AI Engineer Intern & Full-Stack Developer.",
    url: "https://aarab.vercel.app/resume",
    siteName: "Aarab Nishchal Portfolio",
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume & CV | Aarab Nishchal",
    description:
      "Curriculum vitae and professional experience of Aarab Nishchal — AI Engineer Intern & Full-Stack Developer.",
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

export default function ResumePage() {
  return <ResumeClient />;
}
