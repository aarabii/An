import React from "react";
import Image from "next/image";

import logo from "@/assets/logo/an_white_bg_removed.png";
import data from "@/constants/details.json";

import { FaSquareGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";

import { NavIcons } from "./common/NavIcons";

export const Navbar = () => {
  return (
    <nav className="lg:mb-20 flex items-center justify-between py-6 z-50">
      <div className="flex flex-shrink-0 items-center">
        <Image className="x-2 w-10" placeholder="blur" src={logo} alt="Aarab Nishchal's logo" />
      </div>

      <div className="m-8 flex items-center justify-center gap-4 text-2xl">
        <NavIcons icons={FaSquareGithub} href={data.github} />
        <NavIcons icons={FaLinkedin} href={data.linkedin} />
        <NavIcons icons={FaSquareXTwitter} href={data.twitter} />
        <NavIcons icons={FaSquareInstagram} href={data.instagram} />
      </div>
    </nav>
  );
};
