import { Container, Title } from "@/components/common";

import { Badge } from "@/components/ui/badge";
import { Marquee } from "@/components/ui/marquee";
import { SKILLS } from "@/constant";

const Skills = () => {
    return (
        <Container id="skills">
            <Title heading="Skills" />
            <div className="w-full py-2">
                {SKILLS.map((skillCtg, index) => (
                    <Marquee key={index}>
                        {skillCtg.skills.map((skills, skillIdx) => (
                            <Badge
                                key={skillIdx}
                                variant="outline"
                                className="rounded-lg"
                                style={{
                                    borderColor: `${skills.color}90`,
                                    backgroundColor: `${skills.color}10`,
                                }}
                            >
                                <skills.icon
                                    data-icon="inline-start"
                                    style={{ color: skills.color }}
                                />
                                {skills.title}
                            </Badge>
                        ))}
                    </Marquee>
                ))}
            </div>
        </Container>
    );
};

export default Skills;
