import { EMAIL_VARIABLES } from "@/constant";
import { Section, Text, Link } from "react-email";

export const EmailSocial = () => {
  return (
    <Section className="px-7 py-3">
      <Section className="bg-card-subtle border border-solid border-border-subtle rounded-md p-4">
        <Text className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted m-0 mb-2">
          FIND ME ONLINE
        </Text>
        <Text className="font-mono text-[12px] leading-6 text-muted m-0">
          {EMAIL_VARIABLES.socials.map((social, idx) => (
            <span key={social.name}>
              <Link
                href={social.url}
                className="text-foreground underline hover:text-accent font-medium inline-block"
              >
                {social.name}
              </Link>
              {idx < EMAIL_VARIABLES.socials.length - 1 && (
                <span className="text-muted/60 mx-2 select-none">•</span>
              )}
            </span>
          ))}
        </Text>
      </Section>
    </Section>
  );
};
