"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconType } from "react-icons";

import { IoLocationOutline, IoMailOutline } from "react-icons/io5";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { PiTelegramLogo } from "react-icons/pi";

import { ContactForm } from "../ui/card/ContactForm";

import { SELF_DATA } from "@/constant/self";

export const Contact = () => {
  return (
    <section id="contact">
      <div className="mb-8">
        <div className="max-w-6xl mx-auto backdrop:blur-xl  rounded-lg">
          <div className="grid md:grid-cols-2 items-center gap-16 sm:p-10 p-4">
            <div>
              <motion.h1
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-nasalization font-extrabold text-slate-100"
              >
                Get in Touch
              </motion.h1>
              <motion.p
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="text-sm text-slate-300 mt-3"
              >
                Open to any adventure that involves learning and making cool
                stuff!
              </motion.p>

              <ul className="mt-12 space-y-8">
                <ContactList
                  Icon={IoMailOutline}
                  link={`mailto:${SELF_DATA.email}`}
                  text={SELF_DATA.email}
                  initial={-25}
                />

                <ContactList
                  Icon={PiTelegramLogo}
                  link={`https://t.me/${SELF_DATA.socials_username.telegram}`}
                  text={`@${SELF_DATA.socials_username.telegram}`}
                  initial={25}
                />

                <ContactList
                  Icon={IoLocationOutline}
                  link={`https://www.google.com/maps/place/${SELF_DATA.current_location.city}+${SELF_DATA.current_location.state}+${SELF_DATA.current_location.country}`}
                  text={`${SELF_DATA.current_location.city}, ${SELF_DATA.current_location.state}, ${SELF_DATA.current_location.country}`}
                  initial={-25}
                />
              </ul>
              <ul className="flex mt-12 space-x-4">
                <ContactSocial
                  Icon={FaGithub}
                  link={`https://github.com/${SELF_DATA.socials_username.github}`}
                  initial={-10}
                />

                <ContactSocial
                  Icon={FaLinkedinIn}
                  link={`https://www.linkedin.com/in/${SELF_DATA.socials_username.linkedin}`}
                  initial={10}
                />

                <ContactSocial
                  Icon={FaInstagram}
                  link={`https://www.instagram.com/${SELF_DATA.socials_username.instagram}`}
                  initial={-10}
                />

                <ContactSocial
                  Icon={FaTwitter}
                  link={`https://twitter.com/${SELF_DATA.socials_username.twitter}`}
                  initial={10}
                />

                <ContactSocial
                  Icon={SiLeetcode}
                  link={`https://leetcode.com/${SELF_DATA.socials_username.leetcode}`}
                  initial={-10}
                />
              </ul>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactList = ({
  Icon,
  link,
  text,
  initial,
}: {
  Icon: IconType;
  link: string;
  text: string;
  initial: number;
}) => {
  return (
    <motion.li
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: initial }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.1,
      }}
    >
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
      >
        <Icon className="text-slate-300 w-6 h-6" />
        <span className="text-slate-300 font-medium text-md ml-3">{text}</span>
      </Link>
    </motion.li>
  );
};

const ContactSocial = ({
  Icon,
  link,
  initial,
}: {
  Icon: IconType;
  link: string;
  initial: number;
}) => {
  return (
    <motion.li
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: initial }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 10,
      }}
      whileHover={{
        scale: 1.1,
      }}
      className="bg-purple-700 text-slate-300 hover:bg-slate-400 hover:text-purple-700 h-10 w-10 rounded-full flex items-center justify-center shrink-0"
    >
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
      >
        <Icon className="text-slate-300 hover:text-purple-700 w-6 h-6" />
      </Link>
    </motion.li>
  );
};
