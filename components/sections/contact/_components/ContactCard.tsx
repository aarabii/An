"use client";

import { motion } from "motion/react";
import { StepForm } from "./StepForm";
import { SocialLinks } from "./SocialLinks";
import { ContactInfo } from "./ContactInfo";
import { Separator } from "@/components/ui/separator";

export const ContactCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full overflow-hidden rounded-3xl border border-border/40 bg-card/30 p-6 sm:p-10 md:p-14 backdrop-blur-xl shadow-2xl"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-10 md:gap-12">
        {/* Top Part: Big Heading + Step Form */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-foreground tracking-wide select-none">
            let&apos;s talk
          </h2>

          <div className="w-full md:w-auto md:min-w-85">
            <StepForm />
          </div>
        </div>

        {/* Middle Separator with Signature Font */}
        <Separator showSignature className="my-2" />

        {/* Bottom Part: Social Links (Left) + Contact Info (Right) */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full lg:w-auto">
            <SocialLinks />
          </div>

          <div className="w-full lg:w-auto pt-2 lg:pt-0">
            <ContactInfo />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
