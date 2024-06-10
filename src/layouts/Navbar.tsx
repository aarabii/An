"use client";

import Image from "next/image";
import localFont from "next/font/local";
import { useRouter } from "next/navigation";

import data from "@/constants/details.json";
import { toBase64, convertImage } from "@/util/BlurData";

const fezeline = localFont({
  src: "../assets/fonts/fezeline.otf",
});

import { Button } from "../components/common/Button";

export const Navbar = ({ className }: { className: string }) => {
  const router = useRouter();

  return (
    <nav
      className={`${className} z-50  fixed top-0 flex items-center justify-between w-full p-4 transition-all duration-300 bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30`}
    >
      <div className="flex items-center gap-3">
        <Image
          src="/logo.svg"
          alt="Aarab's Logo"
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
        <p className={`font-semibold text-slate-100 ${fezeline.className}`}>
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
