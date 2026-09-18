import type { Metadata } from "next";

import { Container, PageNav, JsonLd, Title } from "@/components/common";

import RepeatSeparator from "@/components/ui/repeat-separator";
import { ContactView } from "./_components";
import {
  PAGE_SEO,
  createPageMetadata,
  getContactJsonLd,
  getBreadcrumbJsonLd,
} from "@/constant";

export const metadata: Metadata = createPageMetadata(PAGE_SEO.contact);

export default async function ContactPage() {
  const jsonLd = [
    getContactJsonLd(),
    getBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Contact", url: "/contact" },
    ]),
  ];

  return (
    <div className="min-h-screen">
      <JsonLd data={jsonLd} />
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
