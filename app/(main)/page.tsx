import type { Metadata } from "next";
import { Fragment } from "react";
import { Footer, Navbar } from "@/components/common";
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ExperienceSection,
  WorkSection,
  ContactSection,
} from "@/components/sections";
import { constructMetadata } from "@/lib/seo";
import { PAGE_SEO } from "@/constant/seo";

export const metadata: Metadata = constructMetadata(PAGE_SEO.home);

export default function Home() {
  return (
    <Fragment>
      <div className="min-h-screen flex flex-col relative">
        <Navbar />
        <main>
          <HeroSection />
          <div className="relative z-10 bg-black/30 backdrop-blur-sm">
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <WorkSection />
            <ContactSection />
          </div>
        </main>
        <Footer />
      </div>
    </Fragment>
  );
}
