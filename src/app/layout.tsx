import "./globals.css";

import localFont from "next/font/local";

import { createMetaData } from "@/util/createMetaData";

const manrope = localFont({
  src: "../assets/fonts/manrope.ttf",
});

export const Metadata = createMetaData();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} className={`scroll-smooth`}>
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
