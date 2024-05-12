import React from "react";
import Image from "next/image";

import logo from "../assets/logo/logo512.png";

import { FaSquareGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";

export const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6">
      <div className="flex flex-shrink-0 items-center">
        <Image src={logo} alt="Aarab Nishchal's logo" />
      </div>

      <div className="m-8 flex items-center justify-center gap-4 text-2xl">
        <FaSquareGithub />
        <FaLinkedin />
        <FaSquareXTwitter />
        <FaSquareInstagram />
      </div>
    </nav>
  );
};
