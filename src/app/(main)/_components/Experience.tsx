import Container from "@/components/common/Container";
import Title from "@/components/common/Title";

import { EXPERIENCE } from "@/constant";
import ExperienceCard from "@/components/cards/ExperienceCard";

const Experience = () => {
    return (
        <Container id="experience">
            <Title heading="Experience" />
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
