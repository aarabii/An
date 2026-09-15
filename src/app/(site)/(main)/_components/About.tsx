import { Container, Title } from "@/components/common";
import { HighlightedText } from "@/components/misc";
import { PERSONAL_INFO } from "@/constant";

const About = () => {
  return (
    <Container id="about">
      <Title heading="A Little About Me" />
      <div className="space-y-5 p-8">
        <div className="flex flex-wrap items-center gap-x-1 gap-y-2 text-base font-para text-primary/80 whitespace-pre-wrap md:text-base">
          <ul className="list-disc space-y-2">
            {PERSONAL_INFO.about.map((item, i) => (
              <li key={i}>
                <HighlightedText
                  text={item.text}
                  highlights={item.highlights}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default About;
