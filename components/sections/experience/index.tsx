import { SectionHeader } from "@/components/common";

export const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="relative w-full select-none px-6 py-28 md:px-12 lg:px-20"
    >
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeader number="04" title="Experience" align="left" />

        {/* Experience content goes here */}
      </div>
    </section>
  );
};
