import { Footer, Navbar } from "@/components/common";
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ExperienceSection,
  WorkSection,
  ContactSection,
} from "@/components/sections";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <div className="min-h-screen flex flex-col relative">
        <Navbar />
        <main>
          <HeroSection />
          <div className="relative z-10 bg-black/50 backdrop-blur-md">
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
