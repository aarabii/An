import { EMAIL_VARIABLES } from "@/constant";
import {
  Section,
  Row,
  Link,
  Column,
  Img,
  Text,
  Heading,
  Hr,
} from "react-email";

export const Emailhead = () => {
  return (
    <>
      <Section className="px-7 pt-7 pb-5 border-solid border-b border-border">
        <Row align="left">
          <Column className="align-middle">
            <Link
              href={EMAIL_VARIABLES.baseURL}
              className="no-underline inline-block"
            >
              <Row align="left">
                <Column className="w-8 align-middle pr-8">
                  <Img
                    src={`${EMAIL_VARIABLES.baseURL}/icon.svg`}
                    alt={EMAIL_VARIABLES.name}
                    width="24"
                    height="24"
                    className="block rounded-sm"
                  />
                </Column>
                <Column className="align-middle">
                  <Text className="font-heading font-semibold text-[13px] tracking-[0.16em] uppercase text-foreground m-0 leading-none">
                    {EMAIL_VARIABLES.name}
                  </Text>
                </Column>
              </Row>
            </Link>
          </Column>
          <Column className="align-middle text-right">
            <Text className="font-mono text-[11px] uppercase tracking-wider text-muted m-0">
              ACKNOWLEDGED
            </Text>
          </Column>
        </Row>
      </Section>

      {/* Hero / Header Section */}
      <Section className="px-7 pt-8 pb-4">
        <Heading className="font-heading text-[32px] leading-9 font-bold text-foreground uppercase m-0">
          MESSAGE RECEIVED.
        </Heading>
      </Section>

      <Section className="px-7">
        <Hr className="border-b border-solid border-border my-4" />
      </Section>
    </>
  );
};
