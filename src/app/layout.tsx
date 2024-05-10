import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aarab Nishchal",
  description: "My space on web.",
  icons: [
    // will add later
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
