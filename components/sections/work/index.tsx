import { SectionHeader } from "@/components/common";

export const WorkSection = () => {
  return (
    <section
      id="work"
      className="relative w-full select-none px-6 py-28 md:px-12 lg:px-20"
    >
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeader number="05" title="Work" align="right" />

        {/* Work/projects content goes here */}
      </div>
    </section>
  );
};
