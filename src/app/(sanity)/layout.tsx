import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aarabii's - Sanity Studio",
  description: "Sanity Studio Content Management System",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body style={{ margin: 0, padding: 0, height: "100vh" }}>{children}</body>
  );
}
