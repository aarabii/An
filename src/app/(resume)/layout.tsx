import type { Metadata } from "next";

import { Manropes } from "../fonts";

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
      <body className={`${Manropes.className} overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
};

export default Resumelayout;
