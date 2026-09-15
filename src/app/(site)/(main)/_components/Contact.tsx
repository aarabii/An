import { Container, Title } from "@/components/common";
import { SOCIALS } from "@/constant";
import { ContactEmail, ContactForm } from "@/components/misc";
import { Separator } from "@/components/ui/separator";

const Contact = () => {
  return (
    <Container id="contact">
      <Title heading="Let's Talk" />

      <div className="flex flex-col gap-10 px-5 py-8 sm:gap-12 sm:px-8 sm:py-12">
        {/* Section 1: Full-Width Email Bar with Click-to-Copy */}
        <ContactEmail />

        {/* Hairline Separator */}
        <Separator />

        {/* Section 2: Full-Width Conversational Form */}
        <ContactForm />

        {/* Section 3: All Socials Spread Across Full Width */}
        <div className="flex flex-col gap-3">
          <span className="font-heading text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Connect
          </span>
          <ul
            role="list"
            className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4 sm:gap-x-6"
          >
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group -mx-2.5 flex items-center gap-2 rounded-sm px-2 py-1 text-sm text-muted-foreground transition-all duration-200 ease-out hover:bg-muted/40 hover:pl-4 hover:text-foreground underline-offset-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <Icon
                      className="size-3.5 shrink-0 text-muted-foreground/70 transition-colors duration-200 group-hover:text-foreground"
                      aria-hidden="true"
                    />
                    /
                    <span className="font-mono text-xs group-hover:underline">
                      @{social.handle}
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
