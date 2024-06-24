"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { SELF_DATA } from "@/constant/self";
import { customBlurDataURL } from "@/utils/Blurdata";

import { Title } from "../ui/Title";
import { TextGenerateEffect } from "../ui/TextGenerateEffect";

export const About = () => {
  return (
    <section id="about">
      <Title title="About" subTitle="Me" />

      <div className="flex flex-wrap">
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 lg:p-8"
        >
          <div className="flex items-center justify-center ">
            <div className=" border-slate-500 border-2 rounded-2xl">
              <figure className="relative max-w-sm transition-all duration-500 cursor-pointer filter grayscale blur-sm  hover:grayscale-0 hover:blur-none">
                <Image
                  width={500}
                  height={500}
                  src="/images/me.png"
                  alt="about Image"
                  className="rounded-2xl"
                  placeholder="blur"
                  loading="lazy"
                  quality="100"
                  blurDataURL={`${customBlurDataURL}`}
                  style={{
                    objectFit: "cover",
                  }}
                />
              </figure>
            </div>
          </div>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2"
        >
          <div className="flex justify-center text-center lg:text-left lg:justify-start">
            <p className="my-2 max-w-xl py-6 text-lg tracking-wider">
              <TextGenerateEffect words={SELF_DATA.about} speed={1.5} />
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
