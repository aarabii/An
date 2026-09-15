import { Container, Title } from "@/components/common";

import { EXPERIENCE } from "@/constant";
import { ExperienceCard } from "@/components/cards";

const Experience = () => {
  return (
    <Container id="experience">
      <Title heading="Places I've worked" />
      <div className="space-y-8 p-5 sm:p-8">
        {EXPERIENCE.map((item, index) => (
          <ExperienceCard
            key={`exp-${item.id}`}
            item={item}
            defaultOpen={index === 0}
          />
        ))}
      </div>
    </Container>
  );
};

export default Experience;
