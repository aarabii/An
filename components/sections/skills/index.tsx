import { SectionHeader } from "@/components/common";
import { skillsData } from "@/constant/skills";

import { Marquee } from "./_components/Marquee";
import { SkillChip } from "./_components/SkillChip";

export const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden select-none py-24 md:py-32"
    >
      {/* Section Header */}
      <div className="mx-auto w-full max-w-5xl px-6 md:px-12 lg:px-20 mb-12 md:mb-16">
        <SectionHeader number="03" title="Skills" align="right" />
      </div>

      <div className="relative w-full flex flex-col gap-4 md:gap-6">
        {skillsData.map((skillCategory, index) => (
          <Marquee
            key={index}
            reverse={index % 2 === 1}
            repeat={4}
            className="[--duration:35s] [--gap:1rem] md:[--gap:1.25rem] py-1.5"
          >
            {skillCategory.data.map((skill, skillIndex) => (
              <SkillChip
                key={`${skill.title}-${skillIndex}`}
                LogoComponent={skill.logoComponent}
                color={skill.color ?? "#ffffff"}
                title={skill.title}
              />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
};
