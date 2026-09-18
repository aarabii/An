import type { Metadata } from "next";

import { PageNav, Container, Title } from "@/components/common";
import RepeatSeparator from "@/components/ui/repeat-separator";
import { ContactView } from "./_components";

export const metadata: Metadata = {
  title: "Contact | Aarab Nishchal",
  description:
    "Get in touch with Aarab Nishchal — AI Engineer & Full-Stack Developer available for new projects, advisory, and technical inquiries.",
};

export default async function ContactPage() {
  return (
    <div className="min-h-screen">
      <PageNav />
      <RepeatSeparator />

      <Container id="contact">
        <Title heading="Contact" />

        <div>
          <ContactView />
        </div>
      </Container>
    </div>
  );
}
