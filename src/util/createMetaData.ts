import { Metadata } from "next";

export function createMetaData({
  title = "Aarab Nishchal",
  description = "I'm a student developer who loves building web apps for fun. I enjoy experimenting with technologies to create free, useful tools that everyone can enjoy.",
  image = "/thumbnail.png",
  icons = "/logo.svg",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    referrer: "origin-when-cross-origin",
    keywords: [
      "Aarab Nishchal",
      "Aarab",
      "Nishchal",
      "aarabii",
      "aarab",
      "portfolio",
      "developer",
      "web developer",
      "web",
      "developer",
      "web development",
      "web design",
      "design",
      "react",
      "next",
      "nextjs",
      "tailwind",
      "framer-motion",
    ],
    authors: [
      {
        name: "Aarab Nishchal",
        url: "https://aarab.vercel.app",
      },
    ],
    creator: "Aarab Nishchal",
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@aarab_ii",
    },
    alternates: {
      canonical: "/",
    },
    icons,
    metadataBase: new URL("https://aarab.vercel.app"),
    themeColor: "#000000",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
