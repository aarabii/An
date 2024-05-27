import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { NavIcons } from "./common/NavIcons";

import logo from "@/assets/logo/an_white_bg_removed.png";
import data from "@/constants/details.json";

import {
  FaSquareGithub,
  FaLinkedin,
  FaSquareXTwitter,
  FaSquareInstagram,
} from "react-icons/fa6";

export const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="lg:mb-20 flex items-center justify-between z-50">
      <div className="flex items-center">
        <Image
          className="w-10 h-10"
          src={logo}
          alt="Aarab Nishchal's logo"
          width={40}
          height={40}
        />
        <span className="ml-2 hidden md:block text-xl sm:text-sm lg:text-3xl font-light font-fezeline">
          Aarab Nishchal
        </span>
      </div>

      <div className="flex justify-center items-center md:order-2 space-x-3">
        <div className="m-8 hidden md:flex items-center justify-center gap-4 text-2xl">
          <NavIcons
            icons={FaSquareGithub}
            link={data.socials.links.github}
          />
          <NavIcons
            icons={FaLinkedin}
            link={data.socials.links.linkedin}
          />
          <NavIcons
            icons={FaSquareXTwitter}
            link={data.socials.links.twitter}
          />
          <NavIcons
            icons={FaSquareInstagram}
            link={data.socials.links.instagram}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => router.push("/resume")}
          className="text-slate-50 bg-opacity-80 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-700 font-medium rounded-lg text-sm px-4 py-2 text-center"
        >
          Resume
        </motion.button>
      </div>
    </nav>
  );
};
