"use client";

import React from "react";

import localFont from "next/font/local";
import { useRouter } from "next/navigation";

import logo from "@/assets/logo/an_white_bg_removed.png";
import data from "@/constants/details.json";

const fezeline = localFont({
  src: "../assets/fonts/fezeline.otf",
});

import { toBase64, convertImage } from "@/util/BlurData";
import Image from "next/image";
import { Button } from "./common/Button";

export const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="z-50 bg-background dark:bg-[#080402] bg-opacity-20 fixed top-0 flex items-center justify-between w-full p-4 transition-all duration-300">
      <div className="flex items-center gap-3">
        <Image
          src={logo}
          alt="Ideascribe Logo"
          width={40}
          height={40}
          placeholder="blur"
          loading="lazy"
          quality="100"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            convertImage(700, 475)
          )}`}
          style={{
            objectFit: "cover",
          }}
        />
        <p className={`font-semibold text-slate-300 ${fezeline.className}`}>
          {data.name}
        </p>
      </div>
      <div className="flex items-center gap-x-2 md:ml-auto">
        <Button
          className="text-purple-400 border-purple-400 border-2 rounded-md px-4 py-2 hover:bg-purple-400 hover:text-black hover:font-semibold"
          onClick={() => router.push("/resume")}
        >
          Resume
        </Button>
      </div>
    </nav>
  );
};
