import { Container, Title } from "@/components/common";
import { SOCIALS } from "@/constant";
import { ContactEmail, ContactForm } from "@/components/misc";
import { Separator } from "@/components/ui/separator";

const Contact = () => {
  return (
    <Container id="contact">
      <Title heading="Let's Talk" />

      <div className="flex flex-col gap-4 sm:gap-6">
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
                    className="group flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-para text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <Icon
                      className="size-4 shrink-0 text-muted-foreground transition-colors duration-150 group-hover:text-foreground"
                      aria-hidden="true"
                    />
                    <span className="text-muted-foreground/60 select-none">
                      /
                    </span>
                    <span className="font-mono text-xs truncate">
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
