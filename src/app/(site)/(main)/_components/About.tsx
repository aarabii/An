import { Container, Title } from "@/components/common";
import { HighlightedText } from "@/components/misc";
import { PERSONAL_INFO } from "@/constant";

const About = () => {
  return (
    <Container id="about">
      <Title heading="A Little About Me" />
      <div className="max-w-prose">
        <ul className="list-disc pl-5 space-y-3 text-base font-para text-foreground leading-relaxed">
          {PERSONAL_INFO.about.map((item, i) => (
            <li key={i} className="pl-1">
              <HighlightedText text={item.text} highlights={item.highlights} />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default About;
