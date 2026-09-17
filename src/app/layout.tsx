import type { Metadata } from "next";
import "@/app/globals.css";

import { cn } from "@/lib/utils";

import { oxaniumHeading, manrope, jetBrainMono, lora } from "@/app/font";

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
      {children}
    </html>
  );
}
