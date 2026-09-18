import type { Metadata } from "next";

import {
  Hero,
  About,
  Skills,
  Experience,
  Projects,
  Blogs,
  Contact,
  ILove,
  Quotes,
} from "./_components";

import RepeatSeparator from "@/components/ui/repeat-separator";
import TopBanner from "@/components/misc/TopBanner";
import { PAGE_SEO, createPageMetadata, getProfilePageJsonLd } from "@/constant";
import { JsonLd } from "@/components/common";

export const metadata: Metadata = createPageMetadata(PAGE_SEO.home);

export default function Home() {
  const profileJsonLd = getProfilePageJsonLd("/");

  return (
    <main className="min-h-screen">
      <JsonLd data={profileJsonLd} />
      <TopBanner />
      <Hero />
      <RepeatSeparator />
      <About />
      <RepeatSeparator />
      <ILove />
      <RepeatSeparator />
      <Experience />
      <RepeatSeparator />
      <Skills />
      <RepeatSeparator />
      <Projects />
      <RepeatSeparator />
      <Blogs />
      <RepeatSeparator />
      <Contact />
      <RepeatSeparator />
      <Quotes />
      <RepeatSeparator />
    </main>
  );
}
