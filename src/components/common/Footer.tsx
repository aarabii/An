"use client";

import Image from "next/image";
import Link from "next/link";

import { IconType } from "react-icons";

import { SELF_DATA } from "@/constant/self";
import { customBlurDataURL } from "@/utils/Blurdata";

import { FaLinkedin, FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

import { MoonDance } from "@/app/fonts";

export const Footer = () => {
  return (
    <footer className="w-full">
      <div className="mx-auto px-10 sm:px-20 lg:px-40 bg-slate-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
        <div className="py-6 flex justify-between items-center flex-col gap-8 lg:flex-row">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.svg"
              alt="Ideascribe Logo"
              width={40}
              height={40}
              placeholder="blur"
              loading="lazy"
              quality="100"
              blurDataURL={`${customBlurDataURL}`}
              style={{
                objectFit: "cover",
              }}
            />
            <h2
              className={`${MoonDance.className} cursor-pointer text-4xl font-semibold text-slate-300`}
            >
              {SELF_DATA.name}
            </h2>
          </div>

          <div className="flex  space-x-4 sm:justify-center">
            <FooterIcons
              href={`https://github.com/${SELF_DATA.socials_username.github}`}
              Icon={FaGithub}
            />

            <FooterIcons
              href={`https://linkedin.com/in/${SELF_DATA.socials_username.linkedin}`}
              Icon={FaLinkedin}
            />

            <FooterIcons
              href={`https://leetcode.com/${SELF_DATA.socials_username.leetcode}`}
              Icon={SiLeetcode}
            />

            <FooterIcons
              href={`https://instagram.com/${SELF_DATA.socials_username.instagram}`}
              Icon={FaInstagram}
            />

            <FooterIcons
              href={`https://twitter.com/${SELF_DATA.socials_username.twitter}`}
              Icon={FaXTwitter}
            />
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

const FooterIcons = ({ href, Icon }: { href: string; Icon: IconType }) => {
  return (
    <Link href={href} passHref rel="noopener noreferrer" target="_blank">
      <Icon className="w-6 h-6 flex text-slate-200 bg-transparent justify-center items-center hover:text-purple-300" />
    </Link>
  );
};
