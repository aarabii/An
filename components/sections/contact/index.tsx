import { SectionHeader } from "@/components/common";

export const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative w-full select-none px-6 py-28 md:px-12 lg:px-20"
    >
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeader number="06" title="Contact" align="left" />

        {/* Contact content goes here */}
      </div>
    </section>
  );
};
