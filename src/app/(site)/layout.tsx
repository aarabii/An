import type { Metadata } from "next";
import "@/app/globals.css";

import { cn } from "@/lib/utils";

import { oxaniumHeading, manrope, jetBrainMono, lora } from "@/app/font";
import { Navbar, Footer } from "@/components/common";

export const metadata: Metadata = {
  title: "Aarab Nishchal",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        oxaniumHeading.variable,
        manrope.variable,
        jetBrainMono.variable,
        lora.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <div className="relative mx-auto min-h-screen w-full max-w-178 border-x border-border">
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
