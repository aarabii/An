import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aarab Nishchal",
  description: "My space on web.",
  icons: [],
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
