import { SectionHeader } from "@/components/common";
import { selected_works } from "@/constant";
import { WorkCard } from "./_components/WorkCard";

export const WorkSection = () => {
  return (
    <section
      id="work"
      className="relative w-full select-none px-6 py-28 md:px-12 lg:px-20"
    >
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeader number="05" title="Work" align="right" />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {selected_works.map((project, index) => (
            <WorkCard
              key={project.name}
              index={index}
              name={project.name}
              description={project.description}
              technologies={project.technologies}
              links={project.links}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
