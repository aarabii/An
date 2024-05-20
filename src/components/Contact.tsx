import data from "@/constants/details.json";
import { motion } from "framer-motion";
import { ContactSocialList } from "./common/ContactSocialList";
import { ContactList } from "./common/ContactList";

import { IoMailOutline } from "react-icons/io5";
import { PiTelegramLogo } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa6";
import { ContactForm } from "./common/ContactForm";

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
                className="text-4xl font-nasalization font-extrabold text-neutral-100"
              >
                Get in Touch
              </motion.h1>
              <motion.p
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="text-sm text-neutral-300 mt-3"
              >
                Open to any adventure that involves learning and making cool
                stuff!
              </motion.p>
              <ul className="mt-12 space-y-8">
                <ContactList
                  icon={<IoMailOutline />}
                  link={`mailto:${data.email}`}
                  text={data.email}
                  initial={-100}
                />
                <ContactList
                  icon={<PiTelegramLogo />}
                  link={data.socials.links.telegram}
                  text={data.socials.username.telegram}
                  initial={100}
                />
                <ContactList
                  icon={<IoLocationOutline />}
                  link={`https://www.google.com/maps/place/${data.location.city}+${data.location.state}+${data.location.country}`}
                  text={`${data.location.city}, ${data.location.state}, ${data.location.country}`}
                  initial={-100}
                />
              </ul>
              <ul className="flex mt-12 space-x-4">
                <ContactSocialList
                  child={<FaGithub />}
                  link={data.socials.links.github}
                  intitial={-50}
                />
                <ContactSocialList
                  child={<FaLinkedinIn />}
                  link={data.socials.links.linkedin}
                  intitial={50}
                />
                <ContactSocialList
                  child={<BsTwitterX />}
                  link={data.socials.links.twitter}
                  intitial={-50}
                />
                <ContactSocialList
                  child={<FaInstagram />}
                  link={data.socials.links.instagram}
                  intitial={50}
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
