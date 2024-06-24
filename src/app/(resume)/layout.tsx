import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume | Aarab Nishchal",
  description:
    "Resume of Aarab Nishchal, a student developer who loves building web apps for fun. I enjoy experimenting with technologies to create free, useful tools that everyone can enjoy.",
  keywords: [
    "Aarab Nishchal Resume",
    "Aarab's Resume",
    "Aarab Nishchal",
    "Aarab",
    "Nishchal",
    "aarabii",
    "aarab",
    "caya",
    "portfolio",
    "developer",
    "web developer",
    "web",
  ],
};

const Resumelayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Resumelayout;
