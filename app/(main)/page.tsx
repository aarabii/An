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
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <WorkSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </Fragment>
  );
}
