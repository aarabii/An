import { Container, Title } from "@/components/common";

import { Marquee } from "@/components/ui/marquee";
import { SKILLS } from "@/constant";

const Skills = () => {
  return (
    <Container id="skills">
      <Title heading="Things I Know" />
      <div className="w-full space-y-2">
        {SKILLS.map((skillCtg, index) => (
          <Marquee key={index} reverse={index % 2 === 1} pauseOnHover>
            {skillCtg.skills.map((skill, skillIdx) => (
              <div
                key={skillIdx}
                className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-para text-foreground shadow-2xs select-none transition-colors duration-150 hover:bg-accent hover:text-accent-foreground"
              >
                <skill.icon
                  className="size-4 shrink-0"
                  style={{
                    color: skill.color,
                  }}
                  aria-hidden="true"
                />
                <span className="whitespace-nowrap font-medium">
                  {skill.title}
                </span>
              </div>
            ))}
          </Marquee>
        ))}
      </div>
    </Container>
  );
};

export default Skills;
