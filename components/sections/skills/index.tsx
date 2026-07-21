import { SectionHeader } from "@/components/common";

export const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="relative w-full select-none px-6 py-28 md:px-12 lg:px-20"
    >
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeader number="03" title="Skills" align="right" />

        {/* Skills content goes here */}
      </div>
    </section>
  );
};
