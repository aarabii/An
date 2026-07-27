"use client";

import { SectionHeader } from "@/components/common";
import { experience } from "@/constant";
import { ExperienceList } from "./_components/ExperienceList";

export const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="relative w-full select-none px-6 py-28 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-5xl relative">
        <SectionHeader number="04" title="Experience" align="left" />

        <ExperienceList items={experience} />
      </div>
    </section>
  );
};
