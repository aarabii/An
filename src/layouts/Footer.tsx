import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

import { toBase64, convertImage } from "@/util/BlurData";

import data from "@/constants/details.json";

const fezeline = localFont({
  src: "../assets/fonts/fezeline.otf",
});

import { FaLinkedin, FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="w-full bg-[url('../assets/pic/space.png')] ">
      <div className="mx-auto px-10 sm:px-20 lg:px-40 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
        <div className="py-6 flex justify-between items-center flex-col gap-8 lg:flex-row">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.svg"
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

          <div className="flex  space-x-4 sm:justify-center">
            <Link href="" passHref rel="noopener noreferrer" target="_blank">
              <FaGithub className="w-6 h-6 flex text-slate-200 bg-transparent justify-center items-center hover:text-slate-300" />
            </Link>
            <Link href="" passHref rel="noopener noreferrer" target="_blank">
              <FaLinkedin className="w-6 h-6 flex text-slate-200 bg-transparent justify-center items-center hover:text-slate-300" />
            </Link>

            <Link href="" passHref rel="noopener noreferrer" target="_blank">
              <FaInstagram className="w-6 h-6 flex text-slate-200 bg-transparent justify-center items-center hover:text-slate-300" />
            </Link>

            <Link href="" passHref rel="noopener noreferrer" target="_blank">
              <FaXTwitter className="w-6 h-6 flex text-slate-200 bg-transparent justify-center items-center hover:text-slate-300" />
            </Link>
          </div>
        </div>
        <div className="py-7 border-t border-slate-400">
          <div className="flex items-center justify-center">
            <code className="text-slate-200 ">
              Made with ❤️ by{" "}
              <span
                className="cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Aarab Nishchal
              </span>
              <sup>©</sup>{" "}
            </code>
          </div>
        </div>
      </div>
    </footer>
  );
};
