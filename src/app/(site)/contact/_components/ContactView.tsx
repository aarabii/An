import { ContactEmail, ContactForm } from "@/components/misc";
import { Separator } from "@/components/ui/separator";
import { ContactChannels } from "./ContactChannels";

export const ContactView = () => {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 my-4">
      {/* Intro paragraph */}
      <div className="max-w-prose">
        <p className="font-para text-sm sm:text-base text-muted-foreground leading-relaxed">
          Have an idea to build, an engineering challenge to solve, or an AI
          workflow to optimize? I&apos;m always interested in discussing
          impactful opportunities.
        </p>
      </div>

      {/* Section 1: Full-Width Direct Email Bar with Click-to-Copy */}
      <ContactEmail />

      {/* Hairline Separator */}
      <Separator />

      {/* Section 2: Full-Width Conversational Form */}
      <ContactForm />

      {/* Hairline Separator */}
      <Separator />

      {/* Section 3: Online Presence (Text-based Social Links) */}
      <ContactChannels />
    </div>
  );
};
