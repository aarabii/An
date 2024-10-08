"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { useScreenSize } from "@/hooks/useScreenSize";
import { SELF_DATA } from "@/constant/self";

import { Meteors } from "../ui/Meteors";
import { TextGenerateEffect } from "../ui/TextGenerateEffect";

import { quentin } from "@/app/fonts";

const container = (delay: number) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});

export const Hero = () => {
  const screenSize = useScreenSize();
  const router = useRouter();
  return (
    <header className="container mx-auto px-8 lg:h-screen h-[80vh] flex justify-center lg:justify-start items-center">
      <div className="flex flex-col gap-6 mt-0 lg:gap-10 text-center lg:text-left">
        <motion.h1
          variants={container(0)}
          initial="hidden"
          animate="visible"
          className={`${quentin.className} lg:text-9xl text-7xl font-normal`}
        >
          {screenSize.width > 1024 ? SELF_DATA.name : SELF_DATA.first_name}
        </motion.h1>
        <motion.span
          variants={container(0.5)}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 text-transparent bg-clip-text text-2xl lg:text-4xl"
        >
          {SELF_DATA.role[0]}
        </motion.span>
        <motion.p
          variants={container(1)}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-1/2 font-light text-sm lg:text-xl tracking-wider leading-relaxed"
        >
          <TextGenerateEffect words={SELF_DATA.bio} />
        </motion.p>
        <motion.div className="flex justify-center lg:justify-start">
          <button
            className="w-32 text-purple-400 border-purple-400 border-2 rounded-md px-4 py-2 hover:bg-purple-400 hover:text-black hover:font-semibold"
            onClick={() => router.push("/resume")}
          >
            Resume
          </button>
        </motion.div>
        {/* <Meteors number={Math.floor(Math.random() * 50)} /> */}
      </div>
    </header>
  );
};
