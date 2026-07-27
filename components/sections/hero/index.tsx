"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { serif } from "@/app/fonts";
import { profile } from "@/constant";
import { RotatingTextHero } from "./_components/RotatingTextHero";
import { ActionBtn } from "./_components/ActionBtn";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.75], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.75], [0, 40]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex flex-col min-h-screen w-full items-center justify-center bg-transparent select-none text-primary overflow-hidden"
    >
      <motion.main
        style={{ opacity, scale, y }}
        className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Hero Main Content */}
        <section className="relative z-10 flex flex-col items-center justify-center text-center gap-8 max-w-4xl mx-auto px-6 py-20 min-h-screen">
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`${serif.className} text-primary text-center text-balance font-normal tracking-tight text-6xl sm:text-7xl md:text-8xl lg:text-9xl drop-shadow-md`}
          >
            {profile.name.full}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <ActionBtn />
          </motion.div>
        </section>

        {/* Rotating Text - Positioned at Bottom Right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-8 right-6 sm:bottom-12 sm:right-12 z-20 pointer-events-none"
        >
          <RotatingTextHero
            constant_word={profile.hero_titles.constant_word}
            rotating_words={profile.hero_titles.rotating_words}
          />
        </motion.div>
      </motion.main>
    </section>
  );
};
