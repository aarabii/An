"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { customBlurDataURL } from "@/utils/Blurdata";

import { SELF_DATA } from "@/constant/self";

import { MoonDance } from "@/app/fonts";

export const Navbar = ({ className }: { className: string }) => {
  const router = useRouter();
  return (
    <nav
      className={`${className} flex items-center justify-between w-screen z-50 fixed p-4 transition-all duration-300 bg-slate-900 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40`}
    >
      <div className="flex items-center gap-3">
        <Image
          src="/images/logo.svg"
          alt="logo"
          width={40}
          height={40}
          placeholder="blur"
          loading="lazy"
          quality={100}
          blurDataURL={`${customBlurDataURL}`}
          style={{
            objectFit: "cover",
          }}
        />
        <h2 className={`${MoonDance.className} text-3xl text-slate-100`}>
          {SELF_DATA.name}
        </h2>
      </div>
      <div className="flex items-center md:ml-auto">
        <button
          className="w-32 text-purple-400 border-purple-400 border-2 rounded-md px-4 py-2 hover:bg-purple-400 hover:text-black hover:font-semibold"
          onClick={() => router.push("/resume")}
        >
          Resume
        </button>
      </div>
    </nav>
  );
};
