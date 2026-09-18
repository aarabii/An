import { EMAIL_VARIABLES } from "@/constant";
import { Section, Text, Link } from "react-email";

export const EmailSignOff = () => {
  return (
    <Section className="px-7 pt-4 pb-7">
      <Text className="font-sans text-[14px] leading-5 text-foreground m-0">
        Talk soon,
      </Text>
      <Text className="font-heading font-semibold text-[16px] text-foreground m-0 mt-1">
        {EMAIL_VARIABLES.firstName}
      </Text>
      <Text className="font-mono text-[12px] text-muted m-0 mt-1">
        <Link
          href={`mailto:${EMAIL_VARIABLES.email}`}
          className="text-muted underline hover:text-foreground"
        >
          {EMAIL_VARIABLES.email}
        </Link>
      </Text>
    </Section>
  );
};
