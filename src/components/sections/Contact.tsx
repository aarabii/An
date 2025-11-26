"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { IconType } from "react-icons";
import { useRef } from "react";

import { IoLocationOutline, IoMailOutline } from "react-icons/io5";

import { selfData } from "@/constant";
import { nasalization } from "@/app/fonts";
import { ContactFormCard, ContactSocials } from "@/components/Cards";

export const Contact = () => {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      id="contact"
      className="py-24 max-w-6xl mx-auto relative overflow-hidden"
    >
      <div className="px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <motion.h2
            className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 relative ${nasalization.className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ color: "hsl(var(--primary))" }}
          >
            Let&apos;s Connect
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Form */}
          <ContactFormCard />

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact List */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4"
            >
              <h3
                className="text-xl md:text-2xl font-semibold mb-6 font-mono"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Get In Touch
              </h3>
              <ContactList />
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <h3
                className="text-xl md:text-2xl font-semibold mb-6 font-mono"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Socials . . .
              </h3>
              <ContactSocials />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ContactItemProps {
  icon: IconType;
  label: string;
  value: string;
  href?: string;
}

const ContactItem: React.FC<ContactItemProps> = ({
  icon: Icon,
  label,
  value,
  href,
}) => {
  const content = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-4 rounded-xl transition-all duration-300 hover:bg-white/5 group cursor-pointer border border-transparent hover:border-primary/20"
    >
      <div className="flex items-center space-x-4">
        <motion.div
          className="p-3 rounded-lg"
          style={{ backgroundColor: "hsl(var(--primary) / 0.2)" }}
          whileHover={{
            scale: 1.1,
            transition: { type: "spring", stiffness: 400, damping: 10 },
          }}
        >
          <Icon className="w-6 h-6" style={{ color: "hsl(var(--primary))" }} />
        </motion.div>
        <div className="flex-1">
          <p className="text-sm text-muted/80 mb-1">{label}</p>
          <p className="font-medium group-hover:text-primary transition-colors duration-300">
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
};

const ContactList = () => {
  return (
    <div className="space-y-4">
      <ContactItem
        icon={IoMailOutline}
        label="Email"
        value={selfData.email}
        href={`mailto:${selfData.email}`}
      />
      <ContactItem
        icon={IoLocationOutline}
        label="Location"
        value={`${selfData.current_location.city}, ${selfData.current_location.state}, ${selfData.current_location.country}`}
      />
    </div>
  );
};
