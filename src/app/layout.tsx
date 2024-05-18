import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Aarab Nishchal",
    default: "Aarab Nishchal",
  },
  description: "My space on web.",
  icons: [],
  referrer: "origin-when-cross-origin",
  metadataBase: new URL("https://aarab.vercel.app"),
  keywords: [
    "Aarab",
    "nishchal",
    "aarab nishchal",
    "react",
    "reactJs",
    "react portfolio",
    "portfolio",
    "portfolio website",
    "losier",
    "twexy",
    "caya",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
