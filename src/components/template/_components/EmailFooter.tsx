import { EMAIL_VARIABLES } from "@/constant";
import { Section, Text, Link } from "react-email";

const domain = new URL(EMAIL_VARIABLES.baseURL).hostname.toUpperCase();

export const EmailFooter = () => {
  return (
    <Section className="px-7 py-7 bg-background border-t border-solid border-border text-center">
      <Text className="font-heading font-semibold text-[12px] tracking-[0.14em] text-foreground uppercase m-0">
        {domain}
      </Text>
      <Text className="font-sans text-[12px] text-muted m-0 mt-1">
        {EMAIL_VARIABLES.name} &bull; AI Engineer &amp; Full-Stack Developer
      </Text>
      <Text className="font-mono text-[11px] text-muted m-0 mt-1">
        You received this auto-receipt because a message was submitted via{" "}
        <Link
          href={`${EMAIL_VARIABLES.baseURL}/contact`}
          className="text-muted underline hover:text-foreground"
        >
          aarab.me/contact
        </Link>
        .
      </Text>
    </Section>
  );
};
