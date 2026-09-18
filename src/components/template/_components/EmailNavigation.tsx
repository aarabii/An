import { EMAIL_VARIABLES } from "@/constant";
import { Section, Text, Link } from "react-email";

export const EmailNavigation = () => {
  return (
    <Section className="px-7 pt-7 pb-8 border-t border-solid border-border">
      <Text className="font-heading font-semibold text-[20px] text-foreground uppercase m-0 mb-1">
        EXPLORE THE SITE
      </Text>
      <Text className="font-sans text-[13px] text-muted m-0 mb-5">
        Handcrafted projects, essays, and resources worth your time.
      </Text>

      {EMAIL_VARIABLES.navigationLinks.map((nav, index) => (
        <Section
          key={nav.title}
          className={`py-4 border-b border-solid border-border ${
            index === 0 ? "border-t" : ""
          }`}
        >
          <Text className="font-heading text-[16px] font-semibold text-foreground m-0 mb-1">
            {nav.title}
          </Text>
          <Text className="font-sans text-[13px] leading-5 text-muted m-0 mb-2">
            {nav.desc}
          </Text>
          <Link
            href={nav.href}
            className="font-mono text-[12px] font-semibold text-foreground underline hover:text-accent inline-block"
          >
            {nav.cta}
          </Link>
        </Section>
      ))}
    </Section>
  );
};
